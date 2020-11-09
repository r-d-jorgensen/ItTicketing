import React, { } from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ children, ...rest }) {
  const auth = false;
  const render = ({ location }) => {
    if (!auth) {
      const to = {
        pathname: '/login',
        state: { from: location },
      };
      return <Redirect to={to} />;
    }
    return children;
  };

  return <Route {...rest} render={render} />;
}

export { ProtectedRoute as default };
