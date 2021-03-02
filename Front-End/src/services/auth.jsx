import React, { createContext, useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const context = createContext();

// TODO: remove. used for fake network delay
function randomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

async function authLogin(username, password) {
  // make call to server, needs api endpoint to test functionality
  /*
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
    t
    const user = await fetch(`API-ENDPOINT`, requestOptions)

  */

  // fake network delay
  await new Promise((resolve) => {
    setTimeout(resolve, randomInt(500) + 32);
  });

  // TODO: replace with API POST.
  if (username === 'bob' && password === '123') {
    return {
      user: {
        username: 'bob',
        type: 'employee',
      },
    };
  // eslint-disable-next-line no-else-return
  } else if (username === 'steve' && password === '123') {
    return {
      user: {
        username: 'steve',
        type: 'customer',
      },
    };
  }

  throw new Error('Username or password is invalid');
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
        const resp = await authLogin(username, password);
        setProviderAuth({
          state: 'authorized',
          user: resp.user,
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
