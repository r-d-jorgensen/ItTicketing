import React from 'react';
import InputMask from 'react-input-mask';

const Input = ({
  label,
  name,
  error,
  ...rest
}) => (
  <div>
    {label ? <label>{name}</label> : null}
    <InputMask
      name={name}
      placeholder={name}
      {...rest}
    />
    <div className="error">{error}</div>
  </div>
);

export default Input;