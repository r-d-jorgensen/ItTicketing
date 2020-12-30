import React from 'react';
import NavLink from 'react-router-dom';
import loadable from '@loadable/component';

const Navbar = loadable(() => import('components/Navbar'));

function TicketHome() {
  return (
    <div>
      <TicketNav />
      <NavLink to='/login'>Login</NavLink>
      <main>
        <div>
          <h3>About Us</h3>
          <p>words about the company</p>
        </div>
        <div>
          <div>
            <h3>How To Sign Up!</h3>
            <p>words about how to sign up to our service</p>
          </div>
          <div>
            <h3>Contact Us</h3>
            <p>contact information</p>
          </div>          
        </div>
      </main>
    </div>
  );
}

export { TicketHome as default };
