import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../App';
import Input from '../components/Input';
import './Login.css';

function Login() {
  const history = useHistory();
  const { dispatch } = React.useContext(AuthContext);
  const [data, setData] = useState({
    username: '',
    password: '',
    error: '',
  });

  const handleInputChange = (e) => {
    setData({
      ...data,
      error: '',
      [e.target.id]: e.target.value,
    });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // make call to server

    //store info
    let user = {};
    // delete temp once server connection is posible and data can be sent
    // reset this with the userinfo recived from the server
    // in the mean time use this to navigate to deaper levels
    const tempEmployee = { username: 'bob', password: '123' };
    const tempCustomer = { username: 'steve', password: '456' };
    if (tempEmployee.username === data.username && tempEmployee.password === data.password) {
      user = { type: 'employee' };
    } else if (tempCustomer.username === data.username && tempCustomer.password === data.password) {
      user = { type: 'customer' };
    }

    //this should be checking the call from server
    if (user.type !== null) {
      dispatch({
        type: 'LOGIN',
        payload: {
          user: user.type,
          token: 'granted',
        },
      });

      if (user.type === 'employee') {
        history.push('/employee/dashboard');
      } else if (user.type === 'customer') {
        history.push('/customer/dashboard');
      }
    } else {
      setData({
        ...data,
        error: 'Incorrect username or password.',
      });
    }
  };

  return (
    <main id="login-page">
      <form className="container" onSubmit={handleLoginSubmit}>
        <Input
          id="username"
          name="Username"
          value={data.username}
          onChange={handleInputChange}
          className="login-input"
        />
        <br />
        <Input
          id="password"
          name="Password"
          value={data.password}
          onChange={handleInputChange}
          error={data.error}
          className="login-input"
        />
        <div className="double-column">
          <a href="/accountRetrival">
            Forgot your password?
            <br />
            Or
            <br />
            Forgot your username?
          </a>
          <a href="/registration">Don&apos;t have an Account?</a>
        </div>
        <button className="button" type="submit">Login</button>
      </form>
    </main>
  );
}

export default Login;
