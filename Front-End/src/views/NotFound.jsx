import React, { Fragment } from 'react';
import Navbar from 'components/Navbar';
import styles from './NotFound.css';

function NotFound() {
  return (
    <Fragment>
      <Navbar />
      <main className={styles['not-found-page']}>
        <h1>404</h1>
        <h1>NOT FOUND</h1>
      </main>
    </Fragment>
  );
}

export default NotFound;
