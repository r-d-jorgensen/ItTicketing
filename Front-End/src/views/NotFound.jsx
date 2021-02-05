import React, { Fragment } from 'react';

const DEVELOPMENT = process.env.NODE_ENV === 'development';
import './NotFound.css';

const NotFound = () => {
  return (
    <main id="not-found-page">
      <h1>404</h1>
      <h1>NOT FOUND</h1>
    </main>
  );
}

export default NotFound;
