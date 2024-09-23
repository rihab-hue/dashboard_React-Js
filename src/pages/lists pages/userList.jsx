import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/aside/asideHeader';
import './List.css'; // Assuming you have created a CSS file for this component

function UserList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3002/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleView = (userId) => {
    navigate(`/ViewUser/${userId}`);
  };
  const handleDelete = (userId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this user?");
    if (!isConfirmed) return;

    fetch(`http://localhost:3002/users/${userId}`, {
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
      setUsers(users.filter(user => user._id !== userId));
    })
    .catch(error => console.error('Error deleting user:', error));
  };
  const handleUpdate = (userId)=>{
    navigate(`/UpdateUser/${userId}`);
  }
  return (
    <div className='grid-container'>
      <Sidebar />
      <main className='main-container'>
        <h1 className='text-dark text-center'>User List</h1>
        <table className='user-table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.image ? (
                    <img 
                      src={`http://localhost:3002/images/${user.image}`} 
                      alt={`${user.name}'s avatar`} 
                      className='user-image' 
                    />
                  ) : (
                    'No Image'
                  )}
                </td>
                <td className='actions'>
                  <button onClick={() => handleView(user._id)} className='action-btn'>
                    <i className='ri-eye-line'></i>
                  </button>
                  <button onClick={() => handleUpdate(user._id)} className='action-btn'>
                    <i className='ri-edit-line'></i>
                  </button>
                  <button  onClick={() => handleDelete(user._id)} className='action-btn'>
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

export default UserList;
