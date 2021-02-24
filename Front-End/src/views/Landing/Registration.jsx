import React, { useState, Fragment } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Joi from 'joi';
import Input from '../../components/Input';
import './Registration.css';

function Registration() {
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
    phoneError: '',
  });

  const updateField = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };

  const signUpUser = (e) => {
    e.preventDefault();
    const regSchema = Joi.object({
      // need requierments for userinfo
      // how long should a password be same for username and such

      // not sure if should be on submit or on change??
      username: Joi.string().min(3).required().label('Username'),
      firstName: Joi.string().required().label('First Name'),
      lastName: Joi.string().required().label('Last Name'),
      password: Joi.string().min(3).required().label('Password'),
      passwordConfirm: Joi.string().valid(Joi.ref('password')).required().strict().label('Password Confirm'),
      email: Joi.string().required().label('Email'),
      emailConfirm: Joi.string().valid(Joi.ref('email')).required().strict().label('Email Confirm'),
      phone: Joi.string().regex(/^\(\d{3}\)-\d{3}-\d{4}$/).required().label('Phone'),
    }).options({ abortEarly: false });

    const result = regSchema.validate(data);
    if (result.error === undefined) {
      // make call to server to make new user and send back to Login
      history.push('/login');
    } else {
      const errs = {};
      result.error.details.forEach(({ message, path }) => {
        errs[path] = message.replace(/['"]/g, '');
      });
      if ('passwordConfirm' in errs && errs.passwordConfirm.includes('ref:password')) {
        errs.passwordConfirm = 'Passwords must match';
      }
      if ('emailConfirm' in errs && errs.emailConfirm.includes('ref:email')) {
        errs.emailConfirm = 'Emails must match';
      }
      if ('phone' in errs && errs.phone.includes('pattern')) {
          errs.phone = 'Phone area is incomplete';
      }
      setErrors({ ...errs });
    }
  };

  return (
    <Fragment>
      <header>
        <h1 className="logo">
          <Link to="/">IT Ticketing Systems Inc.</Link>
        </h1>
      </header>
      <main id="registration-page">
        <div className="registration-container">
          <span className="registration-header">Sign up for an Account</span>
          <form className="registration-form" onSubmit={signUpUser}>
            <label htmlFor="username" className="registration-label">Username</label>
            <Input
              id="username"
              name="Username"
              maskChar=" "
              mask= "*************************"
              value={data.username}
              onChange={updateField}
              error={errors.username}
            />
            <label htmlFor="firstName" className="registration-label">First name</label>
            <Input
              id="firstName"
              name="First Name"
              maskChar=" "
              mask= "aaaaaaaaaaaaaaaaaaaaaaaaa"
              value={data.firstName}
              onChange={updateField}
              error={errors.firstName}
            />
            <label htmlFor="lastName" className="registration-label">Last name</label>
            <Input
              id="lastName"
              name="Last Name"
              maskChar=" "
              mask= "aaaaaaaaaaaaaaaaaaaaaaaaa"
              value={data.lastName}
              onChange={updateField}
              error={errors.lastName}
            />
            <label htmlFor="password" className="registration-label">Password</label>
            <Input
              type="password"
              id="password"
              name="Password"
              value={data.password}
              onChange={updateField}
              error={errors.password}
            />
            <label htmlFor="passwordConfirm" className="registration-label">Confirm password</label>
            <Input
              type="password"
              id="passwordConfirm"
              name="Password Confirm"
              value={data.passwordConfirm}
              onChange={updateField}
              error={errors.passwordConfirm}
            />
            <label htmlFor="email" className="registration-label">Email</label>
            <Input
              type="email"
              id="email"
              name="Email"
              value={data.email}
              onChange={updateField}
              error={errors.email}
            />
            <label htmlFor="emailConfirm" className="registration-label">Confirm Email</label>
            <Input
              type="email"
              id="emailConfirm"
              name="Email Confirm"
              value={data.emailConfirm}
              onChange={updateField}
              error={errors.emailConfirm}
            />
            <label htmlFor="phone" className="registration-label">Phone number</label>
            <Input
              type="tel"
              id="phone"
              name="Phone"
              value={data.phone}
              maskChar="_"
              mask="(999)-999-9999"
              onChange={updateField}
              error={errors.phone}
            />
            <button className="registration-button" type="submit">Sign Up</button>
          </form>
        </div>
      </main>
    </Fragment>
  );
}

export default Registration;
