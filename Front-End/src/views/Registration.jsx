import React, {Fragment, useState} from 'react';
import "./Registration.css"
import loadable from '@loadable/component';

const Input = loadable(() => import('components/Input'));

function Registration() {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [email, setEmail] = useState('');
  const [emailConfirm, setEmailConfirm] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <Fragment>
      <h1>Registration</h1>
      <Input 
          name={"Username"}
          value={username}
          mask={""}
          maskChar={""}
          onChange={e => setUsername(e.target.value)}
          error={""}
        />
      <div className="line-box">
        <Input 
          name={"First Name"}
          value={firstName}
          mask={""}
          maskChar={""}
          onChange={e => setFirstName(e.target.value)}
          error={""}
        />
        <Input 
          name={"Last Name"}
          value={lastName}
          mask={""}
          maskChar={""}
          onChange={e => setLastName(e.target.value)}
          error={""}
        />
      </div>
      <Input 
        name={"Password"}
        value={password}
        mask={""}
        maskChar={""}
        onChange={e => setPassword(e.target.value)}
        error={""}
      />
      <Input 
        name={"Password Confirm"}
        value={passwordConfirm}
        mask={""}
        maskChar={""}
        onChange={e => setPasswordConfirm(e.target.value)}
        error={""}
      />
      <Input 
        name={"Email"}
        value={email}
        mask={""}
        maskChar={""}
        onChange={e => setEmail(e.target.value)}
        error={""}
      />
      <Input 
        name={"Email Confirm"}
        value={emailConfirm}
        mask={""}
        maskChar={""}
        onChange={e => setEmailConfirm(e.target.value)}
        error={""}
      />
      <Input 
        name={"Phone"}
        value={phone}
        mask={""}
        maskChar={""}
        onChange={e => setPhone(e.target.value)}
        error={""}
      />
      <button>Submit</button>
    </Fragment>
  );
}

export default Registration;