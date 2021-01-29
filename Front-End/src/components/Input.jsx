import React from 'react';
import InputMask  from 'react-input-mask';

const Input = ({label, name, error, ...rest}) => {
  return (
    <div>
      {label ? <label>{name}</label> : null}
      <InputMask
        id={name}
        placeholder={name}
        {...rest}
      />
      {error && <div className='alert alert-danger'>{error}</div>}
    </div> 
  );
}

export default Input;