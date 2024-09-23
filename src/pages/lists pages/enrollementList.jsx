import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/aside/asideHeader';
import './List.css'; // Assuming you have created a CSS file for this component
import Header from '../../components/head/head';
import { useNavigate } from 'react-router-dom';

function EnrollementsList() {
  const [enrollements, setEnrollements] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3002/enroll')
      .then(response => response.json())
      .then(data => setEnrollements(data))
      .catch(error => console.error('Error fetching enrollements:', error));
  }, []);
  const handleView = (enrollId) => {
    navigate(`/ViewEnrollement/${enrollId}`);
  };
  
  const handleDelete = (enrollId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this enroll?");
    if (!isConfirmed) return;

    fetch(`http://localhost:3002/enrolls/${enrollId}`, {
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
      setEnrollements(enrollements.filter(enroll => enroll._id !== enrollId));
    })
    .catch(error => console.error('Error deleting enroll:', error));
  };


console.log(enrollements)
const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

const OpenSidebar = () => {
  setOpenSidebarToggle(!openSidebarToggle)
}
return (
 
 <div className='grid-container'>
    <Header OpenSidebar={OpenSidebar}/>
    <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <main className='main-container'>
        <h1 className='text-dark text-center'>Enrollements List</h1>
        <table className='user-table'>
          <thead>
            <tr>
              <th>userId</th>
              <th>courseId</th>
              {/* <th>Image</th> */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {enrollements.map(enrollement => (
              <tr key={enrollement._id}>
                <td>{enrollement.courseId}</td>
                <td>{enrollement.userId}</td>
               
                {/* 
                onClick={() => handleView(enrollement._id)}
                onClick={() => handleUpdate(enrollement._id)}
                onClick={() => handleDelete(enrollement._id)} 
                 */}
                <td className='actions'>
                  <button  onClick={() => handleView(enrollement._id)}  className='action-btn'>
                    <i className='ri-eye-line'></i>
                  </button>
                  <button  onClick={() => handleDelete(enrollement._id)}  className='action-btn'>
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

export default EnrollementsList;
