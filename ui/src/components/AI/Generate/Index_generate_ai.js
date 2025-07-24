import React, { useState, useEffect } from 'react';
import Header from '../../Header/Header';
import Sidebar from '../../Sidebar/Sidebar';
import axios from 'axios';
import { useGlobalState } from '../../Constants/GlobalStateProvider';
import { useLocation } from 'react-router-dom';
import { API_URL } from '../../Constants/Url';
import BooksCollections from './BooksCollection';

function IndexGenerateAi() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const handleViewportChange = () => {
      const isMobile = window.matchMedia('(max-width: 991.98px)').matches;
      setIsSidebarOpen(!isMobile);
    };

    handleViewportChange();
    window.addEventListener('resize', handleViewportChange);

    return () => {
      window.removeEventListener('resize', handleViewportChange);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [userInfo, setUserInfo] = useState(null);
  const location = useLocation();
  const { getGlobal } = useGlobalState();
  const globalState = getGlobal();

  useEffect(() => {
    if (globalState) {
      fetchUserInfo(globalState);
    }
  }, [location]);

  const fetchUserInfo = async (globalState) => {
    try {
      const response = await axios.get(`${API_URL}/api/auth/educator/${globalState}`);
      const data = response.data;
      if (data.success) {
        setUserInfo(data);
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar isOpen={isSidebarOpen} closeSidebar={toggleSidebar} />
      <div className="flex flex-col w-full">
        <Header toggleSidebar={toggleSidebar} user_id={globalState} />
        <div className={`transition-all ${isSidebarOpen && 'lg:pl-64'} p-6`}>
          <div className="mt-10 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Books Collection</h2>
            <BooksCollections />
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndexGenerateAi;
