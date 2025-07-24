import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../components/Constants/Url';
import { useGlobalState } from '../../components/Constants/GlobalStateProvider';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  text-align: left;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  background-color: #f3f3f3;
  transition: background-color 0.3s ease;

  thead tr {
    background-color: #009879;
    color: #ffffff;
    text-align: left;
    font-weight: bold;
  }

  th, td {
    padding: 12px 15px;
  }

  tbody tr {
    border-bottom: 1px solid #dddddd;
  }

  tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
  }

  tbody tr:nth-of-type(odd) {
    background-color: #ffffff;
  }

  tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
  }

  tbody tr:hover {
    background-color: #f1f1f1;
  }
`;

const DetailsButton = styled(Link)`
  color: #ffffff;
  background-color: #009879;
  padding: 5px 10px;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #007f6b;
  }
`;

const PaginationButton = styled.button`
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #007f6b;
    color: #ffffff;
  }
`;

const ListOfEducator = () => {
  const [educators, setEducators] = useState([]);
  const { getGlobal } = useGlobalState();
  const globalState = getGlobal();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchEducators = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/student/${globalState}/educators`);
        const sortedEducators = response.data.educators.sort((a, b) => a.educator_name.localeCompare(b.educator_name));
        setEducators(sortedEducators);
      } catch (error) {
        console.error('Error fetching educators:', error);
      }
    };

    fetchEducators();
  }, [globalState]);

  const filteredEducators = educators.filter(educator => {
    const { educator_name, institute } = educator;
    return (
      searchTerm === "" ||
      (educator_name && educator_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (institute && institute.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredEducators.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredEducators.length / rowsPerPage);

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
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
          <h5 className="card-title">Your Educators <span>| Today</span></h5>
          <div>
            <div className="search-bar">
              <input
                type="text"
                className="form-control"
                placeholder="Search by Name or Institute"
                value={searchTerm}
                onChange={event => setSearchTerm(event.target.value)}
              />
            </div>
            <br />
            <StyledTable>
              <thead>
                <tr>
                  <th>Sr. No.</th>
                  <th>Name</th>
                  <th>Institute</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map((educator, index) => (
                  <tr key={educator.user_id}>
                    <td>{indexOfFirstRow + index + 1}</td>
                    <td>{educator.educator_name}</td>
                    <td>{educator.institute}</td>
                    <td>{educator.educator_phone}</td>
                    <td>{educator.user_id}</td>
                    <td>
                      <DetailsButton to={`/educator-details/${educator.user_id}`}>
                        Details
                      </DetailsButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </StyledTable>
            <div className="pagination">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <PaginationButton onClick={handlePrevPage} disabled={currentPage === 1} className="btn btn-outline-secondary me-2">Previous</PaginationButton>
                  <PaginationButton onClick={handleNextPage} disabled={currentPage === totalPages} className="btn btn-outline-secondary">Next</PaginationButton>
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

export default ListOfEducator;
