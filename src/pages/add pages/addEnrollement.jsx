import Sidebar from '../../components/aside/asideHeader';
import Header from '../../components/head/head';
import React, { useState } from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Typography, IconButton } from '@mui/material';
import { AddCircle, RemoveCircle } from '@mui/icons-material';
import {useNavigate} from 'react-router-dom';

function AddTest() {
  const navigate = useNavigate();

  const initialValues = {
    courseId: '',
    questions: [{
      questionText: '',
      options: ['', '', '', ''],
      correctAnswer: ''
    }],
    passingScore: ''
  };

  const validationSchema = Yup.object().shape({
    courseId: Yup.string().required('Course ID is required'),
    questions: Yup.array().of(
      Yup.object().shape({
        questionText: Yup.string().required('Question text is required'),
        options: Yup.array().of(Yup.string().required('Option is required')),
        correctAnswer: Yup.string().required('Correct answer is required')
      })
    ),
    passingScore: Yup.number().required('Passing score is required').min(0, 'Must be greater than or equal to 0')
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      console.log('Submitting values:', values);  // Debugging line
      const response = await fetch('http://localhost:3002/tests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to create test');
      }

      const data = await response.json();
      console.log('Test created successfully:', data);
      navigate(`/enrollementsList`);

    } catch (error) {
      setError('Failed to create test. Please try again.');
      console.error('Error creating test:', error);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <main className='main-container'>
        <Typography variant="h4" color="#000">Add Test</Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, isSubmitting }) => (
            <Form>
              <Field
                name="courseId"
                as={TextField}
                label="Course ID"
                fullWidth
                margin="normal"
              />
              <ErrorMessage name="courseId" component="div" />

              <Field
                name="passingScore"
                as={TextField}
                type="number"
                label="Passing Score"
                fullWidth
                margin="normal"
              />
              <ErrorMessage name="passingScore" component="div" />

              <FieldArray name="questions">
                {({ push, remove }) => (
                  <div>
                    {values.questions.map((question, index) => (
                      <div key={index}>
                        <Field
                          name={`questions.${index}.questionText`}
                          as={TextField}
                          label={`Question ${index + 1}`}
                          fullWidth
                          margin="normal"
                        />
                        <ErrorMessage name={`questions.${index}.questionText`} component="div" />

                        {question.options.map((option, optionIndex) => (
                          <div key={optionIndex}>
                            <Field
                              name={`questions.${index}.options.${optionIndex}`}
                              as={TextField}
                              label={`Option ${optionIndex + 1}`}
                              fullWidth
                              margin="normal"
                            />
                            <ErrorMessage name={`questions.${index}.options.${optionIndex}`} component="div" />
                          </div>
                        ))}

                        <Field
                          name={`questions.${index}.correctAnswer`}
                          as={TextField}
                          label="Correct Answer"
                          fullWidth
                          margin="normal"
                        />
                        <ErrorMessage name={`questions.${index}.correctAnswer`} component="div" />

                        <IconButton onClick={() => remove(index)}>
                          <RemoveCircle />
                        </IconButton>
                      </div>
                    ))}
                    <Button onClick={() => push({ questionText: '', options: ['', '', '', ''], correctAnswer: '' })} variant="contained" startIcon={<AddCircle />}>
                      Add Question
                    </Button>
                  </div>
                )}
              </FieldArray>

              {error && <div>{error}</div>}

              <Button type="submit" variant="contained" className='btn mt-5' disabled={loading || isSubmitting}>
                {loading || isSubmitting ? 'Adding...' : 'Add Test'}
              </Button>
            </Form>
          )}
        </Formik>
      </main>
    </div>
  );
}

export default AddTest;
