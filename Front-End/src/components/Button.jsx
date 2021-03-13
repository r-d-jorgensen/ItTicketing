import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

function Button({ disabled = false, children, ...rest }) {
  // TODO: add better props

  /* eslint-disable react/button-has-type, react/jsx-props-no-spreading */
  return (
    <div className={'it-btn-cntnr'.concat([disabled ? ' it-btn-cntnr-disabled' : ''])}>
      <button
        disabled={disabled}
        className="it-btn"
        {...rest}
      >
        {children}
      </button>
    </div>
  );
}

Button.propTypes = {
  disabled: PropTypes.bool,
  children: PropTypes.string.isRequired,
};

Button.defaultProps = {
  disabled: false,
};

export default Button;
