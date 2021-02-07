import React from 'react';
import { Link } from 'react-router-dom';

const DEVELOPMENT = process.env.NODE_ENV === 'development';

const Navbar = () => {
  const NavLinks = () => {
    let navLandinglinks = [];
    if (DEVELOPMENT) {
      navLandinglinks = [
        { link: '/', name: 'Home' },
        { link: '/registration', name: 'Registration' },
        { link: '/accountRetrival', name: 'Account Retrival' },
      ];
    } else navLandinglinks = [];

    return (
      <nav>
        <span className="filler" />
        <span className="filler" />
        <span className="filler" />
        {
          navLandinglinks.map((element) => (
            <Link to={element.link} className="nav-item" key={element.name}>
              {element.name}
            </Link>
          ))
        }
        <span className="filler" />
        <span className="filler" />
        <span className="filler" />
        <Link to="/login" className="login-button">
          Login
        </Link>
      </nav>
    );
  };

  return (
    <header className="navbar">
      <a href="/">IT Ticketing Systems Inc.</a>
      <NavLinks />
    </header>
  );
};

export default Navbar;
