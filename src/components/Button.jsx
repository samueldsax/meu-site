// src/components/Button.jsx
import React from 'react';
import './Button.css';

const Button = ({ children, onClick, variant = 'primary', type = 'button', className = '' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`button ${variant} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;