import React, { Fragment } from 'react';
import Navbar from 'components/Navbar';
import styles from './AccountRetrival.css';

function AccountRetrival() {
  return (
    <Fragment>
      <Navbar />
      <main className={styles['account-retrival-page']}>
        <div>
          <h3>If Lost Password</h3>
          <p>
            words about how to recover the username words about how to recover the username
            words about how to recover the username words about how to recover the username
            words about how to recover the username words about how to recover the username
            words about how to recover the username words about how to recover the username
            <br />
            <br />
            words about how to recover the username words about how to recover the username
            words about how to recover the username words about how to recover the username
            words about how to recover the username words about how to recover the username
            words about how to recover the username words about how to recover the username
            words about how to recover the username words about how to recover the username
          </p>
        </div>
        <div>
          <h3>If Lost Username</h3>
          <p>
            words about how to recover the username words about how to recover the username
            words about how to recover the username words about how to recover the username
            words about how to recover the username words about how to recover the username
            words about how to recover the username words about how to recover the username
            <br />
            <br />
            words about how to recover the username words about how to recover the username
            words about how to recover the username words about how to recover the username
            words about how to recover the username words about how to recover the username
            words about how to recover the username words about how to recover the username
          </p>
        </div>
      </main>
    </Fragment>
  );
}

export default AccountRetrival;
