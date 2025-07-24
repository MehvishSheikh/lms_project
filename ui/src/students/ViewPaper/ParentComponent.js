
import React, { useState } from 'react';
import axios from 'axios';
import PaperPreview from './PaperPreview'; // Adjust the import path as per your project structure
import { API_URL } from '../../components/Constants/Url';

const ParentComponent = () => {
  const [paper, setPaper] = useState({
    title: 'Sample Paper',
    description: 'This is a sample description',
    questions: [
      { text: 'Sample Question 1', type: 'single', options: [{ text: 'Option 1', isCorrect: true }, { text: 'Option 2', isCorrect: false }] },
      { text: 'Sample Question 2', type: 'multiple', options: [{ text: 'Option 1', isCorrect: true }, { text: 'Option 2', isCorrect: false }] },
      { text: 'Sample Question 3', type: 'truefalse', correctAnswer: 'true' },
    ],
  });

  const handleSaveQuestion = (index, updatedQuestion) => {
    console.log('handleSaveQuestion called with:', index, updatedQuestion);
    const updatedQuestions = [...paper.questions];
    updatedQuestions[index] = updatedQuestion;
    setPaper((prevPaper) => ({ ...prevPaper, questions: updatedQuestions }));

    // Save paper to database
    axios.post('${API_URL}/api/papers/save', { ...paper, questions: updatedQuestions })
      .then(response => {
        console.log('Paper saved successfully:', response.data);
      })
      .catch(error => {
        console.error('There was an error saving the paper:', error);
      });
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = paper.questions.filter((_, i) => i !== index);
    setPaper((prevPaper) => ({ ...prevPaper, questions: updatedQuestions }));

    // Save paper to database
    axios.post('${API_URL}/api/papers/save', { ...paper, questions: updatedQuestions })
      .then(response => {
        console.log('Paper saved successfully:', response.data);
      })
      .catch(error => {
        console.error('There was an error saving the paper:', error);
      });
  };

  return (
    <div>
      <h1>Parent Component</h1>
      <PaperPreview
        paper={paper}
        onDeleteQuestion={handleDeleteQuestion}
        onSaveQuestion={handleSaveQuestion}
      />
    </div>
  );
};

export default ParentComponent;


