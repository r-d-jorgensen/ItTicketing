import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';

import 'normalize.css';

const Navbar = loadable(() => import('components/Navbar'));
const Home = loadable(() => import('views/Home'));
const Login = loadable(() => import('views/Login'));
const Register = loadable(() => import('views/Register'));
const PasswordRetrival = loadable(() => import('views/PasswordRetrival'));
const NotFound = loadable(() => import('views/NotFound'));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <main>
        <Switch>
          <Route path="/passwordRetrival" component={PasswordRetrival} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path='/not-found' component={NotFound} />
          <Route path="/" exact component={Home} />
          <Redirect to='/not-found' />
        </Switch>
      </main>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
