// import React, { useState } from 'react';
// import axios from 'axios';
// import { TextField, Button, CircularProgress, Typography, Paper, List, ListItem, ListItemText, Box } from '@mui/material';
// import { useGlobalState } from '../../Constants/GlobalStateProvider';
// const Knowledgbase = () => {
//   const { getGlobal, setGlobal } = useGlobalState();
//   const userId = getGlobal();
  
//   const [knowledgeName, setKnowledgeName] = useState('');
//   const [agentName, setAgentName] = useState('');
//   const [files, setFiles] = useState(null);
//   const [chatInput, setChatInput] = useState('');
//   const [sessionID, setSessionID] = useState('');
//   const [chatResponse, setChatResponse] = useState('');
//   const [knowledgeID, setKnowledgeID] = useState('');
//   const [knowledgeSummary, setKnowledgeSummary] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleKnowledgeBaseSubmit = async () => {
//     setError(null);
//     if (!files) {
//       setError('Please upload one or more files.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('knowledge_name', knowledgeName);
//     formData.append('agent_name', agentName);

//     for (let i = 0; i < files.length; i++) {
//       formData.append('files', files[i]);
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post('http://localhost:8000/store-vector-db', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       const uniqueIndexName = response.data.knowledge_id;
//       setKnowledgeID(uniqueIndexName);

//       await axios.post('http://localhost:8000/set', {
//         unique_index_name: uniqueIndexName,
//         agent_name: agentName,
//       });

//       alert('Knowledge base and context set successfully!');
//       pollForSummary(uniqueIndexName);
//     } catch (error) {
//       setError('Error storing knowledge base. Please try again.');
//       console.error('Error storing knowledge base:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const pollForSummary = (knowledgeID) => {
//     const interval = 5000;

//     const checkSummary = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/get_summary/${knowledgeID}`);
//         if (response.status === 200) {
//           setKnowledgeSummary(response.data.summary);
//         } else {
//           setTimeout(checkSummary, interval);
//         }
//       } catch (error) {
//         setError('Error fetching knowledge summary. Please try again.');
//         setTimeout(checkSummary, interval);
//       }
//     };

//     checkSummary();
//   };

//   const handleChat = async () => {
//     setError(null);
//     setLoading(true);
//     try {
//       const response = await axios.post('http://localhost:8000/chat', {
//         message: chatInput,
//         session_id: sessionID,
//         agent_name: agentName,
//       });
//       setChatResponse(response.data.response);
//     } catch (error) {
//       setError('Error during chat. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFileChange = (event) => {
//     setFiles(event.target.files);
//   };

//   return (
//     <Paper sx={{ maxWidth: '600px', margin: 'auto', padding: '20px', backgroundColor: '#f4f4f9', borderRadius: '10px', boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)' }}>
//       <Typography variant="h4" gutterBottom>
//         Create Your AI Agent
//       </Typography>

//       {error && <Typography color="error">{error}</Typography>}

//       <TextField
//         label="Knowledge Name"
//         variant="outlined"
//         fullWidth
//         sx={{ mb: 2 }}
//         value={knowledgeName}
//         onChange={(e) => setKnowledgeName(e.target.value)}
//       />
//       <TextField
//         label="Agent Name"
//         variant="outlined"
//         fullWidth
//         sx={{ mb: 2 }}
//         value={agentName}
//         onChange={(e) => setAgentName(e.target.value)}
//       />

//       <input type="file" multiple onChange={handleFileChange} />
      
//       {files && (
//         <List sx={{ mt: 2, p: 2, backgroundColor: '#fff', borderRadius: '5px', boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)' }}>
//           {Array.from(files).map((file, index) => (
//             <ListItem key={index}>
//               <ListItemText
//                 primary={file.name}
//                 secondary={`Size: ${(file.size / 1024).toFixed(2)} KB`}
//               />
//             </ListItem>
//           ))}
//         </List>
//       )}

//       <Button
//         sx={{ backgroundColor: '#1976d2', color: '#fff', '&:hover': { backgroundColor: '#115293' }, mt: 2 }}
//         variant="contained"
//         fullWidth
//         onClick={handleKnowledgeBaseSubmit}
//         disabled={loading}
//       >
//         {loading ? <CircularProgress size={24} /> : 'Submit Knowledge Base'}
//       </Button>

//       {knowledgeID && (
//         <Box mt={3}>
//           <Typography variant="h6">Knowledge ID</Typography>
//           <Typography>{knowledgeID}</Typography>
//         </Box>
//       )}

//       {knowledgeSummary && (
//         <Box mt={3}>
//           <Typography variant="h6">Knowledge Summary</Typography>
//           <Typography>{knowledgeSummary}</Typography>
//         </Box>
//       )}

//       <TextField
//         label="Session ID"
//         variant="outlined"
//         fullWidth
//         sx={{ mb: 2, mt: 3 }}
//         value={sessionID}
//         onChange={(e) => setSessionID(e.target.value)}
//       />
//       <TextField
//         label="Your message"
//         variant="outlined"
//         fullWidth
//         sx={{ mb: 2 }}
//         value={chatInput}
//         onChange={(e) => setChatInput(e.target.value)}
//       />

//       <Button
//         sx={{ backgroundColor: '#1976d2', color: '#fff', '&:hover': { backgroundColor: '#115293' }, mt: 2 }}
//         variant="contained"
//         fullWidth
//         onClick={handleChat}
//         disabled={loading}
//       >
//         {loading ? <CircularProgress size={24} /> : 'Send Message'}
//       </Button>

//       {chatResponse && (
//         <Paper sx={{ mt: 3, p: 2, backgroundColor: '#e0f7fa', borderRadius: '5px' }}>
//           <Typography variant="h6">Response from Agent</Typography>
//           <Typography>{chatResponse}</Typography>
//         </Paper>
//       )}
//     </Paper>
//   );
// };

// export default Knowledgbase;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { TextField, Button, CircularProgress, Typography, Paper, List, ListItem, ListItemText, Box } from '@mui/material';
// import { useGlobalState } from '../../Constants/GlobalStateProvider';

// const Knowledgbase = () => {
//   const { getGlobal, setGlobal } = useGlobalState();
//   const userId = getGlobal();  // Assuming `getGlobal` fetches the user_id

//   const [knowledgeName, setKnowledgeName] = useState('');
//   const [agentName, setAgentName] = useState('');
//   const [files, setFiles] = useState(null);
//   const [chatInput, setChatInput] = useState('');
//   const [sessionID, setSessionID] = useState('');
//   const [chatResponse, setChatResponse] = useState('');
//   const [knowledgeID, setKnowledgeID] = useState('');
//   const [knowledgeSummary, setKnowledgeSummary] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleKnowledgeBaseSubmit = async () => {
//     setError(null);
//     if (!files) {
//       setError('Please upload one or more files.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('knowledge_name', knowledgeName);
//     formData.append('agent_name', agentName);

//     for (let i = 0; i < files.length; i++) {
//       formData.append('files', files[i]);
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post('http://localhost:5002/store-vector-db', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       const uniqueIndexName = response.data.knowledge_id;
//       setKnowledgeID(uniqueIndexName);

//       await axios.post('http://localhost:5002/set', {
//         unique_index_name: uniqueIndexName,
//         agent_name: agentName,
//       });

//       alert('Knowledge base and context set successfully!');
      
//       // Poll for summary after setting the knowledge base
//       pollForSummary(uniqueIndexName);
      
//       // Add the knowledge entry to MongoDB
//       saveKnowledgeBaseToDB(knowledgeName, uniqueIndexName);
      
//     } catch (error) {
//       setError('Error storing knowledge base. Please try again.');
//       console.error('Error storing knowledge base:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const pollForSummary = (knowledgeID) => {
//     const interval = 5000;

//     const checkSummary = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5002/get_summary/${knowledgeID}`);
//         if (response.status === 200) {
//           setKnowledgeSummary(response.data.summary);
//         } else {
//           setTimeout(checkSummary, interval);
//         }
//       } catch (error) {
//         setError('Error fetching knowledge summary. Please try again.');
//         setTimeout(checkSummary, interval);
//       }
//     };

//     checkSummary();
//   };

//   const saveKnowledgeBaseToDB = async (knowledgeName, uniqueKnowledgeID) => {
//     try {
//       const response = await axios.post('http://localhost:8000/api/knowledge/save-knowledge', {
//         user_id: userId,  // Assuming userId comes from global state
//         knowledge_name: knowledgeName,
//         unique_knowledge_id: uniqueKnowledgeID,
//         summary: knowledgeSummary,
//       });
//       if (response.status === 200) {
//         alert('Knowledge saved successfully to database!');
//       }
//     } catch (error) {
//       setError('Error saving knowledge to database. Please try again.');
//       console.error('Error saving knowledge:', error);
//     }
//   };

//   const handleFileChange = (event) => {
//     setFiles(event.target.files);
//   };
//   const handleChat = async () => {
//     setError(null);
//     setLoading(true);
//     try {
//       const response = await axios.post('http://localhost:5002/chat', {
//         message: chatInput,
//         session_id: sessionID,
//         agent_name: agentName,
//       });
//       setChatResponse(response.data.response);
//     } catch (error) {
//       setError('Error during chat. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

// //   const handleFileChange = (event) => {
// //     setFiles(event.target.files);
// //   };
//   return (
//     <Paper sx={{ maxWidth: '600px', margin: 'auto', padding: '20px', backgroundColor: '#f4f4f9', borderRadius: '10px', boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)' }}>
//       <Typography variant="h4" gutterBottom>
//         Create Your AI Agent
//       </Typography>

//       {error && <Typography color="error">{error}</Typography>}

//       <TextField
//         label="Knowledge Name"
//         variant="outlined"
//         fullWidth
//         sx={{ mb: 2 }}
//         value={knowledgeName}
//         onChange={(e) => setKnowledgeName(e.target.value)}
//       />
//       <TextField
//         label="Agent Name"
//         variant="outlined"
//         fullWidth
//         sx={{ mb: 2 }}
//         value={agentName}
//         onChange={(e) => setAgentName(e.target.value)}
//       />

//       <input type="file" multiple onChange={handleFileChange} />
      
//       {files && (
//         <List sx={{ mt: 2, p: 2, backgroundColor: '#fff', borderRadius: '5px', boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)' }}>
//           {Array.from(files).map((file, index) => (
//             <ListItem key={index}>
//               <ListItemText
//                 primary={file.name}
//                 secondary={`Size: ${(file.size / 1024).toFixed(2)} KB`}
//               />
//             </ListItem>
//           ))}
//         </List>
//       )}

//       <Button
//         sx={{ backgroundColor: '#1976d2', color: '#fff', '&:hover': { backgroundColor: '#115293' }, mt: 2 }}
//         variant="contained"
//         fullWidth
//         onClick={handleKnowledgeBaseSubmit}
//         disabled={loading}
//       >
//         {loading ? <CircularProgress size={24} /> : 'Submit Knowledge Base'}
//       </Button>

//       {knowledgeID && (
//         <Box mt={3}>
//           <Typography variant="h6">Knowledge ID</Typography>
//           <Typography>{knowledgeID}</Typography>
//         </Box>
//       )}

//       {knowledgeSummary && (
//         <Box mt={3}>
//           <Typography variant="h6">Knowledge Summary</Typography>
//           <Typography>{knowledgeSummary}</Typography>
//         </Box>
//       )}

//       <TextField
//         label="Session ID"
//         variant="outlined"
//         fullWidth
//         sx={{ mb: 2, mt: 3 }}
//         value={sessionID}
//         onChange={(e) => setSessionID(e.target.value)}
//       />
//       <TextField
//         label="Your message"
//         variant="outlined"
//         fullWidth
//         sx={{ mb: 2 }}
//         value={chatInput}
//         onChange={(e) => setChatInput(e.target.value)}
//       />

//       <Button
//         sx={{ backgroundColor: '#1976d2', color: '#fff', '&:hover': { backgroundColor: '#115293' }, mt: 2 }}
//         variant="contained"
//         fullWidth
//         onClick={handleChat}
//         disabled={loading}
//       >
//         {loading ? <CircularProgress size={24} /> : 'Send Message'}
//       </Button>

//       {chatResponse && (
//         <Paper sx={{ mt: 3, p: 2, backgroundColor: '#e0f7fa', borderRadius: '5px' }}>
//           <Typography variant="h6">Response from Agent</Typography>
//           <Typography>{chatResponse}</Typography>
//         </Paper>
//       )}
//     </Paper>
//   );
// };

// export default Knowledgbase;


import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, CircularProgress, Typography, Paper, List, ListItem, ListItemText, Box } from '@mui/material';
import { useGlobalState } from '../../Constants/GlobalStateProvider';

const Knowledgbase = () => {
  const { getGlobal } = useGlobalState();
  const userId = getGlobal(); // Assuming `getGlobal` fetches the user_id

  const [knowledgeName, setKnowledgeName] = useState('');
  const [agentName, setAgentName] = useState('');
  const [files, setFiles] = useState(null);
  const [chatInput, setChatInput] = useState('');
  const [sessionID, setSessionID] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [knowledgeID, setKnowledgeID] = useState('');
  const [knowledgeSummary, setKnowledgeSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleKnowledgeBaseSubmit = async () => {
    setError(null);
    if (!files) {
      setError('Please upload one or more files.');
      return;
    }

    const formData = new FormData();
    formData.append('knowledge_name', knowledgeName);
    formData.append('agent_name', agentName);

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5002/store-vector-db', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const uniqueIndexName = response.data.knowledge_id;
      setKnowledgeID(uniqueIndexName);

      await axios.post('http://localhost:5002/set', {
        unique_index_name: uniqueIndexName,
        agent_name: agentName,
      });

      alert('Knowledge base and context set successfully!');
      
      // Poll for summary after setting the knowledge base
      pollForSummary(uniqueIndexName);
      
    } catch (error) {
      setError('Error storing knowledge base. Please try again.');
      console.error('Error storing knowledge base:', error);
    } finally {
      setLoading(false);
    }
  };

  const pollForSummary = (knowledgeID) => {
    const interval = 5000;
  
    const checkSummary = async () => {
      try {
        const response = await axios.get(`http://localhost:5002/get_summary/${knowledgeID}`);
        if (response.status === 200 && response.data.summary) {
          // Directly use the fetched summary instead of waiting for state update
          const fetchedSummary = response.data.summary;
          setKnowledgeSummary(fetchedSummary); // Optionally update state for UI feedback
  
          // Extract file names
          const fileNames = Array.from(files).map((file) => file.name);
  
          // After summary is fetched, save the knowledge base to DB
          saveKnowledgeBaseToDB(knowledgeName, knowledgeID, fileNames, fetchedSummary);
  
        } else {
          // If summary is not available, keep polling
          setTimeout(checkSummary, interval);
        }
      } catch (error) {
        setError('Error fetching knowledge summary. Please try again.');
        setTimeout(checkSummary, interval);
      }
    };
  
    checkSummary();
  };
  
  const saveKnowledgeBaseToDB = async (knowledgeName, uniqueKnowledgeID, fileNames, knowledgeSummary) => {
    try {
      const response = await axios.post('http://localhost:8000/api/knowledge/save-knowledge', {
        user_id: userId, // Assuming userId comes from global state
        knowledge_name: knowledgeName,
        unique_knowledge_id: uniqueKnowledgeID,
        summary: knowledgeSummary, // Use the summary directly instead of state
        documents: fileNames, // Pass the file names directly
      });
      if (response.status === 200) {
        alert('Knowledge saved successfully to database!');
      }
    } catch (error) {
      setError('Error saving knowledge to database. Please try again.');
      console.error('Error saving knowledge:', error);
    }
  };
  


  // const pollForSummary = (knowledgeID) => {
  //   const interval = 5000;

  //   const checkSummary = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:5002/get_summary/${knowledgeID}`);
  //       if (response.status === 200 && response.data.summary) {
  //         setKnowledgeSummary(response.data.summary);

  //         // Extract file names
  //         const fileNames = Array.from(files).map(file => file.name);
          
  //         // After summary is fetched, save the knowledge base to DB
  //         saveKnowledgeBaseToDB(knowledgeName, knowledgeID, fileNames, knowledgeSummary);
          
  //       } else {
  //         // If summary is not available, keep polling
  //         setTimeout(checkSummary, interval);
  //       }
  //     } catch (error) {
  //       setError('Error fetching knowledge summary. Please try again.');
  //       setTimeout(checkSummary, interval);
  //     }
  //   };

  //   checkSummary();
  // };

  // const saveKnowledgeBaseToDB = async (knowledgeName, uniqueKnowledgeID, fileNames, knowledgeSummary) => {
  //   try {
  //     const response = await axios.post('http://localhost:8000/api/knowledge/save-knowledge', {
  //       user_id: userId, // Assuming userId comes from global state
  //       knowledge_name: knowledgeName,
  //       unique_knowledge_id: uniqueKnowledgeID,
  //       summary: knowledgeSummary, // Send the summary when it is available
  //       documents: fileNames, // Pass the file names directly
  //     });
  //     if (response.status === 200) {
  //       alert('Knowledge saved successfully to database!');
  //     }
  //   } catch (error) {
  //     setError('Error saving knowledge to database. Please try again.');
  //     console.error('Error saving knowledge:', error);
  //   }
  // };
  
  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const handleChat = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5002/chat', {
        message: chatInput,
        session_id: sessionID,
        agent_name: agentName,
      });
      setChatResponse(response.data.response);
    } catch (error) {
      setError('Error during chat. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ maxWidth: '600px', margin: 'auto', padding: '20px', backgroundColor: '#fffff', borderRadius: '10px', boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)' }}>
      <Typography variant="h4" gutterBottom>
        Create Your Knowledge Base
      </Typography>

      {error && <Typography color="error">{error}</Typography>}

      <TextField
        label="Knowledge Name"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={knowledgeName}
        onChange={(e) => setKnowledgeName(e.target.value)}
      />
      <TextField
        label="Agent Name"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={agentName}
        onChange={(e) => setAgentName(e.target.value)}
      />

      <input type="file" multiple onChange={handleFileChange} />
      
      {files && (
        <List sx={{ mt: 2, p: 2, backgroundColor: '#fff', borderRadius: '5px', boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)' }}>
          {Array.from(files).map((file, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={file.name}
                secondary={`Size: ${(file.size / 1024).toFixed(2)} KB`}
              />
            </ListItem>
          ))}
        </List>
      )}

      <Button
        sx={{ backgroundColor: '#1976d2', color: '#fff', '&:hover': { backgroundColor: '#115293' }, mt: 2 }}
        variant="contained"
        fullWidth
        onClick={handleKnowledgeBaseSubmit}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Submit Knowledge Base'}
      </Button>

      {knowledgeID && (
        <Box mt={3}>
          <Typography variant="h6">Knowledge ID</Typography>
          <Typography>{knowledgeID}</Typography>
        </Box>
      )}

      {knowledgeSummary && (
        <Box mt={3}>
          <Typography variant="h6">Knowledge Summary</Typography>
          <Typography>{knowledgeSummary}</Typography>
        </Box>
      )}

      <TextField
        label="Session ID"
        variant="outlined"
        fullWidth
        sx={{ mb: 2, mt: 3 }}
        value={sessionID}
        onChange={(e) => setSessionID(e.target.value)}
      />
      <TextField
        label="Your message"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={chatInput}
        onChange={(e) => setChatInput(e.target.value)}
      />

      <Button
        sx={{ backgroundColor: '#1976d2', color: '#fff', '&:hover': { backgroundColor: '#115293' }, mt: 2 }}
        variant="contained"
        fullWidth
        onClick={handleChat}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Send Message'}
      </Button>

      {chatResponse && (
        <Paper sx={{ mt: 3, p: 2, backgroundColor: '#e0f7fa', borderRadius: '5px' }}>
          <Typography variant="h6">Response from Agent</Typography>
          <Typography>{chatResponse}</Typography>
        </Paper>
      )}
    </Paper>
  );
};

export default Knowledgbase;
