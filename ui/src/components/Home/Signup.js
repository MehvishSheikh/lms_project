import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useGlobalState } from '../Constants/GlobalStateProvider';
import { API_URL } from '../Constants/Url';

const Signup = () => {
  const navigate = useNavigate();
  const { setGlobal } = useGlobalState();
  const [formData, setFormData] = useState({
    educator_name: '',
    role: 'Educator', // Default value as per schema
    institute: '',
    user_id: '',
    educator_phone: '',
    username: '',
    password: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { educator_name, role, institute, user_id, educator_phone, username, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_URL}/api/auth/educator/signup`, formData);

      if (res.status === 201) {
        setSuccessMessage('Sign up successful! Redirecting to login page...');
        setGlobal({ user_id }); // Assuming setGlobal expects an object
        setTimeout(() => {
          navigate('/EducatorLogin');
        }, 2000);
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response?.data?.message || 'Failed to sign up. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Sign Up</h2>
      {successMessage && <div style={{ marginBottom: '10px', padding: '10px', borderRadius: '5px', backgroundColor: '#d4edda', color: '#155724' }}>{successMessage}</div>}
      {errorMessage && <div style={{ marginBottom: '10px', padding: '10px', borderRadius: '5px', backgroundColor: '#f8d7da', color: '#721c24' }}>{errorMessage}</div>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <input type="text" name="educator_name" value={educator_name} onChange={handleChange} placeholder="Full Name" style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} required />
        <input type="text" name="role" value={role} readOnly placeholder="Role" style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#e9ecef', color: '#495057' }} />
        <input type="text" name="institute" value={institute} onChange={handleChange} placeholder="Institute" style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} required />
        <input type="email" name="user_id" value={user_id} onChange={handleChange} placeholder="Email" style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} required />
        <input type="number" name="educator_phone" value={educator_phone} onChange={handleChange} placeholder="Phone Number" style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} required />
        <input type="text" name="username" value={username} onChange={handleChange} placeholder="Username" style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} required />
        <input type="password" name="password" value={password} onChange={handleChange} placeholder="Password" style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} required />
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
