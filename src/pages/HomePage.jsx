// src/pages/HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/create-cv');
  };

  return (
    <div className="homepage">
      <div className="homepage-content">
        <h1 className="homepage-title">Crie seu Currículo Perfeito em Minutos!</h1>
        <p className="homepage-subtitle">
          Gerador de currículos automático, moderno e profissional.
          Basta preencher seus dados e exportar em PDF.
        </p>
        <Button onClick={handleStart} className="start-button">
          Começar Agora
        </Button>
      </div>
    </div>
  );
};

export default HomePage;