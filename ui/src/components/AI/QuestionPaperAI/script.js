import { GenerateMCQ } from "./GenerateMCQ";

document.getElementById('generateButton').addEventListener('click', async () => {
  const topic = document.getElementById('topicInput').value;
  const numQuestions = parseInt(document.getElementById('numQuestionsInput').value, 10);
  const questionPaperContainer = document.getElementById('question-paper');
  
  // Clear any previous questions
  questionPaperContainer.innerHTML = '';

  if (!topic || numQuestions <= 0) {
      alert('Please enter a valid topic and number of questions.');
      return;
  }

  try {
      // Generate MCQs
      const mcqs = await GenerateMCQ(topic, numQuestions);

      // Display the MCQs
      mcqs.forEach((mcq, index) => {
          const questionBlock = document.createElement('div');
          questionBlock.className = 'question-block';

          // Create a unique ID for each question to handle radio button clicks
          const questionId = `question-${index}`;

          questionBlock.innerHTML = `
              <h5>Question ${index + 1}: ${mcq.question}</h5>
              <div class="form-group">
                  ${mcq.options.map((option, i) => `
                      <div class="form-check">
                          <input class="form-check-input" type="radio" name="${questionId}" id="${questionId}-option-${i}" value="${option}" />
                          <label class="form-check-label" for="${questionId}-option-${i}">
                              ${option}
                          </label>
                      </div>
                  `).join('')}
              </div>
              <div class="answer-explanation" id="${questionId}-info" style="display: none;">
                  <strong>Answer:</strong> ${mcq.answer}<br />
                  ${mcq.explanation ? `<strong>Explanation:</strong> ${mcq.explanation}` : ''}
              </div>
          `;

          // Append the question block to the container
          questionPaperContainer.appendChild(questionBlock);

          // Add event listeners to show answer and explanation on radio button selection
          mcq.options.forEach((_, i) => {
              const optionRadio = document.getElementById(`${questionId}-option-${i}`);
              optionRadio.addEventListener('change', () => {
                  document.querySelectorAll(`#${questionId}-info`).forEach(info => info.style.display = 'block');
              });
          });
      });
  } catch (error) {
      console.error('Error generating MCQs:', error);
      alert('An error occurred while generating MCQs.');
  }
});
