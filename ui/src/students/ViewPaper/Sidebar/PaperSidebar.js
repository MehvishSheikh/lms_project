import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PaperSidebar = ({ isOpen, closeSidebar }) => {
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
          <Link to="/AdminDash">
            <a
              className="nav-link collapsed"
              style={navLinkStyle(activeItem === 'dashboard', hoveredItem === 'dashboard')}
              onClick={() => setActiveItem('dashboard')}
              onMouseEnter={() => setHoveredItem('dashboard')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <i className="bi bi-grid" style={iconStyle} />
              <span>Home</span>
            </a>
          </Link>
        </li>
        
        <li className="nav-item">
          <Link to="/index-saved-papers">
            <a
              className="nav-link collapsed"
              style={navLinkStyle(activeItem === 'users', hoveredItem === 'users')}
              onClick={() => setActiveItem('users')}
              onMouseEnter={() => setHoveredItem('users')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <i className="bi bi-people" style={iconStyle} />
              <span>My Papers</span>
            </a>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/index-templates">
            <a
              className="nav-link collapsed"
              style={navLinkStyle(activeItem === 'assignMachines', hoveredItem === 'assignMachines')}
              onClick={() => setActiveItem('assignMachines')}
              onMouseEnter={() => setHoveredItem('assignMachines')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <i className="bi bi-layout-text-window-reverse" style={iconStyle} />
              <span>Templates</span>
            </a>
          </Link>
        </li>
        {/* <li className="nav-heading" style={{ padding: '10px', fontSize: '16px', fontWeight: 'bold' }}></li> */}
        <li className="nav-item">
          <Link to="/AdminProfile">
            <a
              className="nav-link collapsed"
              style={navLinkStyle(activeItem === 'profile', hoveredItem === 'profile')}
              onClick={() => setActiveItem('profile')}
              onMouseEnter={() => setHoveredItem('profile')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <i className="bi bi-person" style={iconStyle} />
              <span>Themes</span>
            </a>
          </Link>
        </li>
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            style={navLinkStyle(activeItem === 'contact', hoveredItem === 'contact')}
            onClick={() => setActiveItem('contact')}
            onMouseEnter={() => setHoveredItem('contact')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <i className="bi bi-envelope" style={iconStyle} />
            <span>Uploads</span>
          </a>
        </li>
        <li className="nav-item">
          <Link to="/PostForm">
            <a
              className="nav-link collapsed"
              style={navLinkStyle(activeItem === 'machineType', hoveredItem === 'machineType')}
              onClick={() => setActiveItem('machineType')}
              onMouseEnter={() => setHoveredItem('machineType')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <i className="bi bi-card-list" style={iconStyle} />
              <span>Downloads</span>
            </a>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/">
            <a
              className="nav-link collapsed"
              style={navLinkStyle(activeItem === 'logout', hoveredItem === 'logout')}
              onClick={() => setActiveItem('logout')}
              onMouseEnter={() => setHoveredItem('logout')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <i className="bi bi-box-arrow-in-right" style={iconStyle} />
              <span>Logout</span>
            </a>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default PaperSidebar;