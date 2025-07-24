

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, closeSidebar }) => {
  const [activeItem, setActiveItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  const sidebarStyle = {
    backgroundColor: '#343a40',
    color: '#ffffff',
    height: '100vh',
    padding: '20px',
    position: 'fixed',
    top: '70px',  // Added space from the top
    left: '0px', // Added space from the left
    width: '250px',
    transition: 'all 0.3s ease-in-out',
    zIndex: 1000,
    transform: isOpen ? 'translateX(0)' : 'translateX(-100%)'
  };

  const navLinkStyle = (isActive, isHovered) => ({
    color: '#ffffff',
    padding: '10px',
    display: 'block',
    textDecoration: 'none',
    backgroundColor: isActive ? '#495057' : isHovered ? '#6c757d' : 'transparent', // Change background color on hover
    borderRadius: '4px',
    transition: 'background-color 0.3s'
  });

  const iconStyle = {
    marginRight: '10px'
  };

  return (
    <aside className="sidebar" style={sidebarStyle}>
      <div className="sidebar-toggle" onClick={closeSidebar}>
        {/* <i className="bi bi-x"></i> */}
      </div>
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <Link to="/AdminDash"
              className="nav-link collapsed"
              style={navLinkStyle(activeItem === 'dashboard', hoveredItem === 'dashboard')}
              onClick={() => setActiveItem('dashboard')}
              onMouseEnter={() => setHoveredItem('dashboard')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <i className="bi bi-grid" style={iconStyle} />
              <span>Home</span>
          </Link>
        </li>
        
        <li className="nav-item">
          <Link to="/index-saved-papers"
              className="nav-link collapsed"
              style={navLinkStyle(activeItem === 'users', hoveredItem === 'users')}
              onClick={() => setActiveItem('users')}
              onMouseEnter={() => setHoveredItem('users')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <i className="bi bi-people" style={iconStyle} />
              <span>My Papers</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/index-educator-classroom"
              className="nav-link collapsed"
              style={navLinkStyle(activeItem === 'educator', hoveredItem === 'educator')}
              onClick={() => setActiveItem('educator')}
              onMouseEnter={() => setHoveredItem('educator')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <i className="bi bi-people" style={iconStyle} />
              <span>Class Rooms</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/index-generate-ai"
              className="nav-link collapsed"
              style={navLinkStyle(activeItem === 'assignMachines', hoveredItem === 'assignMachines')}
              onClick={() => setActiveItem('assignMachines')}
              onMouseEnter={() => setHoveredItem('assignMachines')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <i className="bi bi-layout-text-window-reverse" style={iconStyle} />
              <span>Generate AI</span>
          </Link>
        </li>
        {/* <li className="nav-heading" style={{ padding: '10px', fontSize: '16px', fontWeight: 'bold' }}></li> */}
                <li className="nav-item">
          <Link to="/index-new-assign"
              className="nav-link collapsed"
              style={navLinkStyle(activeItem === 'assign', hoveredItem === 'assign')}
              onClick={() => setActiveItem('assign')}
              onMouseEnter={() => setHoveredItem('assign')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <i className="bi bi-card-list" style={iconStyle} />
              <span>Assign Papers</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/AdminProfile"
              className="nav-link collapsed"
              style={navLinkStyle(activeItem === 'profile', hoveredItem === 'profile')}
              onClick={() => setActiveItem('profile')}
              onMouseEnter={() => setHoveredItem('profile')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <i className="bi bi-person" style={iconStyle} />
              <span>Profile</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/index-books-create"
            className="nav-link collapsed"
            style={navLinkStyle(activeItem === 'contact', hoveredItem === 'contact')}
            onClick={() => setActiveItem('contact')}
            onMouseEnter={() => setHoveredItem('contact')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <i className="bi bi-envelope" style={iconStyle} />
            <span>Uploads</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/"
              className="nav-link collapsed"
              style={navLinkStyle(activeItem === 'logout', hoveredItem === 'logout')}
              onClick={() => setActiveItem('logout')}
              onMouseEnter={() => setHoveredItem('logout')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <i className="bi bi-box-arrow-in-right" style={iconStyle} />
              <span>Logout</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;



