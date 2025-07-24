import React, { useState, useEffect } from 'react';
import Header from '../../Header/Header';
import PaperSidebar from '../Sidebar/PaperSidebar';
import { useParams } from 'react-router-dom';

import TemplateDisplay from './TemplateDisplay';

function IndexTemplate() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const { paperId } = useParams();  // Get the paperId from the route

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

    return (
        <div className="app-container" style={{ backgroundColor: '#fcfbde', minHeight: '100vh', padding: '20px'}}>
            <Header toggleSidebar={toggleSidebar} />
            <div className={`content ${isSidebarOpen && window.innerWidth > 991.98 ? 'content-shifted' : ''}`}>
                <PaperSidebar isOpen={isSidebarOpen} closeSidebar={toggleSidebar} />
                <main id="main" className='main'>
                    <section className="section dashboard">
                        <div className="container-fluid">
                            <div className="row">
                                <div>
                                    {/* <NewComponent paperId={paperId} />   */}
                                    <TemplateDisplay/>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default IndexTemplate;
