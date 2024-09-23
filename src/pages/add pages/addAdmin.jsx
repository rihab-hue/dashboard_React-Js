import Sidebar from '../../components/aside/asideHeader';
import Header from '../../components/head/head';
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography } from '@mui/material';
import { collection, addDoc } from 'firebase/firestore';
import { db } from "../../firebaseConfig"; // Ensure this is correctly imported

function AddResto() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  // Initial form values
  const initialValues = {
    name: '',
    cuisines: '',
    featured_image: '',
    time: '',
    rating: '',
  };

  // Form validation schema using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Restaurant name is required'),
    cuisines: Yup.string().required('Cuisines are required'),
    featured_image: Yup.string().url('Must be a valid URL').required('Image is required'),
    time: Yup.string().required('Time is required'),
    rating: Yup.number().min(1).max(5).required('Rating is required'),
  });

  // Submit handler
  const handleSubmit = async (values) => {
    setLoading(true);
    setError('');

    try {
      // Adding the restaurant to Firestore
      const collectionRef = collection(db, "restaurants");
      await addDoc(collectionRef, {
        name: values.name,
        cuisines: values.cuisines,
        featured_image: values.featured_image,
        time: values.time,
        rating: values.rating,
      });

      // Redirect to a confirmation page or admin list
      navigate('/adminsList');
    } catch (error) {
      console.error("Error adding restaurant:", error);
      setError('Failed to add restaurant. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Sidebar toggle
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <main className='main-container'>
        <Typography variant="h4" color="#000">Add Restaurant</Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <Field name="name" as={TextField} label="Restaurant Name" fullWidth margin="normal" />
              <ErrorMessage name="name" component="div" />

              <Field name="cuisines" as={TextField} label="Cuisines" fullWidth margin="normal" />
              <ErrorMessage name="cuisines" component="div" />

              <Field name="featured_image" as={TextField} label="Featured Image (URL)" fullWidth margin="normal" />
              <ErrorMessage name="featured_image" component="div" />

              <Field name="time" as={TextField} label="Time" fullWidth margin="normal"  />
              <ErrorMessage name="time" component="div" />

              <Field name="rating" as={TextField} type="number" label="Rating (1-5)" fullWidth margin="normal" />
              <ErrorMessage name="rating" component="div" />

              {error && <div style={{ color: 'red' }}>{error}</div>}

              <Button type="submit" variant="contained" className='btn mt-5' disabled={loading}>
                {loading ? 'Adding...' : 'Add Restaurant'}
              </Button>
            </Form>
          )}
        </Formik>
      </main>
    </div>
  );
}

export default  AddResto;
