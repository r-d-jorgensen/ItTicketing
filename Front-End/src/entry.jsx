import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import loadable from '@loadable/component';

import 'normalize.css';

import ProtectedRoute from 'components/common/ProtectedRoute';

const CustomerDashboard = loadable(() => import('views/CustomerDashboard'));
const EmployeeDashboard = loadable(() => import('views/EmployeeDashboard'));
const LoginPage = loadable(() => import('views/LoginPage'));

function MainView({ userType }) {
  if (userType === 'user') {
    return <CustomerDashboard />;
  }

  if (userType === 'tech') {
    return <EmployeeDashboard />;
  }

  return <Redirect to="/login" />;
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <ProtectedRoute>
          <MainView />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
