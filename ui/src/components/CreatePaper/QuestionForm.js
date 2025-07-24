import React, { useState } from 'react';
import { BsAlignBottom } from 'react-icons/bs';

const QuestionForm = ({ onAddQuestion }) => {
  const [questionText, setQuestionText] = useState('');
  const [questionType, setQuestionType] = useState('single');
  const [options, setOptions] = useState([{ text: '', isCorrect: false }]);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index].text = value;
    setOptions(newOptions);
  };

  const handleCorrectChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index].isCorrect = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, { text: '', isCorrect: false }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddQuestion({ text: questionText, type: questionType, options });
    setQuestionText('');
    setQuestionType('single');
    setOptions([{ text: '', isCorrect: false }]);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.formGroup}>
        <label style={styles.label}>Question Text:</label>
        <input
          type="text"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          required
          style={styles.input}
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Question Type:</label>
        <select
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value)}
          style={styles.select}
        >
          <option value="single">Single Answer</option>
          <option value="multiple">Multiple Answers</option>
          <option value="truefalse">True/False</option>
        </select>
      </div>
      {questionType !== 'truefalse' && (
        <div style={styles.formGroup}>
          <br/>
           <button type="button" onClick={addOption} style={styles.addButton}>
            Add Option
          </button>
          <br/>
          <label style={styles.label1}>Options:</label>
          {options.map((option, index) => (
            <div key={index} style={styles.option}>
              <input
                type="text"
                value={option.text}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                required
                style={styles.input}
              />
              <label>
                Correct:
                <input
                  type="checkbox"
                  checked={option.isCorrect}
                  onChange={(e) => handleCorrectChange(index, e.target.checked)}
                />
              </label>
            </div>
          ))}
         
        </div>
      )}
      {questionType === 'truefalse' && (
        <div style={styles.formGroup}>
          <label>
            Correct:
            <select
              onChange={(e) =>
                setOptions([{ text: e.target.value, isCorrect: true }])
              }
              style={styles.select}
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </label>
        </div>
      )}
      <button type="submit" style={styles.button}>
        Add Question
      </button>
    </form>
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
  label: {
    color: '#042659', // Color for the label text
    marginRight: '10px',
    fontWeight: 'bold',
    fontSize: '16px',
  },
  label1: {
    color: '#ef6603', // Color for the label text
    marginRight: '10px',
    fontWeight: 'bold',
    fontSize: '16px',
  },
  formGroup: {
    marginBottom: '10px',
  },
  input: {
    width: '100%',
    padding: '8px',
    boxSizing: 'border-box',
  },
  select: {
    width: '100%',
    padding: '8px',
    boxSizing: 'border-box',
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
    marginLeft: '10px',
  },
  addButton: {
    padding: '14px 28px',
    backgroundColor: '#042659',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
    marginLeft: '140px',
    
  },
  option: {
    marginBottom: '10px',
  },
};

export default QuestionForm;
