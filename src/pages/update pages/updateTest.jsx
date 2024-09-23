import Sidebar from '../../components/aside/asideHeader';
import Header from '../../components/head/head';
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { Button, Typography, TextField  , IconButton} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { AddCircle, RemoveCircle } from '@mui/icons-material';

function UpdateTest() {
  const navigate = useNavigate();
  const { testId } = useParams();
  const [testData, setTestData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  useEffect(() => {
    const fetchData = async () => {
      try { 
        const response = await fetch(`http://localhost:3002/tests/${testId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch test data');
        }
        const data = await response.json();
        setTestData(data);
      } catch (error) {
        setError('Failed to fetch test data. Please try again.');
        console.error('Error fetching test data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [testId]);

  if (!testData) {
    return <div>Loading...</div>;
  }

  const initialValues = {
    course: testData.course || '',
    passingScore: testData.passingScore || '',
    questions: testData.questions.map(question => ({
      questionText: question.questionText || '',
      options: question.options || ['', '', '', ''],
      correctAnswer: question.correctAnswer || ''
    }))
  };

  const validationSchema = Yup.object().shape({
    course: Yup.string().required('Course ID is required'),
    passingScore: Yup.number().required('Passing score is required').min(0, 'Must be greater than or equal to 0'),
    questions: Yup.array().of(
      Yup.object().shape({
        questionText: Yup.string().required('Question text is required'),
        options: Yup.array().of(Yup.string().required('Option is required')),
        correctAnswer: Yup.string().required('Correct answer is required')
      })
    )
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3002/tests/${testId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to update test');
      }

      console.log('Test updated successfully');
      navigate('/TestsList');
      
    } catch (error) {
      setError('Failed to update test. Please try again.');
      console.error('Error updating test:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <main className='main-container'>
        <Typography variant="h4" color="#000">Update Test</Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <Field name="course" as={TextField} label="Course ID" fullWidth margin="normal" />
              <ErrorMessage name="course" component="div" />
              
              <Field name="passingScore" as={TextField} type="number" label="Passing Score" fullWidth margin="normal" />
              <ErrorMessage name="passingScore" component="div" />
              
             <FieldArray name="questions">
  {({ push, remove, form }) => (
    <div>
      {form.values.questions.map((question, index) => (
        <div key={index}>
          <Field name={`questions.${index}.questionText`} as={TextField} label={`Question ${index + 1}`} fullWidth margin="normal" />
          <ErrorMessage name={`questions.${index}.questionText`} component="div" />
          
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex}>
              <Field name={`questions.${index}.options.${optionIndex}`} as={TextField} label={`Option ${optionIndex + 1}`} fullWidth margin="normal" />
              <ErrorMessage name={`questions.${index}.options.${optionIndex}`} component="div" />
            </div>
          ))}

          <Field name={`questions.${index}.correctAnswer`} as={TextField} label="Correct Answer" fullWidth margin="normal" />
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
              
              <Button type="submit" variant="contained" className='btn mt-5' disabled={loading}>
                {loading ? 'Updating...' : 'Update Test'}
              </Button>
            </Form>
          )}
        </Formik>
      </main>
    </div>
  );
}

export default UpdateTest;
