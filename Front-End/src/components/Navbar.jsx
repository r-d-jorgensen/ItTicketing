import React from 'react';
import { Link } from 'react-router-dom';

const DEVELOPMENT = process.env.NODE_ENV === 'development';

const NavLinks = () => {
  if (!DEVELOPMENT) {
    const navLandinglinks = [
      {link: "/login", name: "Login"},
    ];
    return (
        <nav>
          {navLandinglinks.map(element => 
            <Link to={element.link} className="nav-item" key={element.name}>
              {element.name}
            </Link>
          )}
        </nav>
    );
  } else {
    const navLandinglinks = [
      {link: "/", name: "Home"},
      {link: "/login", name: "Login"},
      {link: "/registration", name: "Registration"},
      {link: "/accountRetrival", name: "Account Retrival"},
    ];
    return (
        <ul>
          {navLandinglinks.map(element => 
            <li key={element.name}>
              <Link to={element.link}>
                {element.name}
              </Link>
            </li>
          )}
        </ul>
    );
  }
};

const Navbar = () => (
  <header className="navbar">
    <h1>It Ticketing Systems Inc.</h1>
    <NavLinks />
  </header>
);

export default Navbar;
