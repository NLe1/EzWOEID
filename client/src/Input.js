import React, { Component } from 'react';
// import { Container, Button, Form } from 'react-bootstrap';

class Input extends Component {
    render() {
        const { handleChange, region } = this.props;
        return (
            <div className="container">
                <form onSubmit={handleChange}>
                    <div className="form-group">
                        <p className="heading">SEARCH WOEID BY LOCATION</p>
                        <input type="text" onChange={handleChange} value={region} className="form-control" placeholder="e.g Paris" />
                    </div>
                </form >
                {/* <input onClick={handleSubmit} className="myBtn" type="submit" value="Submit" /> */}
            </div>
        );
    }
}

export default Input;