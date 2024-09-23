import React, { useState, useEffect } from 'react';
import { useParams ,Link } from 'react-router-dom';
import Sidebar from '../../components/aside/asideHeader';
import Header from '../../components/head/head';
import './View.css'; // Assuming you have created a CSS file for this component

function ViewFeedback() {
  const { feedbackId } = useParams();
  const [feedback, setFeedback] = useState(null);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3002/feedbacks/${feedbackId}`)
      .then(response => response.json())
      .then(data => setFeedback(data))
      .catch(error => console.error('Error fetching feedback details:', error));
  }, [feedbackId]);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  if (!feedback) {
    return <div>Loading...</div>;
  }

  return (
    <div className='grid-container details-container'>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <main className='main-container'>
        <h1 className='text-dark text-center details-title'>Feedback Details</h1>
        <div className='details'>
          <p><strong>course:</strong> {feedback.course.name}</p>
          <p><strong>user:</strong> {feedback.user.name}</p>          
          <p><strong>content of the feedback:</strong> {feedback.content}</p>          
          <p><strong>rating:</strong> {feedback.rating}</p>    
          <Link to="/feedbacksList">Back to List </Link>
        </div>
      </main>
    </div>
  );
}

export default ViewFeedback;



