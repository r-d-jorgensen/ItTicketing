import React from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../App';

const DEVELOPMENT = process.env.NODE_ENV === 'development';

const Navbar = ({isLogedIn}) => {
  const { dispatch } = React.useContext(AuthContext);
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
        {isLogedIn ?
          <Link to="/" onClick={() => dispatch({type: 'LOGOUT'})} className="log-button">
            Logout
          </Link>
          :
          <Link to="/login" className="log-button">
            Login
          </Link>}
      </nav>
    );
  };

  return (
    <header className="navbar">
      <Link to="/">IT Ticketing Systems Inc.</Link>
      <NavLinks />
    </header>
  );
};

export default Navbar;
