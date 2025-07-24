// // DownloadHandler.js
// import jsPDF from 'jspdf';

// const DownloadHandler = ({ paper, template, backgroundColor }) => {
//   const getQuestionTypeLabel = (type) => {
//     switch (type) {
//       case 'single':
//         return 'Single Answer';
//       case 'multiple':
//         return 'Multiple Choice';
//       case 'truefalse':
//         return 'True/False';
//       default:
//         return '';
//     }
//   };

//   const addTemplateBackground = (doc, template) => {
//     if (template) {
//       const img = new Image();
//       img.src = template;
//       doc.addImage(img, 'JPEG', 0, 0, 210, 297);
//     }
//   };

//   const handleDownloadQuestionPaper = () => {
//     const doc = new jsPDF();
//     let y = 10;
//     const lineHeight = 10;
//     const margin = 10;
//     const maxHeight = 290;

//     addTemplateBackground(doc, template);

//     doc.setFontSize(16);
//     doc.text(`Title: ${paper.title}`, margin, y);
//     y += lineHeight;
//     doc.setFontSize(14);
//     doc.text(`Description: ${paper.description}`, margin, y);
//     y += lineHeight * 2;

//     doc.setFontSize(12);
//     paper.questions.forEach((question, index) => {
//       if (y + lineHeight > maxHeight) {
//         doc.addPage();
//         addTemplateBackground(doc, template);
//         y = margin;
//       }
//       doc.text(`${index + 1}. ${question.text} (${getQuestionTypeLabel(question.type)})`, margin, y);
//       y += lineHeight;

//       if (question.type === 'truefalse') {
//         doc.text(`    a. True`, margin, y);
//         y += lineHeight;
//         doc.text(`    b. False`, margin, y);
//         y += lineHeight;
//       } else {
//         question.options.forEach((option, optIndex) => {
//           if (y + lineHeight > maxHeight) {
//             doc.addPage();
//             addTemplateBackground(doc, template);
//             y = margin;
//           }
//           doc.text(`    ${String.fromCharCode(97 + optIndex)}. ${option.text}`, margin, y);
//           y += lineHeight;
//         });
//       }

//       doc.line(10, y, 200, y);
//       y += 10;
//     });

//     doc.save('question_paper.pdf');
//   };

//   const handleDownloadAnswerKey = () => {
//     const doc = new jsPDF();
//     let y = 10;
//     const lineHeight = 10;
//     const margin = 10;
//     const maxHeight = 290;

//     addTemplateBackground(doc, template);

//     doc.setFontSize(16);
//     doc.text('Answer Key', margin, y);
//     y += lineHeight * 2;
//     doc.setFontSize(12);

//     paper.questions.forEach((question, index) => {
//       if (y + lineHeight > maxHeight) {
//         doc.addPage();
//         addTemplateBackground(doc, template);
//         y = margin;
//       }
//       doc.text(`${index + 1}. ${question.text} (${getQuestionTypeLabel(question.type)})`, margin, y);
//       y += lineHeight;

//       if (question.type === 'truefalse') {
//         const correctOption = question.options[0].text;
//         doc.text(`    ${correctOption === 'true' ? 'a. True' : 'b. False'}`, margin, y);
//         y += lineHeight;
//       } else {
//         question.options.forEach((option, optIndex) => {
//           if (option.isCorrect) {
//             if (y + lineHeight > maxHeight) {
//               doc.addPage();
//               addTemplateBackground(doc, template);
//               y = margin;
//             }
//             doc.text(`    ${String.fromCharCode(97 + optIndex)}. ${option.text}`, margin, y);
//             y += lineHeight;
//           }
//         });
//       }

//       y += lineHeight;
//     });

//     doc.save('answer_key.pdf');
//   };

//   return (
//     <div style={{ display: 'none' }}>
//       <button onClick={handleDownloadQuestionPaper} id="downloadQuestionPaperButton"></button>
//       <button onClick={handleDownloadAnswerKey} id="downloadAnswerKeyButton"></button>
//     </div>
//   );
// };

// export default DownloadHandler;



// import jsPDF from 'jspdf';

// const DownloadHandler = ({ paper, template, backgroundColor }) => {
//   const getQuestionTypeLabel = (type) => {
//     switch (type) {
//       case 'single':
//         return 'Single Answer';
//       case 'multiple':
//         return 'Multiple Choice';
//       case 'truefalse':
//         return 'True/False';
//       default:
//         return '';
//     }
//   };

//   const addTemplateBackground = (doc, template, backgroundColor) => {
//     if (template) {
//       const img = new Image();
//       img.src = template;
//       doc.addImage(img, 'JPEG', 0, 0, 210, 297);
//     } else {
//       // If template is not available, use provided backgroundColor or default to white
//       doc.setFillColor(backgroundColor || '#ffffff');
//       doc.rect(0, 0, 210, 297, 'F'); // Fill the entire page with background color
//     }
//   };

//   const handleDownloadQuestionPaper = () => {
//     const doc = new jsPDF();
//     let y = 10;
//     const lineHeight = 10;
//     const margin = 10;
//     const maxHeight = 290;

//     addTemplateBackground(doc, template, backgroundColor);

//     doc.setFontSize(16);
//     doc.text(`Title: ${paper.title}`, margin, y);
//     y += lineHeight;
//     doc.setFontSize(14);
//     doc.text(`Description: ${paper.description}`, margin, y);
//     y += lineHeight * 2;

//     doc.setFontSize(12);
//     paper.questions.forEach((question, index) => {
//       if (y + lineHeight > maxHeight) {
//         doc.addPage();
//         addTemplateBackground(doc, template, backgroundColor);
//         y = margin;
//       }
//       doc.text(`${index + 1}. ${question.text} (${getQuestionTypeLabel(question.type)})`, margin, y);
//       y += lineHeight;

//       if (question.type === 'truefalse') {
//         doc.text(`    a. True`, margin, y);
//         y += lineHeight;
//         doc.text(`    b. False`, margin, y);
//         y += lineHeight;
//       } else {
//         question.options.forEach((option, optIndex) => {
//           if (y + lineHeight > maxHeight) {
//             doc.addPage();
//             addTemplateBackground(doc, template, backgroundColor);
//             y = margin;
//           }
//           doc.text(`    ${String.fromCharCode(97 + optIndex)}. ${option.text}`, margin, y);
//           y += lineHeight;
//         });
//       }

//       doc.line(10, y, 200, y);
//       y += 10;
//     });

//     doc.save('question_paper.pdf');
//   };

//   const handleDownloadAnswerKey = () => {
//     const doc = new jsPDF();
//     let y = 10;
//     const lineHeight = 10;
//     const margin = 10;
//     const maxHeight = 290;

//     addTemplateBackground(doc, template, backgroundColor);

//     doc.setFontSize(16);
//     doc.text('Answer Key', margin, y);
//     y += lineHeight * 2;
//     doc.setFontSize(12);

//     paper.questions.forEach((question, index) => {
//       if (y + lineHeight > maxHeight) {
//         doc.addPage();
//         addTemplateBackground(doc, template, backgroundColor);
//         y = margin;
//       }
//       doc.text(`${index + 1}. ${question.text} (${getQuestionTypeLabel(question.type)})`, margin, y);
//       y += lineHeight;

//       if (question.type === 'truefalse') {
//         const correctOption = question.options[0].text;
//         doc.text(`    ${correctOption === 'true' ? 'a. True' : 'b. False'}`, margin, y);
//         y += lineHeight;
//       } else {
//         question.options.forEach((option, optIndex) => {
//           if (option.isCorrect) {
//             if (y + lineHeight > maxHeight) {
//               doc.addPage();
//               addTemplateBackground(doc, template, backgroundColor);
//               y = margin;
//             }
//             doc.text(`    ${String.fromCharCode(97 + optIndex)}. ${option.text}`, margin, y);
//             y += lineHeight;
//           }
//         });
//       }

//       y += lineHeight;
//     });

//     doc.save('answer_key.pdf');
//   };

//   return (
//     <div style={{ display: 'none' }}>
//       <button onClick={handleDownloadQuestionPaper} id="downloadQuestionPaperButton"></button>
//       <button onClick={handleDownloadAnswerKey} id="downloadAnswerKeyButton"></button>
//     </div>
//   );
// };

// export default DownloadHandler;


// import React from 'react';
// import jsPDF from 'jspdf';
// import { Document, Packer, Paragraph, TextRun } from 'docx';
// import { saveAs } from 'file-saver';

// const DownloadHandler = ({ paper, template, backgroundColor }) => {
//   const getQuestionTypeLabel = (type) => {
//     switch (type) {
//       case 'single':
//         return 'Single Answer';
//       case 'multiple':
//         return 'Multiple Choice';
//       case 'truefalse':
//         return 'True/False';
//       default:
//         return '';
//     }
//   };

//   const addTemplateBackground = (doc, template, backgroundColor) => {
//     if (template) {
//       const img = new Image();
//       img.src = template;
//       doc.addImage(img, 'JPEG', 0, 0, 210, 297);
//     } else {
//       doc.setFillColor(backgroundColor || '#ffffff');
//       doc.rect(0, 0, 210, 297, 'F');
//     }
//   };

//   const handleDownloadQuestionPaperPDF = () => {
//     const doc = new jsPDF();
//     let y = 10;
//     const lineHeight = 10;
//     const margin = 10;
//     const maxHeight = 290;

//     addTemplateBackground(doc, template, backgroundColor);

//     doc.setFontSize(16);
//     doc.text(`Title: ${paper.title}`, margin, y);
//     y += lineHeight;
//     doc.setFontSize(14);
//     doc.text(`Description: ${paper.description}`, margin, y);
//     y += lineHeight * 2;

//     doc.setFontSize(12);
//     paper.questions.forEach((question, index) => {
//       if (y + lineHeight > maxHeight) {
//         doc.addPage();
//         addTemplateBackground(doc, template, backgroundColor);
//         y = margin;
//       }
//       doc.text(`${index + 1}. ${question.text} (${getQuestionTypeLabel(question.type)})`, margin, y);
//       y += lineHeight;

//       if (question.type === 'truefalse') {
//         doc.text(`    a. True`, margin, y);
//         y += lineHeight;
//         doc.text(`    b. False`, margin, y);
//         y += lineHeight;
//       } else {
//         question.options.forEach((option, optIndex) => {
//           if (y + lineHeight > maxHeight) {
//             doc.addPage();
//             addTemplateBackground(doc, template, backgroundColor);
//             y = margin;
//           }
//           doc.text(`    ${String.fromCharCode(97 + optIndex)}. ${option.text}`, margin, y);
//           y += lineHeight;
//         });
//       }

//       doc.line(10, y, 200, y);
//       y += 10;
//     });

//     doc.save('question_paper.pdf');
//   };

//   const handleDownloadAnswerKeyPDF = () => {
//     const doc = new jsPDF();
//     let y = 10;
//     const lineHeight = 10;
//     const margin = 10;
//     const maxHeight = 290;

//     addTemplateBackground(doc, template, backgroundColor);

//     doc.setFontSize(16);
//     doc.text('Answer Key', margin, y);
//     y += lineHeight * 2;
//     doc.setFontSize(12);

//     paper.questions.forEach((question, index) => {
//       if (y + lineHeight > maxHeight) {
//         doc.addPage();
//         addTemplateBackground(doc, template, backgroundColor);
//         y = margin;
//       }
//       doc.text(`${index + 1}. ${question.text} (${getQuestionTypeLabel(question.type)})`, margin, y);
//       y += lineHeight;

//       if (question.type === 'truefalse') {
//         const correctOption = question.options[0].text;
//         doc.text(`    ${correctOption === 'true' ? 'a. True' : 'b. False'}`, margin, y);
//         y += lineHeight;
//       } else {
//         question.options.forEach((option, optIndex) => {
//           if (option.isCorrect) {
//             if (y + lineHeight > maxHeight) {
//               doc.addPage();
//               addTemplateBackground(doc, template, backgroundColor);
//               y = margin;
//             }
//             doc.text(`    ${String.fromCharCode(97 + optIndex)}. ${option.text}`, margin, y);
//             y += lineHeight;
//           }
//         });
//       }

//       y += lineHeight;
//     });

//     doc.save('answer_key.pdf');
//   };

//   const handleDownloadQuestionPaperDOC = () => {
//     const doc = new Document();
//     const children = [];

//     children.push(new Paragraph({
//       text: `Title: ${paper.title}`,
//       heading: "Heading1"
//     }));
//     children.push(new Paragraph({
//       text: `Description: ${paper.description}`,
//       spacing: { after: 240 }
//     }));

//     paper.questions.forEach((question, index) => {
//       children.push(new Paragraph({
//         text: `${index + 1}. ${question.text} (${getQuestionTypeLabel(question.type)})`,
//         spacing: { after: 240 }
//       }));

//       if (question.type === 'truefalse') {
//         children.push(new Paragraph('    a. True'));
//         children.push(new Paragraph('    b. False'));
//       } else {
//         question.options.forEach((option, optIndex) => {
//           children.push(new Paragraph(`    ${String.fromCharCode(97 + optIndex)}. ${option.text}`));
//         });
//       }
//     });

//     doc.addSection({
//       properties: {},
//       children,
//     });

//     Packer.toBlob(doc).then((blob) => {
//       saveAs(blob, 'question_paper.docx');
//     });
//   };

//   const handleDownloadAnswerKeyDOC = () => {
//     const doc = new Document();
//     const children = [];

//     children.push(new Paragraph({
//       text: 'Answer Key',
//       heading: "Heading1",
//       spacing: { after: 240 }
//     }));

//     paper.questions.forEach((question, index) => {
//       children.push(new Paragraph({
//         text: `${index + 1}. ${question.text} (${getQuestionTypeLabel(question.type)})`,
//         spacing: { after: 240 }
//       }));

//       if (question.type === 'truefalse') {
//         const correctOption = question.options[0].text;
//         children.push(new Paragraph(`    ${correctOption === 'true' ? 'a. True' : 'b. False'}`));
//       } else {
//         question.options.forEach((option, optIndex) => {
//           if (option.isCorrect) {
//             children.push(new Paragraph(`    ${String.fromCharCode(97 + optIndex)}. ${option.text}`));
//           }
//         });
//       }
//     });

//     doc.addSection({
//       properties: {},
//       children,
//     });

//     Packer.toBlob(doc).then((blob) => {
//       saveAs(blob, 'answer_key.docx');
//     });
//   };

//   return (
//     <div style={{ display: 'none' }}>
//       <button onClick={handleDownloadQuestionPaperPDF} id="downloadQuestionPaperPDFButton">Download Question Paper (PDF)</button>
//       <button onClick={handleDownloadAnswerKeyPDF} id="downloadAnswerKeyPDFButton">Download Answer Key (PDF)</button>
//       <button onClick={handleDownloadQuestionPaperDOC} id="downloadQuestionPaperDOCButton">Download Question Paper (DOC)</button>
//       <button onClick={handleDownloadAnswerKeyDOC}id="downloadAnswerKeyDOCButton">Download Answer Key (DOC)</button>
//     </div>
//   );
// };

// export default DownloadHandler;



import React from 'react';
import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

const DownloadHandler = ({ paper, template, backgroundColor }) => {
  const getQuestionTypeLabel = (type) => {
    switch (type) {
      case 'single':
        return 'Single Answer';
      case 'multiple':
        return 'Multiple Choice';
      case 'truefalse':
        return 'True/False';
      default:
        return '';
    }
  };

  const addTemplateBackground = (doc, template, backgroundColor) => {
    if (template) {
      const img = new Image();
      img.src = template;
      doc.addImage(img, 'JPEG', 0, 0, 210, 297);
    } else {
      doc.setFillColor(backgroundColor || '#ffffff');
      doc.rect(0, 0, 210, 297, 'F');
    }
  };

  const handleDownloadQuestionPaperPDF = () => {
    const doc = new jsPDF();
    let y = 10;
    const lineHeight = 10;
    const margin = 10;
    const maxHeight = 290;

    addTemplateBackground(doc, template, backgroundColor);

    // Title container
    doc.setFontSize(16);
    doc.text(`Title: ${paper.title}`, 105, y, { align: 'center' });
    y += lineHeight;
    doc.setFontSize(14);
    // Description container
    doc.text(`Description: ${paper.description}`, 105, y, { align: 'center' });
    y += lineHeight * 2;

    doc.setFontSize(12);
    paper.questions.forEach((question, index) => {
      if (y + lineHeight > maxHeight) {
        doc.addPage();
        addTemplateBackground(doc, template, backgroundColor);
        y = margin;
      }
      doc.text(`${index + 1}. ${question.text} (${getQuestionTypeLabel(question.type)})`, margin, y);
      y += lineHeight;

      if (question.type === 'truefalse') {
        doc.text(`    a. True`, margin, y);
        y += lineHeight;
        doc.text(`    b. False`, margin, y);
        y += lineHeight;
      } else {
        question.options.forEach((option, optIndex) => {
          if (y + lineHeight > maxHeight) {
            doc.addPage();
            addTemplateBackground(doc, template, backgroundColor);
            y = margin;
          }
          doc.text(`    ${String.fromCharCode(97 + optIndex)}. ${option.text}`, margin, y);
          y += lineHeight;
        });
      }

      doc.line(10, y, 200, y);
      y += 10;
    });

    // Page number
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.text(`Page ${i} of ${pageCount}`, 105, 297 - 10);
    }

    doc.save('question_paper.pdf');
  };

  const handleDownloadAnswerKeyPDF = () => {
    const doc = new jsPDF();
    let y = 10;
    const lineHeight = 10;
    const margin = 10;
    const maxHeight = 290;

    addTemplateBackground(doc, template, backgroundColor);

    doc.setFontSize(16);
    doc.text('Answer Key', 105, y, { align: 'center' });
    y += lineHeight * 2;
    doc.setFontSize(12);

    paper.questions.forEach((question, index) => {
      if (y + lineHeight > maxHeight) {
        doc.addPage();
        addTemplateBackground(doc, template, backgroundColor);
        y = margin;
      }
      doc.text(`${index + 1}. ${question.text} (${getQuestionTypeLabel(question.type)})`, margin, y);
      y += lineHeight;

      if (question.type === 'truefalse') {
        const correctOption = question.options[0].text;
        doc.text(`    ${correctOption === 'true' ? 'a. True' : 'b. False'}`, margin, y);
        y += lineHeight;
      } else {
        question.options.forEach((option, optIndex) => {
          if (option.isCorrect) {
            if (y + lineHeight > maxHeight) {
              doc.addPage();
              addTemplateBackground(doc, template, backgroundColor);
              y = margin;
            }
            doc.text(`    ${String.fromCharCode(97 + optIndex)}. ${option.text}`, margin, y);
            y += lineHeight;
          }
        });
      }

      y += lineHeight;
    });

    // Page number
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.text(`Page ${i} of ${pageCount}`, 105, 297 - 10);
    }

    doc.save('answer_key.pdf');
  };

  const handleDownloadQuestionPaperDOC = () => {
    const doc = new Document();
    const children = [];

    // Title and Description containers
    children.push(new Paragraph({
      text: `Title: ${paper.title}`,
      alignment: 'center',
      spacing: { after: 240 }
    }));
    children.push(new Paragraph({
      text: `Description: ${paper.description}`,
      alignment: 'center',
      spacing: { after: 240 }
    }));

    paper.questions.forEach((question, index) => {
      children.push(new Paragraph({
        text: `${index + 1}. ${question.text} (${getQuestionTypeLabel(question.type)})`,
        spacing: { after: 240 }
      }));

      if (question.type === 'truefalse') {
        children.push(new Paragraph('    a. True'));
        children.push(new Paragraph('    b. False'));
      } else {
        question.options.forEach((option, optIndex) => {
          children.push(new Paragraph(`    ${String.fromCharCode(97 + optIndex)}. ${option.text}`));
        });
      }
    });

    doc.addSection({
      properties: {},
      children,
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, 'question_paper.docx');
    });
  };

  const handleDownloadAnswerKeyDOC = () => {
    const doc = new Document();
    const children = [];

    children.push(new Paragraph({
      text: 'Answer Key',
      heading: "Heading1",
      spacing: { after: 240 }
    }));

    paper.questions.forEach((question, index) => {
      children.push(new Paragraph({
        text: `${index + 1}. ${question.text} (${getQuestionTypeLabel(question.type)})`,
        spacing: { after: 240 }
      }));

      if (question.type === 'truefalse') {
        const correctOption = question.options[0].text;
        children.push(new Paragraph(`    ${correctOption === 'true' ? 'a. True' : 'b. False'}`));
      } else {
        question.options.forEach((option, optIndex) => {
          if (option.isCorrect) {
            children.push(new Paragraph(`    ${String.fromCharCode(97 + optIndex)}. ${option.text}`));
          }
        });
      }
    });

    doc.addSection({
      properties: {},
      children,
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, 'answer_key.docx');
    });
  };

  return (
    <div style={{ display: 'none' }}>
      <button onClick={handleDownloadQuestionPaperPDF} id="downloadQuestionPaperPDFButton">Download Question Paper (PDF)</button>
      <button onClick={handleDownloadAnswerKeyPDF} id="downloadAnswerKeyPDFButton">Download Answer Key (PDF)</button>
      <button onClick={handleDownloadQuestionPaperDOC} id="downloadQuestionPaperDOCButton">Download Question Paper (DOC)</button>
      <button onClick={handleDownloadAnswerKeyDOC} id="downloadAnswerKeyDOCButton">Download Answer Key (DOC)</button>
    </div>
  );
};

export default DownloadHandler;
