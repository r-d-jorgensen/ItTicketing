import React, { Component } from 'react';
import loadable from '@loadable/component';

const DEVELOPMENT = process.env.NODE_ENV === 'development';
const Navbar = loadable(() => import('components/Navbar'));
const Input = loadable(() => import('components/Input'));

class Login extends Component {
  state = {
    value: ""
  };

  haddleSubmit = () => {
    console.log('called server');
  };

  handlepasswordLink = () => history.push('/passwordRetival');
  handleRegisterLink = () => history.push('/register');

  render () {
    return (
      <div>
        { DEVELOPMENT && <Navbar /> }
        <form>
          <h1>TicketLogin</h1>
          <Input
            name="Username"
            mask=""
            value=""
            onChange=""
            error=""
          />
          <br/>
          <Input
            name="Password"
            mask=""
            value=""
            onChange=""
            error="errorResponse"
          />
          <div>
            <button onClick={this.handlepasswordLink}>Forgot your password?</button>
            <button onClick={this.handlepasswordLink}>Don't have an Account?</button>
          </div>
          <button onClick={this.haddleSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}

export default Login;
