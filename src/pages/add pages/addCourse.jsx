import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/aside/asideHeader';
import Header from '../../components/head/head';
import { Formik, Form, Field, ErrorMessage } from 'formik'; // Import Formik components
import * as Yup from 'yup'; // Import Yup for validation
import { db } from '../../firebaseConfig'; // Ensure Firestore config is imported
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore methods

function Orderadd() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // State for success message
  const [loading, setLoading] = useState(false);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  // Initial form values
  const initialValues = {
    name: "",
    email: "",
    address: "",
    mobile: "",
    paymentMode: "",
  };

  // Form validation schema using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Client name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    address: Yup.string().required('Address is required'),
    mobile: Yup.string().required('Mobile is required'),
    paymentMode: Yup.string().required('Payment mode is required'),
  });

  // Submit handler
  const handleSubmit = async (values) => {
    setLoading(true);
    setError('');
    setSuccess(''); // Clear previous success message

    try {
      // Adding the order to Firestore
      const collectionRef = collection(db, "orders");
      await addDoc(collectionRef, {
        name: values.name,
        email: values.email,
        address: values.address,
        mobile: values.mobile,
        paymentMode: values.paymentMode,
      });

      // Show success message
      setSuccess('Order added successfully!');
      setTimeout(() => {
        navigate('/coursesList'); // Redirect after a short delay
      }, 1500); // Optional delay before redirection
    } catch (error) {
      console.error("Error adding order:", error);
      setError('Failed to add order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Sidebar toggle
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <main className="main-container">
        <Typography variant="h4" color="#000">Create Order</Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field name="name" as={TextField} label="Client Name *" fullWidth margin="normal" />
              <ErrorMessage name="name" component="div" style={{ color: 'red' }} />
 
              <Field name="address" as={TextField} label="Client Address *" fullWidth margin="normal" />
              <ErrorMessage name="address" component="div" style={{ color: 'red' }} />

              <Field name="email" as={TextField} label="Client Email *" fullWidth margin="normal" />
              <ErrorMessage name="email" component="div" style={{ color: 'red' }} />

              <Field name="mobile" as={TextField} type="number" label="Mobile *" fullWidth margin="normal" />
              <ErrorMessage name="mobile" component="div" style={{ color: 'red' }} />

              <Field name="paymentMode" as={TextField} label="Payment Mode  *" fullWidth margin="normal" />
              <ErrorMessage name="paymentMode" component="div" style={{ color: 'red' }} />

              {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
              {success && <div style={{ color: 'green', marginTop: '10px' }}>{success}</div>}

              <Button type="submit" variant="contained" className="btn mt-5" disabled={isSubmitting || loading}>
                {loading ? 'Adding...' : 'Add Order'}
              </Button>
            </Form>
          )}
        </Formik>
      </main>
    </div>
  );
}

export default Orderadd;
