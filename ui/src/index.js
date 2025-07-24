import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EducatorProfile from './components/EducatorProfile/EducatorProfile';
import PostForm from './components/Crud/PostForm';
import Customerlist from './components/Crud/Customerlist';
import EditUser from './components/Crud/EditUser';
import IndexDash from './components/Admin_Dash/IndexDash';
import { GlobalStateProvider } from './components/Constants/GlobalStateProvider';
import Signup from './components/Home/Signup';
import EducatorLogin from './components/Home/EducatorLogin';
import NewComponent from './components/CreatePaper/NewComponent';
import IndexCreatePaper from './components/CreatePaper/IndexCreatePaper';
import SomeComponent from './components/PrintPaper/SomeComponent';
import PrintPaper from './components/PrintPaper/PrintPaper';
import TemplateSelector from './components/CreatePaper/Template/TemplateSelector';
import IndexSavedPapers from './components/CreatePaper/SavedPapers/IndexSavedPaper';
import TemplateDisplay from './components/CreatePaper/Template/TemplateDisplay';
import IndexTemplate from './components/CreatePaper/Template/IndexTemplate';
import IndexAssign from './components/Assignment/IndexAssign';
import Knowledgbase from './components/AI/KnowledgBase/Knowledgbase';
import Index_knlowledge from './components/AI/KnowledgBase/Index_knlowledge';
import IndexGenerateAi from './components/AI/Generate/Index_generate_ai';
import IndexQuestionPaper from './components/AI/QuestionPaperAI/IndexQuestionPaper';
import StudentLogin from './students/Register/StudentLogin';
import IndexStudentDash from './students/StudentDash/IndexStudentDash';
import StudentHeader from './students/Header/StudentHeader';
import IndexEducatorClassRoom from './components/EducatorClassRoom/IndexEducatorClassRoom';
import IndexStudentClassRoom from './students/StudentClassRoom/IndexStudentClassroom';
import ShowStudentProfile from './students/StudentProfile/ShowStudentProfile';
import StudentProfile from './students/StudentProfile/StudentProfile';
import IndexViewPaper from './students/ViewPaper/IndexViewPaper';
import IndexListEducators from './students/EducatorsList/IndexListEduactor';

ReactDOM.render(
  <GlobalStateProvider>
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Signup" element={<Signup/>} />
        <Route path="/EducatorLogin" element={<EducatorLogin/>} />
        <Route path="/AdminDash" element={<IndexDash />} />
    
        <Route path="/AdminProfile" element={<EducatorProfile />} />
        <Route path="/PostForm" element={<PostForm />} />
        <Route path="/customers" element={<Customerlist />} />
        <Route path="/edit-customer/:id" element={<EditUser />} />
        <Route path="/NewComponent" element={<NewComponent/>} />
        <Route path="/IndexCreatePaper" element={<IndexCreatePaper/>} />
        <Route path="/SomeComponent" element={<SomeComponent/>} />
        <Route path="/PrintPaper" element={<PrintPaper/>} />
        <Route path="/create-paper/:paperId" element={<IndexCreatePaper />} />
        <Route path="/TemplateSelector" element={<TemplateSelector/>} />
        <Route path="/TemplateDisplay" element={<TemplateDisplay/>} />
        <Route path="/index-saved-papers" element={<IndexSavedPapers/>} />
        <Route path="/index-templates" element={<IndexTemplate/>} />
        <Route path="/index-templates" element={<IndexTemplate/>} />
        <Route path="/index-new-assign" element={<IndexAssign/>} />
        <Route path="/index-educator-classroom" element={<IndexEducatorClassRoom/>}/>

        {/* AI */}
        <Route path="/index-books-create" element={<Index_knlowledge/>} />
        <Route path="/index-generate-ai" element={<IndexGenerateAi/>}/>
        <Route path ="/index-question-paper" element={<IndexQuestionPaper/>}/>
        {/* Students Routes */}

        <Route path="/StudentLogin" element={<StudentLogin/>} />
        <Route path="/StudentDash" element={<IndexStudentDash/>} />
        <Route path="/StudentHeader" element={<StudentHeader/>} />
        <Route path="/index-student-classroom" element={<IndexStudentClassRoom/>} />
        <Route path="/StudentProfile" element={<StudentProfile/>}/>
        <Route path="/Test-Paper-View" element={<IndexViewPaper/>} />
        <Route path="/index-list-educators" element={<IndexListEducators/>} />

      </Routes>
    </Router>
  </React.StrictMode>
  </GlobalStateProvider>,
  document.getElementById('root')
);

reportWebVitals();
