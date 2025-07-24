// import logo from './logo.svg';
// // import './App.css';
// import React from 'react'

// import About from './components/About';
// import Header from './components/Header/Header.js';
// import Sidebar from './components/Sidebar/Sidebar.js';
// import Admin_Dash from './components/Admin_Dash/Admin_Dash.js'

// import {BrowserRouter as Router, Routes, Route, Link, useParams} from 'react-router-dom'
// import Customerlist from './components/Customerlist';
// import PostForm from './components/PostForm.js';
// import EditUser from './components/EditUser';

// import BatchForm from './components/BatchForm/BatchForm';
// import AllUsers from './components/Users/AllUsers';
// import AdminProfile from './components/AdminProfile/AdminProfile.js'

// function App() {
//   const Wrapper = (props) => {
//     const params = useParams();
//     return <EditUser {...{...props, match: {params}} } />
//   }
//   return (


//     <div className="App"> 

//         <Header/>
//         <Sidebar/>
//         <Admin_Dash/>

//     <Router>
//       <div className='App'>
//         {/* <nav>
//           <ul>
//             <Link to="/">Home</Link> &nbsp;&nbsp;
//             <Link to="/customers">All Customers</Link> &nbsp;&nbsp;
//             <Link to="/add-customer">Add Customer</Link> &nbsp;&nbsp;           
//             <Link to="/about">About Us</Link> &nbsp;&nbsp;            
//           </ul>
//         </nav> */}

//         <Routes>
//           <Route exact path="/" element={<About />}></Route>
//           <Route exact path="/customers" element={<Customerlist />}></Route>
//           <Route exact path="/add-customer" element={<PostForm />}></Route>
//           <Route exact path="/edit-customer/:id" element={<Wrapper />}></Route>
//           <Route exact path="/AllUsers" element={<AllUsers />}></Route>    
//           <Route exact path="/AssignBatchMachines" element={<BatchForm />}></Route>   
//           <Route exact path="/AdminProfile" element={<AdminProfile />}></Route>     


//         </Routes>
//       </div>

//     </Router>

//     </div>
//   );
// }

// export default App;





// import logo from './logo.svg';
// import './App.css';
// import Header from './components/Header/Header';
// import Sidebar from './components/Sidebar/Sidebar';
// import Admin_Dash from './components/Admin_Dash/Admin_Dash';
// import BatchForm from './components/BatchForm/BatchForm';
// import AllUsers from './components/Users/AllUsers';
// import Customerlist from './components/Crud/Customerlist';
// import UsersTable from './components/Users/UsersTable';



// function App() {
//   return (
//     <div >
//     <Header/>
//     <Sidebar/>
//     {/* <UsersTable/> */}
//     <Admin_Dash/>
//     {/* <Customerlist/> */}
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Admin_Dash from './components/Admin_Dash/Admin_Dash';
import LandingPage from './components/Home/LandingPage';
import Knowledgbase from './components/AI/KnowledgBase/Knowledgbase';
import IndexQuestionPaper from './components/AI/QuestionPaperAI/IndexQuestionPaper';

function App() {

  return (
    <div className="app-container">
      {/* <Header toggleSidebar={toggleSidebar} />
      <div className={`content ${isSidebarOpen && window.innerWidth > 991.98 ? 'content-shifted' : ''}`}>
        <Sidebar isOpen={isSidebarOpen} closeSidebar={toggleSidebar} />
        <Admin_Dash />

      </div> */}
      {/* <Knowledgbase/> */}
     <LandingPage/>
     {/* <IndexQuestionPaper/> */}
      
    </div>
  );
}

export default App;



// import React, { useState } from 'react';
// import PaperForm from './components/PaperForm';
// import PaperPreview from './components/PaperPreview';
// import React, { useState, useEffect } from 'react';


// function App() {
//   const [paper, setPaper] = useState(null);

//   const handlePaperSubmit = (newPaper) => {
//     setPaper(newPaper);
//   };

//   return (
//     <div style={styles.app}>
//       <h1>MCQ Paper Creator</h1>
//       <PaperForm onSubmit={handlePaperSubmit} />
//       {paper && <PaperPreview paper={paper} />}
//     </div>
//   );
// }

// const styles = {
//   app: {
//     fontFamily: 'Arial, sans-serif',
//     textAlign: 'center',
//     padding: '20px',
//   },
// };

// export default App;

// import React, { useState } from 'react';
// import PaperForm from './components/PaperForm';
// import PaperPreview from './components/PaperPreview';
// import jsPDF from 'jspdf';


// function App() {
//   const [paper, setPaper] = useState({
//     title: '',
//     description: '',
//     questions: []
//   });

//   const handlePaperSubmit = (newPaper) => {
//     setPaper((prevPaper) => ({
//       ...prevPaper,
//       title: newPaper.title,
//       description: newPaper.description,
//     }));
//   };

//   const handleQuestionAdd = (newQuestion) => {
//     setPaper((prevPaper) => ({
//       ...prevPaper,
//       questions: [...prevPaper.questions, newQuestion]
//     }));
//   };

//   const getQuestionTypeLabel = (type) => {
//     switch (type) {
//       case 'single':
//         return 'Single Answer';
//       case 'multiple':
//         return 'Multiple Choice';
//       case 'truefalse':
//         return 'True/False';
//       default:
//         return '';
//     }
//   };

//   const handleDownloadQuestionPaper = () => {
//     const doc = new jsPDF();
//     let y = 10;
//     const lineHeight = 10;
//     const margin = 10;
//     const maxHeight = 290;

//     // Add paper title and description
//     doc.setFontSize(16);
//     doc.text(`Title: ${paper.title}`, margin, y);
//     y += lineHeight;
//     doc.setFontSize(14);
//     doc.text(`Description: ${paper.description}`, margin, y);
//     y += lineHeight * 2;

//     // Add questions
//     doc.setFontSize(12);
//     paper.questions.forEach((question, index) => {
//       if (y + lineHeight > maxHeight) {
//         doc.addPage();
//         y = margin;
//       }
//       doc.text(`${index + 1}. ${question.text} (${getQuestionTypeLabel(question.type)})`, margin, y);
//       y += lineHeight;

//       if (question.type === 'truefalse') {
//         doc.text(`    a. True`, margin, y);
//         y += lineHeight;
//         doc.text(`    b. False`, margin, y);
//         y += lineHeight;
//       } else {
//         question.options.forEach((option, optIndex) => {
//           if (y + lineHeight > maxHeight) {
//             doc.addPage();
//             y = margin;
//           }
//           doc.text(`    ${String.fromCharCode(97 + optIndex)}. ${option.text}`, margin, y);
//           y += lineHeight;
//         });
//       }

//       // y += lineHeight;
//     // });
//     doc.line(10, y, 200, y);
//       y += 10; // Adjust space after line
//     });
//     doc.save('question_paper.pdf');
//   };

//   const handleDownloadAnswerKey = () => {
//     const doc = new jsPDF();
//     let y = 10;
//     const lineHeight = 10;
//     const margin = 10;
//     const maxHeight = 290;

//     // Add answer key title
//     doc.setFontSize(16);
//     doc.text('Answer Key', margin, y);
//     y += lineHeight * 2;
//     doc.setFontSize(12);

//     paper.questions.forEach((question, index) => {
//       if (y + lineHeight > maxHeight) {
//         doc.addPage();
//         y = margin;
//       }
//       doc.text(`${index + 1}. ${question.text} (${getQuestionTypeLabel(question.type)})`, margin, y);
//       y += lineHeight;

//       if (question.type === 'truefalse') {
//         const correctOption = question.options[0].text;
//         doc.text(`    ${correctOption === 'true' ? 'a. True' : 'b. False'}`, margin, y);
//         y += lineHeight;
//       } else {
//         question.options.forEach((option, optIndex) => {
//           if (option.isCorrect) {
//             if (y + lineHeight > maxHeight) {
//               doc.addPage();
//               y = margin;
//             }
//             doc.text(`    ${String.fromCharCode(97 + optIndex)}. ${option.text}`, margin, y);
//             y += lineHeight;
//           }
//         });
//       }

//       y += lineHeight;
//     });

//     doc.save('answer_key.pdf');
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.formContainer}>
//         <h1 style={styles.heading}>MCQ Paper Creator</h1>
//         <PaperForm onSubmit={handlePaperSubmit} onAddQuestion={handleQuestionAdd} />
//         <div style={styles.buttonContainer}>
//           <button onClick={handleDownloadQuestionPaper} style={styles.button}>Download Question Paper</button>
//           <button onClick={handleDownloadAnswerKey} style={styles.button}>Download Answer Key</button>
//         </div>
//       </div>
//       <div style={styles.previewContainer}>
//         <PaperPreview paper={paper} />
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     padding: '20px',
//     fontFamily: 'Arial, sans-serif',
//     backgroundColor: '#f0f0f0',
//     minHeight: '100vh',
//   },
//   formContainer: {
//     width: '45%',
//     background: '#fff',
//     padding: '20px',
//     borderRadius: '8px',
//     boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
//   },
//   previewContainer: {
//     width: '53%', // Increased width for the preview
//     background: '#fff',
//     padding: '20px',
//     borderRadius: '8px',
//     boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
//     overflowY: 'auto', // Add scrollbar if content overflows
//   },
//   heading: {
//     fontSize: '24px',
//     marginBottom: '20px',
//     color: '#007BFF',
//     textAlign: 'center',
//   },
//   buttonContainer: {
//     display: 'flex',
//     justifyContent: 'space-around',
//     marginTop: '20px',
//   },
//   button: {
//     padding: '10px 20px',
//     backgroundColor: 'green',
//     color: 'white',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//     fontSize: '16px',
//     boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//     transition: 'background-color 0.3s ease',
//   },
// };

// export default App;

