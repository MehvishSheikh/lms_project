import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import axios from 'axios';
import { useGlobalState } from '../Constants/GlobalStateProvider';
import { useLocation } from 'react-router-dom';
import { API_URL } from '../Constants/Url';
function IndexEducatorClassRoom() {
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
  

      </div>
    </div>
  );
}

export default IndexEducatorClassRoom;

