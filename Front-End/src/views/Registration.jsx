import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Joi, { string } from "joi";
import "./Registration.css";
import loadable from '@loadable/component';

const Input = loadable(() => import('components/Input'));

const Registration = () => {
  const history = useHistory();
  const [data, setData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    passwordConfirm: '',
    email: '',
    emailConfirm: '',
    phone: '',
  });

  const [errors, setErrors] = useState({
    usernameError: '',
    passwordError: '',
    passwordConfirmError: '',
    emailError: '',
    emailConfirmError: '',
    phoneError: ''
  })

  const updateField = e => {
    setData({
      ...data,
      [e.target.id]: e.target.value
    });
  };

  const signUpUser = e => {
    e.preventDefault();
    const regSchema = Joi.object({
      // need requierments for userinfo
      // how long should a password be same for username and such
      username: Joi.string().regex(/[a-zA-Z1-9]/).required(),
      firstName: Joi.string().regex(/[a-zA-Z]/).required(),
      lastName: Joi.string().regex(/[a-zA-Z]/).required(),
      password: Joi.string().regex(/[a-zA-Z1-9]/).required(),
      passwordConfirm: Joi.string().valid(Joi.ref('password')).required().strict(),
      email: Joi.string().required(),
      emailConfirm: Joi.string().valid(Joi.ref('email')).required().strict(),
      phone: Joi.string().regex(/^\d{3}-\d{3}-\d{4}$/).required(),
    }).options({ abortEarly: false });

    const result = regSchema.validate(data);
    if (result.error === undefined) {
      console.log(`calling server with ${data.username} and ${data.password} and more`);
      // send call to server to make new user and send back to Login
      // history.push('/login');
    } else {
      const errs = result.error.details.map(({ message, context: { label } }) => (
        { label, message: message.replace(/['"]/g, '') }
      ));
      let temp = {}
      errs.forEach(element => {
        temp.[element.label] = element.message;
      });
      setErrors({ ...temp });
    }
  }

  return (
    <main id="registration-page">
      <form id="container" onSubmit={signUpUser}>
        <h3>Sign up for an Account</h3>
        <Input
          id="username"
          name="Username"
          value={data.username}
          onChange={updateField}
          error={errors.username}
        />
        <div id="name-inputs">
          <Input
            id="firstName"
            name="First Name"
            value={data.firstName}
            onChange={updateField}
            error={errors.phone}
          />
          <Input
            id="lastName"
            name="Last Name"
            value={data.lastName}
            onChange={updateField}
            error={errors.lastName}
          />
        </div>
        <Input
          type="password"
          id="password"
          name="Password"
          value={data.password}
          mask=""
          onChange={updateField}
          error={errors.password}
        />
        <Input
          type="password"
          id="passwordConfirm"
          name={"Password Confirm"}
          value={data.passwordConfirm}
          mask=""
          onChange={updateField}
          error={errors.passwordConfirm}
        />
        <Input
          type="email"
          id="email"
          name={"Email"}
          value={data.email}
          onChange={updateField}
          error={errors.email}
        />
        <Input
          type="email"
          id="emailConfirm"
          name="Email Confirm"
          value={data.emailConfirm}
          onChange={updateField}
          error={errors.emailConfirm}
        />
        <Input
          type="tel"
          id='phone'
          name="Phone"
          value={data.phone}
          mask={'999-999-9999'}
          onChange={updateField}
          error={errors.phone}
        />
        <button className="button">Sign Up</button>
      </form>
    </main>
  );
}

export default Registration;
