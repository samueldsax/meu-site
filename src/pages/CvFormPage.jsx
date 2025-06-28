// src/pages/CvFormPage.jsx
import React, { useState, useRef } from 'react';
import InputField from '../components/InputField';
import TextAreaField from '../components/TextAreaField';
import FormSection from '../components/FormSection';
import ExperienceItem from '../components/ExperienceItem';
import EducationItem from '../components/EducationItem';
import LinkItem from '../components/LinkItem';
import Button from '../components/Button';
import CvPreview from '../components/CvPreview';
import { generatePdf } from '../utils/pdfGenerator';
import './CvFormPage.css';

// Para gerar IDs únicos de forma simples
let nextId = 0; // Inicializa um contador simples. Em uma aplicação maior, use uma biblioteca como uuid.

const CvFormPage = () => {
  const [cvData, setCvData] = useState({
    fullName: '',
    profession: '',
    professionalSummary: '',
    email: '',
    phone: '',
    cityState: '',
    experiences: [],
    education: [],
    links: [],
    skills: {
      languages: '',
      tools: '',
      technicalSkills: '',
      softSkills: '',
      otherSkills: '',
    },
  });

  const [errors, setErrors] = useState({});
  const cvPreviewRef = useRef(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCvData(prevData => ({ ...prevData, [id]: value }));
    if (errors[id]) {
      setErrors(prevErrors => ({ ...prevErrors, [id]: '' }));
    }
  };

  const handleSkillsChange = (e) => {
    const { id, value } = e.target;
    setCvData(prevData => ({
      ...prevData,
      skills: {
        ...prevData.skills,
        [id]: value
      }
    }));
  };

  const handleArrayChange = (section, id, field, value) => { // id agora é o ID único do item, não o index
    setCvData(prevData => {
      const newArray = prevData[section].map(item =>
        item.id === id ? { ...item, [field]: value } : item // Encontra o item pelo ID
      );
      return { ...prevData, [section]: newArray };
    });

    setErrors(prevErrors => {
      // Ajuste na lógica de erros para usar ID, se necessário no futuro
      // Por enquanto, como a validação é só de formato, não deve impactar
      return prevErrors;
    });
  };

  const handleAddItem = (section) => {
    setCvData(prevData => {
      let newItem;
      // Incrementa o contador para o próximo ID
      const newId = nextId++; 

      switch (section) {
        case 'experiences':
          newItem = { id: newId, title: '', company: '', period: '', description: '' };
          break;
        case 'education':
          newItem = { id: newId, course: '', institution: '', year: '' };
          break;
        case 'links':
          newItem = { id: newId, name: '', url: '' };
          break;
        default:
          newItem = { id: newId };
      }
      return {
        ...prevData,
        [section]: [...prevData[section], newItem]
      };
    });
  };

  const handleRemoveItem = (section, idToRemove) => { // idToRemove agora é o ID único do item
    setCvData(prevData => {
      const filteredArray = prevData[section].filter(item => item.id !== idToRemove);
      return {
        ...prevData,
        [section]: filteredArray
      };
    });

    setErrors(prevErrors => {
      // Adapte a lógica de erros para remover erros pelo ID do item, se necessário
      return prevErrors;
    });
  };

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    if (cvData.email.trim() && !/\S+@\S+\.\S+/.test(cvData.email)) {
      newErrors.email = 'E-mail inválido.';
      isValid = false;
    }

    if (cvData.links.length > 0) {
      const linkErrors = cvData.links.map(link => {
        let itemErrors = {};
        if (link.url.trim() && !/^(ftp|http|https):\/\/[^ "]+$/.test(link.url)) {
          itemErrors.url = 'URL inválida.';
        }
        return Object.keys(itemErrors).length > 0 ? itemErrors : null;
      }).filter(e => e !== null);

      if (linkErrors.length > 0) {
        newErrors.links = linkErrors;
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleGeneratePdf = () => {
    if (validateForm()) {
      generatePdf(cvPreviewRef.current, `${cvData.fullName || 'curriculo'}.pdf`);
    } else {
      alert('Por favor, corrija os erros de formato antes de gerar o PDF.');
    }
  };

  return (
    <div className="cv-form-page">
      <div className="form-container">
        <h2 className="form-page-title">Preencha seus Dados para o Currículo</h2>

        <FormSection title="Informações Pessoais">
          <InputField
            label="Nome Completo"
            id="fullName"
            value={cvData.fullName}
            onChange={handleChange}
            placeholder="Seu Nome Completo"
            error={errors.fullName}
          />
          <InputField
            label="Profissão / Título"
            id="profession"
            value={cvData.profession}
            onChange={handleChange}
            placeholder="Analista Financeiro, Gerente de Vendas, Recepcionista, Professor, Enfermeiro"
            error={errors.profession}
          />
          <TextAreaField
            label="Resumo Profissional"
            id="professionalSummary"
            value={cvData.professionalSummary}
            onChange={handleChange}
            placeholder="Profissional com X anos de experiência em..., focado em..., com histórico de sucesso em..."
          />
          <InputField
            label="E-mail"
            id="email"
            type="email"
            value={cvData.email}
            onChange={handleChange}
            placeholder="seu.email@exemplo.com"
            error={errors.email}
          />
          <InputField
            label="Telefone"
            id="phone"
            type="tel"
            value={cvData.phone}
            onChange={handleChange}
            placeholder="(XX) XXXXX-XXXX"
          />
          <InputField
            label="Cidade / Estado"
            id="cityState"
            value={cvData.cityState}
            onChange={handleChange}
            placeholder="São Paulo, SP"
          />
        </FormSection>

        <FormSection
          title="Experiências Profissionais"
          description="Liste suas experiências mais relevantes, começando pela mais recente."
          onAddItem={() => handleAddItem('experiences')}
          buttonText="Adicionar Experiência"
        >
          {cvData.experiences.map((exp) => (
            <ExperienceItem
              key={exp.id} // AGORA USA O ID DO ITEM!
              index={exp.id} // Mantém index se precisar, mas o principal é o key
              experience={exp}
              handleChange={handleArrayChange}
              handleRemove={(id) => handleRemoveItem('experiences', id)} // Passa o ID
              errors={errors.experiences ? errors.experiences.find(e => e.id === exp.id) : null} // Adapta o erro
            />
          ))}
        </FormSection>

        <FormSection
          title="Formação Acadêmica"
          description="Adicione suas formações mais importantes."
          onAddItem={() => handleAddItem('education')}
          buttonText="Adicionar Formação"
        >
          {cvData.education.map((edu) => (
            <EducationItem
              key={edu.id} // AGORA USA O ID DO ITEM!
              index={edu.id} // Mantém index se precisar, mas o principal é o key
              education={edu}
              handleChange={handleArrayChange}
              handleRemove={(id) => handleRemoveItem('education', id)} // Passa o ID
              errors={errors.education ? errors.education.find(e => e.id === edu.id) : null} // Adapta o erro
            />
          ))}
        </FormSection>

        <FormSection title="Habilidades" description="Liste seus idiomas, ferramentas, competências técnicas e comportamentais.">
          <TextAreaField
            label="Idiomas"
            id="languages"
            value={cvData.skills.languages}
            onChange={handleSkillsChange}
            placeholder="Português (Nativo), Inglês (Avançado), Francês (Básico)"
          />
          <TextAreaField
            label="Ferramentas e Tecnologias"
            id="tools"
            value={cvData.skills.tools}
            onChange={handleSkillsChange}
            placeholder="Pacote Office (Word, Excel, PowerPoint), SAP, CRM, Photoshop, Máquinas Industriais"
          />
          <TextAreaField
            label="Conhecimentos Específicos"
            id="technicalSkills"
            value={cvData.skills.technicalSkills}
            onChange={handleSkillsChange}
            placeholder="Legislação Trabalhista, Contabilidade, Primeiros Socorros, Técnicas de Vendas, Edição de Vídeos"
          />
          <TextAreaField
            label="Competências Comportamentais"
            id="softSkills"
            value={cvData.skills.softSkills}
            onChange={handleSkillsChange}
            placeholder="Proatividade, Organização, Empatia, Liderança, Comunicação Eficaz, Flexibilidade"
          />
          <TextAreaField
            label="Outras Habilidades"
            id="otherSkills"
            value={cvData.skills.otherSkills}
            onChange={handleSkillsChange}
            placeholder="Carteira de Habilitação (Cat. B), Voluntariado, Certificações Relevantes, Hobbies (Ex: Fotografia)"
          />
        </FormSection>

        <FormSection
          title="Links Relevantes"
          description="Adicione links para seu portfólio, LinkedIn, ou outros perfis profissionais."
          onAddItem={() => handleAddItem('links')}
          buttonText="Adicionar Link"
        >
          {cvData.links.map((link) => (
            <LinkItem
              key={link.id} // AGORA USA O ID DO ITEM!
              index={link.id} // Mantém index se precisar, mas o principal é o key
              link={link}
              handleChange={handleArrayChange}
              handleRemove={(id) => handleRemoveItem('links', id)} // Passa o ID
              errors={errors.links ? errors.links.find(e => e.id === link.id) : null} // Adapta o erro
            />
          ))}
        </FormSection>

        <div className="form-actions">
          <Button onClick={handleGeneratePdf} className="generate-pdf-button">
            Gerar Currículo em PDF
          </Button>
        </div>
      </div>

      <div className="preview-container">
        <h2 className="form-page-title">Prévia do Currículo</h2>
        <CvPreview cvData={cvData} ref={cvPreviewRef} />
      </div>
    </div>
  );
};

export default CvFormPage;