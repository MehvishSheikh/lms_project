// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { API_URL } from '../../components/Constants/Url';
// // import './EventListDisplay.css';  // Create this CSS file for styling

// const EventListDisplay = ({ user_id }) => {
//   const [educators, setEducators] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchEducators = async () => {
//       try {
//         const response = await axios.get(${API_URL}/api/student/${user_id}/educators);
//         setEducators(response.data.educators);
//         setLoading(false);
//       } catch (error) {
//         setError('Error fetching educators');
//         setLoading(false);
//       }
//     };

//     fetchEducators();
//   }, [user_id]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div className="educator-list">
//       {educators.map((educator) => (
//         <div key={educator._id} className="educator-card">
//           <h3>{educator.educator_name}</h3>
//           <p>Institute: {educator.institute}</p>
//           <p>Phone: {educator.educator_phone}</p>
//           <p>Email: {educator.username}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default EventListDisplay;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { API_URL } from '../../components/Constants/Url';
// import EducatorPapersDisplay from './EducatorPaperDisplay';

// const EventListDisplay = ({ user_id }) => {
//   const [educators, setEducators] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedEducator, setSelectedEducator] = useState(null);

//   useEffect(() => {
//     const fetchEducators = async () => {
//       try {
//         const response = await axios.get(`${API_URL}/api/student/${user_id}/educators`);
//         setEducators(response.data.educators);
//         setLoading(false);
//       } catch (error) {
//         setError('Error fetching educators');
//         setLoading(false);
//       }
//     };

//     fetchEducators();
//   }, [user_id]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   if (selectedEducator) {
//     return (
//       <EducatorPapersDisplay 
//         user_id={selectedEducator.user_id}
//         onBack={() => setSelectedEducator(null)} 
//       />
//     );
//   }

//   const containerStyle = {
//     display: 'flex',
//     flexWrap: 'wrap',
//     gap: '16px',
//     padding: '20px',
//     justifyContent: 'left',
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
//     backgroundImage: 'url("path/to/your/image.jpg")',  // Replace with your image path
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     color: '#fff', // Ensure text is readable
//   };

//   const cardHoverStyle = {
//     transform: 'translateY(-10px)',
//   };

//   const headerStyle = {
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',  // Slightly transparent to show background image
//     padding: '16px',
//     textAlign: 'center',
//     borderBottom: '1px solid #ddd',
//     borderRadius: '8px',
//   };

//   const headerTextStyle = {
//     margin: 0,
//     color: '#fff',
//   };

//   const bodyStyle = {
//     padding: '16px',
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',  // Slightly transparent to show background image
//     borderRadius: '8px',
//   };

//   const bodyTextStyle = {
//     margin: '8px 0',
//     color: '#fff',
//   };

//   const bodyStrongTextStyle = {
//     color: '#fff',
//   };

//   return (
//     <div style={containerStyle} >
//       {educators.map((educator) => (
//         <div
//           key={educator._id} 
//            style={{
//                     padding: '20px',
//                     position: 'relative',
//                     overflow: 'hidden',
//                     backgroundImage: 'url("assets/img/headerbg.png")',
//                     backgroundRepeat: 'no-repeat',
//                     backgroundPosition: 'center',
//                     backgroundSize: 'cover',
//                     backgroundColor: '#45ff54',
//                     color: '#ff771d',
//                     boxShadow: '0 5px 26px 0 rgba(68, 88, 144, 0.14)',
//                     border: '1px solid #fff',
//                     borderRadius: '8px',// Optional: add border-radius if needed
//                     height: '210px'

//                   }}
//           onMouseEnter={(e) => e.currentTarget.style.transform = cardHoverStyle.transform}
//           onClick={() => setSelectedEducator(educator)}
//         >
//           <div style={headerStyle}>
//             <h3 style={headerTextStyle}>{educator.institute}</h3>
//           </div>
//           <div style={bodyStyle}>
//             <p style={bodyTextStyle}>
//               <strong style={bodyStrongTextStyle}>Educator Name:</strong> {educator.educator_name}
//             </p>
//             <p style={bodyTextStyle}>
//               <strong style={bodyStrongTextStyle}>Email:</strong> {educator.user_id}
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default EventListDisplay;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../components/Constants/Url';
import EducatorPapersDisplay from './EducatorPaperDisplay';

const EventListDisplay = ({ user_id }) => {
  const [educators, setEducators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEducator, setSelectedEducator] = useState(null);

  useEffect(() => {
    const fetchEducators = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/student/${user_id}/educators`);
        setEducators(response.data.educators);
        setLoading(false);
      } catch (error) {
        setError('Error fetching educators');
        setLoading(false);
      }
    };

    fetchEducators();
  }, [user_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (selectedEducator) {
    return (
      <EducatorPapersDisplay 
        user_id={selectedEducator.user_id}
        onBack={() => setSelectedEducator(null)} 
      />
    );
  }

  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    padding: '20px',
    justifyContent: 'left',
    transition: 'transform 0.3s',
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
    backgroundImage: 'url("path/to/your/image.jpg")',  // Replace with your image path
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#fff', // Ensure text is readable
  };

  const cardHoverStyle = {
    transform: 'translateY(-10px)',
  };

  const headerStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',  // Slightly transparent to show background image
    padding: '16px',
    textAlign: 'center',
    borderBottom: '1px solid #ddd',
    borderRadius: '8px',
  };

  const headerTextStyle = {
    margin: 0,
    color: '#fff',
  };

  const bodyStyle = {
    padding: '16px',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',  // Slightly transparent to show background image
    borderRadius: '8px',
  };

  const bodyTextStyle = {
    margin: '8px 0',
    color: '#fff',
  };

  const bodyStrongTextStyle = {
    color: '#fff',
  };

  return (
    <>
         <div style={{
  backgroundColor: '#f0f8ff', 
  borderRadius: '20px', 
  marginLeft: '150px',
  padding: '2px', 
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
  margin: '20px 0',
  textAlign: 'center',
  // height: '70px',
  // width: '70%',
  alignSelf: 'center'
}}>
  <h2 style={{marginTop: '10px'}}>My Classrooms </h2>
</div>
    <div style={containerStyle} >
      {educators.map((educator) => (
        <div
          key={educator._id} 
           style={{
                    padding: '20px',
                    position: 'relative',
                    overflow: 'hidden',
                    backgroundImage: 'url("assets/img/headerbg.png")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    transition: 'transform 0.3s',
                    backgroundSize: 'cover',
                    backgroundColor: '#45ff54',
                    color: '#ff771d',
                    boxShadow: '0 5px 26px 0 rgba(68, 88, 144, 0.14)',
                    border: '1px solid #fff',
                    borderRadius: '8px',// Optional: add border-radius if needed
                    height: '210px'

                  }}
          onMouseEnter={(e) => e.currentTarget.style.transform = cardHoverStyle.transform}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
          onClick={() => setSelectedEducator(educator)}
        >
          <div style={headerStyle}>
            <h3 style={headerTextStyle}>{educator.institute}</h3>
          </div>
          <div style={bodyStyle}>
            <p style={bodyTextStyle}>
              <strong style={bodyStrongTextStyle}>Educator Name:</strong> {educator.educator_name}
            </p>
            <p style={bodyTextStyle}>
              <strong style={bodyStrongTextStyle}>Email:</strong> {educator.user_id}
            </p>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default EventListDisplay;