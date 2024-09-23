import Sidebar from '../../components/aside/asideHeader';
import Header from '../../components/head/head';
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, FormControl, InputLabel, MenuItem, Select, Typography, TextField } from '@mui/material';
import {useNavigate} from 'react-router-dom';

function AddFeedback() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch users and courses data
    const fetchUserData = async () => {
      const response = await fetch('http://localhost:3002/users');
      const userData = await response.json();
      setUsers(userData);
    };

    const fetchCourseData = async () => {
      const response = await fetch('http://localhost:3002/courses');
      const courseData = await response.json();
      setCourses(courseData);
    };

    fetchUserData();
    fetchCourseData();
  }, []);

  const initialValues = {
    user: '',
    course: '',
    content: '',
    rating: 0
  };

  const validationSchema = Yup.object().shape({
    user: Yup.string().required('User ID is required'),
    course: Yup.string().required('Course ID is required'),
    content: Yup.string().required('Content is required'),
    rating: Yup.number().required('Rating is required').min(0, 'Rating must be at least 0').max(5, 'Rating must be at most 5'),
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3002/feedbacks', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
console.log(values)
      if (!response.ok) {
        throw new Error('Failed to create feedback');
      }

      const data = await response.json();
      console.log('Feedback created successfully:', data);
      navigate(`/feedbacksList`);
    } catch (error) {
      setError('Failed to create feedback. Please try again.');
      console.error('Error creating feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <main className='main-container'>
        <Typography variant="h4" color="#000">Add Feedback</Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <FormControl fullWidth margin="normal">
                <InputLabel id="user-select-label">User ID</InputLabel>
                <Field as={Select} labelId="user-select-label" name="user">
                  <MenuItem value="" disabled>Select User</MenuItem>
                  {users.map(user => (
                    <MenuItem key={user._id} value={user.name}>{user.name}</MenuItem>
                  ))}
                </Field>
                <ErrorMessage name="user" component="div" />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel id="course-select-label">Course ID</InputLabel>
                <Field as={Select} labelId="course-select-label" name="course">
                  <MenuItem value="" disabled>Select Course</MenuItem>
                  {courses.map(course => (
                    <MenuItem key={course._id} value={course.name}>{course.name}</MenuItem>
                  ))}
                </Field>
                <ErrorMessage name="course" component="div" />
              </FormControl>
              <Field name="content" as={TextField} label="Content" fullWidth margin="normal" />
              <ErrorMessage name="content" component="div" />
              <Field name="rating" as={TextField} type="number" label="Rating (1-5)" fullWidth margin="normal" />
              <ErrorMessage name="rating" component="div" />
              {error && <div>{error}</div>}
              <Button type="submit" variant="contained" className='btn mt-5' disabled={loading}>
                {loading ? 'Adding...' : 'Add Feedback'}
              </Button>
            </Form>
          )}
        </Formik>
      </main>
    </div>
  )
}

export default AddFeedback;
