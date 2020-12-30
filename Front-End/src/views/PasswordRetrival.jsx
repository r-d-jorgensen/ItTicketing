import React from 'react';
import loadable from '@loadable/component';

const DEVELOPMENT = process.env.NODE_ENV === 'development';
const Navbar = loadable(() => import('components/Navbar'));

const PasswordRetrival = () => {
  return (
    <div>
      { DEVELOPMENT && <Navbar /> }
      <main>
        passwordRetival
      </main>
    </div>
  );
}
 
export default PasswordRetrival;