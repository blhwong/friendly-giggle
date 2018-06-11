import React, { Component } from 'react';
import { connect } from '../service';
import './Identifier.css';

class Identifier extends Component {
  state = {
    email: '',
    phoneNumber: '',
  };

  update = (stateName, value) => {
    this.setState({ [stateName]: value });
  }

  handleClick = async () => {
    const { phoneNumber, email } = this.state;
    const response = await connect(phoneNumber, email);
    console.log('response', response);
  };

  render() {
    return (
      <div>
        <div>
          <input
            type="text"
            placeholder="Email"
            onChange={event => this.update('email', event.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Phone Number"
            onChange={event => this.update('phoneNumber', event.target.value)}
          />
        </div>
        <button onClick={this.handleClick}>Connect</button>
      </div>
    );
  }
}

export default Identifier;
