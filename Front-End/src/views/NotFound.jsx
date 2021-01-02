import React from 'react';
const DEVELOPMENT = process.env.NODE_ENV === 'development';

const NotFound = () => {
  return (
    <div>
      { DEVELOPMENT && <Navbar /> }
      <main>
        404 NOT FOUND
      </main>
    </div>
  );
}
 
export default NotFound;