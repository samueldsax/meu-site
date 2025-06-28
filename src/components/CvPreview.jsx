// src/components/CvPreview.jsx
import React from 'react';
import './CvPreview.css';

const CvPreview = React.forwardRef(({ cvData }, ref) => {
  const {
    fullName,
    profession,
    professionalSummary,
    email,
    phone,
    cityState,
    experiences,
    education,
    links,
    skills, 
  } = cvData;

  const formatSkillTitle = (key) => {
    switch (key) {
      case 'languages': return 'Idiomas';
      case 'tools': return 'Ferramentas';
      case 'technicalSkills': return 'Competências Técnicas';
      case 'softSkills': return 'Competências Comportamentais';
      case 'otherSkills': return 'Outras Habilidades';
      default: return '';
    }
  };

  const hasSkills = Object.values(skills).some(skill => skill && skill.trim() !== '');

  return (
    <div className="cv-preview" id="cv-preview-content" ref={ref}>
      <div className="cv-header-section">
        <h1 className="cv-full-name">{fullName}</h1>
        <h2 className="cv-profession">{profession}</h2>
        <div className="cv-contact-info">
          {email && <p>{email}</p>}
          {phone && <p>{phone}</p>}
          {cityState && <p>{cityState}</p>}
        </div>
      </div>

      {professionalSummary && (
        <div className="cv-section">
          <h3 className="cv-section-title">Resumo Profissional</h3>
          <p className="cv-summary-text">{professionalSummary}</p>
        </div>
      )}

      {experiences.length > 0 && (
        <div className="cv-section">
          <h3 className="cv-section-title">Experiência Profissional</h3>
          {experiences.map((exp, index) => (
            <div key={index} className="cv-experience-item">
              <p><strong className="cv-label-text">Cargo:</strong></p>
              <p className="cv-value-text">{exp.title}</p>
              <p><strong className="cv-label-text">Empresa:</strong></p>
              <p className="cv-value-text">{exp.company}</p>
              <p><strong className="cv-label-text">Período:</strong></p>
              <p className="cv-value-text">{exp.period}</p>
              {exp.description && (
                <>
                  <p><strong className="cv-label-text">Descrição:</strong></p>
                  <p className="cv-value-text">{exp.description}</p>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {education.length > 0 && (
        <div className="cv-section">
          <h3 className="cv-section-title">Formação Acadêmica</h3>
          {education.map((edu, index) => (
            <div key={index} className="cv-education-item">
              <p><strong className="cv-label-text">Curso:</strong></p>
              <p className="cv-value-text">{edu.course}</p>
              <p><strong className="cv-label-text">Instituição:</strong></p>
              <p className="cv-value-text">{edu.institution}</p>
              <p><strong className="cv-label-text">Ano de Conclusão:</strong></p>
              <p className="cv-value-text">{edu.year}</p>
            </div>
          ))}
        </div>
      )}

      
      {hasSkills && (
        <div className="cv-section">
          <h3 className="cv-section-title">Habilidades</h3>
          {Object.keys(skills).map(key => (
            skills[key] && skills[key].trim() !== '' && ( 
              <div key={key} className="cv-skill-item">
                <p><strong className="cv-label-text">{formatSkillTitle(key)}:</strong></p>
                <p className="cv-value-text">{skills[key]}</p>
              </div>
            )
          ))}
        </div>
      )}

      {links.length > 0 && (
        <div className="cv-section">
          <h3 className="cv-section-title">Links</h3>
          <ul className="cv-links-list">
            {links.map((link, index) => (
              <li key={index}>
                <p><strong className="cv-label-text">Nome:</strong></p>
                <p className="cv-value-text">
                  <a href={link.url} target="_blank" rel="noopener noreferrer">{link.name}</a>
                </p>
                <p><strong className="cv-label-text">URL:</strong></p>
                <p className="cv-value-text">
                  <a href={link.url} target="_blank" rel="noopener noreferrer">{link.url}</a>
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default CvPreview;