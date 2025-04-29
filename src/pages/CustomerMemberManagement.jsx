import React, { useState, useEffect } from 'react';
import EmbeddedPage from './EmbeddedPage';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Box, Stack } from '@mui/material';
import { useAuthContext } from '@asgardeo/auth-react';

const App = () => {
  const { state, signIn, signOut } = useAuthContext();
  const [students, setStudents] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [editingInstructorId, setEditingInstructorId] = useState(null);
  const [updatedStudent, setUpdatedStudent] = useState({});
  const [updatedInstructor, setUpdatedInstructor] = useState({});
  const [activeTab, setActiveTab] = useState('students');

  useEffect(() => {
    if (state.isAuthenticated) {
      fetchStudIn();
    } else {
      signIn();
    }
  }, [state.isAuthenticated]);

  const fetchStudIn = async () => {
    try {
      const [studentsRes, instructorsRes] = await Promise.all([
        axios.get('http://localhost:5009/students'),
        axios.get('http://localhost:5009/instructors')
      ]);
      setStudents(studentsRes.data);
      setInstructors(instructorsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleStudentChange = (e, field) => {
    setUpdatedStudent({ ...updatedStudent, [field]: e.target.value });
  };

  const handleSaveStudent = async (id) => {
    try {
      await axios.put(`http://localhost:5009/students/${id}`, updatedStudent);
      setEditingStudentId(null);
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  const handleInstructorChange = (e, field) => {
    setUpdatedInstructor({ ...updatedInstructor, [field]: e.target.value });
  };

  const handleSaveInstructor = async (id) => {
    try {
      await axios.put(`http://localhost:5009/instructors/${id}`, updatedInstructor);
      setEditingInstructorId(null);
    } catch (error) {
      console.error('Error saving instructor:', error);
    }
  };

  if (!state.isAuthenticated) {
    return <div>Loading...</div>;
  }

  // Inline button style
  const buttonStyle = {
    backgroundColor: '#e5e7eb',
    color: '#1f2937',
    fontWeight: 500,
    padding: '0.5rem 1.5rem',
    borderRadius: '0.375rem',
    textTransform: 'none',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    transition: 'background-color 0.3s',
    hover: {
      backgroundColor: '#d1d5db'
    },
    disabled: {
      opacity: 0.5,
      cursor: 'not-allowed'
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Member Management</h1>

      {/* New Member Button */}
      <Box mb={2}>
        <a href="/new-member" style={{ textDecoration: 'none' }}>
          <button style={buttonStyle}>New Member</button>
        </a>
      </Box>

      {/* Toggle Buttons */}
      <Stack direction="row" spacing={2} sx={{ marginBottom: 3 }}>
        <button
          style={buttonStyle}
          onClick={() => setActiveTab('students')}
        >
          Manage Students
        </button>
        <button
          style={buttonStyle}
          onClick={() => setActiveTab('instructors')}
        >
          Manage Instructors
        </button>
      </Stack>

      {/* Student Table */}
      {activeTab === 'students' && (
        <>
          <h2>Student Information</h2>
          <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  {['ID','Name','Address','Phone','Enrollment Date','Age','Gender','Email','Active','Actions'].map(header => (
                    <TableCell key={header} sx={{ backgroundColor: '#61dafb' }}>{header}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map(student => (
                  <TableRow key={student.id}>
                    <TableCell>{student.id}</TableCell>
                    {editingStudentId === student.id ? (
                      ['name','address','phone','enrollment_date','age','gender','email','active'].map(field => (
                        <TableCell key={field}>
                          <TextField
                            type={field==='enrollment_date'?'date':'text'}
                            value={updatedStudent[field] ?? (field==='enrollment_date'?student.enrollment_date.split('T')[0]: student[field])}
                            onChange={e => handleStudentChange(e, field)}
                          />
                        </TableCell>
                      ))
                    ) : (
                      <>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.address}</TableCell>
                        <TableCell>{student.phone}</TableCell>
                        <TableCell>{new Date(student.enrollment_date).toLocaleDateString()}</TableCell>
                        <TableCell>{student.age}</TableCell>
                        <TableCell>{student.gender}</TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell>{student.active ? 'Yes' : 'No'}</TableCell>
                      </>
                    )}
                    <TableCell>
                      {editingStudentId === student.id ? (
                        <button style={buttonStyle} onClick={() => handleSaveStudent(student.id)}>Save</button>
                      ) : (
                        <button style={buttonStyle} onClick={() => setEditingStudentId(student.id)}>Update</button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {/* Instructor Table */}
      {activeTab === 'instructors' && (
        <>
          <h2>Instructor Information</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {['ID','Name','Email','Role','Age','Actions'].map(header => (
                    <TableCell key={header} sx={{ backgroundColor: '#61dafb' }}>{header}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {instructors.map(instructor => (
                  <TableRow key={instructor.id}>
                    <TableCell>{instructor.id}</TableCell>
                    {editingInstructorId === instructor.id ? (
                      ['name','email','role','age'].map(field => (
                        <TableCell key={field}>
                          <TextField
                            value={updatedInstructor[field] ?? instructor[field]}
                            onChange={e => handleInstructorChange(e, field)}
                          />
                        </TableCell>
                      ))
                    ) : (
                      <>
                        <TableCell>{instructor.name}</TableCell>
                        <TableCell>{instructor.email}</TableCell>
                        <TableCell>{instructor.role}</TableCell>
                        <TableCell>{instructor.age}</TableCell>
                      </>
                    )}
                    <TableCell>
                      {editingInstructorId === instructor.id ? (
                        <button style={buttonStyle} onClick={() => handleSaveInstructor(instructor.id)}>Save</button>
                      ) : (
                        <button style={buttonStyle} onClick={() => setEditingInstructorId(instructor.id)}>Update</button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </div>
  );
};

export default App;
