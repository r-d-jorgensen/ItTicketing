import React, {Fragment, useState} from 'react';
import { useHistory } from 'react-router-dom';
import loadable from '@loadable/component';

const Navbar = loadable(() => import('components/Navbar'));
const Input = loadable(() => import('components/Input'));

const Registration = () => {
  return (
    <Fragment>
      Registration
    </Fragment>
  );
}
 
export default Registration;