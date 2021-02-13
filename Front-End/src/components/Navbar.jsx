import React from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../App';

import './Navbar.css';

const DEVELOPMENT = process.env.NODE_ENV === 'development';

const Navbar = ({isLogedIn}) => {
  const { dispatch } = React.useContext(AuthContext);
  const NavLinks = () => {
    const navLandinglinks = DEVELOPMENT ? [
      { link: '/', name: 'Home' },
      { link: '/registration', name: 'Registration' },
      { link: '/accountRetrival', name: 'Account Retrival' },
    ] : [];

    return (
      <nav className="nav-links">
        {
          navLandinglinks.map((element) => (
            <Link to={element.link} className="nav-item" key={element.name}>
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
        <h1 className="logo">
          <Link to="/">IT Ticketing Systems Inc.</Link>
        </h1>
        <NavLinks />
        <div className="user-actions">
          {
          isLogedIn
            ? (
              <Link to="/" onClick={() => dispatch({ type: 'LOGOUT' })} className="nav-item">
                Logout
              </Link>
            )
            : (
              <Link to="/login" className="nav-item">
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
