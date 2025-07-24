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
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import Admin_Dash from './Admin_Dash';
import axios from 'axios';
import { useGlobalState } from '../Constants/GlobalStateProvider';
import { useLocation } from 'react-router-dom';
import { API_URL } from '../Constants/Url';
function IndexDash() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  useEffect(() => {
    // Function to handle sidebar visibility based on viewport width
    const handleViewportChange = () => {
      const isMobile = window.matchMedia('(max-width: 991.98px)').matches; // Mobile devices width (Bootstrap's default)
      setIsSidebarOpen(!isMobile); // Set the initial state of the sidebar based on viewport width
    };
    // Call the function initially to set the initial state
    handleViewportChange();
    // Add event listener for window resize
    window.addEventListener('resize', handleViewportChange);
    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener('resize', handleViewportChange);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);

  };

  const [userInfo, setUserInfo] = useState(null);
  const location = useLocation();
  const [user_id, setUserId] = useState('');
  const { getGlobal, setGlobal } = useGlobalState();
  const globalState = getGlobal();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    
    // Use the OR operator to provide a default value if 'user_id' is not found in the params
    // setUserId(params.get('user_id') || "1");
    // setUserId(location.state?.user_id);
    // const password = params.get('password');

    if (globalState) {
      fetchUserInfo(globalState);
      // setGlobalUserId(user_id);
    }
    // else{
    //   setUserId(getGlobalUserId());
    // }
  }, [location]); // Include 'user_id' in the dependency array
  const fetchUserInfo = async (globalState) => {
    try {
      const response = await axios.get(`${API_URL}/api/auth/educator/${globalState}`);
      const data = response.data;

      console.log('User Info:', data); // Log user data received from the server

      if (data.success) {
        setUserInfo(data);
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  return (
    <div className="app-container" style={{ backgroundColor: '#f0f0dd', minHeight: '100vh', padding: '20px' }} >
      
      <Header toggleSidebar={toggleSidebar} user_id={globalState} />
      <div className={`content ${isSidebarOpen && window.innerWidth > 991.98 ? 'content-shifted' : ''}`}>
        {/* <h2>{globalState}</h2> */}
        <Sidebar isOpen={isSidebarOpen} closeSidebar={toggleSidebar} />
        <Admin_Dash />

      </div>
    </div>
  );
}

export default IndexDash;

