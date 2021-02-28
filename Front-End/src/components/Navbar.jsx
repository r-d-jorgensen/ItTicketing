import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth';

import './Navbar.css';

const DEVELOPMENT = process.env.NODE_ENV === 'development';

const Navbar = () => {
  const auth = useAuth();
  const NavLinks = () => {
    const navLandinglinks = DEVELOPMENT ? [
      { link: '/', name: 'Home' },
      { link: '/registration', name: 'Registration' },
      { link: '/accountRetrival', name: 'Account Retrival' },
    ] : [];

    return (
      <nav className="navbar-links">
        {
          navLandinglinks.map((element) => (
            <Link to={element.link} className="navbar-item" key={element.name}>
              {element.name}
            </Link>
          ))
        }
      </nav>
    );
  };

  return (
    <header className="header">
      <div className="navbar">
        <h1 className="logo logo-sm-margin">
          <Link to="/">IT Ticketing Systems Inc.</Link>
        </h1>
        <NavLinks />
        <div className="navbar-actions">
          {
          auth.user
            ? (
              <Link to="/" onClick={auth.logout} className="navbar-item">
                Logout
              </Link>
            )
            : (
              <Link to="/login" className="navbar-item">
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
