// import React, { useState } from 'react';
// import QuestionForm from './QuestionForm';

// const PaperForm = ({ onSubmit, onAddQuestion }) => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit({ title, description, questions: [] });
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit} style={styles.form}>
//         <div style={styles.formGroup}>
//           <label>Title:</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//             style={styles.input}
//           />
//         </div>
//         <div style={styles.formGroup}>
//           <label>Description:</label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//             style={styles.textarea}
//           ></textarea>
//         </div>
//         <button type="submit" style={styles.button}>
//           Create Paper
//         </button>
//       </form>
//       <QuestionForm onAddQuestion={onAddQuestion} />
//     </div>
//   );
// };

// const styles = {
//   form: {
//     margin: '20px auto',
//     width: '95%',
//     textAlign: 'left',
//   },
//   formGroup: {
//     marginBottom: '10px',
//   },
//   input: {
//     width: '100%',
//     padding: '8px',
//     boxSizing: 'border-box',
//   },
//   textarea: {
//     width: '100%',
//     padding: '8px',
//     boxSizing: 'border-box',
//   },
//   button: {
//     marginTop: '10px',
//     padding: '10px 20px',
//     backgroundColor: '#007BFF',
//     color: 'white',
//     border: 'none',
//     cursor: 'pointer',
//   },
// };

// export default PaperForm;

import React, { useState } from 'react';
import QuestionForm from './QuestionForm';

const PaperForm = ({ onSubmit, onAddQuestion }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, questions: [] });
  };

  return (
    <div style={{ marginBottom: '20px', left: '0px', marginRight: '0px'}}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ ...styles.input, ...styles.inputText }}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ ...styles.input, ...styles.textarea }}
          ></textarea>
        </div>
        <button type="submit" style={styles.button}>
          Create Paper
        </button>
      </form>
      <QuestionForm onAddQuestion={onAddQuestion} />
    </div>
  );
};

const styles = {
  form: {
    margin: '20px auto',
    width: '95%',
    textAlign: 'left',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    padding: '20px',
    backgroundColor: '#f8f9fa',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '5px',
    display: 'block',
    color: '#ef6603',
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    fontFamily: 'Arial, sans-serif',
  },
  inputText: {
    height: '40px',
  },
  textarea: {
    minHeight: '120px',
    resize: 'vertical',
    padding: '12px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    fontFamily: 'Arial, sans-serif',
  },
  button: {
    padding: '14px 28px',
    backgroundColor: '#ef6603',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
    alignSelf: 'center', // Center button horizontally
    left: '20px'
  },
};

export default PaperForm;



