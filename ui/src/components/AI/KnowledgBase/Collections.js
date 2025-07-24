import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Container,
  Typography,
  CircularProgress,
  IconButton,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Edit, Delete, ExpandMore, ExpandLess, Add } from '@mui/icons-material';
import axios from 'axios';
import { useGlobalState } from '../../Constants/GlobalStateProvider';
import Knowledgbase from './Knowledgbase';

function Collections() {
  const [knowledgebase, setKnowledgebase] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const { getGlobal } = useGlobalState();
  const userId = getGlobal();

  const fetchKnowledgebase = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/knowledge/get-knowledgebase/${userId}`);
      setKnowledgebase(response.data);
    } catch (err) {
      setError('Failed to load knowledgebase');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKnowledgebase();
  }, [userId]);

  const handleExpandClick = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDeleteKnowledge = async (uniqueKnowledgeId) => {
    if (window.confirm("Are you sure you want to delete this knowledge entry?")) {
      try {
        await axios.delete(`http://localhost:8000/api/knowledge/delete-knowledge/${userId}/${uniqueKnowledgeId}`);
        await axios.get(`http://localhost:5002/delete-index/${uniqueKnowledgeId}`);
        fetchKnowledgebase();
      } catch (err) {
        setError('Failed to delete knowledge entry');
        console.error(err);
      }
    }
  };

  if (loading) return (
    <div className="flex h-[500px] items-center justify-center">
      <CircularProgress className="text-blue-500" />
    </div>
  );

  if (error) return (
    <div className="flex h-[500px] items-center justify-center">
      <Typography className="text-red-500 text-lg">{error}</Typography>
    </div>
  );

  return (
    <Container className="py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-blue-50 p-2 rounded-lg">
            <Add className="h-8 w-8 text-blue-500" />
          </div>
          <Typography variant="h4" className="font-bold text-gray-800">
            User Knowledgebase
          </Typography>
        </div>
        <Button
          variant="contained"
          className="bg-blue-500 hover:bg-blue-600 transform transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
          onClick={handleOpenDialog}
        >
          <Add className="h-5 w-5" />
          Add New Knowledge
        </Button>
      </div>

      {knowledgebase.length === 0 ? (
        <Paper elevation={0} className="rounded-xl border-2 border-dashed border-gray-200 p-8">
          <div className="text-center">
            <div className="bg-blue-50 p-3 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
              <Add className="h-8 w-8 text-blue-500" />
            </div>
            <Typography className="mt-4 text-lg text-gray-500">
              No knowledge entries found.
            </Typography>
          </div>
        </Paper>
      ) : (
        <TableContainer component={Paper} className="rounded-xl shadow-sm border border-gray-100">
          <Table>
            <TableHead className="bg-gray-50">
              <TableRow>
                <TableCell className="font-semibold text-gray-700">Knowledge Name</TableCell>
                {/* <TableCell className="font-semibold text-gray-700">Unique Knowledge ID</TableCell> */}
                <TableCell className="font-semibold text-gray-700">Documents</TableCell>
                <TableCell className="font-semibold text-gray-700">Summary</TableCell>
                <TableCell className="font-semibold text-gray-700">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {knowledgebase.map((kb, index) => (
                <TableRow 
                  key={index}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <TableCell className="font-medium text-gray-900">{kb.knowledge_name}</TableCell>
                  {/* <TableCell className="font-mono text-sm text-gray-600">{kb.unique_knowledge_id}</TableCell> */}
                  <TableCell className="text-gray-600">{kb.documents.join(', ')}</TableCell>
                  <TableCell>
                    <div
                      className="group flex items-center gap-2 cursor-pointer"
                      onClick={() => handleExpandClick(kb.unique_knowledge_id)}
                    >
                      <div className="p-1 rounded-full group-hover:bg-blue-50 transition-colors duration-150">
                        {expanded[kb.unique_knowledge_id] ? 
                          <ExpandLess className="text-blue-500" /> : 
                          <ExpandMore className="text-blue-500" />
                        }
                      </div>
                      <div className="text-gray-600 group-hover:text-gray-900 transition-colors duration-150">
                        {expanded[kb.unique_knowledge_id] ? (
                          <Collapse in={expanded[kb.unique_knowledge_id]}>
                            <Typography>{kb.summary}</Typography>
                          </Collapse>
                        ) : (
                          <Typography noWrap>{kb.summary.substring(0, 50)}...</Typography>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <IconButton 
                        className="text-blue-500 hover:bg-blue-50 p-2"
                        onClick={() => alert(`Edit ${kb.knowledge_name}`)}
                      >
                        <Edit className="h-5 w-5" />
                      </IconButton>
                      <IconButton 
                        className="text-red-500 hover:bg-red-50 p-2"
                        onClick={() => handleDeleteKnowledge(kb.unique_knowledge_id)}
                      >
                        <Delete className="h-5 w-5" />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        fullWidth
        PaperProps={{
          className: "rounded-xl"
        }}
      >
        <DialogTitle className="bg-gray-50 border-b border-gray-100">
          <Typography className="font-bold text-gray-800">Add New Knowledge</Typography>
        </DialogTitle>
        <DialogContent className="mt-4">
          <Knowledgbase />
        </DialogContent>
        <DialogActions className="border-t border-gray-100 p-4">
          <Button 
            onClick={handleCloseDialog} 
            className="text-gray-600 hover:bg-gray-50"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Collections;

// import React, { useEffect, useState } from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   Container,
//   Typography,
//   CircularProgress,
//   IconButton,
//   Collapse,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from '@mui/material';
// import { Edit, Delete, ExpandMore, ExpandLess, Add } from '@mui/icons-material';
// import axios from 'axios';
// import { useGlobalState } from '../../Constants/GlobalStateProvider';
// import Knowledgbase from './Knowledgbase'; // Adjust the import path if necessary

// function Collections() {
//   const [knowledgebase, setKnowledgebase] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [expanded, setExpanded] = useState({});
//   const [openDialog, setOpenDialog] = useState(false); // State to control modal visibility
//   const { getGlobal } = useGlobalState();
//   const userId = getGlobal();

//   // Fetch knowledge base from backend
//   const fetchKnowledgebase = async () => {
//     try {
//       const response = await axios.get(`http://localhost:8000/api/knowledge/get-knowledgebase/${userId}`);
//       setKnowledgebase(response.data);
//     } catch (err) {
//       setError('Failed to load knowledgebase');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchKnowledgebase();
//   }, [userId]);

//   const handleExpandClick = (id) => {
//     setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//   const handleOpenDialog = () => {
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//   };

//   const handleDeleteKnowledge = async (uniqueKnowledgeId) => {
//     if (window.confirm("Are you sure you want to delete this knowledge entry?")) {
//       try {
//         // Call the Express backend to delete the knowledge entry
//         await axios.delete(`http://localhost:8000/api/knowledge/delete-knowledge/${userId}/${uniqueKnowledgeId}`);
        
//         // Call the Flask app to delete the knowledge entry
//         await axios.get(`http://localhost:5002/delete-index/${uniqueKnowledgeId}`);

//         // Refresh the knowledgebase after deletion
//         fetchKnowledgebase();
//       } catch (err) {
//         setError('Failed to delete knowledge entry');
//         console.error(err);
//       }
//     }
//   };

//   if (loading) return (
//     <div className="flex h-[500px] items-center justify-center">
//       <CircularProgress />
//     </div>
//   );

//   if (error) return (
//     <Typography color="error">{error}</Typography>
//   );

//   return (
//     <Container>
//       <div className="flex items-center justify-between mb-8">
//         <div className="flex items-center gap-3">
//           <Add className="h-8 w-8 text-blue-500" />
//           <Typography variant="h4" gutterBottom className="font-bold">
//             User Knowledgebase
//           </Typography>
//         </div>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleOpenDialog}
//           style={{ marginBottom: '15px' }}
//         >
//           Add New Knowledge
//         </Button>
//       </div>

//       {knowledgebase.length === 0 ? (
//         <Paper elevation={2} className="rounded-lg p-8 border-gray-200">
//           <div className="text-center">
//             <Add className="mx-auto h-12 w-12 text-gray-400" />
//             <Typography variant="body1" className="mt-4 text-lg text-gray-500">
//               No knowledge entries found.
//             </Typography>
//           </div>
//         </Paper>
//       ) : (
//         <TableContainer component={Paper} className="rounded-lg border-gray-200">
//           <Table>
//             <TableHead className="bg-gray-50">
//               <TableRow>
//                 <TableCell>Knowledge Name</TableCell>
//                 <TableCell>Unique Knowledge ID</TableCell>
//                 <TableCell>Documents</TableCell>
//                 <TableCell>Summary</TableCell>
//                 <TableCell>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {knowledgebase.map((kb, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{kb.knowledge_name}</TableCell>
//                   <TableCell>{kb.unique_knowledge_id}</TableCell>
//                   <TableCell>{kb.documents.join(', ')}</TableCell>
//                   <TableCell>
//                     <div
//                       className="flex items-center gap-2 text-sm cursor-pointer text-gray-500 hover:text-blue-500"
//                       onClick={() => handleExpandClick(kb.unique_knowledge_id)}
//                     >
//                       {expanded[kb.unique_knowledge_id] ? <ExpandLess /> : <ExpandMore />}
//                       {expanded[kb.unique_knowledge_id] ? (
//                         <Collapse in={expanded[kb.unique_knowledge_id]}>
//                           <Typography>{kb.summary}</Typography>
//                         </Collapse>
//                       ) : (
//                         <Typography noWrap>{kb.summary.substring(0, 50)}...</Typography>
//                       )}
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <IconButton color="primary" onClick={() => alert(`Edit ${kb.knowledge_name}`)}>
//                       <Edit />
//                     </IconButton>
//                     <IconButton color="secondary" onClick={() => handleDeleteKnowledge(kb.unique_knowledge_id)}>
//                       <Delete />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
//         <DialogTitle>Add New Knowledge</DialogTitle>
//         <DialogContent>
//           <Knowledgbase />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} color="primary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// }

// export default Collections;



// import React, { useEffect, useState } from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   Container,
//   Typography,
//   CircularProgress,
//   IconButton,
//   Collapse,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from '@mui/material';
// import { Edit, Delete, ExpandMore, ExpandLess } from '@mui/icons-material';
// import axios from 'axios';
// import { useGlobalState } from '../../Constants/GlobalStateProvider';
// import Knowledgbase from './Knowledgbase'; // Adjust the import path if necessary

// function Collections() {
//   const [knowledgebase, setKnowledgebase] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [expanded, setExpanded] = useState({});
//   const [openDialog, setOpenDialog] = useState(false); // State to control modal visibility
//   const { getGlobal } = useGlobalState();
//   const userId = getGlobal();

//   // Fetch knowledge base from backend
//   const fetchKnowledgebase = async () => {
//     try {
//       const response = await axios.get(`http://localhost:8000/api/knowledge/get-knowledgebase/${userId}`);
//       setKnowledgebase(response.data);
//     } catch (err) {
//       setError('Failed to load knowledgebase');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchKnowledgebase();
//   }, [userId]);

//   const handleExpandClick = (id) => {
//     setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//   const handleOpenDialog = () => {
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//   };

//   if (loading) return <CircularProgress />;
//   if (error) return <Typography color="error">{error}</Typography>;

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>
//         User Knowledgebase
//       </Typography>

//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleOpenDialog}
//         style={{ marginBottom: '15px' , marginTop: '40px', marginLeft:'830px'}}
//       >
//         Add New Knowledge
//       </Button>

//       {knowledgebase.length === 0 ? (
//         <Typography>No knowledge entries found.</Typography>
//       ) : (
//         <TableContainer component={Paper} style={{ marginTop: '20px' }}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Knowledge Name</TableCell>
//                 <TableCell>Unique Knowledge ID</TableCell>
//                 <TableCell>Documents</TableCell>
//                 <TableCell>Summary</TableCell>
//                 <TableCell>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {knowledgebase.map((kb, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{kb.knowledge_name}</TableCell>
//                   <TableCell>{kb.unique_knowledge_id}</TableCell>
//                   <TableCell>
//                     {kb.documents.join(', ')} {/* Display documents */}
//                   </TableCell>
//                   <TableCell>
//                     <Typography
//                       variant="body2"
//                       onClick={() => handleExpandClick(kb.unique_knowledge_id)}
//                       style={{ cursor: 'pointer' }}
//                     >
//                       {expanded[kb.unique_knowledge_id] ? <ExpandLess /> : <ExpandMore />}
//                       {expanded[kb.unique_knowledge_id] ? (
//                         <Collapse in={expanded[kb.unique_knowledge_id]}>
//                           <Typography>{kb.summary}</Typography>
//                         </Collapse>
//                       ) : (
//                         <Typography noWrap>{kb.summary.substring(0, 50)}...</Typography>
//                       )}
//                     </Typography>
//                   </TableCell>
//                   <TableCell>
//                     <IconButton color="primary" onClick={() => alert(`Edit ${kb.knowledge_name}`)}>
//                       <Edit />
//                     </IconButton>
//                     <IconButton color="secondary" onClick={() => alert(`Delete ${kb.knowledge_name}`)}>
//                       <Delete />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       {/* Dialog for adding new knowledge */}
//       <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
//         <DialogTitle>Add New Knowledge</DialogTitle>
//         <DialogContent>
//           <Knowledgbase />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} color="primary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// };

// export default Collections;
