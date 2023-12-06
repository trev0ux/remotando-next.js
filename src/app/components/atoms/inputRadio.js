// components/atoms/CheckboxAtom.js
import React from 'react';
import Form from 'react-bootstrap/Form';

function InputRadio({ type, label, onChange, value, id, name, ariaLabel }) {
  return (
    <Form.Check
      type={type}
      label={label}
      onChange={onChange}
      value={value}
      id={id}
      name={name}
      aria-label={ariaLabel}
    />
  );
}

export default InputRadio;
