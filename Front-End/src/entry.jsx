import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';

import 'normalize.css';
import './Entry.css';

const Navbar = loadable(() => import('components/Navbar'));
const Home = loadable(() => import('views/Home'));
const Login = loadable(() => import('views/Login'));
const Registration = loadable(() => import('views/Registration'));
const AccountRetrival = loadable(() => import('views/AccountRetrival'));
const NotFound = loadable(() => import('views/NotFound'));

ReactDOM.render(
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/accountRetrival" component={AccountRetrival} />
        <Route path="/registration" component={Registration} />
        <Route path="/login" component={Login} />
        <Route path='/not-found' component={NotFound} />
        <Route path="/" exact component={Home} />
        <Redirect to='/not-found' />
      </Switch>
    </BrowserRouter>,
  document.getElementById('root'),
);
