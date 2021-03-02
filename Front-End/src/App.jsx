import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import loadable from '@loadable/component';

import { AuthProvider } from './services/auth';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';

import 'normalize.css';
import './App.css';

const Home = loadable(() => import('views/Landing/Home'));
const Login = loadable(() => import('views/Landing/Login'));
const Registration = loadable(() => import('views/Landing/Registration'));
const AccountRetrival = loadable(() => import('views/Landing/AccountRetrival'));
const NotFound = loadable(() => import('views/NotFound'));

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <ProtectedRoute path="/dashboard" component={Dashboard} />
          <Route path="/accountRetrival" component={AccountRetrival} />
          <Route path="/registration" component={Registration} />
          <Route path="/login" component={Login} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/" exact component={Home} />
          <Redirect to="/not-found" />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
