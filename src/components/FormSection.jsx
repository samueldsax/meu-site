// src/components/FormSection.jsx
import React from 'react';
import './FormSection.css';
import Button from './Button';

const FormSection = ({ title, description, children, onAddItem, buttonText }) => {
  return (
    <div className="form-section">
      <h3 className="section-title">{title}</h3>
      {description && <p className="section-description">{description}</p>}
      <div className="section-content">
        {children}
      </div>
      {onAddItem && (
        <Button onClick={onAddItem} variant="secondary" className="add-item-button">
          {buttonText || `Adicionar ${title.slice(0, -1)}`}
        </Button>
      )}
    </div>
  );
};

export default FormSection;