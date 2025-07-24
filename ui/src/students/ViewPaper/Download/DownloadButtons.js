// DownloadButtons.js
import { Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
const DownloadButtons = () => {
  const handleDownloadQuestionPaperPDF = () => {
    document.getElementById('downloadQuestionPaperPDFButton').click();
  };

  const handleDownloadQuestionPaperDOC = () => {
    document.getElementById('downloadQuestionPaperDOCButton').click();
  };

  const handleDownloadAnswerKeyPDF = () => {
    document.getElementById('downloadAnswerKeyPDFButton').click();
  };

  const handleDownloadAnswerKeyDOC = () => {
    document.getElementById('downloadAnswerKeyDOCButton').click();
  };

  return (
    <div>
      <DropdownButton id="dropdown-basic-button" title="Download" style={styles.downloadButton}>
        <Dropdown.Item onClick={handleDownloadQuestionPaperPDF}>Download Question Paper (PDF)</Dropdown.Item>
        <Dropdown.Item onClick={handleDownloadQuestionPaperDOC}>Download Question Paper (DOC)</Dropdown.Item>
        {/* <Dropdown.Item onClick={handleDownloadAnswerKeyPDF}>Download Answer Key (PDF)</Dropdown.Item> */}
        {/* <Dropdown.Item onClick={handleDownloadAnswerKeyDOC}>Download Answer Key (DOC)</Dropdown.Item> */}
      </DropdownButton>
    </div>
  );
};

const styles = {
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '20px',
    backgroundColor: '#042659'
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#042659',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease',
  },
  downloadButton: {
    backgroundColor: '#042659',
    border: 'none',
    borderRadius: '4px',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease',
  },
};

export default DownloadButtons;
