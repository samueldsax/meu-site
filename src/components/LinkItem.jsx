// src/components/LinkItem.jsx
import React from 'react';
import InputField from './InputField';
import Button from './Button';
import './ItemStyles.css'; // Shared styles for items

const LinkItem = ({ index, link, handleChange, handleRemove, errors }) => {
  if (!link) {
    console.warn("LinkItem recebeu uma prop 'link' indefinida.");
    return null;
  }
  const itemErrors = errors || {};

  return (
    <div className="item-card">
      <div className="item-header">
        <h4 className="item-title">Link {index + 1}</h4>
        {/* Agora o handleRemove usa o ID único do item */}
        <Button onClick={() => handleRemove(link.id)} variant="danger" className="remove-item-button">
          Remover
        </Button>
      </div>
      <InputField
        label="Nome"
        id={`link-name-${link.id}`} // Use o ID para o ID do input também
        value={link.name}
        onChange={(e) => handleChange('links', link.id, 'name', e.target.value)} // Passa o ID
        placeholder="LinkedIn, Portfólio Online, Blog Profissional, Lattes"
        error={itemErrors.name}
      />
      <InputField
        label="URL"
        id={`link-url-${link.id}`}
        value={link.url}
        onChange={(e) => handleChange('links', link.id, 'url', e.target.value)}
        placeholder="https://www.seusite.com.br"
        error={itemErrors.url}
      />
    </div>
  );
};

export default LinkItem;