


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import PaperPreview from './PaperPreview';
// import PaperForm from './PaperForm';
// import PaperHeader from './Header/PaperHeader';
// import DownloadHandler from './Download/DownloadHandler';
// import TemplateSelector from './Template/TemplateSelector';
// import { API_URL } from '../Constants/Url';
// import 'react-resizable/css/styles.css';
// import { templates } from './Template/Template';
// import { ResizableBox } from 'react-resizable';

// function NewComponent({ paperId }) {
//   const [paper, setPaper] = useState({
//     title: '',
//     description: '',
//     questions: []
//   });

//   const [selectedTemplate, setSelectedTemplate] = useState(null);
//   const [showTemplates, setShowTemplates] = useState(false);
//   const [backgroundColor, setBackgroundColor] = useState('#ffffff');

//   useEffect(() => {
//     if (paperId) {
//       // Fetch paper details if paperId is provided
//       const fetchPaperDetails = async () => {
//         try {
//           const response = await axios.get(`${API_URL}/api/papers/${paperId}`);
//           setPaper(response.data);
//         } catch (error) {
//           console.error('Error fetching paper details:', error);
//         }
//       };

//       fetchPaperDetails();
//     }
//   }, [paperId]);

//   const handlePaperSubmit = (newPaper) => {
//     setPaper((prevPaper) => ({
//       ...prevPaper,
//       title: newPaper.title,
//       description: newPaper.description,
//       questions: [...prevPaper.questions, ...newPaper.questions]
//     }));
//   };

//   const handleAddQuestion = (newQuestion) => {
//     setPaper((prevPaper) => ({
//       ...prevPaper,
//       questions: [...prevPaper.questions, newQuestion]
//     }));
//   };

//   const handleEditQuestion = (index, updatedQuestion) => {
//     setPaper((prevPaper) => {
//       const questions = [...prevPaper.questions];
//       questions[index] = updatedQuestion;
//       return { ...prevPaper, questions };
//     });
//   };

//   const handleDeleteQuestion = (index) => {
//     setPaper((prevPaper) => {
//       const questions = [...prevPaper.questions];
//       questions.splice(index, 1);
//       return { ...prevPaper, questions };
//     });
//   };

//   const handleSaveQuestion = (index, updatedQuestion) => {
//     handleEditQuestion(index, updatedQuestion);
//   };

//   const handleTemplateChange = (template) => {
//     setSelectedTemplate(template);
//   };

//   const handleTemplatesToggle = () => {
//     setShowTemplates(!showTemplates);
//   };

//   const handleTemplatesClose = () => {
//     setShowTemplates(false);
//   };

//   const handleColorChange = (color) => {
//     setBackgroundColor(color);
//   };

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column' }}>
//       <PaperHeader onTemplatesToggle={handleTemplatesToggle} onColorChange={handleColorChange} paper={paper} paperId={paperId} onTemplateChange={handleTemplateChange}/>
//       {showTemplates && (
//         <div style={styles.templateSelectorContainer}>
//           <TemplateSelector
//             templates={templates}
//             onTemplateChange={handleTemplateChange}
//             onClose={handleTemplatesClose}
//           />
//         </div>
//       )}
//       <div style={{ display: 'flex', flex: 1 }}>
//         <ResizableBox
//           width={300}
//           height={Infinity}
//           minConstraints={[200, Infinity]}
//           maxConstraints={[800, Infinity]}
//           axis="x"
//           resizeHandles={['e']}
//           style={{ display: 'flex', flexDirection: 'column', paddingRight: '10px' , color:'grey'}}
//         >
//           <PaperForm onSubmit={handlePaperSubmit} onAddQuestion={handleAddQuestion} />
//         </ResizableBox>
//         <div style={{ flex: 1, paddingLeft: '10px' }}>
//           <PaperPreview
//             paper={paper}
//             onEditQuestion={handleEditQuestion}
//             onDeleteQuestion={handleDeleteQuestion}
//             onSaveQuestion={handleSaveQuestion}
//             template={selectedTemplate}
//             backgroundColor={backgroundColor}
//           />
//           <DownloadHandler paper={paper} template={selectedTemplate} backgroundColor={backgroundColor} />
//         </div>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   templateSelectorContainer: {
//     position: 'absolute',
//     top: '50px',
//     right: '20px',
//     backgroundColor: '#fff',
//     border: '1px solid #ccc',
//     boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
//     borderRadius: '4px',
//     zIndex: 1000,
//     padding: '10px',
//   },
// };

// export default NewComponent;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PaperPreview from './PaperPreview';
import PaperForm from './PaperForm';
import PaperHeader from './Header/PaperHeader';
import DownloadHandler from './Download/DownloadHandler';
import TemplateSelector from './Template/TemplateSelector';
import { API_URL } from '../Constants/Url';
import 'react-resizable/css/styles.css';
import { templates } from './Template/Template';
import { ResizableBox } from 'react-resizable';

function NewComponent({ paperId, selectedTemplate }) {
  const [paper, setPaper] = useState({
    title: '',
    description: '',
    questions: []
  });

  const [showTemplates, setShowTemplates] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');

  useEffect(() => {
    if (paperId) {
      const fetchPaperDetails = async () => {
        try {
          const response = await axios.get(`${API_URL}/api/papers/${paperId}`);
          setPaper(response.data);
        } catch (error) {
          console.error('Error fetching paper details:', error);
        }
      };

      fetchPaperDetails();
    }
  }, [paperId]);

  useEffect(() => {
    if (selectedTemplate) {
      setPaper((prevPaper) => ({ ...prevPaper, template: selectedTemplate }));
    }
  }, [selectedTemplate]);

  const handlePaperSubmit = (newPaper) => {
    setPaper((prevPaper) => ({
      ...prevPaper,
      title: newPaper.title,
      description: newPaper.description,
      questions: [...prevPaper.questions, ...newPaper.questions]
    }));
  };

  const handleAddQuestion = (newQuestion) => {
    setPaper((prevPaper) => ({
      ...prevPaper,
      questions: [...prevPaper.questions, newQuestion]
    }));
  };

  const handleEditQuestion = (index, updatedQuestion) => {
    setPaper((prevPaper) => {
      const questions = [...prevPaper.questions];
      questions[index] = updatedQuestion;
      return { ...prevPaper, questions };
    });
  };

  const handleDeleteQuestion = (index) => {
    setPaper((prevPaper) => {
      const questions = [...prevPaper.questions];
      questions.splice(index, 1);
      return { ...prevPaper, questions };
    });
  };

  const handleSaveQuestion = (index, updatedQuestion) => {
    handleEditQuestion(index, updatedQuestion);
  };

  const handleTemplateChange = (template) => {
    setPaper((prevPaper) => ({ ...prevPaper, template }));
  };

  const handleTemplatesToggle = () => {
    setShowTemplates(!showTemplates);
  };

  const handleTemplatesClose = () => {
    setShowTemplates(false);
  };

  const handleColorChange = (color) => {
    setBackgroundColor(color);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <PaperHeader onTemplatesToggle={handleTemplatesToggle} onColorChange={handleColorChange} paper={paper} paperId={paperId} onTemplateChange={handleTemplateChange} />
      {showTemplates && (
        <div style={styles.templateSelectorContainer}>
          <TemplateSelector
            templates={templates}
            onTemplateChange={handleTemplateChange}
            onClose={handleTemplatesClose}
          />
        </div>
      )}
      <div style={{ display: 'flex', flex: 1 }}>
        <ResizableBox
          width={300}
          height={Infinity}
          minConstraints={[200, Infinity]}
          maxConstraints={[800, Infinity]}
          axis="x"
          resizeHandles={['e']}
          style={{ display: 'flex', flexDirection: 'column', paddingRight: '10px', color: 'grey' }}
        >
          <PaperForm onSubmit={handlePaperSubmit} onAddQuestion={handleAddQuestion} />
        </ResizableBox>
        <div style={{ flex: 1, paddingLeft: '10px' ,paddingTop: '20px'}}>
          <PaperPreview
            paper={paper}
            onEditQuestion={handleEditQuestion}
            onDeleteQuestion={handleDeleteQuestion}
            onSaveQuestion={handleSaveQuestion}
            template={paper.template}
            backgroundColor={backgroundColor}
          />
          <DownloadHandler paper={paper} template={paper.template} backgroundColor={backgroundColor} />
        </div>
      </div>
    </div>
  );
}

const styles = {
  templateSelectorContainer: {
    position: 'absolute',
    top: '50px',
    right: '20px',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
    zIndex: 1000,
    padding: '10px',
  },
};

export default NewComponent;
