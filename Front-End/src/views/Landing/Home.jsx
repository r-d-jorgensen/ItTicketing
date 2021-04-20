import React, { Fragment } from 'react';
import Navbar from 'components/Navbar';

import styles from './Home.css';
// The simpler solution to ticketing problems
function Home() {
  return (
    <Fragment>
      <Navbar />
      <main className={styles['home-page']}>
        <h2 className={styles['home-title']}>About Us</h2>
        <p className={styles['home-body']}>
          ItTicketing strives to provide a simpler and more pleasant
        </p>

        <h2 className={styles['home-title']}>Contact</h2>
        <form className={styles['home-body']}>
          <input
            className={styles['home-from']}
          />
          <textarea
            className={styles['home-contact']}
          />
        </form>
      </main>
    </Fragment>
  );
}

export default Home;
