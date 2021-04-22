import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import Button from 'components/Button';
import Input from 'components/Input';

import appStyles from '../../App.css';
import styles from './AccountRetrival.css';

function AccountRetrival() {
  const submit = (type) => {
    if (type === 'password') {
      // send reset email link
    } else if (type === 'username') {
      // send username
    }
  };

  return (
    <Fragment>
      <header>
        <h1 className={appStyles.logo}>
          <Link to="/">IT Ticketing Systems Inc.</Link>
        </h1>
      </header>
      <main className={styles['account-retrieval-page']}>
        <div className={styles['account-container']}>
          <h2>Forgot Your Password or Username?</h2>
          <form className={styles.form}>
            <label htmlFor="emailInput">Email</label>
            <Input
              id="emailInput"
              name="Email"
            />
            <div className={styles.group}>
              <Button
                type="submit"
                onClick={() => { submit('password'); }}
              >
                Forgot Password
              </Button>
              <Button
                type="submit"
                onClick={() => { submit('username'); }}
              >
                Forgot Username
              </Button>
            </div>
          </form>
        </div>
      </main>
    </Fragment>
  );
}

export default AccountRetrival;
