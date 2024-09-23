import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Sidebar from '../../components/aside/asideHeader';
import Header from '../../components/head/head';
import './View.css'; // Assuming you have created a CSS file for this component

function ViewCourse() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3002/courses/${courseId}`)
      .then(response => response.json())
      .then(data => setCourse(data))
      .catch(error => console.error('Error fetching course details:', error));
  }, [courseId]);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className='grid-container details-container'>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <main className='main-container'>
        <h1 className='text-dark text-center details-title'>Course Details</h1>
        <div className='details'>
          <p>Image :   <img height="100px" width="10px" src={`http://localhost:3002/images/${course.image}`} alt="cover image" className='' style={{height: "50px" , width:"50px"}}/></p>
          <p><strong>Name:</strong> {course.name}</p>
          <p><strong>Description:</strong> {course.description}</p>
          <p><strong>Topic:</strong> {course.topic}</p>
          <p><strong>Price:</strong> {course.price}</p>
          {/* <video width="320" height="240" controls>
              <source src={`http://localhost:3002/videos/${course.videos.videoURL}`} type="video/mp4" />
          </video> */}
          <br/>
          {/* You can display additional details here */}
          <Link to="/coursesList">Back to List</Link>
        </div>
      </main>
    </div>
  );
}

export default ViewCourse;
