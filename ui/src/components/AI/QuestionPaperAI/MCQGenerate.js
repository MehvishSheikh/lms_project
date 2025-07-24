// import React, { useState } from 'react';
// import { GenerateMCQ } from './GenerateMCQ'; // Ensure the path is correct

// const MCQGenerate = ({ onGenerate }) => {
//     const [topic, setTopic] = useState('');
//     const [numQuestions, setNumQuestions] = useState(5);
//     const [error, setError] = useState('');

//     const handleGenerateClick = async () => {
//         setError('');

//         if (!topic || numQuestions <= 0) {
//             setError('Please enter a valid topic and number of questions.');
//             return;
//         }

//         try {
//             const mcqs = await GenerateMCQ(topic, numQuestions);
//             onGenerate(mcqs);
//         } catch (err) {
//             console.error('Error generating MCQs:', err);
//             setError('An error occurred while generating MCQs.');
//         }
//     };

//     return React.createElement('div', { className: 'form-group' },
//         React.createElement('label', { htmlFor: 'topicInput' }, 'Topic:'),
//         React.createElement('input', {
//             type: 'text',
//             id: 'topicInput',
//             className: 'form-control',
//             value: topic,
//             onChange: (e) => setTopic(e.target.value),
//             placeholder: 'Enter topic',
//         }),
//         React.createElement('label', { htmlFor: 'numQuestionsInput' }, 'Number of Questions:'),
//         React.createElement('input', {
//             type: 'number',
//             id: 'numQuestionsInput',
//             className: 'form-control',
//             min: '1',
//             value: numQuestions,
//             onChange: (e) => setNumQuestions(parseInt(e.target.value, 10)),
//         }),
//         React.createElement('button', {
//             onClick: handleGenerateClick,
//             className: 'btn btn-primary mt-2',
//         }, 'Generate Questions'),
//         error && React.createElement('div', { className: 'text-danger' }, error)
//     );
// };

// export default MCQGenerate;

// import React, { useState } from 'react';
// import { GenerateQuestions } from './GenerateMCQ'; // Ensure the path is correct

// const MCQGenerate = ({ onGenerate }) => {
//     const [topic, setTopic] = useState('');
//     const [numQuestions, setNumQuestions] = useState(5);
//     const [questionType, setQuestionType] = useState('MCQ');  // Add question type
//     const [error, setError] = useState('');

//     const handleGenerateClick = async () => {
//         setError('');

//         if (!topic || numQuestions <= 0) {
//             setError('Please enter a valid topic and number of questions.');
//             return;
//         }

//         try {
//             const questions = await GenerateQuestions(topic, numQuestions, "Relevant context", questionType);
//             onGenerate(questions);
//         } catch (err) {
//             console.error('Error generating questions:', err);
//             setError('An error occurred while generating questions.');
//         }
//     };

//     return (
//         <div className="form-group">
//             <label htmlFor="topicInput">Topic:</label>
//             <input
//                 type="text"
//                 id="topicInput"
//                 className="form-control"
//                 value={topic}
//                 onChange={(e) => setTopic(e.target.value)}
//                 placeholder="Enter topic"
//             />
//             <label htmlFor="numQuestionsInput">Number of Questions:</label>
//             <input
//                 type="number"
//                 id="numQuestionsInput"
//                 className="form-control"
//                 min="1"
//                 value={numQuestions}
//                 onChange={(e) => setNumQuestions(parseInt(e.target.value, 10))}
//             />
//             <label htmlFor="questionTypeSelect">Question Type:</label>
//             <select
//                 id="questionTypeSelect"
//                 className="form-control"
//                 value={questionType}
//                 onChange={(e) => setQuestionType(e.target.value)}
//             >
//                 <option value="MCQ">Multiple Choice (MCQ)</option>
//                 <option value="TrueFalse">True/False</option>
//                 <option value="SingleChoice">Single Choice</option> {/* Added Single Choice */}
//             </select>
//             <button onClick={handleGenerateClick} className="btn btn-primary mt-2">
//                 Generate Questions
//             </button>
//             {error && <div className="text-danger">{error}</div>}
//         </div>
//     );
// };

// export default MCQGenerate;

import React, { useState } from 'react';
import axios from 'axios';
import { GenerateQuestions } from './GenerateMCQ';
import { useGlobalState } from '../../Constants/GlobalStateProvider';

const MCQGenerate = ({ onGenerate ,gtopic, gsetquestionType}) => {
    const [topic, setTopic] = useState('');
    const [numQuestions, setNumQuestions] = useState(5);
    const [questionType, setQuestionType] = useState('MCQ');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { getGlobal } = useGlobalState();
    const globalState = getGlobal();

    // Function to get the context from the Flask backend
    const fetchContext = async () => {
        try {
            const response = await axios.post('http://localhost:5002/chat', {
                message: `Generate context for ${topic}`,
                session_id: '123', // Replace with dynamic session_id if available
                user_id: globalState, // Replace with dynamic user_id if available
            });
            return response.data.response;
        } catch (error) {
            console.error('Error fetching context:', error);
            setError('Failed to fetch context.');
            return null;
        }
    };

    const handleGenerateClick = async () => {
        setError('');
        setLoading(true);

        if (!topic || numQuestions <= 0) {
            setError('Please enter a valid topic and number of questions.');
            setLoading(false);
            return;
        }

        try {
            const context = await fetchContext();
            // if (!context) {
            //     setLoading(false);
            //     return;
            // }
            const questions = await GenerateQuestions(topic, numQuestions, context, questionType);
            onGenerate(questions);
            gtopic(context);
            gsetquestionType(questionType);
        } catch (err) {
            console.error('Error generating questions:', err);
            setError('An error occurred while generating questions.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-6 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Generate Questions</h2>
            <div>
                <label htmlFor="topicInput" className="block text-gray-700 font-medium mb-1">Topic</label>
                <input
                    type="text"
                    id="topicInput"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter topic"
                />
            </div>
            <div>
                <label htmlFor="numQuestionsInput" className="block text-gray-700 font-medium mb-1">Number of Questions</label>
                <input
                    type="number"
                    id="numQuestionsInput"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                    value={numQuestions}
                    onChange={(e) => setNumQuestions(parseInt(e.target.value, 10))}
                />
            </div>
            <div>
                <label htmlFor="questionTypeSelect" className="block text-gray-700 font-medium mb-1">Question Type</label>
                <select
                    id="questionTypeSelect"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={questionType}
                    onChange={(e) => setQuestionType(e.target.value)}
                >
                    <option value="MCQ">Multiple Choice (MCQ)</option>
                    <option value="TrueFalse">True/False</option>
                    <option value="SingleChoice">Single Choice</option>
                </select>
            </div>
            <button
                onClick={handleGenerateClick}
                className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={loading}
            >
                {loading ? (
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                    </svg>
                ) : null}
                Generate Questions
            </button>
            {error && <div className="text-red-600 bg-red-50 border border-red-200 rounded-lg p-2 text-center">{error}</div>}
        </div>
    );
};

export default MCQGenerate;
