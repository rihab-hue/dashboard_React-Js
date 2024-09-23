import Sidebar from '../../components/aside/asideHeader';
import Header from '../../components/head/head';
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography } from '@mui/material';
import { collection, addDoc } from 'firebase/firestore';
import { db } from "../../firebaseConfig"; // Ensure this is correctly imported

function AddMenu() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // State for success message
  const [loading, setLoading] = useState(false);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  // Initial form values
  const initialValues = {
    name: '',
    price: '',
    image: '',
    description: '',
    rating: '',
  };

  // Form validation schema using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Menu name is required'),
    price: Yup.number().required('Price is required'),
    image: Yup.string().url('Must be a valid URL').required('Image is required'),
    description: Yup.string().required('Description is required'),
    rating: Yup.number().min(1).max(5).required('Rating is required'),
  });

  // Submit handler
  const handleSubmit = async (values) => {
    setLoading(true);
    setError('');
    setSuccess(''); // Clear previous success message

    try {
      // Adding the menu to Firestore
      const collectionRef = collection(db, "menus");
      await addDoc(collectionRef, {
        name: values.name,
        price: values.price,
        image: values.image,
        description: values.description,
        rating: values.rating,
      });

      // Show success message
      setSuccess('Menu added successfully!');

      // Optional delay before redirecting to let user see the success message
      setTimeout(() => {
        navigate('/teachersList');
      }, 1500); // 1.5 seconds delay
    } catch (error) {
      console.error("Error adding menu:", error);
      setError('Failed to add menu. Please try again.');
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
        <Typography variant="h4" color="#000">Add Menu</Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <Field name="name" as={TextField} label="Name *" fullWidth margin="normal" />
              <ErrorMessage name="name" component="div" style={{ color: 'red' }} />

              <Field name="image" as={TextField} label="Image (URL) *" fullWidth margin="normal" />
              <ErrorMessage name="image" component="div" style={{ color: 'red' }} />

              <Field name="price" as={TextField} type="number" label="Price *"  fullWidth margin="normal" />
              <ErrorMessage name="price" component="div" style={{ color: 'red' }} />

              <Field name="rating" as={TextField} type="number" label="Rating (1-5) *" fullWidth margin="normal" />
              <ErrorMessage name="rating" component="div" style={{ color: 'red' }} />

              <Field
                name="description"
                as={TextField}
                label="Description *"
                required
                multiline
                rows={4}
                fullWidth
                margin="normal"
              />
              <ErrorMessage name="description" component="div" style={{ color: 'red' }} />

              {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
              {success && <div style={{ color: 'green', marginTop: '10px' }}>{success}</div>}

              <Button type="submit" variant="contained" className='btn mt-5' disabled={loading}>
                {loading ? 'Adding...' : 'Add Menu'}
              </Button>
            </Form>
          )}
        </Formik>
      </main>
    </div>
  );
}

export default AddMenu;
