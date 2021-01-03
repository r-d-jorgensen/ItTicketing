import React, {Fragment} from 'react';
const DEVELOPMENT = process.env.NODE_ENV === 'development';

const NotFound = () => {
  return (
    <Fragment>
      404 NOT FOUND
    </Fragment>
  );
}
 
export default NotFound;