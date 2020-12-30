import React from 'react';
import InputMask  from 'react-input-mask';

const Input = ({name, error, ...rest}) => {
  return (
    <div>
      <label htmlFor={name}>{name}</label>
      <InputMask
        {...rest}
        id={name}
        placeholder="Username"
      />
      {error && <div className='alert alert-danger'>{error}</div>}
    </div> 
  );
}

export default Input;