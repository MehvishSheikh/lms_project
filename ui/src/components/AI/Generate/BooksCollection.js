import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Typography,
  CircularProgress,
  IconButton,
  Collapse,
} from '@mui/material';
import { ExpandMore, ExpandLess, Quiz, LiveHelp } from '@mui/icons-material'; // Updated icons
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from '../../Constants/GlobalStateProvider';
import { styled } from '@mui/material/styles';
import ReactMarkdown from 'react-markdown';
import { 
  BookOpen, 
  Brain,
  ChevronDown,
  ChevronUp,
  Import,
  Loader2
} from 'lucide-react';
import { API_URL } from '../../Constants/Url';


const ActionButton = ({ icon: Icon, label, onClick, primary }) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center p-4 rounded-lg transition-colors ${
        primary 
          ? 'hover:bg-blue-100 text-blue-600' 
          : 'hover:bg-purple-100 text-purple-600'
      }`}
    >
      <div className="mb-2">
        <Icon size={32} />
      </div>
      <span className="text-sm font-medium">
        {label}
      </span>
    </button>
  );
};
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: '20px',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  backgroundColor: theme.palette.background.paper,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

function BooksCollections() {
  const [knowledgebase, setKnowledgebase] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState({});
  const { getGlobal } = useGlobalState();
  const userId = getGlobal();
  const navigate = useNavigate();

  const fetchKnowledgebase = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/knowledge/get-knowledgebase/${userId}`);
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

  const handleGenerateQuestion = (knowledge_id, summary, knowledge_name) => {
    navigate('/index-question-paper', {
      state: { knowledge_id, summary, knowledge_name },
    });
  };

  const handleDoubtSolver = (knowledge_id) => {
    navigate('/doubt-solver', {
      state: { knowledge_id },
    });
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container className="p-6 mx-auto rounded-lg">
      <Typography variant="h4" className="text-center text-blue-800 mb-6">
        Generate Question Paper
      </Typography>

      {knowledgebase.length === 0 ? (
        <Typography className="text-center text-gray-500">No knowledge entries found.</Typography>
      ) : (
        <StyledTableContainer component={Paper} className="shadow-lg rounded-lg">
          <Table>
            <TableHead>
              <TableRow className="bg-blue-800">
                <TableCell className="text-white font-semibold">Knowledge Name</TableCell>
                <TableCell className="text-white font-semibold">Documents</TableCell>
                <TableCell className="text-white font-semibold">Summary</TableCell>
                <TableCell align="center" className="text-white font-semibold">Generate</TableCell>
                <TableCell align="center" className="text-white font-semibold">Solve</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {knowledgebase.map((kb, index) => (
                <StyledTableRow key={index}>
                  <TableCell className="font-medium text-gray-700">{kb.knowledge_name}</TableCell>
                  <TableCell className="text-gray-600">{kb.documents.join(', ')}</TableCell>
                  <TableCell className="text-gray-600">
                    <Typography
                      variant="body2"
                      onClick={() => handleExpandClick(kb.unique_knowledge_id)}
                      className="cursor-pointer flex items-center"
                    >
                      {expanded[kb.unique_knowledge_id] ? <ExpandLess /> : <ExpandMore />}
                      <span className="ml-1">Summary</span>
                    </Typography>
                    <Collapse in={expanded[kb.unique_knowledge_id]}>
                      <ReactMarkdown className="prose mt-2 text-sm text-gray-800">
                        {kb.summary}
                      </ReactMarkdown>
                    </Collapse>
                  </TableCell>
                  <TableCell className="px-6 py-4">
<ActionButton
icon={BookOpen}
label="Generate Paper"
onClick={() => handleGenerateQuestion(
  kb.unique_knowledge_id,
  kb.summary,
  kb.knowledge_name
)}
primary
/>
</TableCell>
<TableCell>
<ActionButton
icon={Brain}
label="Doubt Solver"
onClick={() => handleDoubtSolver(kb.unique_knowledge_id)}
/>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      )}
    </Container>
  );
}

export default BooksCollections;


// import React, { useState } from 'react';
// import { 
//   BookOpen, 
//   Brain,
//   ChevronDown,
//   ChevronUp,
//   Loader2
// } from 'lucide-react';

// const ActionButton = ({ icon: Icon, label, onClick, primary }) => {
//   return (
//     <button
//       onClick={onClick}
//       className={`flex flex-col items-center p-4 rounded-lg transition-colors ${
//         primary 
//           ? 'hover:bg-blue-100 text-blue-600' 
//           : 'hover:bg-purple-100 text-purple-600'
//       }`}
//     >
//       <div className="mb-2">
//         <Icon size={32} />
//       </div>
//       <span className="text-sm font-medium">
//         {label}
//       </span>
//     </button>
//   );
// };

// const BooksCollections = () => {
//   const [expanded, setExpanded] = useState({});
//   // Mock data for demonstration - replace with your data fetching logic
//   const [loading] = useState(false);
//   const [error] = useState(null);
//   const [knowledgebase] = useState([
//     {
//       unique_knowledge_id: '1',
//       knowledge_name: 'Sample Knowledge',
//       documents: ['Doc 1', 'Doc 2'],
//       summary: 'This is a sample summary of the knowledge base content.'
//     }
//   ]);

  
//   const handleExpandClick = (id) => {
//     setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//   const handleGenerateQuestion = (knowledge_id, summary, knowledge_name) => {
//     // Replace with your navigation logic
//     console.log('Generate Question:', { knowledge_id, summary, knowledge_name });
//   };

//   const handleDoubtSolver = (knowledge_id) => {
//     // Replace with your navigation logic
//     console.log('Doubt Solver:', { knowledge_id });
//   };

//   if (loading) return (
//     <div className="flex justify-center items-center h-64">
//       <Loader2 className="animate-spin" size={32} />
//     </div>
//   );
  
//   if (error) return (
//     <div className="text-center p-4 text-red-600">
//       {error}
//     </div>
//   );

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl text-center text-blue-800 mb-6 font-bold">
//         Generate Question Paper
//       </h1>

//       {knowledgebase.length === 0 ? (
//         <p className="text-center text-gray-500 p-8">
//           No knowledge entries found.
//         </p>
//       ) : (
//         <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="bg-blue-800">
//                 <th className="text-white font-semibold px-6 py-3 text-left">
//                   Knowledge Name
//                 </th>
//                 <th className="text-white font-semibold px-6 py-3 text-left">
//                   Documents
//                 </th>
//                 <th className="text-white font-semibold px-6 py-3 text-left">
//                   Summary
//                 </th>
//                 <th className="text-white font-semibold px-6 py-3 text-center w-72">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {knowledgebase.map((kb, index) => (
//                 <tr key={index} className="even:bg-gray-50">
//                   <td className="px-6 py-4 font-medium text-gray-700">
//                     {kb.knowledge_name}
//                   </td>
//                   <td className="px-6 py-4 text-gray-600">
//                     {kb.documents.join(', ')}
//                   </td>
//                   <td className="px-6 py-4 text-gray-600">
//                     <button
//                       onClick={() => handleExpandClick(kb.unique_knowledge_id)}
//                       className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
//                     >
//                       {expanded[kb.unique_knowledge_id] ? (
//                         <ChevronUp className="w-4 h-4" />
//                       ) : (
//                         <ChevronDown className="w-4 h-4" />
//                       )}
//                       <span className="ml-1">Summary</span>
//                     </button>
//                     <div className={`mt-2 text-sm text-gray-800 ${
//                       expanded[kb.unique_knowledge_id] ? 'block' : 'hidden'
//                     }`}>
//                       {kb.summary}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="flex justify-center gap-4">
//                       <ActionButton
//                         icon={BookOpen}
//                         label="Generate Paper"
//                         onClick={() => handleGenerateQuestion(
//                           kb.unique_knowledge_id,
//                           kb.summary,
//                           kb.knowledge_name
//                         )}
//                         primary
//                       />
//                       <ActionButton
//                         icon={Brain}
//                         label="Doubt Solver"
//                         onClick={() => handleDoubtSolver(kb.unique_knowledge_id)}
//                       />
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BooksCollections;
