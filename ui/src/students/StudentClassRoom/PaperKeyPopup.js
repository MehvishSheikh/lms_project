import React, { useState } from 'react';
import PropTypes from 'prop-types';

const PaperKeyPopup = ({ onClose, onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(inputValue);
  };

  return (
    <div style={styles.popupOverlay}>
      <div style={styles.popup}>
        <h3 style={styles.heading}>Enter Classroom Code</h3>
        <input type="text" value={inputValue} onChange={handleChange} style={styles.input} />
        <div style={styles.buttonContainer}>
          <button onClick={handleSubmit} style={{ ...styles.button, ...styles.submitButton }}>Submit</button>
          <button onClick={onClose} style={{ ...styles.button, ...styles.cancelButton }}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

PaperKeyPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const styles = {
  popupOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '10px',
    width: '350px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease-in-out',
  },
  heading: {
    marginBottom: '20px',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    padding: '10px 20px',
    margin: '10px 0',
    borderRadius: '5px',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  submitButton: {
    backgroundColor: '#007bff',
    color: '#fff',
  },
  cancelButton: {
    backgroundColor: '#ff4136',
    color: '#fff',
  },
};

export default PaperKeyPopup;