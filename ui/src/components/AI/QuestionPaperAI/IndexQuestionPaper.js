// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { useGlobalState } from '../../Constants/GlobalStateProvider';
// import Header from '../../Header/Header';
// import Sidebar from '../../Sidebar/Sidebar';
// import MCQDisplay from './MCQDisplay';
// import MCQGenerate from './MCQGenerate';
// import axios from 'axios';
// import ReactMarkdown from 'react-markdown';
// import { API_URL } from '../../Constants/Url';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import PaperPreview from '../../CreatePaper/PaperPreview';

// const IndexQuestionPaper = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [userInfo, setUserInfo] = useState(null);
//   const [mcqs, setMcqs] = useState([]);
//   const [showSummary, setShowSummary] = useState(false);
//   const location = useLocation();
//   const [gtopic, setgtopic] = useState('');
//   const [questionType, setquestionType] = useState('');
//   const { knowledge_id, summary, knowledge_name } = location.state || {};
//   const { getGlobal } = useGlobalState();
//   const globalState = getGlobal();

//   useEffect(() => {
//     const handleViewportChange = () => {
//       const isMobile = window.matchMedia('(max-width: 991.98px)').matches;
//       setIsSidebarOpen(!isMobile);
//     };
//     handleViewportChange();
//     window.addEventListener('resize', handleViewportChange);
//     return () => window.removeEventListener('resize', handleViewportChange);
//   }, []);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   useEffect(() => {
//     if (globalState) fetchUserInfo(globalState);
//   }, [globalState]);

//   const fetchUserInfo = async (globalState) => {
//     try {
//       const response = await axios.get(`${API_URL}/api/auth/educator/${globalState}`);
//       const data = response.data;
//       if (data.success) setUserInfo(data);
//     } catch (error) {
//       console.error('Error fetching user info:', error);
//     }
//   };

//   useEffect(() => {
//     const sendUserData = async () => {
//       try {
//         const payload = {
//           unique_index_name: knowledge_id,
//           knowledge_summary: summary,
//           knowledge_name: knowledge_name,
//           user_id: globalState,
//         };
//         const response = await axios.post('http://localhost:5002/set', payload);
//         console.log('Flask response:', response.data);
//       } catch (error) {
//         console.error('Error sending data to Flask:', error);
//       }
//     };
//     if (knowledge_id && summary && globalState) sendUserData();
//   }, [knowledge_id, summary, knowledge_name, globalState]);

//   const handleGenerate = (generatedMcqs) => setMcqs(generatedMcqs);

//   const toggleSummaryVisibility = () => setShowSummary(!showSummary);

//   return (
//     <div className="bg-gray-100 w-full min-h-screen p-1">
//       <Header toggleSidebar={toggleSidebar} user_id={globalState} />
//       <div className={`flex ${isSidebarOpen && window.innerWidth > 991.98 ? 'ml-64' : ''}`}>
//         <Sidebar isOpen={isSidebarOpen} closeSidebar={toggleSidebar} />

//         <div className="bg-white rounded-lg shadow-lg p-16 w-full mx-auto my-12">
//           <h2 className="text-2xl font-semibold text-gray-800">Knowledge Details</h2>
//           {knowledge_id && (
//             <p className="text-lg mt-2 text-gray-700">
//               <strong>Knowledge:</strong> {knowledge_name}
//             </p>
//           )}
//           <div className="flex items-center mt-4">
//             <p className="text-lg text-gray-700 mr-2"><strong>Summary:</strong></p>
//             <button onClick={toggleSummaryVisibility} className="text-blue-500 hover:text-blue-700 focus:outline-none ml-2">
//               {showSummary ? <FaEyeSlash /> : <FaEye />}
//             </button>
//           </div>
//           {showSummary && (
//             <ReactMarkdown
//               className="prose prose-blue mt-4"
//               children={summary}
//               components={{
//                 p: ({ node, ...props }) => <p className="my-2 text-gray-600" {...props} />,
//                 em: ({ node, ...props }) => <em className="text-blue-500" {...props} />,
//               }}
//             />
//           )}

//           <div className="mt-8">
//             <MCQGenerate onGenerate={handleGenerate} gtopic={setgtopic} gsetquestionType={setquestionType}/>
//           </div>
//           <div className="mt-8">
//             <MCQDisplay mcqs={mcqs} context={gtopic} setMCQs={setMcqs} questionType={questionType}/>
//             <PaperPreview/>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default IndexQuestionPaper;



import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useGlobalState } from '../../Constants/GlobalStateProvider';
import Header from '../../Header/Header';
import Sidebar from '../../Sidebar/Sidebar';
import MCQDisplay from './MCQDisplay';
import MCQGenerate from './MCQGenerate';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { API_URL } from '../../Constants/Url';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import PaperPreview from './PaperPreview'; // Ensure correct import

const IndexQuestionPaper = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [mcqs, setMcqs] = useState([]);
  const [showSummary, setShowSummary] = useState(false);
  const [showPaperPreview, setShowPaperPreview] = useState(false);
  const [paper, setPaper] = useState({
    title: '',
    description: '',
    questions: []  // This array will contain the questions added from MCQDisplay
  });
  const [backgroundColor, setBackgroundColor] = useState('#ffffff'); // Example background color
  const location = useLocation();
  const [gtopic, setgtopic] = useState('');
  const [questionType, setquestionType] = useState('');
  const { knowledge_id, summary, knowledge_name } = location.state || {};
  const { getGlobal } = useGlobalState();
  const globalState = getGlobal();

  useEffect(() => {
    const handleViewportChange = () => {
      const isMobile = window.matchMedia('(max-width: 991.98px)').matches;
      setIsSidebarOpen(!isMobile);
    };
    handleViewportChange();
    window.addEventListener('resize', handleViewportChange);
    return () => window.removeEventListener('resize', handleViewportChange);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (globalState) fetchUserInfo(globalState);
  }, [globalState]);

  const fetchUserInfo = async (globalState) => {
    try {
      const response = await axios.get(`${API_URL}/api/auth/educator/${globalState}`);
      const data = response.data;
      if (data.success) setUserInfo(data);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  useEffect(() => {
    const sendUserData = async () => {
      try {
        const payload = {
          unique_index_name: knowledge_id,
          knowledge_summary: summary,
          knowledge_name: knowledge_name,
          user_id: globalState,
        };
        const response = await axios.post('http://localhost:5002/set', payload);
        console.log('Flask response:', response.data);
      } catch (error) {
        console.error('Error sending data to Flask:', error);
      }
    };
    if (knowledge_id && summary && globalState) sendUserData();
  }, [knowledge_id, summary, knowledge_name, globalState]);

  const handleGenerate = (generatedMcqs) => setMcqs(generatedMcqs);

  const toggleSummaryVisibility = () => setShowSummary(!showSummary);

  const togglePaperPreview = () => setShowPaperPreview(!showPaperPreview);

  const onEditQuestion = (index, updatedQuestion) => {
    setPaper((prevPaper) => {
      const updatedQuestions = [...prevPaper.questions];
      updatedQuestions[index] = updatedQuestion;
      return { ...prevPaper, questions: updatedQuestions };
    });
  };

  const onDeleteQuestion = (index) => {
    setPaper((prevPaper) => {
      const updatedQuestions = prevPaper.questions.filter((_, qIndex) => qIndex !== index);
      return { ...prevPaper, questions: updatedQuestions };
    });
  };

  const onSaveQuestion = (index, updatedQuestion) => {
    onEditQuestion(index, updatedQuestion);
  };

  const handleAddQuestion = (question) => {
    setPaper((prevPaper) => ({
      ...prevPaper,
      questions: [...prevPaper.questions, question],
    }));
  };
  return (
    <div className="bg-gray-100 w-full min-h-screen p-1">
      <Header toggleSidebar={toggleSidebar} user_id={globalState} />
      <div className={`flex flex-col md:flex-row ${isSidebarOpen && window.innerWidth > 991.98 ? 'md:ml-64' : ''}`}>
        <Sidebar isOpen={isSidebarOpen} closeSidebar={toggleSidebar} />
        <div className="flex-1 flex flex-col items-center">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-4xl mx-auto my-12 relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Knowledge Details</h2>
            {knowledge_id && (
              <p className="text-lg mt-2 text-gray-700">
                <strong>Knowledge:</strong> {knowledge_name}
              </p>
            )}
            <div className="flex items-center mt-4">
              <p className="text-lg text-gray-700 mr-2"><strong>Summary:</strong></p>
              <button onClick={toggleSummaryVisibility} className="text-blue-500 hover:text-blue-700 focus:outline-none ml-2">
                {showSummary ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {showSummary && (
              <ReactMarkdown
                className="prose prose-blue mt-4"
                children={summary}
                components={{
                  p: ({ node, ...props }) => <p className="my-2 text-gray-600" {...props} />,
                  em: ({ node, ...props }) => <em className="text-blue-500" {...props} />,
                }}
              />
            )}
            <div className="mt-8">
              <MCQGenerate onGenerate={handleGenerate} gtopic={setgtopic} gsetquestionType={setquestionType} />
            </div>
            <div className="mt-8">
              <MCQDisplay mcqs={mcqs} context={gtopic} setMCQs={setMcqs} questionType={questionType} addQuestionToPreview={handleAddQuestion} />
              <div className="flex justify-end mt-6">
                <button
                  onClick={togglePaperPreview}
                  className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-colors"
                >
                  Open Preview
                </button>
              </div>
            </div>
            {/* Slideable Paper Preview */}
            <div
              className={`fixed top-0 right-0 h-full w-full max-w-2xl bg-gray-200 shadow-2xl overflow-y-auto z-[9999] border-l border-gray-300 transition-transform duration-300 ease-in-out ${showPaperPreview ? 'translate-x-0' : 'translate-x-full'}`}
              style={{ minWidth: 480 }}
            >
              {showPaperPreview && (
                <PaperPreview
                  paper={paper}
                  onEditQuestion={onEditQuestion}
                  onDeleteQuestion={onDeleteQuestion}
                  onSaveQuestion={onSaveQuestion}
                  template={'/path/to/template'} // Replace with an actual path if needed
                  backgroundColor={backgroundColor}
                  onClose={togglePaperPreview}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexQuestionPaper;
