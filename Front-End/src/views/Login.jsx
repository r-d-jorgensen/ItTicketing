import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
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
      <div className="login-container">
        <span className="login-header">Log in to your account</span>
        <form className="login-form" onSubmit={handleLoginSubmit}>
          <label htmlFor="login-username" className="login-label">Username</label>
          <Input
            id="login-username"
            name="Username"
            value={data.username}
            onChange={handleInputChange}
            className="login-input"
          />
          <label htmlFor="login-password" className="login-label">Password</label>
          <Input
            id="login-password"
            name="Password"
            value={data.password}
            onChange={handleInputChange}
            error={data.error}
            className="login-input"
            type="password"
          />
          <button className="login-button" type="submit">Login</button>
        </form>
        <Link className="login-retrieval" to="/accountRetrival">Forgot your username or password?</Link>
        <span className="login-register">
          Don&apos;t have an account?
          <Link to="/registration">Register Here</Link>
        </span>
      </div>
    </main>
  );
}

export default Login;
