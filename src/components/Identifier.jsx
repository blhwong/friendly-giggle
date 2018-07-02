import React, { Component } from 'react';
import { Input, Button, Icon, Layout } from 'antd';
import 'antd/dist/antd.css';
import { connect } from '../service';
import './Identifier.css';

const { Header } = Layout;

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
      <div className="Identifier">
        <Header />
        <div className="container">
          <div>
            <Input
              type="text"
              placeholder="Email"
              onChange={event => this.update('email', event.target.value)}
            />
          </div>
          <div>
            <Input
              type="text"
              placeholder="Phone Number"
              onChange={event => this.update('phoneNumber', event.target.value)}
            />
          </div>
          <Button className="button" onClick={this.handleClick}>Connect<Icon type="cloud-o" /></Button>
        </div>
      </div>
    );
  }
}

export default Identifier;
