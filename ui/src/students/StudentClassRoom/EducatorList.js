import React from 'react';

const EducatorList = ({ educator, onSelectEducator }) => {
  return (
    <div>
      
      <h2>Educator Details</h2>
      {educator ? (
        <div 
          className="educator-card"
          onClick={() => onSelectEducator(educator._id)}
        >
          <h3>{educator.educator_name}</h3>
          <p>{educator.institute}</p>
        </div>
      ) : (
        <p>No educator found</p>
      )}
    </div>
  );
};

export default EducatorList;
