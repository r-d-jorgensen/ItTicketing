import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'components/Navbar';

import styles from './Home.css';

function Home() {
  return (
    <Fragment>
      <Navbar />
      <main className={styles.home}>
        <div className={styles.content}>
          <p className={styles.intro}>
            A
            <span className={styles.emphasis}> simpler </span>
            ticketing
            <br />
            software experience
          </p>
          <p className={styles.subtitle}>
            It Ticketing solutions strives to provide a more fluid experience
            as a simpler solution to ticketing problems.
          </p>
          <div className={styles.actions}>
            <Link
              className={styles.link}
              to="/login"
            >
              Log In
            </Link>
            &nbsp;or&nbsp;
            <Link
              className={styles.link}
              to="/registration"
            >
              Sign Up
            </Link>
          </div>
          <hr />
          <h2 className={styles['home-title']}>Contact</h2>
          <form className={styles.body}>
            <label
              className={styles.label}
              htmlFor="homeFrom"
            >
              From
            </label>
            <input
              id="homeFrom"
              name="from"
              className={styles['home-from']}
            />
            <label
              className={styles.label}
              htmlFor="homeContact"
            >
              Message
            </label>
            <textarea
              id="homeContact"
              name="message"
              className={styles['home-contact']}
            />
            <button
              className={styles.submit}
              type="submit"
            >
              Send Message
            </button>
          </form>
        </div>
      </main>
    </Fragment>
  );
}

export default Home;
