import React from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const DEVELOPMENT = process.env.NODE_ENV === 'development';

function Navbar() {
  const history = useHistory();

  const NavLinks = () => {
    let navLandinglinks = [];
    if (!DEVELOPMENT) {
      navLandinglinks = [
        {link: "/login", name: "Login"},
      ];
    } else {
      navLandinglinks = [
        {link: "/", name: "Home"},
        {link: "/login", name: "Login"},
        {link: "/registration", name: "Registration"},
        {link: "/accountRetrival", name: "Account Retrival"},
      ];
    }
    return (
      <nav>
        <span className="filler" />
        <span className="filler" />
        <span className="filler" />
        {navLandinglinks.map(element => 
          <Link to={element.link} className="nav-item" key={element.name}>
            {element.name}
          </Link>
        )}
        <span className="filler" />
        <span className="filler" />
        <span className="filler" />
      </nav>
    );
  };

  return (
    <header className="navbar">
      <h1 onClick={() => history.push('/')}>It Ticketing Systems Inc.</h1>
      <NavLinks />
    </header>
  )
};

export default Navbar;
