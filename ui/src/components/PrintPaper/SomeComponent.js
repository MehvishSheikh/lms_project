import React from 'react';
import PrintPaper from './PrintPaper';

const SomeComponent = () => {
  const paperId = '667680093485569ac0f08b48'; // Replace with actual paper ID

  return (
    <div>
      <h1>Paper Details</h1>
      <PrintPaper paperId={paperId} />
    </div>
  );
};

export default SomeComponent;
