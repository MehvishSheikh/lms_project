// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { API_URL } from '../../components/Constants/Url';
// import { Link, useNavigate } from 'react-router-dom';
// import PaperKeyPopup from './PaperKeyPopup';

// const EducatorPapersDisplay = ({ user_id, onBack }) => {
//   const [papers, setPapers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedPaperId, setSelectedPaperId] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const navigate = useNavigate(); // React Router v6 hook

//   useEffect(() => {
//     const fetchPapers = async () => {
//       try {
//         const response = await axios.get(`${API_URL}/api/papers/assigned/${user_id}/papers`);
//         setPapers(response.data);
//         setLoading(false);
//       } catch (error) {
//         setError('Error fetching papers');
//         setLoading(false);
//       }
//     };

//     fetchPapers();
//   }, [user_id]);

//   const handlePaperClick = (paperId) => {
//     setSelectedPaperId(paperId);
//     setShowPopup(true);
//   };

//   const handlePopupClose = () => {
//     setShowPopup(false);
//     setSelectedPaperId(null);
//   };

//   const handlePopupSubmit = async (enteredCode) => {
//     try {
//       const response = await axios.get(`${API_URL}/api/papers/${selectedPaperId}`);
//       const paper = response.data;
//       if (paper.classroom === enteredCode) {
//         // navigate(`/Test-Paper-View/${selectedPaperId}`);
//         navigate('/Test-Paper-View', { state: { paperId : paperId } });
//       } else {
//         alert('Incorrect Classroom Code');
//       }
//     } catch (error) {
//       alert('Error verifying classroom code');
//     } finally {
//       setShowPopup(false);
//       setSelectedPaperId(null);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   const containerStyle = {
//     display: 'flex',
//     flexWrap: 'wrap',
//     gap: '16px',
//     padding: '20px',
//     justifyContent: 'center',
//   };

//   const cardStyle = {
//     border: '1px solid #ddd',
//     borderRadius: '8px',
//     width: '300px',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//     transition: 'transform 0.3s',
//     backgroundColor: '#fff',
//     overflow: 'hidden',
//     cursor: 'pointer',
//   };

//   const cardHoverStyle = {
//     transform: 'translateY(-10px)',
//   };

//   const headerStyle = {
//     backgroundColor: '#fce386',
//     padding: '16px',
//     textAlign: 'center',
//     borderBottom: '1px solid #ddd',
//   };

//   const headerTextStyle = {
//     margin: 0,
//     color: '#333',
//   };

//   const bodyStyle = {
//     padding: '16px',
//     backgroundColor: '#cfecfc',
//     height:'100%'
//   };

//   const bodyTextStyle = {
//     margin: '8px 0',
//     color: '#555',
//   };

//   const bodyStrongTextStyle = {
//     color: '#333',
//   };

//   return (
//     <div>

//       <div style={{
//   backgroundColor: '#f0f8ff', 
//   borderRadius: '20px', 
//   marginLeft: '50%',
//   padding: '2px', 
//   boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
//   margin: '20px 0',
//   textAlign: 'center',
//   // height: '70px',
//   // width: '70%',
// }}>
//   <h2 style={{marginTop: '10px',textAlign: 'center'}}>Papers Assigned By The Educator</h2>
// </div>
//       <div style={containerStyle}>
//         {papers.map((paper) => (
//           <div 
//             key={paper._id} 
//             style={cardStyle} 
//             onMouseEnter={(e) => e.currentTarget.style.transform = cardHoverStyle.transform}
//             onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
//             onClick={() => handlePaperClick(paper._id)}
//           >
//             <div style={headerStyle}>
//               <h3 style={headerTextStyle}>{paper.title}</h3>
//             </div>
//             <div style={bodyStyle}>
//               <p style={bodyTextStyle}>
//                 <strong style={bodyStrongTextStyle}>Description:</strong> {paper.description}
//               </p>
//               <p style={bodyTextStyle}>
//                 <strong style={bodyStrongTextStyle}>Duration:</strong> {paper.duration} minutes
//               </p>
//               <p style={bodyTextStyle}>
//                 <strong style={bodyStrongTextStyle}>Marks:</strong> {paper.marks}
//               </p>
//             </div>
            
//           </div>
//         ))}
//       </div>

//       {showPopup && (
//         <PaperKeyPopup 
//           onClose={handlePopupClose}
//           onSubmit={handlePopupSubmit}
//         />
//       )}
//            <button 
//   onClick={onBack} 
//   style={{
//     backgroundColor: '#007bff', 
//     color: '#fff', 
//     border: 'none', 
//     borderRadius: '5px', 
//     padding: '10px 20px', 
//     fontSize: '16px', 
//     cursor: 'pointer', 
//     marginLeft:'40%',
//     boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//     transition: 'background-color 0.3s'
//   }}
//   onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
//   onMouseLeave={(e) => e.target.style.backgroundColor = '#007bff'}
// >
//   Back
// </button>
//     </div>
//   );
// };

// export default EducatorPapersDisplay;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../components/Constants/Url';
import { useNavigate } from 'react-router-dom';
import PaperKeyPopup from './PaperKeyPopup';

const EducatorPapersDisplay = ({ user_id, onBack }) => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPaperId, setSelectedPaperId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate(); // React Router v6 hook

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/papers/assigned/${user_id}/papers`);
        setPapers(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching papers');
        setLoading(false);
      }
    };

    fetchPapers();
  }, [user_id]);

  const handlePaperClick = (paperId) => {
    setSelectedPaperId(paperId);
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setSelectedPaperId(null);
  };

  const handlePopupSubmit = async (enteredCode) => {
    try {
      const response = await axios.get(`${API_URL}/api/papers/${selectedPaperId}`);
      const paper = response.data;
      if (paper.classroom === enteredCode) {
        navigate('/Test-Paper-View', { state: { paperId: selectedPaperId } });
      } else {
        alert('Incorrect Classroom Code');
      }
    } catch (error) {
      alert('Error verifying classroom code');
    } finally {
      setShowPopup(false);
      setSelectedPaperId(null);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    padding: '20px',
    justifyContent: 'center',
  };

  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    width: '300px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s',
    backgroundColor: '#fff',
    overflow: 'hidden',
    cursor: 'pointer',
  };

  const cardHoverStyle = {
    transform: 'translateY(-10px)',
  };

  const headerStyle = {
    backgroundColor: '#fce386',
    padding: '16px',
    textAlign: 'center',
    borderBottom: '1px solid #ddd',
  };

  const headerTextStyle = {
    margin: 0,
    color: '#333',
  };

  const bodyStyle = {
    padding: '16px',
    backgroundColor: '#cfecfc',
    height: '100%',
  };

  const bodyTextStyle = {
    margin: '8px 0',
    color: '#555',
  };

  const bodyStrongTextStyle = {
    color: '#333',
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: '#f0f8ff',
          borderRadius: '20px',
          marginLeft: '50%',
          padding: '2px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          margin: '20px 0',
          textAlign: 'center',
        }}
      >
        <h2 style={{ marginTop: '10px', textAlign: 'center' }}>
          Papers Assigned By The Educator
        </h2>
      </div>
      <div style={containerStyle}>
        {papers.map((paper) => (
          <div
            key={paper._id}
            style={cardStyle}
            onMouseEnter={(e) => (e.currentTarget.style.transform = cardHoverStyle.transform)}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
            onClick={() => handlePaperClick(paper._id)}
          >
            <div style={headerStyle}>
              <h3 style={headerTextStyle}>{paper.title}</h3>
            </div>
            <div style={bodyStyle}>
              <p style={bodyTextStyle}>
                <strong style={bodyStrongTextStyle}>Description:</strong> {paper.description}
              </p>
              <p style={bodyTextStyle}>
                <strong style={bodyStrongTextStyle}>Duration:</strong> {paper.duration} minutes
              </p>
              <p style={bodyTextStyle}>
                <strong style={bodyStrongTextStyle}>Marks:</strong> {paper.marks}
              </p>
            </div>
          </div>
        ))}
      </div>

      {showPopup && (
        <PaperKeyPopup onClose={handlePopupClose} onSubmit={handlePopupSubmit} />
      )}
      <button
        onClick={onBack}
        style={{
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          marginLeft: '40%',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          transition: 'background-color 0.3s',
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
        onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')}
      >
        Back
      </button>
    </div>
  );
};

export default EducatorPapersDisplay;
