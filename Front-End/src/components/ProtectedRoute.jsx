import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { useAuth } from '../services/auth';

// eslint-disable-next-line react/prop-types
function ProtectedRoute({ component: Component, ...routeProps }) {
  const auth = useAuth();
  return (
    <Route
      {...routeProps}
      render={({ location, ...compProps }) => {
        if (auth.user && auth.state === 'authorized') {
          // eslint-disable-next-line react/jsx-props-no-spreading
          return <Component {...compProps} />;
        }
        return (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
}

export default ProtectedRoute;
