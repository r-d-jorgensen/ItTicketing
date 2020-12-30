import React from 'react';
import ReactDOM from 'react-dom';
import InputMask  from 'react-input-mask'
import loadable from '@loadable/component';

const DEVELOPMENT = process.env.NODE_ENV === 'development';
const Navbar = loadable(() => import('components/Navbar'));

const PasswordRetrival = () => {
  return (
    <div>
      { DEVELOPMENT && <Navbar /> }
      <main>
        
      </main>
    </div>
  );
}
 
export default PasswordRetrival;