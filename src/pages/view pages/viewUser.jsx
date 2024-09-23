import React, { useState, useEffect } from 'react';
import { useParams , Link } from 'react-router-dom';
import Sidebar from '../../components/aside/asideHeader';
import Header from '../../components/head/head';
import './View.css'; // Assuming you have created a CSS file for this component

function ViewUser() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3002/users/${userId}`)
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error('Error fetching user details:', error));
  }, [userId]);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className='grid-container details-container'>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <main className='main-container'>
        <h1 className='text-dark text-center details-title'>User Details</h1>
        <div className='details'>
        {user.image && <img  src={`http://localhost:3002/images/${user.image}`} alt={`${user.name}'s avatar`} className='user-image image' />}
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p> 
          <Link to="/usersList">Back to List </Link>
                 
        </div>
      </main>
    </div>
  );
}

export default ViewUser;



