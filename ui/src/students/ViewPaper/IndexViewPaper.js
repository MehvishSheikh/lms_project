import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useGlobalState } from '../../components/Constants/GlobalStateProvider';
import StudentHeader from '../Header/StudentHeader';
import StudentSidebar from '../Sidebar/StudentSidebar';
import StudentNewComponent from './StudentNewComponent';
import Header from '../../components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
function IndexViewPaper() {
  const { getGlobal, setGlobal } = useGlobalState();
  const globalState = getGlobal();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // const { paperId } = useParams();
  const location = useLocation();

  const { paperId } = location.state || {};
  const queryParams = new URLSearchParams(location.search);
  const selectedTemplate = queryParams.get('template');

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

  return (
    <>





      <main id="main" className='main'>
        <StudentHeader toggleSidebar={toggleSidebar} user_id={globalState} />
        <div className="app" >
          <div className={`content ${isSidebarOpen && window.innerWidth > 991.98 ? 'content-shifted' : ''}`}>
            <StudentSidebar isOpen={isSidebarOpen} closeSidebar={toggleSidebar} />
            <section className="section dashboard">
              <div className="container-fluid">
                <div className="row">
                  <div>
                    <StudentNewComponent paperId={paperId} selectedTemplate={selectedTemplate} />
                  </div>
                </div>
              </div>
            </section>
            </div>
      </div>
          </main>
        
    </>
  );
}

export default IndexViewPaper;
