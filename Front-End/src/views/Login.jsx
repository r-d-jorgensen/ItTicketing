import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';
import loadable from '@loadable/component';

const Input = loadable(() => import('components/Input'));

const Login = () => {
  const history = useHistory();
  const [data, setData] = useState({
    username: '',
    password: '',
    error: ''
  });

  const updateField = e => {
    console.log(e.target.name)
    setData({
      ...data,
      error: '',
      [e.target.id]: e.target.value
    });
  };

  const LoginAuthorization = e => {
    e.preventDefault();
    // make call to server
    console.log(`calling server with ${data.username} and ${data.password}`);
    // store info
    const user = {};

    // delete temp once server connection is posible and data can be sent
    // reset this with the userinfo recived from the server
    // in the mean time use this to navigate to deaper levels
    const tempEmployee = { username: "bob", password: "123" }
    const tempCustomer = { username: "steve", password: "456" }
    if (tempEmployee.username === data.username && tempEmployee.password === data.password) {
      user = { type: 'employee' };
    } else if (tempCustomer.username === data.username && tempCustomer.password === data.password) {
      user = { type: 'customer' };
    }

    if (user.type === "employee") {
      history.push('/employee');
    } else if (user.type === "customer") {
      history.push('/customer');
    } else {
      setData({
        ...data,
        error: "Incorrect username or password."
      });
    }
  }

  return (
    <main id="login-page">
      <form className="container" onSubmit={LoginAuthorization}>
        <Input
          id="username"
          name="Username"
          value={data.username}
          onChange={updateField}
          className="login-input"
        />
        <br />
        <Input
          id="password"
          name="Password"
          value={data.password}
          onChange={updateField}
          error={data.error}
          className="login-input"
        />
        <div className="double-column">
          <a onClick={() => history.push('/accountRetrival')}>
            Forgot your password?
            <br />
            Or
            <br />
            Forgot your username?
          </a>
          <a onClick={() => history.push('/registration')}>Don't have an Account?</a>
        </div>
        <button className="button">Login</button>
      </form>
    </main>
  );
}

export default Login;
