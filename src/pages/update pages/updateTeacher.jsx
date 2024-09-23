import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/aside/asideHeader';
import Header from '../../components/head/head';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from "../../firebaseConfig"; // Ensure this import is correct
import { doc, getDoc, updateDoc } from 'firebase/firestore';

function MenuUpdate() {
  const { id } = useParams(); // Get menu ID from URL parameters
  const navigate = useNavigate();

  const [restoData, setRestoData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const toggleSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  // Fetch menu data from Firestore
  const getMenu = async () => {
    try {
      const menuDoc = doc(db, "menus", id);
      const docSnap = await getDoc(menuDoc);
      if (docSnap.exists()) {
        setRestoData(docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getMenu();
    }
  }, [id]);

  // Initial form values
  const initialValues = {
    name: restoData?.name || "",
    price: restoData?.price || "",
    image: restoData?.image || "",
    description: restoData?.description || "",
    rating: restoData?.rating || "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string(),
    image: Yup.string().url('Invalid URL'),
    price: Yup.number().positive('Price must be positive'),
    rating: Yup.number().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5'),
    description: Yup.string(),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const menuDoc = doc(db, "menus", id);
      await updateDoc(menuDoc, values);
      console.log('Menu updated successfully');
      navigate('/teachersList'); // Redirect after successful update
    } catch (error) {
      setError("Error updating the menu");
      console.error("Error updating menu:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='grid-container'>
      <Header OpenSidebar={toggleSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={toggleSidebar} />
      <main className='main-container'>
        <Typography variant="h4" color="#000">Update Menu</Typography>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <Field name="name" as={TextField} label="Name" fullWidth margin="normal" />
              <ErrorMessage name="name" component="div" style={{ color: 'red' }} />

              <Field name="image" as={TextField} label="Image (URL)" fullWidth margin="normal" />
              <ErrorMessage name="image" component="div" style={{ color: 'red' }} />

              <Field name="price" as={TextField} type="number" label="Price" fullWidth margin="normal" />
              <ErrorMessage name="price" component="div" style={{ color: 'red' }} />

              <Field name="rating" as={TextField} type="number" label="Rating (1-5)" fullWidth margin="normal" />
              <ErrorMessage name="rating" component="div" style={{ color: 'red' }} />

              <Field
                name="description"
                as={TextField}
                label="Description"
                required
                multiline
                rows={4}
                fullWidth
                margin="normal"
              />
              <ErrorMessage name="description" component="div" style={{ color: 'red' }} />

              {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}

              <Button type="submit" variant="contained" className='btn mt-5' disabled={loading}>
                {loading ? 'Updating...' : 'Update Menu'}
              </Button>
            </Form>
          )}
        </Formik>
      </main>
    </div>
  );
}

export default MenuUpdate;
