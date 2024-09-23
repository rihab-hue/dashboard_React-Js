import React, { useState, useEffect } from 'react';
import { useParams , Link } from 'react-router-dom';
import Sidebar from '../../components/aside/asideHeader';
import Header from '../../components/head/head';
import './View.css'; // Assuming you have created a CSS file for this component

function ViewEnrollment() {
  const { enrollId } =  useParams();
  const [enrollment, setEnrollment] = useState(null);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3002/enroll/${enrollId}`)
      .then(response => response.json())
      .then(data => setEnrollment(data))
      .catch(error => console.error('Error fetching enrollment details:', error));
  }, [enrollId]);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  if (!enrollment) {
    return <div>Loading...</div>;
  }

  return (
    <div className='grid-container details-container'>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <main className='main-container'>
        <h1 className='text-dark text-center details-title'>Enrollment Details</h1>
        <div className='details'>
          <p><strong>Course:</strong> {enrollment.courseId.name}</p>
          <p><strong>User:</strong> {enrollment.userId}</p> {/* Assuming `name` is the property containing the user's name */}
          <p><strong>Enrollment Date:</strong> {new Date(enrollment.enrollmentDate).toLocaleDateString()}</p>
          <p><strong>Status:</strong> {enrollment.status}</p>
          <Link to="/enrollementsList">Back to List </Link>

        </div>
      </main>
    </div>
  );
}

export default ViewEnrollment;
