import React from 'react';
const DEVELOPMENT = process.env.NODE_ENV === 'development';

const PasswordRetrival = () => {
  return (
    <div>
      { DEVELOPMENT && <Navbar /> }
      <main>
      Register
      </main>
    </div>
  );
}
 
export default PasswordRetrival;