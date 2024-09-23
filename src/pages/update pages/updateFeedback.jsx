import Sidebar from '../../components/aside/asideHeader';
import Header from '../../components/head/head';
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Typography, TextField } from '@mui/material';
import { useParams ,useNavigate } from 'react-router-dom';

function UpdateFeedback() {
  const navigate = useNavigate();
  const { feedbackId } = useParams();
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  useEffect(() => {
    const fetchData = async () => {
      try { 
        const response = await fetch(`http://localhost:3002/feedbacks/${feedbackId}`); // Update URL with admin ID
        if (!response.ok) {
          throw new Error('Failed to fetch admin data');
        }
        const data = await response.json();
        setFeedback(data); // Set admin data in state
      } catch (error) {
        setError('Failed to fetch admin data. Please try again.');
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [feedbackId]); //dependency array

  if (!feedback) {
    return <div>Loading...</div>;
  }

  const initialValues = {
    content: feedback.content || '',
    rating: feedback.rating || 0
  };

  const validationSchema = Yup.object().shape({
    content: Yup.string().required('Content is required'),
    rating: Yup.number().required('Rating is required').min(0, 'Rating must be at least 0').max(5, 'Rating must be at most 5'),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const {  content, rating } = values;
      const data = {
        content,
        rating: parseInt(rating) // Ensure rating is parsed as an integer
      };
  
      const response = await fetch(`http://localhost:3002/feedbacks/${feedbackId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update feedback');
      }
  
      alert('Feedback updated successfully');
      navigate('/FeedbacksList');
      
    } catch (error) {
      setError('Failed to update feedback. Please try again.');
      console.error('Error updating feedback:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <main className='main-container'>
        <Typography variant="h4" color="#000">Update Feedback</Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
          
              <Field name="content" as={TextField} label="Content" fullWidth margin="normal" />
              <ErrorMessage name="content" component="div" />
              <Field name="rating" as={TextField} type="number" label="Rating (1-5)" fullWidth margin="normal" />
              <ErrorMessage name="rating" component="div" />
              {error && <div>{error}</div>}
              <Button type="submit" variant="contained" className='btn mt-5' disabled={loading}>
                {loading ? 'Updating...' : 'Update Feedback'}
              </Button>
            </Form>
          )}
        </Formik>
      </main>
    </div>
  );
}

export default UpdateFeedback;
