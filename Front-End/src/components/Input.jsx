import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';
import './Input.css';

const Input = ({
  name,
  error,
  ...rest
}) => (
  <Fragment>
    <InputMask
      className="input"
      name={name}
      {...rest}
    />
    {
      error
        ? <div className="input-error">{error}</div>
        : null
    }
  </Fragment>
);

Input.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
};

Input.defaultProps = {
  error: null,
};

export default Input;
