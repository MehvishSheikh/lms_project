import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../components/Constants/Url';
import { useGlobalState } from '../../components/Constants/GlobalStateProvider';
import '../../components/Home/LandingPageCss.css';

const StudentLogin = () => {
  const navigate = useNavigate();
  const { getGlobal, setGlobal } = useGlobalState();
  const [formData, setFormData] = useState({
    user_id: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  const { user_id, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_URL}/api/student/login`, formData);
      console.log(res.data);
      setGlobal( user_id ); // Assuming setGlobal expects an object with user_id
      navigate('/StudentDash'); // Navigate to the student dashboard after successful login
    } catch (error) {
      console.error(error);
      setErrorMessage('Invalid email or password. Please try again.');
    }
  };

  return (
    <>
      <nav id="navbar" className="navbar" style={{
        padding: '20px 40px',
        backgroundImage: 'url("assets/img/loginbg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
        <ul>
          <li>
            <a className="nav-link scrollto active" href="#hero">
              Home
            </a>
          </li>
          <li>
            <a className="nav-link scrollto" href="#about">
              About
            </a>
          </li>
          <li>
            <a className="nav-link scrollto" href="#services">
              Services
            </a>
          </li>
          <li>
            <a className="nav-link scrollto" href="/Signup">
              Register
            </a>
          </li>
          <li>
            <a className="nav-link scrollto" href="/EducatorLogin">
              Educator Login
            </a>
          </li>
          <li>
            <a className="nav-link scrollto" href="/StudentLogin">
              Student Login
            </a>
          </li>
          <li>
            <a className="nav-link scrollto" href="#contact">
              Contact
            </a>
          </li>
        </ul>
        <i className="bi bi-list mobile-nav-toggle" />
      </nav>
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url("assets/img/loginbg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div style={{
          maxWidth: '400px',
          margin: '0 auto',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          backgroundColor: 'rgba(255, 255, 255, 0.9)' // slightly transparent white background for readability
        }}>
          <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Login</h2>
          {errorMessage && <div style={{ marginBottom: '10px', padding: '10px', borderRadius: '5px', backgroundColor: '#f8d7da', color: '#721c24' }}>{errorMessage}</div>}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
            <input type="email" name="user_id" value={user_id} onChange={handleChange} placeholder="Email" style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} required />
            <input type="password" name="password" value={password} onChange={handleChange} placeholder="Password" style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} required />
            <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#ef6603', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default StudentLogin;
