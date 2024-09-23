import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/aside/asideHeader';
import './List.css'; // Assuming you have created a CSS file for this component
import Header from '../../components/head/head';
import { useNavigate } from 'react-router-dom';

function FeedbacksList() {
  const [feedbacks, setFeedbacks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3002/feedbacks')
      .then(response => response.json())
      .then(data => setFeedbacks(data))
      .catch(error => console.error('Error fetching feedbacks:', error));
  }, []);

  const handleView = (feedbackId) => {
    navigate(`/ViewFeedback/${feedbackId}`);
  };
  const handleDelete = (feedbackId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this feedback?");
    if (!isConfirmed) return;

    fetch(`http://localhost:3002/feedbacks/${feedbackId}`, {
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
      setFeedbacks(feedbacks.filter(feedback => feedback._id !== feedbackId));
    })
    .catch(error => console.error('Error deleting feedback:', error));
  };
  const handleUpdate = (feedbackId)=>{
    navigate(`/UpdateFeedback/${feedbackId}`);
  }

  console.log(feedbacks);
  
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <main className='main-container'>
        <h1 className='text-dark text-center'>Feedbacks List</h1>
        <table className='user-table'>
          <thead>
            <tr>
              <th>User</th>
              <th>Course</th>
              <th>Content</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map(feedback => (
              <tr key={feedback._id}>
                <td>{feedback.user && feedback.user.name ? feedback.user.name : "No user name"}</td>
                <td>{feedback.course && feedback.course.name ? feedback.course.name : "No course name"}</td>
                <td>{feedback.content}</td>
                <td>{feedback.rating}</td>
                <td className='actions'>
                  <button onClick={() => handleView(feedback._id)} className='action-btn'>
                    <i className='ri-eye-line'></i>
                  </button>
                  <button onClick={() => handleUpdate(feedback._id)} className='action-btn'>
                    <i className='ri-edit-line'></i>
                  </button>
                  <button onClick={() => handleDelete(feedback._id)}  className='action-btn'>
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

export default FeedbacksList;
