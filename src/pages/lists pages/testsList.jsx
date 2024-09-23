import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/aside/asideHeader';
import './List.css'; 
import { useNavigate } from 'react-router-dom';

function TestsList() {
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3002/tests') // Assuming endpoint for tests
      .then(response => response.json())
      .then(data => setTests(data))
      .catch(error => console.error('Error fetching tests:', error));
  }, []);

  const handleView = (testId) => {
    navigate(`/ViewTest/${testId}`); // Assuming ViewTest component exists
  };

  const handleUpdate = (testId) => {
    navigate(`/UpdateTest/${testId}`); // Assuming UpdateTest component exists
  };

  const handleDelete = (testId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this test?");
    if (!isConfirmed) return;

    fetch(`http://localhost:3002/tests/${testId}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data.message);
      setTests(tests.filter(test => test._id !== testId));
    })
    .catch(error => console.error('Error deleting test:', error));
  };

  return (
    <div className='grid-container'>
      <Sidebar />
      <main className='main-container'>
        <h1 className='text-dark text-center'>Tests List</h1>
        <table className='user-table'>
          <thead>
            <tr>
              <th>Course</th>
              <th>Questions</th>
              <th>Passing Score</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tests.map(test => (
              <tr key={test._id}>
                <td>{test.course}</td>
                <td>{test.questions.length}</td> 
                <td>{test.passingScore}</td>
                <td className='actions'>
                  <button onClick={() => handleView(test._id)} className='action-btn'>
                    <i className='ri-eye-line'></i>
                  </button>
                  <button onClick={() => handleUpdate(test._id)} className='action-btn'>
                    <i className='ri-edit-line'></i>
                  </button>
                  <button onClick={() => handleDelete(test._id)} className='action-btn'>
                    <i className='ri-delete-bin-line'></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default TestsList;
