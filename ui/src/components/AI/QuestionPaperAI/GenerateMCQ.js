import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';

// Initialize Google Generative AI
const google = createGoogleGenerativeAI({
  apiKey: 'AIzaSyB733f2vtcr8qLRwdr7h-xnNYjwMOoesn4',
});
//'AIzaSyD6B8FQ19KeeWxBa_wJSQexiDhsk8AHrjk',
// Define the schema for a question with an added 'reference' field
const questionSchema = z.object({
  questionType: z.enum(['MCQ', 'SingleChoice', 'TrueFalse']),
  question: z.string(),
  options: z.array(z.string()).optional(),
  answer: z.string(),
  explanation: z.string(),
  reference: z.string().optional(), // Added 'reference' field to include contextual info
});

// Define the schema for an array of questions
const questionArraySchema = z.array(questionSchema);

// Async function to generate MCQs, Single Choice, or True/False questions
export const GenerateQuestions = async (topic, numQuestions, context, questionType) => {
  try {
    // Create a prompt based on the selected question type
    let promptType;

    if (questionType === 'TrueFalse') {
      promptType = `Generate ${numQuestions} True/False questions on the topic "${topic}" with references. Context: "${context}". give explanation and reference also`;
    } else if (questionType === 'SingleChoice') {
      promptType = `Generate ${numQuestions} single-choice questions (only one correct answer) on the topic "${topic}" with references. Context: "${context}".give explanation and reference also`;
    } else if (questionType === 'MCQ') {
      promptType = `Generate ${numQuestions} multiple-choice questions (with more than one correct answer) on the topic "${topic}" with references. Context: "${context}".give explanation and reference also`;
    } else {
      throw new Error('Invalid question type selected.');
    }

    // Call the generative AI model to generate questions
    const result = await generateObject({
      model: google('models/gemini-1.5-flash'),
      schema: questionArraySchema,
      prompt: promptType,
    });

    console.log('Raw result:', result);

    // Validate the result using the Zod schema
    const parsedResult = questionArraySchema.safeParse(result.object);

    if (parsedResult.success) {
      return parsedResult.data;  // Return the validated array of questions
    } else {
      console.error('Validation error details:', parsedResult.error);
      throw new Error('Validation error: The generated questions do not match the expected format.');
    }
  } catch (error) {
    console.error('Error generating questions:', error);
    throw new Error('An error occurred while generating questions.');
  }
};

  
// import { createGoogleGenerativeAI } from '@ai-sdk/google';
// import { generateObject } from 'ai';
// import { z } from 'zod';

// // Initialize Google Generative AI
// const google = createGoogleGenerativeAI({
//   apiKey: 'AIzaSyD6B8FQ19KeeWxBa_wJSQexiDhsk8AHrjk',
// });

// // Define the schema for a question
// const questionSchema = z.object({
//   questionType: z.enum(['MCQ', 'SingleChoice', 'TrueFalse']),  // Added 'SingleChoice' type
//   question: z.string(),
//   options: z.array(z.string()).optional(),  // 'options' are optional for True/False questions
//   answer: z.string(),
//   explanation: z.string().optional(),
// });

// // Define the schema for an array of questions
// const questionArraySchema = z.array(questionSchema);

// // Async function to generate MCQs, Single Choice, or True/False questions
// export const GenerateQuestions = async (topic, numQuestions, context, questionType) => {
//   try {
//     // Create a prompt based on the selected question type
//     let promptType;

//     if (questionType === 'TrueFalse') {
//       promptType = `Generate ${numQuestions} True/False questions on the topic "${topic}" Given Context "${context}".`;
//     } else if (questionType === 'SingleChoice') {
//       promptType = `Generate ${numQuestions} single-choice questions (only one correct answer) on the topic "${topic}" Given Context "${context}".`;
//     } else if (questionType === 'MCQ') {
//       promptType = `Generate ${numQuestions} multiple-choice questions (with more than one correct answer) on the topic "${topic}" Given Context "${context}" Generate based on context.`;
//     } else {
//       throw new Error('Invalid question type selected.');
//     }

//     // Call the generative AI model to generate questions
//     const result = await generateObject({
//       model: google('models/gemini-1.5-flash'),
//       schema: questionArraySchema,
//       prompt: promptType,
//     });

//     console.log('Raw result:', result);

//     // Validate the result using the Zod schema
//     const parsedResult = questionArraySchema.safeParse(result.object);

//     if (parsedResult.success) {
//       return parsedResult.data;  // Return the validated array of questions
//     } else {
//       console.error('Validation error details:', parsedResult.error);
//       throw new Error('Validation error: The generated questions do not match the expected format.');
//     }
//   } catch (error) {
//     console.error('Error generating questions:', error);
//     throw new Error('An error occurred while generating questions.');
//   }
// };
