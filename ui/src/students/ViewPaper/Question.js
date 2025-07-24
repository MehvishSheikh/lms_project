// import React from 'react';
// import PropTypes from 'prop-types';
// import QuestionOptions from './QuestionOptions';

// const Question = ({ question, index, submitted, userAnswers, handleAnswerChange }) => {
//   const isCorrectAnswer = () => {
//     if (!submitted) return null;

//     if (question.type === 'truefalse' || question.type === 'single') {
//       return userAnswers[index] === question.isCorrect;
//     } else if (question.type === 'multiple') {
//       const correctOptions = question.options
//         .filter(option => option.isCorrect)
//         .map(option => option.text);
//       const userOptions = userAnswers[index] || [];
//       return JSON.stringify(correctOptions.sort()) === JSON.stringify(userOptions.sort());
//     }

//     return null;
//   };

//   return (
//     <div style={styles.questionContainer}>
//       <p>{index + 1}. {question.text}</p>
//       <QuestionOptions
//         question={question}
//         index={index}
//         submitted={submitted}
//         userAnswers={userAnswers}
//         handleAnswerChange={handleAnswerChange}
//       />
//       {submitted && (
//         <div style={isCorrectAnswer() ? styles.correctAnswer : styles.incorrectAnswer}>
//           <p>
//             {isCorrectAnswer()
//               ? `Your Answer: ${userAnswers[index]} (Correct)`
//               : `Your Answer: ${userAnswers[index]} (Incorrect)`}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// Question.propTypes = {
//   question: PropTypes.object.isRequired,
//   index: PropTypes.number.isRequired,
//   submitted: PropTypes.bool.isRequired,
//   userAnswers: PropTypes.object.isRequired,
//   handleAnswerChange: PropTypes.func.isRequired,
// };

// const styles = {
//   questionContainer: {
//     marginBottom: '20px',
//     padding: '20px'
//   },
//   correctAnswer: {
//     color: 'green',
//     fontWeight: 'bold',
//   },
//   incorrectAnswer: {
//     color: 'red',
//     fontWeight: 'bold',
//   },
// };

// export default Question;


import React from 'react';
import PropTypes from 'prop-types';
import QuestionOptions from './QuestionOptions';

const Question = ({ question, index, submitted, userAnswers, handleAnswerChange }) => {
  const isCorrectAnswer = () => {
    if (!submitted) return null;

    if (question.type === 'truefalse') {
      return userAnswers[index] === question.correctAnswer;
    } else if (question.type === 'single') {
      const correctOption = question.options.find(option => option.isCorrect).text;
      return userAnswers[index] === correctOption;
    } else if (question.type === 'multiple') {
      const correctOptions = question.options
        .filter(option => option.isCorrect)
        .map(option => option.text);
      const userOptions = userAnswers[index] || [];
      return JSON.stringify(correctOptions.sort()) === JSON.stringify(userOptions.sort());
    }

    return null;
  };

  return (
    <div style={styles.questionContainer}>
      <p>{index + 1}. {question.text}</p>
      <QuestionOptions
        question={question}
        index={index}
        submitted={submitted}
        userAnswers={userAnswers}
        handleAnswerChange={handleAnswerChange}
      />
      {submitted && (
        <div style={isCorrectAnswer() ? styles.correctAnswer : styles.incorrectAnswer}>
          <p>
            {isCorrectAnswer()
              ? `Your Answer: ${userAnswers[index]} (Correct)`
              : `Your Answer: ${userAnswers[index]} (Incorrect)`}
          </p>
        </div>
      )}
    </div>
  );
};

Question.propTypes = {
  question: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  submitted: PropTypes.bool.isRequired,
  userAnswers: PropTypes.object.isRequired,
  handleAnswerChange: PropTypes.func.isRequired,
};

const styles = {
  questionContainer: {
    marginBottom: '20px',
    padding: '20px'
  },
  correctAnswer: {
    color: 'green',
    fontWeight: 'bold',
  },
  incorrectAnswer: {
    color: 'red',
    fontWeight: 'bold',
  },
};

export default Question;
