import React, {Fragment} from 'react';
const DEVELOPMENT = process.env.NODE_ENV === 'development';

const NotFound = () => {
  return (
    <Fragment>
      <h1>404</h1>
      <h1>NOT FOUND</h1>
    </Fragment>
  );
}
 
export default NotFound;