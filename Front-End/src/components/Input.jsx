import React from 'react';
import InputMask  from 'react-input-mask';

const Input = ({label, name, value, mask, maskChar, onChange, error, inputClass}) => {
  return (
    <div>
      {label ? <label>{name}</label> : null}
      <InputMask
        className={inputClass}
        id={name}
        value={value}
        mask={mask}
        maskChar={maskChar}
        placeholder={name}
        onChange={onChange}
      />
      {error && <div className='alert alert-danger'>{error}</div>}
    </div> 
  );
}

export default Input;