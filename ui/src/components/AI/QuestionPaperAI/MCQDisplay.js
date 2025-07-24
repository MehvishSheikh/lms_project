import React, { useState } from 'react';
import { FiRefreshCw, FiTrash2, FiPlus, FiInfo, FiCheck } from 'react-icons/fi';
import { GenerateQuestions } from './GenerateMCQ';
import axios from 'axios';
import { useGlobalState } from '../../Constants/GlobalStateProvider';

const MCQDisplay = ({ mcqs, context, setMCQs, questionType, addQuestionToPreview, addedQuestions = [] }) => {
    const [showAnswers, setShowAnswers] = useState(false);
    const [visibleReferences, setVisibleReferences] = useState({});
    const [error, setError] = useState('');
    const [topic, settopic] = useState('');
    const [loading, setLoading] = useState(false);
    const { getGlobal } = useGlobalState();
    const globalState = getGlobal();
    if (mcqs.length === 0) {
        return <div className="text-center text-gray-500 mt-4">No questions generated yet.</div>;
    }

    const handleShowAnswersClick = () => {
        setShowAnswers(!showAnswers);
    };

    const handleReloadQuestion = async (index) => {
        setError('');
        setLoading(true);
        try {
            settopic("based on context generate")
            const newQuestion = await GenerateQuestions(topic, 1, context, questionType);
            const updatedMCQs = [...mcqs];
            updatedMCQs[index] = newQuestion[0];
            setMCQs(updatedMCQs);
        } catch (err) {
            setError('An error occurred while regenerating the question.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteQuestion = (index) => {
        const updatedMCQs = mcqs.filter((_, i) => i !== index);
        setMCQs(updatedMCQs);
    };

    const handleAddQuestion = (index) => {
        const selectedQuestion = mcqs[index];
        addQuestionToPreview(selectedQuestion);
    };

    const toggleReferenceVisibility = (index) => {
        setVisibleReferences((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    // Helper to check if a question is added (by question text)
    const isQuestionAdded = (mcq) =>
        addedQuestions && addedQuestions.some(q => (q.question || q.text) === (mcq.question || mcq.text));

    return (
        <div className="mt-4 flex flex-col gap-4 items-center w-full">
            {mcqs.map((mcq, index) => {
                const questionId = `question-${index}`;
                const isAdded = isQuestionAdded(mcq);
                return (
                    <div
                        key={questionId}
                        className={`relative border rounded-lg bg-white transition-all flex flex-col w-full max-w-3xl ${isAdded ? 'border-green-500 bg-green-50' : 'border-gray-200'} ${!isAdded ? 'hover:shadow-md' : ''}`}
                        style={{ padding: '14px 18px', minWidth: 0 }}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <h5 className="text-base font-semibold text-gray-800 flex-1">
                                <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold mr-2">
                                    {mcq.questionType || 'MCQ'}
                                </span>
                                Question {index + 1}: {mcq.question}
                            </h5>
                            <div className="flex items-center space-x-2 ml-2">
                                <button onClick={() => handleReloadQuestion(index)} title="Reload Question" className="p-1 rounded hover:bg-blue-100 transition-colors">
                                    <FiRefreshCw className="text-gray-500 hover:text-blue-600" />
                                </button>
                                <button onClick={() => handleDeleteQuestion(index)} title="Delete Question" className="p-1 rounded hover:bg-red-100 transition-colors">
                                    <FiTrash2 className="text-gray-500 hover:text-red-600" />
                                </button>
                                <button
                                    onClick={() => handleAddQuestion(index)}
                                    title={isAdded ? "Added" : "Add to Preview"}
                                    className={`p-1 rounded transition-colors ${isAdded ? 'bg-green-100' : 'hover:bg-green-100'}`}
                                    disabled={isAdded}
                                >
                                    {isAdded ? <FiCheck className="text-green-600" /> : <FiPlus className="text-gray-500 hover:text-green-600" />}
                                </button>
                                <button onClick={() => toggleReferenceVisibility(index)} title="Show/Hide Reference" className="p-1 rounded hover:bg-purple-100 transition-colors">
                                    <FiInfo className="text-gray-500 hover:text-purple-600" />
                                </button>
                            </div>
                        </div>
                        {visibleReferences[index] && mcq.reference && (
                            <div className="mt-3 bg-purple-50 p-3 rounded-lg border-l-4 border-purple-500 text-gray-700">
                                <strong className="text-purple-700">Reference:</strong> {mcq.reference}
                            </div>
                        )}
                        {/* MCQ, True/False, SingleChoice rendering (unchanged) */}
                        {mcq.questionType === 'MCQ' && (
                            <div className="space-y-2 mt-3">
                                {mcq.options.map((option, i) => (
                                    <div key={`${questionId}-option-${i}`} className="flex items-center space-x-2">
                                        <input
                                            className="form-check-input h-4 w-4 border-gray-300 rounded text-blue-600"
                                            type="checkbox"
                                            name={questionId}
                                            id={`${questionId}-option-${i}`}
                                            value={option}
                                        />
                                        <label className="text-gray-700" htmlFor={`${questionId}-option-${i}`}>
                                            {option}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* True/False Question Handling */}
                        {mcq.questionType === 'TrueFalse' && (
                            <div className="space-y-2 mt-3">
                                <div className="flex items-center space-x-2">
                                    <input
                                        className="form-check-input h-4 w-4 border-gray-300 rounded text-blue-600"
                                        type="radio"
                                        name={questionId}
                                        id={`${questionId}-option-true`}
                                        value="True"
                                    />
                                    <label className="text-gray-700" htmlFor={`${questionId}-option-true`}>
                                        True
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        className="form-check-input h-4 w-4 border-gray-300 rounded text-blue-600"
                                        type="radio"
                                        name={questionId}
                                        id={`${questionId}-option-false`}
                                        value="False"
                                    />
                                    <label className="text-gray-700" htmlFor={`${questionId}-option-false`}>
                                        False
                                    </label>
                                </div>
                            </div>
                        )}

                        {/* Single Choice Question Handling */}
                        {mcq.questionType === 'SingleChoice' && (
                            <div className="space-y-2 mt-3">
                                {mcq.options.map((option, i) => (
                                    <div key={`${questionId}-option-${i}`} className="flex items-center space-x-2">
                                        <input
                                            className="form-check-input h-4 w-4 border-gray-300 rounded text-blue-600"
                                            type="radio"
                                            name={questionId}
                                            id={`${questionId}-option-${i}`}
                                            value={option}
                                        />
                                        <label className="text-gray-700" htmlFor={`${questionId}-option-${i}`}>
                                            {option}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Show Answers and Explanations */}
                        {showAnswers && (
                            <div className="mt-4 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                                <strong className="text-blue-700">Answer:</strong> {mcq.answer}
                                {mcq.explanation && (
                                    <div className="mt-2 text-gray-700">
                                        <strong className="text-blue-700">Explanation:</strong> {mcq.explanation}
                                    </div>
                                )}
                            </div>
                        )}
                        {error && <div className="text-red-600 mt-2">{error}</div>}
                    </div>
                );
            })}
            <button
                onClick={handleShowAnswersClick}
                className="fixed bottom-8 right-8 z-50 px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition duration-200"
            >
                {showAnswers ? 'Hide Answers' : 'Show Answers'}
            </button>
        </div>
    );
};

export default MCQDisplay;
