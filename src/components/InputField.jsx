// src/components/InputField.jsx
import React from 'react';
import './InputField.css';

const InputField = ({ label, id, type = 'text', value, onChange, required, placeholder, error, className = '' }) => {
  return (
    <div className={`input-field-group ${className}`}>
      <label htmlFor={id} className="input-label">
        {label} {required && <span className="required-asterisk">*</span>}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className={`input-field ${error ? 'input-error' : ''}`}
      />
      {error && <p className="input-error-message">{error}</p>}
    </div>
  );
};

export default InputField;