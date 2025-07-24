import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const PrintPaper = ({ paperId }) => {
  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaper = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/papers/${paperId}`);
        setPaper(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchPaper();
  }, [paperId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading paper: {error.message}</p>;
  }

  return (
    <div style={styles.paperPreview}>
      <h2>{paper.title}</h2>
      <p>{paper.description}</p>
      {paper.questions.map((question, index) => (
        <div key={index} style={styles.question}>
          <p>
            {index + 1}. {question.text}{' '}
            <span style={styles.questionType}>
              ({getQuestionTypeLabel(question.type)})
            </span>
          </p>
          {question.type === 'truefalse' ? (
            <div>
              <label style={question.correctAnswer === 'true' ? styles.correct : {}}>
                True
              </label>
              <label style={question.correctAnswer === 'false' ? styles.correct : {}}>
                False
              </label>
            </div>
          ) : (
            <ul style={styles.noBullets}>
              {question.options.map((option, optIndex) => (
                <li key={optIndex} style={option.isCorrect ? styles.correct : {}}>
                  <label>
                    {String.fromCharCode(97 + optIndex)}. {option.text}
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

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

PrintPaper.propTypes = {
  paperId: PropTypes.string.isRequired,
};

const styles = {
  paperPreview: {
    padding: '20px',
  },
  question: {
    marginBottom: '20px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    background: '#f9f9f9',
  },
  questionType: {
    fontStyle: 'italic',
    color: '#666',
  },
  noBullets: {
    listStyleType: 'none',
    padding: 0,
  },
  correct: {
    backgroundColor: '#d4edda',
    color: '#155724',
  },
};

export default PrintPaper;
