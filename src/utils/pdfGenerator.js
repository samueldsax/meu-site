// src/utils/pdfGenerator.js
import html2pdf from 'html2pdf.js';

export const generatePdf = (element, filename = 'curriculo.pdf') => {
  const options = {
    margin: [10, 10, 10, 10], // top, left, bottom, right
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().from(element).set(options).save();
};