import React from 'react';
import InputMask  from 'react-input-mask';

const Input = ({name, value, mask, maskChar, onChange, error}) => {
  return (
    <div>
      <label>{name}</label>
      <InputMask
        id={name}
        value={value}
        mask={mask}
        maskChar={maskChar}
        placeholder="Username"
        onChange={onChange}
      />
      {error && <div className='alert alert-danger'>{error}</div>}
    </div> 
  );
}

export default Input;