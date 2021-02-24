import React, { useState, Fragment } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { AuthContext } from '../../App';
import Input from '../../components/Input';
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

  /* function to handle login errors from the server
  async function handleLoginError(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }

        return data;
    });
  }
  */

  async function handleLoginSubmit(e) {
    e.preventDefault();
    let user = { type: null, token: null };
    /* make call to server, needs api endpoint to test functionality
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
    const user = await fetch(`API-ENDPOINT`, requestOptions)
      .then(handleLoginError)
      .then(user => {
        if (user) {
          // store user details and basic auth credentials in local storage 
          // to keep user logged in between page refreshes
          user.authdata = window.btoa(username + ':' + password);
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', JSON.stringify(action.payload.token));
          dispatch({
            type: 'LOGIN',
            payload: {
              user: user.type,
              token: user.token,
            },
          });
        }
        return user;
      })
      .then(
        user => {
          history.push(`/${user.Type}/dashboard`);
        },
        error => this.setState({ error, loading: false })
      );
    */
    // faking call from server with temp values
    // everything bellow this in the function will have to be removed
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
    delete user.type;
  }

  return (
    <Fragment>
      <header>
        <h1 className="logo">
          <Link to="/">IT Ticketing Systems Inc.</Link>
        </h1>
      </header>
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
            />
            <label htmlFor="loginPassword" className="login-label">Password</label>
            <Input
              id="loginPassword"
              name="Password"
              value={data.password}
              onChange={(e) => { handleInputChange('password', e); }}
              error={data.error}
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
    </Fragment>
  );
}

export default Login;
