import React, { Component } from 'react';

class Card extends Component {
    render() {
        const { name, country, woeid } = this.props.data;
        return (
            <div className="card text-white mb-3 text-center" style={{ "width": "100%" }}>
                <div className="card-header">Location: {name}</div>
                <div className="card-body">
                    <h5 className="card-title">WOEID: {woeid}</h5>
                    <p className="card-text">Country: {country}</p>
                </div>
            </div>
        );
    }
}

export default Card;