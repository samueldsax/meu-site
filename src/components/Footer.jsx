// src/components/Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} ResumeCraft. Todos os direitos reservados a Xirvo.</p>
      </div>
    </footer>
  );
};

export default Footer;