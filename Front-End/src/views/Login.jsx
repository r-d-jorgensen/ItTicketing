import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';
import loadable from '@loadable/component';

const Input = loadable(() => import('components/Input'));

const Login = () => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const LoginAuthorization = (username, password) => {
    //make call to server
    console.log(`calling server with ${username} and ${password}`);
    //store info
    const user = {type: 'employee'};
    if (user) {
      //delete temp once server connection is posible and data can be sent
      //in the mean time use this to navigate to deaper levels
      const tempEmployee = { username: "bob", password: "123" }
      const tempCustomer = { username: "steve", password: "456" }
  
      if (tempEmployee.username === username &&  tempEmployee.password === password) {
        history.push('/employee')
      } else if (user.type === 'customer') {
        //login customer side
        history.push('/customer')
      } else {
        //display error
      }
    } else {
      //display error
    }
  }

  return (
    <main id="login-page">
      <div className="container">
        <Input
          name={"Username"}
          value={username}
          onChange={e => setUsername(e.target.value)}
          error={""}
          className="login-input"
        /> 
        <br/>
        <Input 
          name={"Password"}
          value={password}
          onChange={e => setPassword(e.target.value)}
          error={""}
          className="login-input"
        /> 
        <div className="double-column">
          <a onClick={() => history.push('/accountRetrival')}>Forgot your password?<br/>Or<br/>Forgot your username?</a>
          <a onClick={() => history.push('/registration')}>Don't have an Account?</a>
        </div>
        <button className="button" onClick={() => LoginAuthorization(username, password)}>Login</button>
      </div>
    </main>
  );
}

export default Login;
