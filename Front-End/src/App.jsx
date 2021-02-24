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
import './App.css';

const Home = loadable(() => import('views/Landing/Home'));
const Login = loadable(() => import('views/Landing/Login'));
const Registration = loadable(() => import('views/Landing/Registration'));
const AccountRetrival = loadable(() => import('views/Landing/AccountRetrival'));
const NotFound = loadable(() => import('views/NotFound'));
const CustomerDashboard = loadable(() => import('views/Customer/CustomerDashboard'));
const EmployeeDashboard = loadable(() => import('views/Employee/EmployeeDashboard'));

export const AuthContext = React.createContext();

const initialAuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      // delete localStorage set here once api calls are in place
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case 'LOGOUT':
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialAuthState);
  return (
    <BrowserRouter>
      <AuthContext.Provider
        value={{
          state,
          dispatch,
        }}
      >
        <Switch>
          <Route path="/customer/dashboard" component={CustomerDashboard} />
          <Route path="/employee/dashboard" component={EmployeeDashboard} />
          <Route path="/accountRetrival" component={AccountRetrival} />
          <Route path="/registration" component={Registration} />
          <Route path="/login" component={Login} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/" exact component={Home} />
          <Redirect to="/not-found" />
        </Switch>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);