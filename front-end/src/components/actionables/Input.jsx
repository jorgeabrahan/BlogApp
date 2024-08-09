import React from 'react';

export const Input = ({ type = 'text', id = '', label = '', ...props }) => {
  return (
    <div className="input-wrapper">
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} name={id} {...props} />
    </div>
  );
}
