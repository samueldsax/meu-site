// src/components/ExperienceItem.jsx
import React from 'react';
import InputField from './InputField';
import TextAreaField from './TextAreaField';
import Button from './Button';
import './ItemStyles.css'; // Shared styles for items

const ExperienceItem = ({ index, experience, handleChange, handleRemove, errors }) => {
  if (!experience) {
    console.warn("ExperienceItem recebeu uma prop 'experience' indefinida.");
    return null;
  }
  const itemErrors = errors || {};

  return (
    <div className="item-card">
      <div className="item-header">
        <h4 className="item-title">Experiência {index + 1}</h4>
        {/* Agora o handleRemove usa o ID único do item */}
        <Button onClick={() => handleRemove(experience.id)} variant="danger" className="remove-item-button">
          Remover
        </Button>
      </div>
      <InputField
        label="Cargo"
        id={`experience-title-${experience.id}`} // Use o ID para o ID do input também
        value={experience.title}
        onChange={(e) => handleChange('experiences', experience.id, 'title', e.target.value)} // Passa o ID
        placeholder="Atendente, Gerente de Projetos, Coordenador de Marketing, Auxiliar Administrativo"
        error={itemErrors.title}
      />
      <InputField
        label="Empresa"
        id={`experience-company-${experience.id}`}
        value={experience.company}
        onChange={(e) => handleChange('experiences', experience.id, 'company', e.target.value)}
        placeholder="Empresa XYZ"
        error={itemErrors.company}
      />
      <InputField
        label="Período"
        id={`experience-period-${experience.id}`}
        value={experience.period}
        onChange={(e) => handleChange('experiences', experience.id, 'period', e.target.value)}
        placeholder="Jan 2020 - Dez 2022 ou Jan 2023 - Atualmente"
        error={itemErrors.period}
      />
      <TextAreaField
        label="Descrição"
        id={`experience-description-${experience.id}`}
        value={experience.description}
        onChange={(e) => handleChange('experiences', experience.id, 'description', e.target.value)}
        placeholder="Responsável por [atividade], resultando em [melhoria/conquista]. Atendimento a clientes, gestão de equipe, organização de documentos."
      />
    </div>
  );
};

export default ExperienceItem;