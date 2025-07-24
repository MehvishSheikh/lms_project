// import PropTypes from 'prop-types';
// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useGlobalState } from '../../components/Constants/GlobalStateProvider';

// const PaperPreview = ({ paper, template, backgroundColor }) => {
//   const { getGlobal } = useGlobalState();
//   const globalState = getGlobal();

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

//   return (
//     <div style={{borderRadius: '30px'}}>
//       <div style={{ ...styles.paperPreview, backgroundImage: `url(${template})`, backgroundColor }}>
//         <h3 style={{ textAlign: 'center', color: 'black' }}>{paper.title}</h3>
//         <p style={{ textAlign: 'center', color: 'black' }}>{paper.description}</p>
//         {paper.questions.map((question, index) => (
//           <div key={index} style={styles.question}>
//             <p>{index + 1}. {question.text} <span style={styles.questionType}>({getQuestionTypeLabel(question.type)})</span></p>
//             {question.type === 'truefalse' ? (
//               <div>
//                 <label>
//                   <input type="radio" name={`question-${index}`} value="true" />
//                   True
//                 </label>
//                 <label>
//                   <input type="radio" name={`question-${index}`} value="false" />
//                   False
//                 </label>
//               </div>
//             ) : question.type === 'single' ? (
//               <ul style={styles.noBullets}>
//                 {question.options.map((option, optIndex) => (
//                   <li key={optIndex}>
//                     <label>
//                       <input type="radio" name={`question-${index}`} value={option.text} />
//                       {String.fromCharCode(97 + optIndex)}. {option.text}
//                     </label>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <ul style={styles.noBullets}>
//                 {question.options.map((option, optIndex) => (
//                   <li key={optIndex}>
//                     <label>
//                       <input type="checkbox" name={`question-${index}`} value={option.text} />
//                       {String.fromCharCode(97 + optIndex)}. {option.text}
//                     </label>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// PaperPreview.propTypes = {
//   paper: PropTypes.object.isRequired,
//   template: PropTypes.string,
//   backgroundColor: PropTypes.string,
// };

// const styles = {
//   paperPreview: {
//     padding: '20px',
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//   },
//   question: {
//     marginBottom: '20px',
//     padding: '15px',
//     margin: '20px',
//     border: '1px solid #ccc',
//     borderRadius: '5px',
//     backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slightly transparent background for readability
//   },
//   questionType: {
//     fontSize: '0.8em',
//     color: '#888',
//   },
//   noBullets: {
//     listStyleType: 'none',
//     padding: '5px',
//   },
// };

// export default PaperPreview;


// import PropTypes from 'prop-types';
// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useGlobalState } from '../../components/Constants/GlobalStateProvider';

// const PaperPreview = ({ paper, onSaveQuestion, template, backgroundColor, getmarks }) => {
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [editedQuestion, setEditedQuestion] = useState(null);
//   const [userAnswers, setUserAnswers] = useState({});
//   const [submitted, setSubmitted] = useState(false);
//   const [marks, setMarks] = useState(0);
//   const { getGlobal } = useGlobalState();
//   const globalState = getGlobal();

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

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedQuestion((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleOptionChange = (index, value) => {
//     setEditedQuestion((prev) => {
//       const options = [...prev.options];
//       options[index].text = value;
//       return { ...prev, options };
//     });
//   };

//   const handleSaveClick = () => {
//     if (typeof onSaveQuestion === 'function') {
//       onSaveQuestion(editingIndex, editedQuestion);
//     }
//     setEditingIndex(null);
//     setEditedQuestion(null);
//   };

//   const handleAnswerChange = (questionIndex, answer) => {
//     setUserAnswers({
//       ...userAnswers,
//       [questionIndex]: answer,
//     });
//   };

//   const evaluatePaper = () => {
//     let totalMarks = 0;
//     paper.questions.forEach((question, index) => {
//       const userAnswer = userAnswers[index];
//       if (question.type === 'truefalse' || question.type === 'single') {
//         if (userAnswer === question.correctAnswer) {
//           totalMarks += getmarks; // Assuming 2 marks per question
//         }
//       } else if (question.type === 'multiple') {
//         const correctOptions = question.options.filter(option => option.isCorrect).map(option => option.text);
//         const userOptions = userAnswer || [];
//         if (
//           Array.isArray(correctOptions) &&
//           Array.isArray(userOptions) &&
//           JSON.stringify(correctOptions.sort()) === JSON.stringify(userOptions.sort())
//         ) {
//           totalMarks += getmarks; // Assuming 2 marks per question
//         }
//       }
//     });
//     setMarks(totalMarks);
//     setSubmitted(true);
//   };

//   return (
//     <div style={{ borderRadius: '30px' }}>
//       <div style={{ ...styles.paperPreview, backgroundImage: `url(${template})`, backgroundColor }}>
//         <h2 style={{ textAlign: 'center', color: 'grey' }}>Preview</h2>
//         <h3 style={{ textAlign: 'center', color: 'black' }}>{paper.title}</h3>
//         <p style={{ textAlign: 'center', color: 'black' }}>{paper.description}</p>
//         {paper.questions.map((question, index) => (
//           <div key={index} style={styles.question}>
//             <p>{index + 1}. {question.text} <span style={styles.questionType}>({getQuestionTypeLabel(question.type)})</span></p>
//             {question.type === 'truefalse' ? (
//               <div>
//                 <label style={submitted && question.correctAnswer === 'true' ? styles.correct : {}}>
//                   <input
//                     type="radio"
//                     name={`question-${index}`}
//                     value="true"
//                     disabled={submitted}
//                     onChange={() => handleAnswerChange(index, 'true')}
//                   />
//                   True
//                 </label>
//                 <label style={submitted && question.correctAnswer === 'false' ? styles.correct : {}}>
//                   <input
//                     type="radio"
//                     name={`question-${index}`}
//                     value="false"
//                     disabled={submitted}
//                     onChange={() => handleAnswerChange(index, 'false')}
//                   />
//                   False
//                 </label>
//               </div>
//             ) : question.type === 'single' ? (
//               <ul style={styles.noBullets}>
//                 {question.options.map((option, optIndex) => (
//                   <li key={optIndex} style={submitted && option.isCorrect ? styles.correct : {}}>
//                     <label>
//                       <input
//                         type="radio"
//                         name={`question-${index}`}
//                         value={option.text}
//                         disabled={submitted}
//                         onChange={() => handleAnswerChange(index, option.text)}
//                       />
//                       {String.fromCharCode(97 + optIndex)}. {option.text}
//                     </label>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <ul style={styles.noBullets}>
//                 {question.options.map((option, optIndex) => {
//                   const isIncorrect =
//                     submitted &&
//                     userAnswers[index] &&
//                     userAnswers[index].includes(option.text) &&
//                     !option.isCorrect;
//                   return (
//                     <li key={optIndex} style={isIncorrect ? styles.incorrect : {}}>
//                       <label>
//                         <input
//                           type="checkbox"
//                           name={`question-${index}`}
//                           value={option.text}
//                           disabled={submitted}
//                           onChange={(e) => {
//                             const selectedOptions = userAnswers[index] || [];
//                             if (e.target.checked) {
//                               handleAnswerChange(index, [...selectedOptions, option.text]);
//                             } else {
//                               handleAnswerChange(index, selectedOptions.filter(opt => opt !== option.text));
//                             }
//                           }}
//                         />
//                         {String.fromCharCode(97 + optIndex)}. {option.text}
//                       </label>
//                     </li>
//                   );
//                 })}
//               </ul>
//             )}
//             {submitted && (
//               <div style={styles.answerFeedback}>
//                 <p>Correct Answer: {question.type === 'multiple'
//                   ? question.options.filter(option => option.isCorrect).map(option => option.text).join(', ')
//                   : question.correctAnswer
//                 }</p>
//                 <p style={userAnswers[index] !== question.correctAnswer ? styles.incorrect : {}}>
//                   Your Answer: {userAnswers[index] ? userAnswers[index].toString() : 'No Answer'}
//                 </p>
//               </div>
//             )}
//           </div>
//         ))}
//         {!submitted && (
//           <button onClick={evaluatePaper} style={styles.submitButton}>
//             Submit Paper
//           </button>
//         )}
//         {submitted && (
//           <div style={styles.result}>
//             <p>Total Marks Obtained: {marks}</p>
//           </div>
//         )}
//         {editingIndex !== null && (
//           <div style={styles.editForm}>
//             <h3>Edit Question</h3>
//             <label>
//               Question Text:
//               <input
//                 type="text"
//                 name="text"
//                 value={editedQuestion.text}
//                 onChange={handleInputChange}
//                 style={styles.input}
//               />
//             </label>
//             {editedQuestion.type !== 'truefalse' && (
//               <div>
//                 {editedQuestion.options.map((option, optIndex) => (
//                   <label key={optIndex}>
//                     Option {String.fromCharCode(97 + optIndex)}:
//                     <input
//                       type="text"
//                       value={option.text}
//                       onChange={(e) => handleOptionChange(optIndex, e.target.value)}
//                       style={styles.input}
//                     />
//                     <label>
//                       Correct:
//                       <input
//                         type="checkbox"
//                         checked={!!option.isCorrect}
//                         onChange={(e) => {
//                           setEditedQuestion((prev) => {
//                             const options = [...prev.options];
//                             options[optIndex].isCorrect = e.target.checked;
//                             return { ...prev, options };
//                           });
//                         }}
//                       />
//                     </label>
//                   </label>
//                 ))}
//               </div>
//             )}
//             {editedQuestion.type === 'truefalse' && (
//               <label>
//                 Correct Answer:
//                 <select
//                   name="correctAnswer"
//                   value={editedQuestion.correctAnswer}
//                   onChange={handleInputChange}
//                   style={styles.input}
//                 >
//                   <option value="true">True</option>
//                   <option value="false">False</option>
//                 </select>
//               </label>
//             )}
//             <button onClick={handleSaveClick} style={styles.saveButton}>Save</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// PaperPreview.propTypes = {
//   paper: PropTypes.object.isRequired,
//   onSaveQuestion: PropTypes.func.isRequired,
//   template: PropTypes.string,
//   backgroundColor: PropTypes.string,
// };

// const styles = {
//   paperPreview: {
//     padding: '20px',
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//   },
//   question: {
//     marginBottom: '20px',
//     padding: '15px',
//     margin: '20px',
//     border: '1px solid #ccc',
//     borderRadius: '5px',
//     backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slightly transparent background for readability
//   },
//   questionType: {
//     fontSize: '0.8em',
//     color: '#888',
//   },
//   noBullets: {
//     listStyleType: 'none',
//     padding: '5px',
//   },
//   correct: {
//     fontWeight: 'bold',
//     color: 'green',
//   },
//   incorrect: {
//     fontWeight: 'bold',
//     color: 'red',
//   },
//   answerFeedback: {
//     marginTop: '10px',
//     color: 'blue',
//   },
//   editForm: {
//     marginBottom: '20px',
//     padding: '10px',
//     border: '1px solid #ccc',
//     borderRadius: '5px',
//   },
//   input: {
//     display: 'block',
//     margin: '10px 0',
//   },
//   saveButton: {
//     marginTop: '10px',
//     padding: '10px 20px',
//   },
//   submitButton: {
//     marginTop: '20px',
//     padding: '10px 20px',
//     backgroundColor: 'blue',
//     color: 'white',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//   },
//   result: {
//     marginTop: '20px',
//     padding: '10px',
//     border: '1px solid #ccc',
//     borderRadius: '5px',
//     backgroundColor: 'rgba(255, 255, 255, 0.8)',
//     textAlign: 'center',
//     color: 'green',
//   },
// };

// export default PaperPreview;


import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useGlobalState } from '../../components/Constants/GlobalStateProvider';
import Question from './Question';
import PropTypes from 'prop-types';
import EditForm from './EditForm';

const PaperPreview = ({ paper, onSaveQuestion, template, backgroundColor, getmarks }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedQuestion, setEditedQuestion] = useState({});
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [totalMarks, setTotalMarks] = useState(0);
  const user_id = useGlobalState('user_id')[0];

  const handleAnswerChange = (questionIndex, answer) => {
    setUserAnswers({ ...userAnswers, [questionIndex]: answer });
  };

  const handleSubmit = () => {
    let marks = 0;
    paper.questions.forEach((question, index) => {
      if (question.type === 'multiple') {
        const correctOptions = question.options.filter(option => option.isCorrect).map(option => option.text);
        const userOptions = userAnswers[index] || [];
        if (JSON.stringify(userOptions.sort()) === JSON.stringify(correctOptions.sort())) {
          marks += getmarks;
        }
      } else {
        const correctAnswer = question.type === 'single' 
          ? question.options.find(option => option.isCorrect).text 
          : question.correctAnswer;
        
        if (userAnswers[index] === correctAnswer) {
          marks += getmarks;
        }
      }
    });
    setTotalMarks(marks);
    setSubmitted(true);
    // getmarks(marks);
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditedQuestion(paper.questions[index]);
  };

  const handleSaveClick = () => {
    onSaveQuestion(editingIndex, editedQuestion);
    setEditingIndex(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedQuestion({ ...editedQuestion, [name]: value });
  };

  const handleOptionChange = (index, newValue) => {
    const options = editedQuestion.options.map((option, optIndex) =>
      optIndex === index ? newValue : option
    );
    setEditedQuestion({ ...editedQuestion, options });
  };

  return (
    <div style={{ ...styles.paperPreview, backgroundImage: `url(${template})`, backgroundColor }}>
      <h2 style={styles.heading}>{paper.title}</h2>
      <p style={styles.description}>{paper.description}</p>
      {paper.questions.map((question, index) => (
        <div key={index} style={styles.questionContainer}>
          <Question
            question={question}
            index={index}
            submitted={submitted}
            userAnswers={userAnswers}
            handleAnswerChange={handleAnswerChange}
          />
        </div>
      ))}
      {submitted ? (
        <p style={styles.result}>
          You have scored {totalMarks} marks
        </p>
      ) : (
        <button style={styles.submitButton} onClick={handleSubmit}>
          Submit
        </button>
      )}
    </div>
  );
};

PaperPreview.propTypes = {
  paper: PropTypes.object.isRequired,
  onSaveQuestion: PropTypes.func.isRequired,
  template: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  getmarks: PropTypes.number.isRequired,
};

const styles = {
  paperPreview: {
    padding: '20px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  description: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  questionContainer: {
    marginBottom: '20px',
  },
  submitButton: {
    display: 'block',
    margin: '0 auto',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  editButton: {
    display: 'block',
    margin: '10px auto',
    padding: '5px 10px',
    backgroundColor: '#ffc107',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  result: {
    textAlign: 'center',
    fontSize: '1.2em',
    marginTop: '20px',
  },
};

export default PaperPreview;
