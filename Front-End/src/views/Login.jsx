import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { AuthContext } from '../App';
import Input from '../components/Input';
import './Login.css';

const USER_TYPES = new Set(['employee', 'customer']);

function Login() {
  const history = useHistory();
  const { dispatch } = React.useContext(AuthContext);
  const [data, setData] = useState({
    username: '',
    password: '',
    error: '',
  });

  const handleInputChange = (id, { target: { value } }) => {
    setData({
      ...data,
      error: '',
      [id]: value,
    });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // make call to server

    //store info
    let user = { type: null};
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

    // this should be checking the call from server
    if (user && user.type && USER_TYPES.has(user.type)) {
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
    user.type = null;
    delete user.type;
  };

  return (
    <main id="login-page">
      <div className="login-container">
        <span className="login-header">Log in to your account</span>
        <form className="login-form" onSubmit={handleLoginSubmit}>
          <label htmlFor="loginUsername" className="login-label">Username</label>
          <Input
            id="loginUsername"
            name="Username"
            value={data.username}
            onChange={(e) => { handleInputChange('username', e); }}
            className="login-input"
          />
          <label htmlFor="loginPassword" className="login-label">Password</label>
          <Input
            id="loginPassword"
            name="Password"
            value={data.password}
            onChange={(e) => { handleInputChange('password', e); }}
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
