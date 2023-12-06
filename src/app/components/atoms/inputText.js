// components/atoms/InputText.js
import React from 'react';
import Form from 'react-bootstrap/Form';

function InputText({ label, type, placeholder, value, onChange }) {
  return (
    <div>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

export default InputText;
