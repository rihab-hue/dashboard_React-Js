import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/aside/asideHeader';
import Header from '../../components/head/head';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Typography, Box } from '@mui/material';
import Dropzone from 'react-dropzone';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../state/index';

function UpdateUser() {
  const { userId } = useParams();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    image: null
  });



  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string(),
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3002/users/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        console.log("Fetched user data:", data); // Add this line to log fetched data
        setFormValues(data);
      } catch (error) {
        setError('Failed to fetch user data. Please try again.');
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUser();
  }, [userId]);
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const {  name, email } = values;
      const data = {
        name,
        email // Ensure rating is parsed as an integer
      };
  
      const response = await fetch(`http://localhost:3002/users/${userId}`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
      const res = await response.json();
      dispatch(updateUser(res)); 
      console.log('User updated successfully:', res);
      
      alert("User updated successfully");
      navigate('/UsersList');
    } catch (error) {
      setError('Failed to update user. Please try again.');
      console.error('Error updating user:', error);
    } finally {
      setLoading(false);
    }
  };

   
  // const handleDrop = (acceptedFiles, setFieldValue) => {
  //   const file = acceptedFiles[0];
  //   setFieldValue('image', file);
  //   setFormValues({
  //     ...formValues,
  //     image: file
  //   });
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  return (
    <div className='grid-container'>
      <Header />
      <Sidebar />
      <main className='main-container'>
        <Typography variant='h4' color='#000'>
          Update User
        </Typography>
        <Formik
          initialValues={formValues}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <Field
                name='name'
                as={TextField}
                label='User Name'
                fullWidth
                margin='normal'
                onChange={handleChange}
              />
              <ErrorMessage name='name' component='div' />

              <Field
                name='email'
                as={TextField}
                type='email'
                label='Email'
                fullWidth
                margin='normal'
                onChange={handleChange}
              />
              <ErrorMessage name='email' component='div' />
{/* 
              <Box
                gridColumn='span 4'
                border={`1px solid #A3A3A3`}
                borderRadius='5px'
                p='1rem'
              >
                <Dropzone
                  acceptedFiles='.jpg,.jpeg,.png'
                  multiple={false}
                  onDrop={(acceptedFiles) => handleDrop(acceptedFiles, setFieldValue)}
                >
                  {({ getRootProps, getInputProps }) => (
                    <Box
                      {...getRootProps()}
                      border={`2px dashed ${'#ffd21f'}`}
                      sx={{ '&:hover': { cursor: 'pointer' } }}
                    >
                      <input {...getInputProps()} />
                      {!values.image ? (
                        <p>Add image Here</p>
                      ) : (
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <Typography>{values.image.name || 'Current image'}</Typography>
                          <EditOutlinedIcon />
                        </div>
                      )}
                    </Box>
                  )}
                </Dropzone>
              </Box> */}

              {error && <div>{error}</div>}

              <Button
                className='btn mt-5'
                type='submit'
                variant='contained'
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update User'}
              </Button>
            </Form>
          )}
        </Formik>
      </main>
    </div>
  );
}

export default UpdateUser;
