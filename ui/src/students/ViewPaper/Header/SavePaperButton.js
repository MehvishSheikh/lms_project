import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useGlobalState } from '../../../components/Constants/GlobalStateProvider';
import { API_URL } from '../../../components/Constants/Url';

const SavePaperButton = ({ paper ,paperId}) => {
  const { getGlobal } = useGlobalState();
  const globalState = getGlobal();

  const handleDoneClick = async () => {
    if (!globalState) {
      console.error('User ID not found in global state');
      return;
    }

    try {
      const payload = {
        ...paper,
        user_id: globalState,
        current_time: new Date().toISOString(),
      };

      if (paperId) {
        await axios.put(`${API_URL}/api/papers/educator/edit/${paperId}`, payload);
        console.log('Paper updated successfully');
        alert('Paper Updated successfully!');
      }else{
      const response = await axios.post(`${API_URL}/api/papers/save`, payload);
      alert('Paper saved successfully!');
      console.log('Paper saved:', response.data);
      }
    } catch (error) {
      console.error('Error saving paper:', error);
    }
  };

  return (
    <button onClick={handleDoneClick} style={styles.doneButton}>
      Save
    </button>
  );
};

SavePaperButton.propTypes = {
  paper: PropTypes.object.isRequired,
};

const styles = {
  doneButton: {
    backgroundColor: '#042659',
    border: 'none',
    borderRadius: '4px',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },

};

export default SavePaperButton;


