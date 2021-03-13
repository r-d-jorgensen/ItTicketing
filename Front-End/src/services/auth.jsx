import React, { createContext, useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
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

  const req = new Request('/api/auth', reqOpts);
  const resp = await fetch(req);
  if (resp.ok) {
    const { data } = await resp.json();
    return data;
  }

  // TODO: better error message
  throw new Error(resp.statusText);
}

function useProviderAuth() {
  const history = useHistory();
  const location = useLocation();
  const from = (location.state && location.state.from) || { pathname: '/dashboard' };

  const [providerAuth, setProviderAuth] = useState({
    state: 'unauthorized',
    user: null,
    errorMsg: '',
  });

  return {
    state: providerAuth.state,
    message: providerAuth.errorMsg,
    user: providerAuth.user,

    async login(username, password) {
      setProviderAuth((oldState) => ({
        ...oldState,
        state: 'loading',
      }));
      try {
        // TODO: create storage module to store token
        const { token, user } = await authLogin(username, password);
        setProviderAuth({
          state: 'authorized',
          user,
          errorMsg: '',
        });

        history.replace(from);
      } catch (e) {
        setProviderAuth({
          state: 'unauthorized',
          user: null,
          errorMsg: e.message,
        });
      }
    },

    logout() {
      setProviderAuth({
        state: 'unauthorized',
        user: null,
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
