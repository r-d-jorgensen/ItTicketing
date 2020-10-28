import React from 'react';
import { Link } from 'react-router-dom';

const DEVELOPMENT = process.env.NODE_ENV === 'development';

const DevNavLinks = () => {
  if (!DEVELOPMENT) {
    return null;
  }

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
      </ul>
    </nav>
  );
};

const TicketNav = () => (
  <header>
    <div>
      <div>It Ticketing Systems Inc.</div>
    </div>
    <DevNavLinks />
  </header>
);

export { TicketNav as default };
