import React, { Component } from 'react';
import NavLink from 'react-router-dom';
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
            <NavLink to="/register"></NavLink>
            <NavLink to="/passwordRetival"></NavLink>
          </div>
          <button onClick={haddleSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}

export default Login;
