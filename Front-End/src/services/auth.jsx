import React, { createContext, useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import request from './api';
import PropTypes from 'prop-types';

const context = createContext();

async function authLogin(username, password) {
  const headers = new Headers();
  headers.set('Content-Type', 'application/json');

  const reqOpts = {
    headers,
    method: 'POST',
    body: JSON.stringify({ username, password }),
  };

  return request('/api/auth', reqOpts);
}

function useProviderAuth() {
  const history = useHistory();
  const location = useLocation();
  const from = (location.state && location.state.from) || { pathname: '/dashboard' };

  const [providerAuth, setProviderAuth] = useState({
    state: 'unauthorized',
    user: null,
    token: null,
    errorMsg: '',
  });

  return {
    state: providerAuth.state,
    message: providerAuth.errorMsg,
    user: providerAuth.user,
    token: providerAuth.token,

    async login(username, password) {
      setProviderAuth((oldState) => ({
        ...oldState,
        state: 'loading',
      }));
      try {
        // TODO: create storage module to store token
        const { success, data } = await authLogin(username, password);
        const { token, user } = data;
        setProviderAuth({
          state: 'authorized',
          user,
          token: token,
          errorMsg: '',
        });

        history.replace(from);
      } catch (e) {
        setProviderAuth({
          state: 'unauthorized',
          user: null,
          token: null,
          errorMsg: e.message,
        });
      }
    },

    logout() {
      setProviderAuth({
        state: 'unauthorized',
        user: null,
        token: null,
        errorMsg: '',
      });
    },
  };
}

function AuthProvider({ children }) {
  const auth = useProviderAuth();
  return (
    <context.Provider value={auth}>
      {children}
    </context.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function useAuth() {
  return useContext(context);
}

export {
  AuthProvider,
  useAuth,
};
