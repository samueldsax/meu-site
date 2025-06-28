// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <header className="header">
      <div className="container">
        <h1 className="header-title">ResumeCraft</h1>
        <button className="theme-toggle-button" onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Modo Escuro' : '☀️ Modo Claro'}
        </button>
      </div>
    </header>
  );
};

export default Header;