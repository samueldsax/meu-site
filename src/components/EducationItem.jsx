// src/components/EducationItem.jsx
import React from 'react';
import InputField from './InputField';
import Button from './Button';
import './ItemStyles.css'; // Shared styles for items

const EducationItem = ({ index, education, handleChange, handleRemove, errors }) => {
  if (!education) {
    console.warn("EducationItem recebeu uma prop 'education' indefinida.");
    return null;
  }
  const itemErrors = errors || {};

  return (
    <div className="item-card">
      <div className="item-header">
        <h4 className="item-title">Formação {index + 1}</h4>
        {/* Agora o handleRemove usa o ID único do item */}
        <Button onClick={() => handleRemove(education.id)} variant="danger" className="remove-item-button">
          Remover
        </Button>
      </div>
      <InputField
        label="Curso"
        id={`education-course-${education.id}`} // Use o ID para o ID do input também
        value={education.course}
        onChange={(e) => handleChange('education', education.id, 'course', e.target.value)} // Passa o ID
        placeholder="Ensino Médio Completo, Bacharelado em Administração, Pós-Graduação em Marketing"
        error={itemErrors.course}
      />
      <InputField
        label="Instituição"
        id={`education-institution-${education.id}`}
        value={education.institution}
        onChange={(e) => handleChange('education', education.id, 'institution', e.target.value)}
        placeholder="Nome da Escola ou Universidade"
        error={itemErrors.institution}
      />
      <InputField
        label="Ano de Conclusão"
        id={`education-year-${education.id}`}
        value={education.year}
        onChange={(e) => handleChange('education', education.id, 'year', e.target.value)}
        placeholder="2019"
        error={itemErrors.year}
      />
    </div>
  );
};

export default EducationItem;