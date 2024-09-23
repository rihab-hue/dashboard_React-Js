import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/aside/asideHeader';
import Header from '../../components/head/head';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from "../../firebaseConfig"; // Ensure this import is correct
import { doc, getDoc, updateDoc } from 'firebase/firestore';

function Restoupdate() {
  const { id } = useParams(); // Get restaurant ID from URL parameters
  const navigate = useNavigate();

  const [restoData, setRestoData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  // Fetch restaurant data from Firestore
  const getResto = async () => {
    try {
      const restaurantDoc = doc(db, "restaurants", id);
      const docSnap = await getDoc(restaurantDoc);
      if (docSnap.exists()) {
        setRestoData(docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching restaurant:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getResto();
    }
  }, [id]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const restaurantDoc = doc(db, "restaurants", id);
      await updateDoc(restaurantDoc, values);
      console.log('Restaurant updated successfully');
      navigate('/adminsList'); // Redirect after successful update
    } catch (error) {
      setError("Error updating the restaurant");
      console.error("Error updating restaurant:", error);
    } finally {
      setLoading(false);
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string(),
    cuisines: Yup.string(),
    featured_image: Yup.string().url('Invalid URL'),
    time: Yup.string(),
    rating: Yup.number().min(1).max(5),
  });

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <main className='main-container'>
        <Typography variant="h4" color="#000">Update Restaurant</Typography>
        <Formik
          initialValues={{
            name: restoData?.name || "",
            cuisines: restoData?.cuisines || "",
            featured_image: restoData?.featured_image || "",
            time: restoData?.time || "",
            rating: restoData?.rating || "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, values }) => (
            <Form>
              <Field
                name="name"
                as={TextField}
                label="Restaurant Name"
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={values.name}
              />
              <ErrorMessage name="name" component="div" />

              <Field
                name="cuisines"
                as={TextField}
                label="Cuisines"
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={values.cuisines}
              />
              <ErrorMessage name="cuisines" component="div" />

              <Field
                name="featured_image"
                as={TextField}
                label="Featured Image (URL)"
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={values.featured_image}
              />
              <ErrorMessage name="featured_image" component="div" />

              <Field
                name="time"
                as={TextField}
                label="Time"
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={values.time}
              />
              <ErrorMessage name="time" component="div" />

              <Field
                name="rating"
                as={TextField}
                type="number"
                label="Rating (1-5)"
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={values.rating}
              />
              <ErrorMessage name="rating" component="div" />

              {error && <div style={{ color: 'red' }}>{error}</div>}

              <Button type="submit" variant="contained" className='btn mt-5' disabled={loading}>
                {loading ? 'Updating...' : 'Update Restaurant'}
              </Button>
            </Form>
          )}
        </Formik>
      </main>
    </div>
  );
}

export default Restoupdate;
