import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { SketchPicker } from 'react-color';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import DownloadButtons from '../Download/DownloadButtons';
import SavePaperButton from './SavePaperButton';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const PaperHeader = ({ onTemplatesToggle, onColorChange, onTemplateChange, paper, paperId, duration }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [timeLeft, setTimeLeft] = useState(0); // Start with 0 seconds
  const [showModal, setShowModal] = useState(true); // Show the initial modal
  const [showEndModal, setShowEndModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('Do you want to start the test?');
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setModalMessage('Paper has ended.');
            setShowEndModal(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && !showModal) {
      setModalMessage('Paper has ended.');
      setShowEndModal(true);
    }
  }, [timeLeft, showModal]);

  const handleColorChange = (color) => {
    setBackgroundColor(color.hex);
    onColorChange(color.hex);
    setShowColorPicker(false); // Automatically close the color picker when a color is picked
  };

  const handleCloseColorPicker = () => {
    setShowColorPicker(false);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onTemplateChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTimeLeft(duration * 60); // Set the timer to the duration
  };

  const handleCloseEndModal = () => {
    navigate('/StudentDash');
    setShowEndModal(false);
     // Navigate to home page
  };

  const handleSubmitPaper = () => {
    // Logic for submitting the paper
    setModalMessage('Paper submitted successfully.');
    setShowEndModal(true);
    navigate('/StudentDash'); 
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <>
      <header style={styles.header}>
        <div style={styles.buttonContainer}>
          <button style={styles.templatesButton} onClick={onTemplatesToggle}>Templates</button>
          <button style={styles.editButton} onClick={() => setShowColorPicker(!showColorPicker)}>View</button>
          {showColorPicker && (
            <div style={styles.colorPickerContainer}>
              <div style={styles.colorPicker}>
                <SketchPicker color={backgroundColor} onChangeComplete={handleColorChange} />
                <button style={styles.closeButton} onClick={handleCloseColorPicker}>Close</button>
              </div>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            style={styles.fileInput}
            id="fileUpload"
            onChange={handleFileUpload}
          />
          <label htmlFor="fileUpload" style={styles.uploadButton}>Upload Image</label>
          <DownloadButtons />
        </div>
        <div style={styles.timerContainer}>
          <span style={styles.timer}>{formatTime(timeLeft)}</span>
        </div>
        <div style={styles.durationContainer}>
          <span style={styles.duration}>Initial Duration: {duration} minutes</span>
        </div>
      </header>

      <Modal show={showModal} onHide={handleCloseEndModal}>
        <Modal.Header closeButton>
          <Modal.Title>Start Test</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Start Test
          </Button>
          <Button variant="primary" onClick={handleCloseEndModal}>
            Leave Test
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEndModal} onHide={handleCloseEndModal}>
        <Modal.Header closeButton>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          {timeLeft === 0 && (
            <Button variant="primary" onClick={handleSubmitPaper}>
              Submit Paper
            </Button>
          )}
          <Button variant="secondary" onClick={handleCloseEndModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

PaperHeader.propTypes = {
  onTemplatesToggle: PropTypes.func.isRequired,
  onColorChange: PropTypes.func.isRequired,
  onTemplateChange: PropTypes.func.isRequired,
  paper: PropTypes.object.isRequired,
  paperId: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#042659',
    borderBottom: '1px solid #ccc',
    borderRadius: '10px',
    width: '100%',
    height: '80px',
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    backgroundColor: '#042659',
  },
  templatesButton: {
    padding: '10px 20px',
    backgroundColor: '#042659',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  editButton: {
    padding: '10px 20px',
    backgroundColor: '#042659',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  colorPickerContainer: {
    position: 'relative',
  },
  colorPicker: {
    position: 'absolute',
    zIndex: 2,
    backgroundColor: '#fff',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    right: '-10px', // Shifted right
  },
  closeButton: {
    display: 'block',
    marginTop: '10px',
    padding: '5px 10px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  fileInput: {
    display: 'none',
  },
  uploadButton: {
    padding: '10px 20px',
    backgroundColor: '#042659',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  timerContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  timer: {
    fontSize: '20px',
    color: '#fff',
  },
  durationContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  duration: {
    fontSize: '16px',
    color: '#fff',
  },
};

export default PaperHeader;





// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import { SketchPicker } from 'react-color';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import DownloadButtons from '../Download/DownloadButtons'
// import SavePaperButton from './SavePaperButton';

// const PaperHeader = ({ onTemplatesToggle, onColorChange, onTemplateChange, paper , paperId}) => {
//   const [showColorPicker, setShowColorPicker] = useState(false);
//   const [backgroundColor, setBackgroundColor] = useState('#ffffff');

//   const handleColorChange = (color) => {
//     setBackgroundColor(color.hex);
//     onColorChange(color.hex);
//     setShowColorPicker(false); // Automatically close the color picker when a color is picked
//   };

//   const handleCloseColorPicker = () => {
//     setShowColorPicker(false);
//   };

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         onTemplateChange(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <>
//       <header style={styles.header}>
//         {/* <h1>Paper Editor</h1> */}
//         <div style={styles.buttonContainer}>
//           <button style={styles.templatesButton} onClick={onTemplatesToggle}>Templates</button>
//           <button style={styles.editButton} onClick={() => setShowColorPicker(!showColorPicker)}>View</button>
//           {showColorPicker && (
//             <div style={styles.colorPickerContainer}>
//               <div style={styles.colorPicker}>
//                 <SketchPicker color={backgroundColor} onChangeComplete={handleColorChange} />
//                 <button style={styles.closeButton} onClick={handleCloseColorPicker}>Close</button>
//               </div>
//             </div>
//           )}
//           <input
//             type="file"
//             accept="image/*"
//             style={styles.fileInput}
//             id="fileUpload"
//             onChange={handleFileUpload}
//           />
//           <label htmlFor="fileUpload" style={styles.uploadButton}>Upload Image</label>
    
//           {/* <SavePaperButton paper={paper} paperId={paperId}/> */}
//           <DownloadButtons />
//         </div>
//       </header>
//     </>
//   );
// };

// PaperHeader.propTypes = {
//   onTemplatesToggle: PropTypes.func.isRequired,
//   onColorChange: PropTypes.func.isRequired,
//   onTemplateChange: PropTypes.func.isRequired,
//   paper: PropTypes.object.isRequired,
// };

// const styles = {
//   header: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'right',
//     padding: '10px 20px',
//     backgroundColor: '#042659',
//     borderBottom: '1px solid #ccc',
//     borderRadius: '10px',
//     paddingLeft: '220px',
//     width: '100%',
//     height: '80px'
//   },
//   buttonContainer: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '15px',
//     backgroundColor: '#042659',
//   },
//   templatesButton: {
//     padding: '10px 20px',
//     backgroundColor: '#042659',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//   },
//   editButton: {
//     padding: '10px 20px',
//     backgroundColor: '#042659',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//   },
//   colorPickerContainer: {
//     position: 'relative',
//   },
//   colorPicker: {
//     position: 'absolute',
//     zIndex: 2,
//     backgroundColor: '#fff',
//     padding: '10px',
//     border: '1px solid #ccc',
//     borderRadius: '5px',
//     right: '-10px', // Shifted right
//   },
//   closeButton: {
//     display: 'block',
//     marginTop: '10px',
//     padding: '5px 10px',
//     backgroundColor: '#dc3545',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//   },
//   fileInput: {
//     display: 'none',
//   },
//   uploadButton: {
//     padding: '10px 20px',
//     backgroundColor: '#042659',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//   },
// };

// export default PaperHeader;
