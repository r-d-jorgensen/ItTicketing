import React from 'react';
import Navbar from 'components/Navbar';
import './NotFound.css';

function NotFound() {
  return (
    <>
      <Navbar />
      <main id="not-found-page">
        <h1>404</h1>
        <h1>NOT FOUND</h1>
      </main>
    </>
  );
}

export default NotFound;
