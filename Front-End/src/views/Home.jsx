import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';

function Home() {
  const history = useHistory();
  const handleLoginLink = () => history.push('/login');

  return (
    <Fragment>
      <button type="button" onClick={handleLoginLink}>Login</button>
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
    </Fragment>
  );
}

export default Home;
