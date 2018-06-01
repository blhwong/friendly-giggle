import React, { Component } from 'react';
import { connect } from '../service';
import './Identifier.css';

class Identifier extends Component {
  state = {};

  handleClick = async () => {
    const response = await connect();
    console.log('response', response);
  };

  render() {
    return (
      <div>
        Identifier
        <button onClick={this.handleClick}>Connect</button>
      </div>
    );
  }
}

export default Identifier;
