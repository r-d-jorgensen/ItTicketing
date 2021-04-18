import React, { createContext, useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import JWTDecode from 'jwt-decode';

import PropTypes from 'prop-types';

import request from './api';
import useStorage from './useStorage';

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
  const [storedSessionToken, setStoredSessionToken] = useStorage('itticketing:token', 'session');
  const history = useHistory();
  const location = useLocation();
  const from = (location.state && location.state.from) || { pathname: '/dashboard' };

  let user = null;
  try {
    user = JWTDecode(storedSessionToken);
  } catch (_) {
    //
  }

  const [providerAuth, setProviderAuth] = useState({
    state: user ? 'authorized' : 'unauthorized',
    user,
    errorMsg: '',
    token: storedSessionToken,
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
        const { data } = await authLogin(username, password);
        const { token, user: respUser } = data;
        setStoredSessionToken(token);
        setProviderAuth({
          state: 'authorized',
          user: respUser,
          token,
          errorMsg: '',
        });

        history.replace(from);
      } catch (e) {
        setStoredSessionToken(null);
        setProviderAuth({
          state: 'unauthorized',
          user: null,
          token: null,
          errorMsg: e.message,
        });
      }
    },

    logout() {
      setStoredSessionToken(null);
      setProviderAuth({
        state: 'unauthorized',
        user: null,
        errorMsg: '',
        token: null, // token must be invalidated on server
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
