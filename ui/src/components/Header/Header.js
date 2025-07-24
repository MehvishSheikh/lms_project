// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { API_URL } from '../Constants/Url';

// const Header = ({ toggleSidebar, user_id }) => {
//   const [userInfo, setUserInfo] = useState(() => {
//     // Initialize state from localStorage, if available
//     const savedUserInfo = localStorage.getItem('userInfo');
//     const cacheTimestamp = localStorage.getItem('userInfoTimestamp');
//     const isCacheValid = cacheTimestamp && (Date.now() - cacheTimestamp) < 300000; // Cache valid for 5 minutes

//     return savedUserInfo && isCacheValid ? JSON.parse(savedUserInfo) : null;
//   });

//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (user_id && !userInfo) {
//       fetchUserInfo(user_id);
//     }
//   }, [location, user_id, userInfo]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (user_id) {
//         fetchUserInfo(user_id, true);
//       }
//     }, 300000); // Refresh every 5 minutes

//     return () => clearInterval(interval);
//   }, [user_id]);

//   const fetchUserInfo = async (user_id, forceRefresh = false) => {
//     try {
//       const cacheTimestamp = localStorage.getItem('userInfoTimestamp');
//       const isCacheValid = cacheTimestamp && (Date.now() - cacheTimestamp) < 300000; // Cache valid for 5 minutes

//       if (isCacheValid && !forceRefresh) return; // Skip fetching if cache is valid and not forced

//       const response = await axios.get('${API_URL}/api/auth/educator/${user_id}');
//       const data = response.data;

//       if (data) {
//         setUserInfo(data);
//         localStorage.setItem('userInfo', JSON.stringify(data)); // Cache the data in localStorage
//         localStorage.setItem('userInfoTimestamp', Date.now().toString()); // Update cache timestamp
//       }
//     } catch (error) {
//       console.error('Error fetching user info:', error);
//     }
//   };

//   return (
//     <header
//       id="header"
//       className="header fixed-top d-flex align-items-center"
//       style={{ backgroundColor: 'ffffe6', color: '#721c24' }}
//     >
//       <div className="d-flex align-items-center justify-content-between" style={{ padding: '0 15px' }}>
//         <a className="logo d-flex align-items-center">
//           <img src="assets/img/logo.png" alt="" style={{ height: '180px', width: '50px' }} />
//           <span className="d-none d-lg-block" style={{ marginLeft: '10px' }}>LMS Paper Creation</span>
//         </a>
//         <div className="header-toggle" onClick={toggleSidebar} style={{ cursor: 'pointer' }}>
//           <i className="bi bi-list toggle-sidebar-btn" style={{ fontSize: '24px' }} />
//         </div>
//       </div>

//       <nav className="header-nav ms-auto">
//         <ul className="d-flex align-items-center" style={{ listStyle: 'none', margin: '0', padding: '0' }}>
//           <li className="nav-item d-block d-lg-none">
//             <a className="nav-link nav-icon search-bar-toggle" href="#">
//               <i className="bi bi-search" />
//             </a>
//           </li>
//           <li className="nav-item dropdown">
//             <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
//               <i className="bi bi-bell" />
//               <span className="badge bg-primary badge-number">4</span>
//             </a>
//             <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
//               <li className="dropdown-header">
//                 You have 4 new notifications
//                 <a href="#">
//                   <span className="badge rounded-pill bg-primary p-2 ms-2">View all</span>
//                 </a>
//               </li>
//               <li>
//                 <hr className="dropdown-divider" />
//               </li>
//               <li className="notification-item">
//                 <i className="bi bi-exclamation-circle text-warning" />
//                 <div>
//                   <h4>Fuel Leakage</h4>
//                   <p>30 min. ago</p>
//                 </div>
//               </li>
//               <li>
//                 <hr className="dropdown-divider" />
//               </li>
//               <li className="notification-item">
//                 <i className="bi bi-x-circle text-danger" />
//                 <div>
//                   <h4>Fuel Very Low</h4>
//                   <p>1 hr. ago</p>
//                 </div>
//               </li>
//               <li>
//                 <hr className="dropdown-divider" />
//               </li>
//               <li className="notification-item">
//                 <i className="bi bi-check-circle text-success" />
//                 <div>
//                   <h4>Refilled</h4>
//                   <p>2 hrs. ago</p>
//                 </div>
//               </li>
//               <li>
//                 <hr className="dropdown-divider" />
//               </li>
//               <li className="notification-item">
//                 <i className="bi bi-info-circle text-primary" />
//                 <div>
//                   <h4>Timer out</h4>
//                   <p>4 hrs. ago</p>
//                 </div>
//               </li>
//               <li>
//                 <hr className="dropdown-divider" />
//               </li>
//               <li className="dropdown-footer">
//                 <a href="#">Show all notifications</a>
//               </li>
//             </ul>
//           </li>
//           {userInfo && (
//             <li className="nav-item dropdown pe-3">
//               <a
//                 className="nav-link nav-profile d-flex align-items-center pe-0"
//                 data-bs-toggle="dropdown"
//                 style={{ cursor: 'pointer' }}
//               >
//                 <i
//                   className="bi bi-person-circle"
//                   style={{ fontSize: '22px', color: 'blue' }}
//                 ></i>
//                 <b>
//                   <span className="d-none d-md-block dropdown-toggle ps-2" style={{ fontSize: '18px' }}>
//                     {userInfo.fullname}
//                   </span>
//                 </b>
//               </a>
//               <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
//                 <li className="dropdown-header">
//                   <h6>{userInfo.fullname}</h6>
//                   <h5>{userInfo.user_id}</h5>
//                   <span>Institue: {userInfo.institute}</span>
//                 </li>
//                 <li>
//                   <hr className="dropdown-divider" />
//                 </li>
//                 <li>
//                   <a className="dropdown-item d-flex align-items-center" href="users-profile.html">
//                     <i className="bi bi-person" />
//                     <span>My Profile</span>
//                   </a>
//                 </li>
//                 <li>
//                   <hr className="dropdown-divider" />
//                 </li>
//                 <li>
//                   <a className="dropdown-item d-flex align-items-center" href="users-profile.html">
//                     <i className="bi bi-gear" />
//                     <span>Account Settings</span>
//                   </a>
//                 </li>
//                 <li>
//                   <hr className="dropdown-divider" />
//                 </li>
//                 <li>
//                   <a className="dropdown-item d-flex align-items-center" href="pages-faq.html">
//                     <i className="bi bi-question-circle" />
//                     <span>Need Help?</span>
//                   </a>
//                 </li>
//                 <li>
//                   <hr className="dropdown-divider" />
//                 </li>
//                 <li>
//                   <a className="dropdown-item d-flex align-items-center" href="#">
//                     <i className="bi bi-box-arrow-right" />
//                     <span>Sign Out</span>
//                   </a>
//                 </li>
//               </ul>
//             </li>
//           )}
//         </ul>
//       </nav>
//     </header>
//   );
// };

// export default Header;


import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../Constants/Url';
import { Link } from 'react-router-dom';

const Header = ({ toggleSidebar, user_id }) => {
  const [userInfo, setUserInfo] = useState(() => {
    // Initialize state from localStorage, if available
    const savedUserInfo = localStorage.getItem('userInfo');
    const cacheTimestamp = localStorage.getItem('userInfoTimestamp');
    const isCacheValid = cacheTimestamp && (Date.now() - cacheTimestamp) < 300000; // Cache valid for 5 minutes

    return savedUserInfo && isCacheValid ? JSON.parse(savedUserInfo) : null;
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user_id && !userInfo) {
      fetchUserInfo(user_id);
    }
  }, [location, user_id, userInfo]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (user_id) {
        fetchUserInfo(user_id, true);
      }
    }, 1000); // Refresh every 5 minutes

    return () => clearInterval(interval);
  }, [user_id]);

  const fetchUserInfo = async (user_id, forceRefresh = false) => {
    try {
      const cacheTimestamp = localStorage.getItem('userInfoTimestamp');
      const isCacheValid = cacheTimestamp && (Date.now() - cacheTimestamp) < 300000; // Cache valid for 5 minutes

      if (isCacheValid && !forceRefresh) return; // Skip fetching if cache is valid and not forced

      const response = await axios.get(`${API_URL}/api/auth/educator/${user_id}`);
      const data = response.data;

      if (data) {
        setUserInfo(data);
        localStorage.setItem('userInfo', JSON.stringify(data)); // Cache the data in localStorage
        localStorage.setItem('userInfoTimestamp', Date.now().toString()); // Update cache timestamp
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  return (
    <header
      id="header"
      className="header fixed-top d-flex align-items-center"
      style={{
        backgroundColor: 'rgba(51, 78, 255, 0.8)', // Blue background with transparency
        color: 'white', // Text color
        left: '0px', // Left position
        height: '70px', // Height of the element
        backgroundImage: 'url("assets/img/headerbg.png")', // Background image URL
        backgroundSize: 'cover', // Optional: Adjust as needed
        backgroundPosition: 'center', // Optional: Adjust as needed
        opacity: 1// Optional: Opacity of the entire element including background and content
      }}
      
    >
      <div className="d-flex align-items-center justify-content-between" style={{ padding: '0 15px' }}>
        <div className="logo d-flex align-items-center" href="#">
          <img src="assets/img/logo.png" alt="Logo" style={{ height: '500px', width: '80px' }} />
          <span className="d-none d-lg-block" style={{ marginLeft: '10px', color: 'white' }}>Prashn.AI</span>
        </div>
        <div className="header-toggle" onClick={toggleSidebar} style={{ cursor: 'pointer' }}>
          <i className="bi bi-list toggle-sidebar-btn" style={{ fontSize: '24px' }} />
        </div>
      </div>

      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center" style={{ listStyle: 'none', margin: '0', padding: '0' }}>
          <li className="nav-item d-block d-lg-none">
            < Link className="nav-link nav-icon search-bar-toggle" href="#">
              <i className="bi bi-search" />
            </Link>
          </li>
          <li className="nav-item dropdown">
            <Link className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
              <i className="bi bi-bell" style= {{color: '#f5d16e'}}/>
              <span className="badge bg-primary badge-number" style={{ backgroundColor: '#f7a428', color: '#ffffff' }}>4</span>

            </Link>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
              <li className="dropdown-header">
                You have 4 new notifications
                <Link href="#">
                  <span className="badge rounded-pill bg-primary p-2 ms-2">View all</span>
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="notification-item">
                <i className="bi bi-exclamation-circle text-warning" />
                <div>
                  <h4>Fuel Leakage</h4>
                  <p>30 min. ago</p>
                </div>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="notification-item">
                <i className="bi bi-x-circle text-danger" />
                <div>
                  <h4>Fuel Very Low</h4>
                  <p>1 hr. ago</p>
                </div>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="notification-item">
                <i className="bi bi-check-circle text-success" />
                <div>
                  <h4>Refilled</h4>
                  <p>2 hrs. ago</p>
                </div>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="notification-item">
                <i className="bi bi-info-circle text-primary" />
                <div>
                  <h4>Timer out</h4>
                  <p>4 hrs. ago</p>
                </div>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="dropdown-footer">
                <Link href="#">Show all notifications</Link>
              </li>
            </ul>
          </li>
          {userInfo && (
            <li className="nav-item dropdown pe-3">
              <Link
                className="nav-link nav-profile d-flex align-items-center pe-0"
                data-bs-toggle="dropdown"
                style={{ cursor: 'pointer' }}
              >
                <i
                  className="bi bi-person-circle"
                  style={{ fontSize: '22px', color: '#f5d16e' }}
                ></i>
                <b>
                  <span className="d-none d-md-block dropdown-toggle ps-2" style={{ fontSize: '18px', color: 'white' }}>
                    {userInfo.educator_name}
                  </span>
                </b>
              </Link>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                  <h6>{userInfo.educator_name}</h6>
                  <h5>{userInfo.user_id}</h5>
                  <span>Institute: {userInfo.institute}</span>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item d-flex align-items-center" href="#">
                    <i className="bi bi-person" />
                    <span>My Profile</span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item d-flex align-items-center" href="#">
                    <i className="bi bi-gear" />
                    <span>Account Settings</span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item d-flex align-items-center" href="#">
                    <i className="bi bi-question-circle" />
                    <span>Need Help?</span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item d-flex align-items-center" href="#">
                    <i className="bi bi-box-arrow-right" />
                    <span>Sign Out</span>
                  </a>
                </li>
              </ul>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
