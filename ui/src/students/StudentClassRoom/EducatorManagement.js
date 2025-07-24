import React, { useState } from 'react';
import AddEducator from './AddEducator';
import EducatorList from './EducatorList';
import styled from 'styled-components';

const Container = styled.div`
  margin: 20px auto;
  padding: 20px;
  max-width: 800px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-10px);
  }
`;

const ErrorMessage = styled.h4`
  color: red;
  text-align: center;
`;

const EducatorManagement = () => {
  const [selectedEducatorId, setSelectedEducatorId] = useState(null);
  const [educator, setEducator] = useState(null);

  const handleSelectEducator = (id) => {
    setSelectedEducatorId(id);
  };

  return (
    <Container>
      {!selectedEducatorId ? (
        <AddEducator setEducator={setEducator} />
      ) : (
        <ErrorMessage>Cannot Fetch The Educators Details , Educator Does Not Exist</ErrorMessage>
      )}
      {educator && <EducatorList educator={educator} onSelectEducator={handleSelectEducator} />}
    </Container>
  );
};

export default EducatorManagement;



















// import React, { useState } from 'react';
// import AddEducator from './AddEducator';
// import EducatorList from './EducatorList';
// // import AssignedPapers from './AssignedPapers';

// const EducatorManagement = () => {
//   const [selectedEducatorId, setSelectedEducatorId] = useState(null);
//   const [educator, setEducator] = useState(null);

//   const handleSelectEducator = (id) => {
//     setSelectedEducatorId(id);
//   };

//   return (
//     <div>
//       {!selectedEducatorId ? (
//         <AddEducator setEducator={setEducator} />
//       ) : (
//         // 
//         <h4>Cannot Fetch The Educators Right Now! Try Again Later</h4>
//       )}
//       {educator && <EducatorList educator={educator} onSelectEducator={handleSelectEducator} />}
//     </div>
//   );
// };

// export default EducatorManagement;
