
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import 'bootstrap/dist/css/bootstrap.min.css';
import SavePaperButton from './Header/SavePaperButton';
import { useGlobalState } from '../Constants/GlobalStateProvider';
import { API_URL } from '../Constants/Url';
import { FiCheck, FiX } from 'react-icons/fi';

const PaperPreview = ({ paper, onEditQuestion, onDeleteQuestion, onSaveQuestion, template, backgroundColor, onClose }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedQuestion, setEditedQuestion] = useState(null);
  const { getGlobal } = useGlobalState();
  const globalState = getGlobal();

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

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditedQuestion(paper.questions[index]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedQuestion((prev) => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (index, value) => {
    setEditedQuestion((prev) => {
      const options = [...prev.options];
      options[index].text = value;
      return { ...prev, options };
    });
  };

  const handleSaveClick = () => {
    if (typeof onSaveQuestion === 'function') {
      onSaveQuestion(editingIndex, editedQuestion);
    }
    setEditingIndex(null);
    setEditedQuestion(null);
  };

  return (
    <div style={{ borderRadius: '18px', background: 'none', boxShadow: 'none', padding: 0, position: 'relative' }}>
      {onClose && (
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: 'rgba(255,255,255,0.85)',
            border: 'none',
            borderRadius: '50%',
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 1px 4px rgba(60,72,88,0.10)',
            cursor: 'pointer',
            zIndex: 10,
          }}
          aria-label="Close Preview"
        >
          <FiX size={22} color="#333" />
        </button>
      )}
      <div style={{ ...styles.paperPreview, backgroundImage: `url(${template})`, backgroundColor }}>
        <h2 style={{ textAlign: 'center', color: '#444', fontWeight: 700, marginBottom: 8 }}>Preview</h2>
        <h3 style={{ textAlign: 'center', color: '#222', fontWeight: 600, marginBottom: 4 }}>{paper.title}</h3>
        <p style={{ textAlign: 'center', color: '#444', marginBottom: 24 }}>{paper.description}</p>
        {paper.questions.map((question, index) => (
          <div key={index} style={styles.questionCard}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
              <span style={styles.questionIndex}>{index + 1}.</span>
              <span style={styles.questionText}>{question.text}</span>
              <span style={styles.questionType}>({getQuestionTypeLabel(question.type)})</span>
            </div>
            {question.type === 'truefalse' ? (
              <div style={styles.optionsRow}>
                <div style={styles.optionItem}>
                  <input type="radio" name={`question-${index}`} value="true" disabled />
                  <span style={question.correctAnswer === 'true' ? styles.correctOption : styles.optionText}>
                    True {question.correctAnswer === 'true' && <FiCheck style={styles.tickIcon} />}
                  </span>
                </div>
                <div style={styles.optionItem}>
                  <input type="radio" name={`question-${index}`} value="false" disabled />
                  <span style={question.correctAnswer === 'false' ? styles.correctOption : styles.optionText}>
                    False {question.correctAnswer === 'false' && <FiCheck style={styles.tickIcon} />}
                  </span>
                </div>
              </div>
            ) : (
              <ul style={styles.optionsList}>
                {question.options.map((option, optIndex) => (
                  <li key={optIndex} style={styles.optionItem}>
                    {question.type === 'single' ? (
                      <input type="radio" name={`question-${index}`} value={option.text} disabled />
                    ) : (
                      <input type="checkbox" name={`question-${index}`} value={option.text} disabled />
                    )}
                    <span style={option.isCorrect ? styles.correctOption : styles.optionText}>
                      {String.fromCharCode(97 + optIndex)}. {option.text} {option.isCorrect && <FiCheck style={styles.tickIcon} />}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <div style={styles.iconContainer}>
              <FontAwesomeIcon
                icon={faEdit}
                style={styles.icon}
                onClick={() => handleEditClick(index)}
              />
              <FontAwesomeIcon
                icon={faTrash}
                style={styles.icon}
                onClick={() => onDeleteQuestion(index)}
              />
            </div>
          </div>
        ))}

        {editingIndex !== null && (
          <div style={styles.editForm}>
            <h3>Edit Question</h3>
            <label>
              Question Text:
              <input
                type="text"
                name="text"
                value={editedQuestion.text}
                onChange={handleInputChange}
                style={styles.input}
              />
            </label>
            {editedQuestion.type !== 'truefalse' && (
              <div>
                {editedQuestion.options.map((option, optIndex) => (
                  <label key={optIndex}>
                    Option {String.fromCharCode(97 + optIndex)}:
                    <input
                      type="text"
                      value={option.text}
                      onChange={(e) => handleOptionChange(optIndex, e.target.value)}
                      style={styles.input}
                    />
                    <label>
                      Correct:
                      <input
                        type="checkbox"
                        checked={!!option.isCorrect}
                        onChange={(e) => {
                          setEditedQuestion((prev) => {
                            const options = [...prev.options];
                            options[optIndex].isCorrect = e.target.checked;
                            return { ...prev, options };
                          });
                        }}
                      />
                    </label>
                  </label>
                ))}
              </div>
            )}
            {editedQuestion.type === 'truefalse' && (
              <label>
                Correct Answer:
                <select
                  name="correctAnswer"
                  value={editedQuestion.correctAnswer}
                  onChange={handleInputChange}
                  style={styles.input}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </label>
            )}
            <button onClick={handleSaveClick} style={styles.saveButton}>Save</button>
          </div>
        )}
      </div>
    </div>
  );
};

PaperPreview.propTypes = {
  paper: PropTypes.object.isRequired,
  onEditQuestion: PropTypes.func.isRequired,
  onDeleteQuestion: PropTypes.func.isRequired,
  onSaveQuestion: PropTypes.func.isRequired,
  template: PropTypes.string,
  backgroundColor: PropTypes.string,
  onClose: PropTypes.func,
};

const styles = {
  paperPreview: {
    padding: '16px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '18px',
    boxShadow: 'none',
    minHeight: '200px',
  },
  questionCard: {
    marginBottom: '14px',
    padding: '10px 14px',
    borderRadius: '12px',
    background: '#f7f8fa',
    border: '1px solid #e3e6ea',
    boxShadow: '0 1px 4px rgba(60,72,88,0.04)',
    transition: 'box-shadow 0.2s',
    position: 'relative',
  },
  questionIndex: {
    fontWeight: 600,
    color: '#3a3a3a',
    marginRight: 8,
    fontSize: '1.1em',
  },
  questionText: {
    fontWeight: 500,
    color: '#222',
    marginRight: 8,
    fontSize: '1.05em',
    flex: 1,
  },
  questionType: {
    fontSize: '0.9em',
    color: '#888',
    marginLeft: 'auto',
  },
  optionsList: {
    listStyleType: 'none',
    padding: 0,
    margin: '10px 0 0 0',
  },
  optionsRow: {
    display: 'flex',
    gap: '18px',
    marginTop: 10,
    marginBottom: 10,
  },
  optionItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 6,
    fontSize: '1em',
    gap: 8,
  },
  optionText: {
    color: '#333',
    fontWeight: 400,
    marginLeft: 4,
  },
  correctOption: {
    color: '#219653',
    fontWeight: 600,
    marginLeft: 4,
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  tickIcon: {
    color: '#219653',
    fontSize: '1.1em',
    marginLeft: 4,
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '10px',
    gap: 10,
  },
  icon: {
    cursor: 'pointer',
    marginLeft: '10px',
    color: '#888',
    fontSize: '1.1em',
    transition: 'color 0.2s',
  },
  noBullets: {
    listStyleType: 'none',
    padding: '5px',
  },
  editForm: {
    marginBottom: '20px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  input: {
    display: 'block',
    margin: '10px 0',
  },
  saveButton: {
    marginTop: '10px',
    padding: '10px 20px',
    background: '#219653',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 600,
    cursor: 'pointer',
  },
};

export default PaperPreview;
