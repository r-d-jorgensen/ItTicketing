import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import loadable from '@loadable/component';

const Input = loadable(() => import('components/Input'));

function Login() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

    return (
      <Fragment>
        <div>
          <h1>TicketLogin</h1>
          <Input 
            name={"Username"}
            value={username}
            mask={""}
            maskChar={""}
            onChange={e => setUsername(e.target.value)}
            error={""}
          /> 
          <br/>
          <Input 
            name={"Password"}
            value={password}
            mask={""}
            maskChar={""}
            onChange={e => setPassword(e.target.value)}
            error={""}
          /> 
          <div>
            <button onClick={() => history.push('/accountRetrival')}>Forgot your password?</button>
            <button onClick={() => history.push('/registration')}>Don't have an Account?</button>
          </div>
          <button>Submit</button>
        </div>
      </Fragment>
    );
}

export default Login;