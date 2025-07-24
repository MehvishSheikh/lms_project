// import React, { useEffect, useState } from 'react';
// import axios from 'axios'; // Assuming you use Axios for HTTP requests
// import { API_URL } from '../Constants/Url';
// import { useGlobalState } from '../Constants/GlobalStateProvider';
// const PapersList = () => {
//   const [papers, setPapers] = useState([]);
//   const { getGlobal, setGlobal } = useGlobalState();
//   const globalState = getGlobal();

//   useEffect(() => {
//     const fetchPapers = async () => {
//       try {
//         const response = await axios.get(`${API_URL}/api/papers/educator/${globalState}`); // Replace with your backend API endpoint
//         setPapers(response.data);
//       } catch (error) {
//         console.error('Error fetching papers:', error);
//       }
//     };

//     fetchPapers();
//   }, [globalState]);

//   return (
//     <div>
//       <h2>Your Papers</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Description</th>
//             <th>Created Time</th>
//           </tr>
//         </thead>
//         <tbody>
//           {papers.map((paper) => (
//             <tr key={paper._id}>
//               <td>{paper.title}</td>
//               <td>{paper.description}</td>
//               <td>{new Date(paper.current_time).toLocaleString()}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default PapersList;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { API_URL } from '../Constants/Url';
// import { useGlobalState } from '../Constants/GlobalStateProvider';
// import { BsPencil, BsTrash } from 'react-icons/bs';
// import { Link } from 'react-router-dom';

// const PapersList = ({ onEdit }) => {
//   const [papers, setPapers] = useState([]);
//   const { getGlobal } = useGlobalState();
//   const globalState = getGlobal();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 5;

//   useEffect(() => {
//     const fetchPapers = async () => {
//       try {
//         const response = await axios.get(`${API_URL}/api/papers/educator/${globalState}`);
//         setPapers(response.data);
//       } catch (error) {
//         console.error('Error fetching papers:', error);
//       }
//     };

//     fetchPapers();
//   }, [globalState]);

//   const filteredPapers = papers.filter(paper => {
//     const { title, description } = paper;
//     return (
//       searchTerm === "" ||
//       (title && title.toLowerCase().includes(searchTerm.toLowerCase())) ||
//       (description && description.toLowerCase().includes(searchTerm.toLowerCase()))
//     );
//   });

//   const indexOfLastRow = currentPage * rowsPerPage;
//   const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//   const currentRows = filteredPapers.slice(indexOfFirstRow, indexOfLastRow);
//   const totalPages = Math.ceil(filteredPapers.length / rowsPerPage);

//   const handleNextPage = () => {
//     setCurrentPage(prevPage => prevPage + 1);
//   };

//   const handlePrevPage = () => {
//     setCurrentPage(prevPage => prevPage - 1);
//   };

//   const deleteHandler = async id => {
//     if (window.confirm("Are you sure you want to delete this paper?")) {
//       try {
//         await axios.delete(`${API_URL}/api/papers/educator/delete/${id}`);
//         setPapers(prevPapers => prevPapers.filter(paper => paper._id !== id));
//         alert("paper deleted succesfully");
//       } catch (error) {
//         console.error('Error deleting paper:', error);
//       }
//     }
//   };

//   return (
//     <div className="col-12">
//       <div className="card recent-sales overflow-auto">
//         <div className="filter">
//           <a className="icon" href="#" data-bs-toggle="dropdown">
//             <i className="bi bi-three-dots" />
//           </a>
//           <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
//             <li className="dropdown-header text-start">
//               <h6>Filter</h6>
//             </li>
//             <li><a className="dropdown-item" href="#">Today</a></li>
//             <li><a className="dropdown-item" href="#">This Month</a></li>
//             <li><a className="dropdown-item" href="#">This Year</a></li>
//           </ul>
//         </div>
//         <div className="card-body">
//           <h5 className="card-title">Your Papers <span>| Today</span></h5>
//           <div>
//             <div className="search-bar">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Search by Title or Description"
//                 value={searchTerm}
//                 onChange={event => setSearchTerm(event.target.value)}
//               />
//             </div>
//             <br />
//             <table className="user-table" style={{ borderCollapse: 'collapse', width: '100%', textAlign: 'left' }}>
//               <thead>
//                 <tr>
//                   <th>Sr. No.</th>
//                   <th>Title</th>
//                   <th>Description</th>
//                   <th>Created Time</th>
//                   <th>Edit</th>
//                   <th>Delete</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentRows.map((paper, index) => (
//                   <tr key={paper._id}>
//                     <td>{indexOfFirstRow + index + 1}</td>
//                     <td>{paper.title}</td>
//                     <td>{paper.description}</td>
//                     <td>{new Date(paper.current_time).toLocaleString()}</td>
//                     <td>
//                         <Link to={`/create-paper/${paper._id}`}>
//                       <BsPencil 
//                         size={20} 
//                         color="blue" 
//                         style={{ cursor: 'pointer' }} 
//                       />
//                       </Link>
                      
//                     </td>
//                     <td>
//                       <BsTrash 
//                         size={20} 
//                         color="red" 
//                         style={{ cursor: 'pointer' }} 
//                         onClick={() => deleteHandler(paper._id)} 
//                       />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             <div className="pagination">
//               <div className="d-flex justify-content-between align-items-center">
//                 <div>
//                   <button onClick={handlePrevPage} disabled={currentPage === 1} className="btn btn-outline-secondary me-2">Previous</button>
//                   <button onClick={handleNextPage} disabled={currentPage === totalPages} className="btn btn-outline-secondary">Next</button>
//                 </div>
//               </div>
//               <span className="page-no">Page {currentPage} of {totalPages}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PapersList;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../Constants/Url';
import { useGlobalState } from '../Constants/GlobalStateProvider';
import { BsPencil, BsTrash } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const PapersList = ({ onEdit }) => {
  const [papers, setPapers] = useState([]);
  const { getGlobal } = useGlobalState();
  const globalState = getGlobal();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/papers/educator/${globalState}`);
        const sortedPapers = response.data.sort((a, b) => new Date(b.current_time) - new Date(a.current_time));
        setPapers(sortedPapers);
      } catch (error) {
        console.error('Error fetching papers:', error);
      }
    };

    fetchPapers();
  }, [globalState]);

  const filteredPapers = papers.filter(paper => {
    const { title, description } = paper;
    return (
      searchTerm === "" ||
      (title && title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (description && description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredPapers.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredPapers.length / rowsPerPage);

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const deleteHandler = async id => {
    if (window.confirm("Are you sure you want to delete this paper?")) {
      try {
        await axios.delete(`${API_URL}/api/papers/educator/delete/${id}`);
        setPapers(prevPapers => prevPapers.filter(paper => paper._id !== id));
        alert("Paper deleted successfully");
      } catch (error) {
        console.error('Error deleting paper:', error);
      }
    }
  };

  return (
    <div className="col-12">
      <div className="card recent-sales overflow-auto">
        <div className="filter">
          <a className="icon" href="#" data-bs-toggle="dropdown">
            <i className="bi bi-three-dots" />
          </a>
          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
            <li className="dropdown-header text-start">
              <h6>Filter</h6>
            </li>
            <li><a className="dropdown-item" href="#">Today</a></li>
            <li><a className="dropdown-item" href="#">This Month</a></li>
            <li><a className="dropdown-item" href="#">This Year</a></li>
          </ul>
        </div>
        <div className="card-body">
          <h5 className="card-title">Your Papers <span>| Today</span></h5>
          <div>
            <div className="search-bar">
              <input
                type="text"
                className="form-control"
                placeholder="Search by Title or Description"
                value={searchTerm}
                onChange={event => setSearchTerm(event.target.value)}
              />
            </div>
            <br />
            <table className="user-table" style={{ borderCollapse: 'collapse', width: '100%', textAlign: 'left' }}>
              <thead>
                <tr>
                  <th>Sr. No.</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Last Updated</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map((paper, index) => (
                  <tr key={paper._id}>
                    <td>{indexOfFirstRow + index + 1}</td>
                    <td>{paper.title}</td>
                    <td>{paper.description}</td>
                    <td>{new Date(paper.current_time).toLocaleString()}</td>
                    <td>
                      <Link to={`/create-paper/${paper._id}`}>
                        <BsPencil 
                          size={20} 
                          color="blue" 
                          style={{ cursor: 'pointer' }} 
                        />
                      </Link>
                    </td>
                    <td>
                      <BsTrash 
                        size={20} 
                        color="red" 
                        style={{ cursor: 'pointer' }} 
                        onClick={() => deleteHandler(paper._id)} 
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <button onClick={handlePrevPage} disabled={currentPage === 1} className="btn btn-outline-secondary me-2">Previous</button>
                  <button onClick={handleNextPage} disabled={currentPage === totalPages} className="btn btn-outline-secondary">Next</button>
                </div>
              </div>
              <span className="page-no">Page {currentPage} of {totalPages}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PapersList;
