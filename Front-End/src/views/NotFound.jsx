import React, { Fragment } from 'react';
import Navbar from 'components/Navbar';
import './NotFound.css';

function NotFound() {
  return (
    <Fragment>
      <Navbar />
      <main className="not-found-page">
        <h1>404</h1>
        <h1>NOT FOUND</h1>
      </main>
    </Fragment>
  );
}

export default NotFound;
