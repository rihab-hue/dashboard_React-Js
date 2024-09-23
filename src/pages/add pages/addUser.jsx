import Sidebar from '../../components/aside/asideHeader'
import Header from '../../components/head/head';
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Typography , Box } from '@mui/material';
import Dropzone from "react-dropzone";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {useNavigate} from 'react-router-dom';

function AddUser() {
  const navigate = useNavigate();
  const initialValues = {
    name: '',
    email: '',
    password: '',
    image: null // Adding image field to store uploaded image
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('password', values.password);
      formData.append('image', values.image); // Append the image file

      const response = await fetch('http://localhost:3002/users', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      const data = await response.json();
      console.log('User created successfully:', data);
      navigate(`/usersList`);

    } catch (error) {
      setError('Failed to create user. Please try again.'); // Handle error
      console.error('Error creating user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (acceptedFiles) => {
    initialValues.image = acceptedFiles[0]; // Store the accepted file in initial values
  };

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <main className='main-container'>
        <Typography variant="h4" color="#000">Add User</Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <Field name="name" as={TextField} label="User Name" fullWidth margin="normal" />
              <ErrorMessage name="name" component="div" />

              <Field name="email" as={TextField} type="email" label="Email" fullWidth margin="normal" />
              <ErrorMessage name="email" component="div" />

              <Field name="password" as={TextField} type="password" label="Password" fullWidth margin="normal" />
              <ErrorMessage name="password" component="div" />

              <Box
                  gridColumn="span 4"
                  border={`1px solid #A3A3A3`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("image", acceptedFiles[0])
                    }
                  >
                    {/* getRootProps: A method that provides properties required to make the wrapping element (<Box> in this case) behave as a dropzone. This includes event handlers that manage the drag-and-drop functionality. */}
                    
                    {/* This is a method provided by the react-dropzone library. When called, it returns an object containing properties like type and event handlers that are necessary for the <input> element */}
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${"#ffd21f"}`}
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!initialValues.image ? (
                          <p>Add image Here</p>
                        ) : (
                          <div style={{display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center"}}>
                            <Typography>{initialValues.image.name}</Typography>
                            <EditOutlinedIcon />
                          </div>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>

              {error && <div>{error}</div>}
              
              <Button className='btn mt-5' type="submit" variant="contained"  disabled={loading}>
                {loading ? 'Adding...' : 'Add User'}
              </Button>
            </Form>
          )}
        </Formik>
      </main>
    </div>
  )
}

export default AddUser;
