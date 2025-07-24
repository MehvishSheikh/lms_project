import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import axios from 'axios';
import { useGlobalState } from '../Constants/GlobalStateProvider';
import { useLocation } from 'react-router-dom';
import { API_URL } from '../Constants/Url';
import NewAssignTable from './NewAssignTable';

function IndexAssign() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    useEffect(() => {
        const handleViewportChange = () => {
            const isMobile = window.matchMedia('(max-width: 991.98px)').matches;
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
    const [user_id, setUserId] = useState('');
    const { getGlobal, setGlobal } = useGlobalState();
    const globalState = getGlobal();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (globalState) {
            fetchUserInfo(globalState);
        }
    }, [location]); 
    const fetchUserInfo = async (globalState) => {
        try {
            const response = await axios.get(`${API_URL}/api/auth/educator/${globalState}`);
            const data = response.data;

            console.log('User Info:', data); 

            if (data.success) {
                setUserInfo(data);
            }
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };

    return (
        <main id="main">
        <div className="app-container" style={{ backgroundColor: '#f0f0dd', minHeight: '100vh', padding: '20px' }} >

            <Header toggleSidebar={toggleSidebar} user_id={globalState} />
            <div className={`content ${isSidebarOpen && window.innerWidth > 991.98 ? 'content-shifted' : ''}`}>
                <Sidebar isOpen={isSidebarOpen} closeSidebar={toggleSidebar} />
                <section className="section dashboard">
                {/* <div className="row"> */}
                <NewAssignTable/>
                {/* </div> */}
               </section>

            </div>
        </div>
        </main>
    );
}

export default IndexAssign;

