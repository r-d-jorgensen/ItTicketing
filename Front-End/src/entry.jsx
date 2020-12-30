import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';

import 'normalize.css';

const Home = loadable(() => import('views/Home'));
const Login = loadable(() => import('views/Login'));
const Register = loadable(() => import('views/register'));
const PasswordRetrival = loadable(() => import('views/passwordRetrival'));

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/passwordRetrival" component={PasswordRetrival} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
