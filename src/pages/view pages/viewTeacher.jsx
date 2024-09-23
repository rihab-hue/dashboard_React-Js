import React, { useState, useEffect } from 'react';
import { useParams , useNavigate , Link} from 'react-router-dom';
import Sidebar from '../../components/aside/asideHeader';
import Header from '../../components/head/head';
import './View.css'; // Assuming you have created a CSS file for this component

function ViewTeacher() {
  const {teacherId } = useParams();
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState(null);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3002/teachers/${teacherId}`)
      .then(response => response.json())
      .then(data => setTeacher(data))
      .catch(error => console.error('Error fetchingteacher details:', error));
  }, [teacherId]);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  if (!teacher) {
    return <div>Loading...</div>;
  }

  return (
    <div className='grid-container details-container'>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <main className='main-container'>
        <h1 className='text-dark text-center details-title'>Teacher Details</h1>
        <div className='details'>
          <p><strong>Name:</strong> {teacher.teacherName}</p>
          <p><strong>Email:</strong> {teacher.email}</p>
          <p><strong>role:</strong> {teacher.role}</p>
          <Link to="/teachersList">Back to List </Link>
        </div>
      </main>
    </div>
  );
}

export default ViewTeacher;



