// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { API_URL } from '../Constants/Url';
// import { useGlobalState } from '../Constants/GlobalStateProvider';
// import { BsPencil, BsTrash } from 'react-icons/bs';
// import { Link } from 'react-router-dom';

// const NewAssignTable = ({ onEdit }) => {
//   const [papers, setPapers] = useState([]);
//   const { getGlobal } = useGlobalState();
//   const globalState = getGlobal();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedPaper, setSelectedPaper] = useState(null);
//   const [marks, setMarks] = useState(0);
//   const rowsPerPage = 5;

//   useEffect(() => {
//     const fetchPapers = async () => {
//       try {
//         const response = await axios.get(`${API_URL}/api/papers/educator/${globalState}`);
//         const sortedPapers = response.data.sort((a, b) => new Date(b.current_time) - new Date(a.current_time));
//         setPapers(sortedPapers);
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
//         alert("Paper deleted successfully");
//       } catch (error) {
//         console.error('Error deleting paper:', error);
//       }
//     }
//   };

//   const handleAssignToggle = async (id, currentStatus) => {
//     if (!currentStatus) {
//       setSelectedPaper(id);
//       setShowModal(true);
//     } else {
//       try {
//         await axios.patch(`${API_URL}/api/papers/educator/assign/${id}`, { assigned: !currentStatus });
//         setPapers(prevPapers =>
//           prevPapers.map(paper =>
//             paper._id === id ? { ...paper, assigned: !currentStatus } : paper
//           )
//         );
//       } catch (error) {
//         console.error('Error updating paper assignment status:', error);
//       }
//     }
//   };

//   const handleModalSubmit = async () => {
//     if (marks === null || isNaN(marks)) {
//       alert("Invalid input for marks. Please try again.");
//       return;
//     }

//     try {
//       await axios.patch(`${API_URL}/api/papers/educator/assign/${selectedPaper}`, { assigned: true, marks: parseInt(marks, 10) });
//       setPapers(prevPapers =>
//         prevPapers.map(paper =>
//           paper._id === selectedPaper ? { ...paper, assigned: true, marks: parseInt(marks, 10) } : paper
//         )
//       );
//       setShowModal(false);
//       setSelectedPaper(null);
//       setMarks(0);
//     } catch (error) {
//       console.error('Error updating paper assignment status:', error);
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
//                   <th>Total Questions</th>
//                   <th>Marks</th>
//                   <th>Last Updated</th>
//                   <th>Assign</th>
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
//                     <td>{paper.questions.length}</td>
//                     <td>{paper.marks}</td>
//                     <td>{new Date(paper.current_time).toLocaleString()}</td>
//                     <td>
//                       <button
//                         style={{
//                           backgroundColor: paper.assigned ? 'green' : 'grey',
//                           color: 'white',
//                           border: 'none',
//                           borderRadius: '4px',
//                           padding: '5px 10px',
//                           cursor: 'pointer'
//                         }}
//                         onClick={() => handleAssignToggle(paper._id, paper.assigned)}
//                       >
//                         {paper.assigned ? 'Assigned' : 'Assign'}
//                       </button>
//                     </td>
//                     <td>
//                       <Link to={`/create-paper/${paper._id}`}>
//                         <BsPencil 
//                           size={20} 
//                           color="blue" 
//                           style={{ cursor: 'pointer' }} 
//                         />
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
//       {showModal && (
//         <div className="modal" style={{ display: 'block' }}>
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Set Marks Per Question</h5>
//                 <button type="button" className="close" onClick={() => setShowModal(false)}>
//                   <span>&times;</span>
//                 </button>
//               </div>
//               <div className="modal-body">
//                 <form>
//                   <div className="form-group">
//                     <label>Marks Per Question</label>
//                     <input
//                       type="number"
//                       className="form-control"
//                       value={marks}
//                       onChange={event => setMarks(event.target.value)}
//                     />
//                   </div>
//                 </form>
//               </div>
//               <div className="modal-footer">
//                 <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
//                 <button type="button" className="btn btn-primary" onClick={handleModalSubmit}>Save changes</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NewAssignTable;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { API_URL } from '../Constants/Url';
// import { useGlobalState } from '../Constants/GlobalStateProvider';
// import { BsPencil, BsTrash } from 'react-icons/bs';
// import { Link } from 'react-router-dom';

// const NewAssignTable = ({ onEdit }) => {
//   const [papers, setPapers] = useState([]);
//   const { getGlobal } = useGlobalState();
//   const globalState = getGlobal();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedPaper, setSelectedPaper] = useState(null);
//   const [marks, setMarks] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const rowsPerPage = 5;

//   useEffect(() => {
//     const fetchPapers = async () => {
//       try {
//         const response = await axios.get(`${API_URL}/api/papers/educator/${globalState}`);
//         const sortedPapers = response.data.sort((a, b) => new Date(b.current_time) - new Date(a.current_time));
//         setPapers(sortedPapers);
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
//         alert("Paper deleted successfully");
//       } catch (error) {
//         console.error('Error deleting paper:', error);
//       }
//     }
//   };

//   const handleAssignToggle = async (id, currentStatus) => {
//     if (!currentStatus) {
//       setSelectedPaper(id);
//       setShowModal(true);
//     } else {
//       try {
//         await axios.patch(`${API_URL}/api/papers/educator/assign/${id}`, { assigned: !currentStatus });
//         setPapers(prevPapers =>
//           prevPapers.map(paper =>
//             paper._id === id ? { ...paper, assigned: !currentStatus } : paper
//           )
//         );
//         alert('Are you sure you want to remove this assigment ?');
//       } catch (error) {
//         console.error('Error updating paper assignment status:', error);
//       }
//     }
//   };

//   const handleModalSubmit = async () => {
//     if (marks === null || isNaN(marks) || duration === null || isNaN(duration)) {
//       alert("Invalid input for marks or duration. Please try again.");
//       return;
//     }

//     try {
//       await axios.patch(`${API_URL}/api/papers/educator/assign/${selectedPaper}`, { assigned: true, marks: parseInt(marks, 10), duration: parseInt(duration, 10) });
//       setPapers(prevPapers =>
//         prevPapers.map(paper =>
//           paper._id === selectedPaper ? { ...paper, assigned: true, marks: parseInt(marks, 10), duration: parseInt(duration, 10) } : paper
//         )
//       );
//       setShowModal(false);
//       setSelectedPaper(null);
//       setMarks(0);
//       setDuration(0);
//     } catch (error) {
//       console.error('Error updating paper assignment status:', error);
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
//                   <th>Total Questions</th>
//                   <th>Marks</th>
//                   <th>Duration (mins)</th>
//                   <th>Last Updated</th>
//                   <th>Assign</th>
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
//                     <td>{paper.questions.length}</td>
//                     <td>{paper.marks}</td>
//                     <td>{paper.duration}</td>
//                     <td>{new Date(paper.current_time).toLocaleString()}</td>
//                     <td>
//                       <button
//                         style={{
//                           backgroundColor: paper.assigned ? 'green' : 'grey',
//                           color: 'white',
//                           border: 'none',
//                           borderRadius: '4px',
//                           padding: '5px 10px',
//                           cursor: 'pointer'
//                         }}
//                         onClick={() => handleAssignToggle(paper._id, paper.assigned)}
//                       >
//                         {paper.assigned ? 'Assigned' : 'Assign'}
//                       </button>
//                     </td>
//                     <td>
//                       <Link to={`/create-paper/${paper._id}`}>
//                         <BsPencil 
//                           size={20} 
//                           color="blue" 
//                           style={{ cursor: 'pointer' }} 
//                         />
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
//             <div className="d-flex justify-content-between align-items-center">
//               <div>
//                 <button onClick={handlePrevPage} disabled={currentPage === 1} className="btn btn-outline-secondary me-2">Previous</button>
//                 <button onClick={handleNextPage} disabled={currentPage === totalPages} className="btn btn-outline-secondary">Next</button>
//               </div>
//             </div>
//             <span className="page-no">Page {currentPage} of {totalPages}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//     {showModal && (
//       <div className="modal" style={{ display: 'block' }}>
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title">Assign Paper Details</h5>
//               <button type="button" className="close" onClick={() => setShowModal(false)}>
//                 <span>&times;</span>
//               </button>
//             </div>
//             <div className="modal-body">
//               <form>
//                 <div className="form-group">
//                   <label>Marks Per Question</label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     value={marks}
//                     onChange={event => setMarks(event.target.value)}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Test Duration (mins)</label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     value={duration}
//                     onChange={event => setDuration(event.target.value)}
//                   />
//                 </div>
//               </form>
//             </div>
//             <div className="modal-footer">
//               <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
//               <button type="button" className="btn btn-primary" onClick={handleModalSubmit}>Assign Paper</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     )}
//   </div>
// );
// };

// export default NewAssignTable;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../Constants/Url';
import { useGlobalState } from '../Constants/GlobalStateProvider';
import { BsPencil, BsTrash } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const NewAssignTable = ({ onEdit }) => {
  const [papers, setPapers] = useState([]);
  const { getGlobal } = useGlobalState();
  const globalState = getGlobal();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [marks, setMarks] = useState(0);
  const [duration, setDuration] = useState(0);
  const [classroom, setClassroom] = useState('');
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

  const handleAssignToggle = async (id, currentStatus) => {
    if (!currentStatus) {
      setSelectedPaper(id);
      setShowModal(true);
    } else {
      try {
        await axios.patch(`${API_URL}/api/papers/educator/assign/${id}`, { assigned: !currentStatus });
        setPapers(prevPapers =>
          prevPapers.map(paper =>
            paper._id === id ? { ...paper, assigned: !currentStatus } : paper
          )
        );
        alert('Are you sure you want to remove this assignment ?');
      } catch (error) {
        console.error('Error updating paper assignment status:', error);
      }
    }
  };

  const handleModalSubmit = async () => {
    if (marks === null || isNaN(marks) || duration === null || isNaN(duration)) {
      alert("Invalid input for marks or duration. Please try again.");
      return;
    }

    try {
      await axios.patch(`${API_URL}/api/papers/educator/assign/${selectedPaper}`, { assigned: true, marks: parseInt(marks, 10), duration: parseInt(duration, 10), classroom });
      setPapers(prevPapers =>
        prevPapers.map(paper =>
          paper._id === selectedPaper ? { ...paper, assigned: true, marks: parseInt(marks, 10), duration: parseInt(duration, 10), classroom } : paper
        )
      );
      setShowModal(false);
      setSelectedPaper(null);
      setMarks(0);
      setDuration(0);
      setClassroom('');
    } catch (error) {
      console.error('Error updating paper assignment status:', error);
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
                  {/* <th>Description</th> */}
                  <th>Total Questions</th>
                  <th>Marks</th>
                  <th>Duration (mins)</th>
                  <th>Class Room</th>
                  <th>Last Updated</th>
                  <th>Assign</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map((paper, index) => (
                  <tr key={paper._id}>
                    <td>{indexOfFirstRow + index + 1}</td>
                    <td>{paper.title}</td>
                    {/* <td>{paper.description}</td> */}
                    <td>{paper.questions.length}</td>
                    <td>{paper.marks}</td>
                    <td>{paper.duration}</td>
                    <td>{paper.classroom}</td>
                    <td>{new Date(paper.current_time).toLocaleString()}</td>

                    <td>
                      <button
                        style={{
                          backgroundColor: paper.assigned ? 'green' : 'grey',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '5px 10px',
                          cursor: 'pointer'
                        }}
                        onClick={() => handleAssignToggle(paper._id, paper.assigned)}
                      >
                        {paper.assigned ? 'Assigned' : 'Assign'}
                      </button>
                    </td>
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
      {showModal && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Assign Paper Details</h5>
                <button type="button" className="close" onClick={() => setShowModal(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label>Marks Per Question</label>
                    <input
                      type="number"
                      className="form-control"
                      value={marks}
                      onChange={event => setMarks(event.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Test Duration (mins)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={duration}
                      onChange={event => setDuration(event.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Classroom</label>
                    <input
                      type="text"
                      className="form-control"
                      value={classroom}
                      onChange={event => setClassroom(event.target.value)}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleModalSubmit}>Assign Paper</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewAssignTable;
