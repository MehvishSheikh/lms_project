import PropTypes from 'prop-types';
import React from 'react';

const EditForm = ({ editingIndex, editedQuestion, handleInputChange, handleOptionChange, handleSaveClick }) => (
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
                  handleOptionChange(optIndex, { ...option, isCorrect: e.target.checked });
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
);

EditForm.propTypes = {
  editingIndex: PropTypes.number.isRequired,
  editedQuestion: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleOptionChange: PropTypes.func.isRequired,
  handleSaveClick: PropTypes.func.isRequired,
};

const styles = {
  editForm: {
    marginTop: '20px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f8f9fa',
  },
  input: {
    display: 'block',
    margin: '10px 0',
    padding: '8px',
    width: '100%',
    boxSizing: 'border-box',
  },
  saveButton: {
    display: 'block',
    margin: '0 auto',
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default EditForm;
