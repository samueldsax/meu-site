// src/components/TextAreaField.jsx
import React from 'react';
import './InputField.css'; // Reusing styles from InputField

const TextAreaField = ({ label, id, value, onChange, required, placeholder, error, className = '' }) => {
  return (
    <div className={`input-field-group ${className}`}>
      <label htmlFor={id} className="input-label">
        {label} {required && <span className="required-asterisk">*</span>}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        rows="4"
        className={`input-field ${error ? 'input-error' : ''}`}
      ></textarea>
      {error && <p className="input-error-message">{error}</p>}
    </div>
  );
};

export default TextAreaField;