import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';
import loadable from '@loadable/component';

const Input = loadable(() => import('components/Input'));

function Login() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

    return (
      <main id="login-page">
        <div className="container">
          <Input
            label={""}
            name={"Username"}
            value={username}
            mask={""}
            maskChar={""}
            onChange={e => setUsername(e.target.value)}
            error={""}
            inputClass="login-input"
          /> 
          <br/>
          <Input 
            name={"Password"}
            value={password}
            mask={""}
            maskChar={""}
            onChange={e => setPassword(e.target.value)}
            error={""}
            inputClass="login-input"
          /> 
          <div className="double-column">
            <a onClick={() => history.push('/accountRetrival')}>Forgot your password?</a>
            <a onClick={() => history.push('/registration')}>Don't have an Account?</a>
          </div>
          <button className="button">Login</button>
        </div>
      </main>
    );
}

export default Login;
