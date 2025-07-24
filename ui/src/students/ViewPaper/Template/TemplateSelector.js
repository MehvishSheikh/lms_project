// TemplateSelector.js
import React from 'react';
import PropTypes from 'prop-types';

const TemplateSelector = ({ templates, onTemplateChange, onClose }) => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3>Select Template</h3>
        <button style={styles.closeButton} onClick={onClose}>Close</button>
      </div>
      <div style={styles.templateList}>
        {templates.map((template, index) => (
          <div key={index} style={styles.templateItem} onClick={() => onTemplateChange(template)}>
            <img
              src={template}
              alt={`Template ${index + 1}`}
              style={styles.templateImage}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

TemplateSelector.propTypes = {
  templates: PropTypes.arrayOf(PropTypes.string).isRequired,
  onTemplateChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

const styles = {
  container: {
    padding: '10px',
    position: 'relative',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  closeButton: {
    padding: '5px 10px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  templateList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  },
  templateItem: {
    cursor: 'pointer',
    border: '1px solid #ccc',
    borderRadius: '4px',
    overflow: 'hidden',
    transition: 'transform 0.2s',
  },
  templateItemHover: {
    transform: 'scale(1.05)',
  },
  templateImage: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
  },
};

export default TemplateSelector;
