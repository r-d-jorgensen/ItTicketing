import React, { useState } from 'react';
import "./Registration.css"
import loadable from '@loadable/component';

const Input = loadable(() => import('components/Input'));

const SignUpUser = (username, firstName, lastName, password, passwordConfirm, email, emailConfirm, phone) => {
  //need requierments for userinfo
  
  //send call to server to make new user
  //or
  //give errors on credetials

  //give error if user already exists or other problems
}

const Registration = () => {
  //needs condensing of hooks
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [email, setEmail] = useState('');
  const [emailConfirm, setEmailConfirm] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <main id="registration-page">
      <div id="container">
      <h3>Sign up for an Account</h3>
      <Input 
          name={"Username"}
          value={username}
          mask={""}
          maskChar={""}
          onChange={e => setUsername(e.target.value)}
          error={""}
        />
      <div id="name-inputs">
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
      <a id="sumbit-button" className="button"
        onClick={() => SignUpUser(username, firstName, lastName, password,
          passwordConfirm, email, emailConfirm, phone)}
        >Sign Up</a>
      </div>
    </main>
  );
}

export default Registration;