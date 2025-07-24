import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useGlobalState } from '../../Constants/GlobalStateProvider';
import { API_URL } from '../../Constants/Url';
import { FiX } from 'react-icons/fi';

const SavePaper = ({ paper, paperId }) => {
  const { getGlobal } = useGlobalState();
  const globalState = getGlobal();

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleSaveClick = async () => {
    if (!globalState) {
      console.error('User ID not found in global state');
      return;
    }

    try {
      const formattedPaper = {
        ...paper,
        title,
        description,
        questions: paper.questions.map((q) => ({
          text: q.question,
          type: q.questionType,
          options: q.options.map((option) => ({
            text: typeof option === 'string' ? option : option.text,
            isCorrect: Array.isArray(q.answer) ? q.answer.includes(option) : option === q.answer,
          })),
          correctAnswer: q.questionType === 'truefalse' ? q.answer : undefined,
          reference: q.reference,
        })),
        user_id: globalState,
        current_time: new Date().toISOString(),
      };

      if (paperId) {
        await axios.put(`${API_URL}/api/papers/educator/edit/${paperId}`, formattedPaper);
        alert('Paper Updated successfully!');
      } else {
        const response = await axios.post(`${API_URL}/api/papers/save`, formattedPaper);
        alert('Paper saved successfully!');
        console.log('Paper saved:', response.data);
      }
      closeModal();
    } catch (error) {
      console.error('Error saving paper:', error);
    }
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="bg-blue-700 text-white font-semibold rounded-lg px-5 py-2 hover:bg-blue-800 transition-colors shadow-none focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Save
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-md rounded-xl border border-gray-200 p-8 relative flex flex-col gap-4">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 focus:outline-none"
              aria-label="Close"
            >
              <FiX size={24} />
            </button>
            <h2 className="text-xl font-bold mb-2 text-center">Save Paper</h2>
            <input
              type="text"
              placeholder="Paper Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 mb-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
            />
            <textarea
              placeholder="Paper Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 mb-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
              rows="4"
            />
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={handleSaveClick}
                className="bg-blue-700 text-white px-5 py-2 rounded-md hover:bg-blue-800 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Save
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-200 text-gray-700 px-5 py-2 rounded-md hover:bg-gray-300 font-medium transition-colors focus:outline-none"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

SavePaper.propTypes = {
  paper: PropTypes.object.isRequired,
  paperId: PropTypes.string,
};

export default SavePaper;
