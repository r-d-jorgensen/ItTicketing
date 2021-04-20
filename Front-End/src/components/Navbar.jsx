import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../services/auth';

import styles from './Navbar.css';
import appStyles from '../App.css';

const DEVELOPMENT = process.env.NODE_ENV === 'development';

const Navbar = () => {
  const auth = useAuth();
  const NavLinks = () => {
    let navLandinglinks = DEVELOPMENT ? [
      { link: '/', name: 'Home' },
      { link: '/registration', name: 'Registration' },
      { link: '/accountRetrival', name: 'Account Retrival' },
    ] : [];

    if (auth.user && auth.user.user_type === 'customer') {
      navLandinglinks = [
        { link: '/dashboard', name: 'Dashboard' },
      ].concat(navLandinglinks);
    }

    return (
      <nav className={styles['navbar-links']}>
        {
          navLandinglinks.map((element) => (
            <Link
              to={element.link}
              className={styles['navbar-item']}
              key={element.name}
            >
              {element.name}
            </Link>
          ))
        }
      </nav>
    );
  };

  return (
    <header className={styles.header}>
      <div className={styles.navbar}>
        <h1 className={`${appStyles.logo} ${appStyles['logo-sm-margin']}`}>
          <Link to="/">IT Ticketing Systems Inc.</Link>
        </h1>
        <NavLinks />
        <div className={styles['navbar-actions']}>
          {
          auth.user
            ? (
              <Link
                to="/"
                onClick={auth.logout}
                className={styles['navbar-item']}
              >
                Logout
              </Link>
            )
            : (
              <Link
                to="/login"
                className={styles['navbar-item']}
              >
                Login
              </Link>
            )
          }
        </div>
      </div>
    </header>
  );
};

export default Navbar;
