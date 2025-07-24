import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import SavePaper from './SavePaper';
import { FiX } from 'react-icons/fi';
import 'bootstrap/dist/css/bootstrap.min.css';

const PaperPreview = ({ paper, onEditQuestion, onDeleteQuestion, onSaveQuestion, template, backgroundColor, onClose }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedQuestion, setEditedQuestion] = useState(null);

  const getQuestionTypeLabel = (type) => {
    switch (type) {
      case 'single':
        return 'Single Answer';
      case 'multiple':
        return 'Multiple Choice';
      case 'truefalse':
        return 'True/False';
      default:
        return type;
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
      if (typeof options[index] === 'string') {
        options[index] = value;
      } else {
        options[index].text = value;
      }
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

  const renderOptions = (question) => {
    if (question.questionType === 'truefalse') {
      return (
        <div className="flex space-x-4 mt-2">
          <label className={`text-base ${question.answer === 'true' ? 'font-bold text-green-600' : ''}`}> 
            <input type="radio" name={`question-${question.id}`} value="true" disabled className="mr-2" />
            True
          </label>
          <label className={`text-base ${question.answer === 'false' ? 'font-bold text-green-600' : ''}`}> 
            <input type="radio" name={`question-${question.id}`} value="false" disabled className="mr-2" />
            False
          </label>
        </div>
      );
    }
    return (
      <ul className="space-y-2 mt-2">
        {question.options.map((option, optIndex) => {
          const isCorrect = Array.isArray(question.answer) 
            ? question.answer.includes(option)
            : option === question.answer;
          return (
            <li key={optIndex} className={`text-base ${isCorrect ? 'font-bold text-green-600' : ''}`}> 
              <label className="flex items-center">
                <input
                  type={question.questionType === 'multiple' ? 'checkbox' : 'radio'}
                  name={`question-${question.id}`}
                  disabled
                  checked={isCorrect}
                  className="mr-2"
                />
                {String.fromCharCode(97 + optIndex)}. {typeof option === 'string' ? option : option.text}
              </label>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="fixed top-0 right-0 h-full w-full max-w-2xl bg-white shadow-2xl border-l border-gray-200 z-50 flex flex-col" style={{minWidth: 480}}>
      {/* Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-5 right-6 bg-white border border-gray-300 rounded-full p-2 shadow hover:bg-gray-100 z-50"
          aria-label="Close Preview"
        >
          <FiX size={22} />
        </button>
      )}
      <div
        className="flex-1 overflow-y-auto px-10 py-8 bg-gray-50"
        style={{ backgroundImage: template ? `url(${template})` : undefined, backgroundColor }}
      >
        <h2 className="text-3xl text-center text-gray-700 mb-2 font-bold tracking-tight">Preview</h2>
        <h3 className="text-xl text-center text-gray-900 font-semibold mb-1">{paper.title}</h3>
        <p className="text-md text-center text-gray-600 mb-6">{paper.description}</p>
        <div className="flex flex-col gap-6 w-full">
          {paper.questions.map((question, index) => (
            <div key={index} className="p-5 rounded-xl border border-gray-200 bg-white shadow-sm w-full">
              <div className="flex items-center justify-between mb-2">
                <p className="text-lg font-semibold text-gray-800">
                  {index + 1}. {question.question || question.text}
                  <span className="text-sm text-gray-500 ml-2">
                    ({getQuestionTypeLabel(question.questionType || question.type)})
                  </span>
                </p>
                <div className="flex space-x-2">
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="text-blue-500 cursor-pointer hover:text-blue-700 p-2 rounded hover:bg-blue-100"
                    onClick={() => handleEditClick(index)}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-red-500 cursor-pointer hover:text-red-700 p-2 rounded hover:bg-red-100"
                    onClick={() => onDeleteQuestion(index)}
                  />
                </div>
              </div>
              {renderOptions(question)}
            </div>
          ))}
        </div>
        {editingIndex !== null && (
          <div className="p-5 mt-6 rounded-xl border border-gray-300 bg-gray-50 shadow">
            <h3 className="text-xl font-semibold mb-2">Edit Question</h3>
            <label className="block text-base font-medium mb-2">
              Question Text:
              <input
                type="text"
                name="question"
                value={editedQuestion.question || editedQuestion.text}
                onChange={(e) => setEditedQuestion({ 
                  ...editedQuestion, 
                  question: e.target.value,
                  text: e.target.value 
                })}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
            {editedQuestion && editedQuestion.questionType !== 'truefalse' && (
              <div className="space-y-3">
                {editedQuestion.options.map((option, optIndex) => (
                  <label key={optIndex} className="block">
                    Option {String.fromCharCode(97 + optIndex)}:
                    <input
                      type="text"
                      value={typeof option === 'string' ? option : option.text}
                      onChange={(e) => handleOptionChange(optIndex, e.target.value)}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <label className="inline-flex items-center ml-4">
                      Correct:
                      <input
                        type="checkbox"
                        checked={Array.isArray(editedQuestion.answer) 
                          ? editedQuestion.answer.includes(typeof option === 'string' ? option : option.text)
                          : (typeof option === 'string' ? option : option.text) === editedQuestion.answer}
                        onChange={(e) => {
                          setEditedQuestion((prev) => {
                            if (prev.questionType === 'multiple') {
                              const answer = e.target.checked 
                                ? [...(prev.answer || []), typeof option === 'string' ? option : option.text]
                                : (prev.answer || []).filter(ans => ans !== (typeof option === 'string' ? option : option.text));
                              return { ...prev, answer };
                            }
                            return { ...prev, answer: e.target.checked ? (typeof option === 'string' ? option : option.text) : null };
                          });
                        }}
                        className="ml-2"
                      />
                    </label>
                  </label>
                ))}
              </div>
            )}
            {editedQuestion && editedQuestion.questionType === 'truefalse' && (
              <label className="block text-base font-medium mb-2">
                Correct Answer:
                <select
                  name="answer"
                  value={editedQuestion.answer}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </label>
            )}
            <div className="space-y-2 mt-4">
              <label className="block text-base font-medium">
                Explanation:
                <input
                  type="text"
                  name="explanation"
                  value={editedQuestion.explanation || ''}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </label>
              <label className="block text-base font-medium">
                Reference:
                <input
                  type="text"
                  name="reference"
                  value={editedQuestion.reference || ''}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </label>
            </div>
            <button 
              onClick={handleSaveClick} 
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        )}
      </div>
      <div className="flex justify-end mt-6 sticky bottom-0 bg-white py-4 px-10 border-t border-gray-200">
        <SavePaper paper={paper} paperId={paper._id} />
      </div>
    </div>
  );
};

PaperPreview.propTypes = {
  paper: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  onEditQuestion: PropTypes.func,
  onDeleteQuestion: PropTypes.func.isRequired,
  onSaveQuestion: PropTypes.func,
  template: PropTypes.string,
  backgroundColor: PropTypes.string,
  onClose: PropTypes.func,
};

export default PaperPreview;
