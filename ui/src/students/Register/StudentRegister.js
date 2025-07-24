import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useGlobalState } from '../../components/Constants/GlobalStateProvider';
import { API_URL } from '../../components/Constants/Url';

const StudentRegister = () => {
  const navigate = useNavigate();
  const { setGlobal } = useGlobalState();
  const [formData, setFormData] = useState({
    student_name: '',
    role: 'Student', // Default value as per schema
    institute: '',
    standard: '',
    user_id: '',
    student_phone: '',
    student_username: '',
    password: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { student_name, role, institute,standard, user_id, student_phone, student_username, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_URL}/api/student/signup`, formData);

      if (res.status === 201) {
        setSuccessMessage('Sign up successful! Redirecting to login page...');
        setGlobal({ user_id }); // Assuming setGlobal expects an object
        setTimeout(() => {
          navigate('/StudentLogin');
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
        <input type="text" name="student_name" value={student_name} onChange={handleChange} placeholder="Full Name" style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} required />
        <input type="text" name="role" value={role} readOnly placeholder="Role" style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#e9ecef', color: '#495057' }} />
        <input type="text" name="institute" value={institute} onChange={handleChange} placeholder="Institute" style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} required />
        <input type="text" name="standard" value={standard} onChange={handleChange} placeholder="Currently Studying" style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} required />
        <input type="email" name="user_id" value={user_id} onChange={handleChange} placeholder="Email" style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} required />
        <input type="number" name="student_phone" value={student_phone} onChange={handleChange} placeholder="Phone Number" style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} required />
        <input type="text" name="student_username" value={student_username} onChange={handleChange} placeholder="Username" style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} required />
        <input type="password" name="password" value={password} onChange={handleChange} placeholder="Password" style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} required />
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Sign Up</button>
      </form>
    </div>
  );
};

export default StudentRegister;
