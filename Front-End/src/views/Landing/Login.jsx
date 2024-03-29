import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../services/auth';
import Input from '../../components/Input';
import Button from '../../components/Button';

import styles from './Login.css';
import appStyles from '../../App.css';

function Login() {
  const auth = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function setInput(id, value) {
    if (id === 'username') {
      setUsername(value);
    } else if (id === 'password') {
      setPassword(value);
    }
  }

  async function handleLoginSubmit(e) {
    e.preventDefault();
    await auth.login(username, password);
  }

  return (
    <Fragment>
      <header>
        <h1 className={appStyles.logo}>
          <Link to="/">IT Ticketing Systems Inc.</Link>
        </h1>
      </header>
      <main className={styles['login-page']}>
        <div className={styles['login-container']}>
          <span className={styles['login-header']}>Log in to your account</span>
          <form className={styles['login-form']} onSubmit={handleLoginSubmit}>
            <label htmlFor="loginUsername" className={styles['login-label']}>Username</label>
            <Input
              id="loginUsername"
              name="Username"
              value={username}
              onChange={(e) => { setInput('username', e.target.value); }}
            />
            <label htmlFor="loginPassword" className={styles['login-label']}>Password</label>
            <Input
              id="loginPassword"
              name="Password"
              value={password}
              onChange={(e) => { setInput('password', e.target.value); }}
              error={auth.message}
              type="password"
            />
            <Button
              type="submit"
              disabled={(password === '' || username === '')}
            >
              Login
            </Button>
          </form>
          <Link className={styles['login-retrieval']} to="/accountRetrival">Forgot your username or password?</Link>
          <span className={styles['login-register']}>
            Don&apos;t have an account?
            <Link to="/registration">Register Here</Link>
          </span>
        </div>
      </main>
    </Fragment>
  );
}

export default Login;
