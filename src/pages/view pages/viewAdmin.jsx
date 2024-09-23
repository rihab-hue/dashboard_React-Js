import React, { useState, useEffect } from 'react';
import { useParams , useNavigate , Link} from 'react-router-dom';
import Sidebar from '../../components/aside/asideHeader';
import Header from '../../components/head/head';
import './View.css'; // Assuming you have created a CSS file for this component

function ViewAdmin() {
  const { adminId } = useParams();
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3002/admins/${adminId}`)
      .then(response => response.json())
      .then(data => setAdmin(data))
      .catch(error => console.error('Error fetching admin details:', error));
  }, [adminId]);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  if (!admin) {
    return <div>Loading...</div>;
  }

  return (
    <div className='grid-container details-container'>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <main className='main-container'>
        <h1 className='text-dark text-center details-title'>Admin Details</h1>
        <div className='details'>
          <p><strong>Name:</strong> {admin.adminName}</p>
          <p><strong>Email:</strong> {admin.email}</p>
          <p><strong>role:</strong> {admin.role}</p>
          <Link to="/adminsList">Back to List </Link>
        </div>
      </main>
    </div>
  );
}

export default ViewAdmin;



