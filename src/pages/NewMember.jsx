import React, { useState } from 'react';
import { TextField, Box, Typography, MenuItem, Button } from '@mui/material';
import axios from 'axios';

const NewMember = () => {
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    age: '',
    address: '',
    phone: '',
    gender: '',
  });

  const [newInstructor, setNewInstructor] = useState({
    name: '',
    email: '',
    role: '',
    age: '',
  });

  const handleStudentChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const handleInstructorChange = (e) => {
    const { name, value } = e.target;
    setNewInstructor({ ...newInstructor, [name]: value });
  };

  const handleAddStudent = async () => {
    try {
      await axios.post('http://localhost:5009/students', newStudent);
      setNewStudent({ name: '', email: '', age: '', address: '', phone: '', gender: '' });
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const handleAddInstructor = async () => {
    try {
      await axios.post('http://localhost:5009/instructors', newInstructor);
      setNewInstructor({ name: '', email: '', role: '', age: '' });
    } catch (error) {
      console.error('Error adding instructor:', error);
    }
  };

  // Button styling using 'style' attribute
  const buttonStyle = {
    backgroundColor: '#e5e7eb', // Tailwind gray-200
    color: '#1f2937',           // Tailwind gray-800
    fontWeight: 500,
    padding: '0.5rem 1.5rem',
    borderRadius: '0.375rem',
    textTransform: 'none',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    transition: 'background-color 0.3s',
    '&:hover': { backgroundColor: '#d1d5db' }, // Tailwind gray-300
    '&:disabled': { opacity: 0.5, cursor: 'not-allowed' },
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Add New Member</Typography>

      {/* New Student Section */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h5" gutterBottom>New Student</Typography>
        <TextField label="Name" name="name" value={newStudent.name} onChange={handleStudentChange} fullWidth margin="normal" />
        <TextField label="Email" name="email" value={newStudent.email} onChange={handleStudentChange} fullWidth margin="normal" />
        <TextField label="Age" name="age" value={newStudent.age} onChange={handleStudentChange} fullWidth margin="normal" />
        <TextField label="Address" name="address" value={newStudent.address} onChange={handleStudentChange} fullWidth margin="normal" />
        <TextField label="Phone" name="phone" value={newStudent.phone} onChange={handleStudentChange} fullWidth margin="normal" />
        <TextField select label="Gender" name="gender" value={newStudent.gender} onChange={handleStudentChange} fullWidth margin="normal">
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
          <MenuItem value="Prefer not to say">Prefer not to say</MenuItem>
        </TextField>
        <Button style={buttonStyle} onClick={handleAddStudent}>
          Add Student
        </Button>
      </Box>

      {/* New Instructor Section */}
      <Box>
        <Typography variant="h5" gutterBottom>New Instructor</Typography>
        <TextField label="Name" name="name" value={newInstructor.name} onChange={handleInstructorChange} fullWidth margin="normal" />
        <TextField label="Email" name="email" value={newInstructor.email} onChange={handleInstructorChange} fullWidth margin="normal" />
        <TextField label="Role" name="role" value={newInstructor.role} onChange={handleInstructorChange} fullWidth margin="normal" />
        <TextField label="Age" name="age" value={newInstructor.age} onChange={handleInstructorChange} fullWidth margin="normal" />
        <Button style={buttonStyle} onClick={handleAddInstructor}>
          Add Instructor
        </Button>
      </Box>
    </div>
  );
};

export default NewMember;
