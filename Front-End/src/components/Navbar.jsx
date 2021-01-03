import React from 'react';
import { Link } from 'react-router-dom';

const DEVELOPMENT = process.env.NODE_ENV === 'development';

const NavLinks = () => {
  if (!DEVELOPMENT) {
    return (
      <nav>
        <ul>
          <li>
            <Link to="/">
              Home
            </Link>
          </li>
          <li>
            <Link to="/login">
              Login
            </Link>
          </li>
          <li>
            <Link to="/registration">
              Registration
            </Link>
          </li>
          <li>
            <Link to="/accountRetrival">
              Account Retrival
            </Link>
          </li>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav>
        <ul>
          <li>
            <Link to="/">
              Home
            </Link>
          </li>
          <li>
            <Link to="/login">
              Login
            </Link>
          </li>
          <li>
            <Link to="/registration">
              Registration
            </Link>
          </li>
          <li>
            <Link to="/accountRetrival">
              Account Retrival
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
};

const Navbar = () => (
  <header>
    <h1>It Ticketing Systems Inc.</h1>
    <NavLinks />
  </header>
);

export default Navbar;
