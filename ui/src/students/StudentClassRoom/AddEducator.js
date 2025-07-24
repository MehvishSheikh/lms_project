// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { API_URL } from '../../components/Constants/Url';
// import { useGlobalState } from '../../components/Constants/GlobalStateProvider';

// const AddEducator = () => {
//   const [email, setEmail] = useState('');
//   const [userId, setUserId] = useState('');

//   const { getGlobal, setGlobal } = useGlobalState();
//   const globalState = getGlobal();

//   useEffect(() => {
//     if (globalState) {
//       setUserId(globalState);
//     }
//   }, [globalState]);

//   const handleAddEducator = async () => {
//     try {
//       const response = await axios.post(`${API_URL}/api/student/add-educator`, { userId, email });
//       alert('Educator added successfully');
//     } catch (error) {
//       console.error('Error adding educator:', error);
//       alert('Failed to add educator');
//     }
//   };

//   return (
//     <div>
//       <h2>Add Educator</h2>
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Educator's email"
//       />
//       <button onClick={handleAddEducator}>Add Educator</button>
//     </div>
//   );
// };

// export default AddEducator;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../components/Constants/Url';
import { useGlobalState } from '../../components/Constants/GlobalStateProvider';
import styled, { keyframes } from 'styled-components';
import { FaSearch, FaPlus } from 'react-icons/fa';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled.div`
  margin: 20px auto;
  padding: 20px;
  max-width: 500px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  text-align: center;
  animation: ${fadeIn} 0.5s ease-in-out;

  h2 {
    margin-bottom: 20px;
    color: #333;
  }

  input {
    width: calc(100% - 22px);
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }

  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    margin: 10px 5px;
    transition: background-color 0.3s;
    svg {
      margin-right: 8px;
    }

    &:hover {
      background-color: #0056b3;
    }
  }

  .educator-details {
    margin-top: 20px;
    h3 {
      margin-bottom: 10px;
      color: #333;
    }
    p {
      margin: 5px 0;
      color: #555;
    }
  }
`;

const AddEducator = () => {
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [educator, setEducator] = useState(null);

  const { getGlobal, setGlobal } = useGlobalState();
  const globalState = getGlobal();

  useEffect(() => {
    if (globalState) {
      setUserId(globalState);
    }
  }, [globalState]);

  const handleAddEducator = async () => {
    try {
      await axios.post(`${API_URL}/api/student/add-educator`, { userId, email });
      alert('Educator added successfully');
    } catch (error) {
      console.error('Error adding educator:', error);
      alert('Failed to add educator');
    }
  };

  const handleSearchEducator = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/auth/educator/email/${email}`);
      setEducator(response.data);
    } catch (error) {
      console.error('Error fetching educator:', error);
      alert('Educator not found');
    }
  };

  return (
    <Container>
      <h2>Add Educator</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Educator's email"
      />
      <button onClick={handleSearchEducator}>
        <FaSearch />
        Search Educator
      </button>
      <button onClick={handleAddEducator}>
        <FaPlus />
        Add Educator
      </button>
      {educator && (
        <div className="educator-details">
          <h3>Educator Details</h3>
          <p>Name: {educator.educator_name}</p>
          <p>Institute: {educator.institute}</p>
        </div>
      )}
    </Container>
  );
};

export default AddEducator;
