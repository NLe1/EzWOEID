import React, {
    Component
} from 'react';

import Card from './Card'

class Result extends Component {
    render() {
        const { data } = this.props;
        return (
            <div className="container">
                {data ? data.map((region, id) =>
                    <Card className="row" key={id} data={region}></Card>
                ) : <h1>Enter region name to look up WOEID</h1>}
            </div>
        );
    }
}

export default Result;