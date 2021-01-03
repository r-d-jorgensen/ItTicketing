import React, {Fragment} from 'react';
const DEVELOPMENT = process.env.NODE_ENV === 'development';

const NotFound = () => {
  return (
    <Fragment>
      <main>
        404 NOT FOUND
      </main>
    </Fragment>
  );
}
 
export default NotFound;