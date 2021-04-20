import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';
import styles from './Input.css';

const Input = ({
  name,
  error,
  ...rest
}) => (
  <Fragment>
    <InputMask
      className={styles.input}
      name={name}
      {...rest}
    />
    {
      error
        ? <div className={styles['input-error']}>{error}</div>
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
