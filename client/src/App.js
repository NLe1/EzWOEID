import React, {
  Component, Fragment
} from 'react';
import axios from 'axios';
import { SyncLoader, PacmanLoader } from 'react-spinners';

import Input from './Input';
import Result from './Result';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      region: '',
      data: [],
      page: 1,
      nextPage: 1,
      globalTimeOut: null,
      loading: false
    }
  }

  handleChange = async (e) => {
    e.persist();
    e.preventDefault();
    await this.setState({ region: e.target.value, page: 1, nextPage: 1, data: [], globalTimeOut: null, loading: true });

    if (this.state.globalTimeOut) { clearTimeout(this.state.globalTimeOut); }
    const { region, page } = this.state;

    await this.setState({
      globalTimeOut: setTimeout(() => {
        axios.get('http://localhost:5000/region', {
          params: {
            name: region, page
          }
        }).then(res => {
          console.log(res.data)
          this.setState({ data: res.data.docs, nextPage: res.data.nextPage, loading: false });
        }).catch(err => console.log(err))
      }, 1500)
    });

  }


  fetchMore = async () => {
    const { region, page } = this.state;
    axios.get('http://localhost:5000/region', {
      params: {
        name: region, page
      }
    }).then(res => {
      console.log(res.data)
      this.setState({ data: [...this.state.data, ...res.data.docs], loading: false, nextPage: res.data.nextPage });
    }).catch(err => console.log(err));
  }

  handleScroll = async () => {
    if (this.state.nextPage) {
      const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
      const windowBottom = windowHeight + window.pageYOffset;
      if (windowBottom >= docHeight) {
        await this.setState({
          page: this.state.nextPage,
          loading: true,
          globalTimeOut: null
        });
        setTimeout(() => this.fetchMore(), 1500);
      }
    }
  }

  componentDidMount = () => {
    window.addEventListener("scroll", this.handleScroll);
  }

  render() {
    return (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <Input handleChange={this.handleChange} region={this.state.region}></Input>
        </div>
        <div className="mt-4 row justify-content-center">
          <Result data={this.state.data}></Result>
        </div>
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {
            this.state.data.length == 0 && !this.state.loading ? (
              <Fragment>
                <PacmanLoader
                  size={30}
                  color={"white"}
                />
              </Fragment>
            ) : null
          }
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {
            this.state.loading ? <SyncLoader
              size={50}
              color={"white"}
            /> : null
          }
        </div>

      </div>
    );
  }
}

export default App;