import React from 'react';
const DEVELOPMENT = process.env.NODE_ENV === 'development';

const PasswordRetrival = () => {
  return (
    <div>
      { DEVELOPMENT && <Navbar /> }
      <main>
        Password Retival
      </main>
    </div>
  );
}
 
export default PasswordRetrival;