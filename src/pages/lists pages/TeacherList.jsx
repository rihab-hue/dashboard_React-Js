import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/aside/asideHeader';
import './List.css'; 
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore'; // Import Firestore methods
import { db } from '../../firebaseConfig'; // Ensure correct Firebase config import

function TeacherList() {
  const [menus, setMenus] = useState([]); // State to store menu data
  const navigate = useNavigate();
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  // Sidebar toggle
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };


  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const menusCollection = collection(db, "menus"); // Get the collection reference
        const snapshot = await getDocs(menusCollection); // Fetch all documents in the collection

        const menuList = snapshot.docs.map((doc) => ({
          id: doc.id, // Firestore uses `id` as the document ID
          ...doc.data(), // Spread the document data
        }));

        setMenus(menuList); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching menu data:", error); // Log errors
      }
    };

    fetchMenu();
  }, []); // Empty dependency array means this useEffect runs once when the component mounts

  const handleView = (id) => {
    console.log("View menu:", id);
  };

  const handleUpdate = (id) => {
    navigate(`/UpdateTeacher/${id}`);
  };

  const deleteMenu = async (menuId) => {
    // Add confirmation dialog
    const confirmDelete = window.confirm("Are you sure you want to delete this menu?");
    
    if (!confirmDelete) {
      return; // If the user cancels, do nothing
    }

    try {
      const menuDoc = doc(db, "menus", menuId); // Get the document reference by menuId
      await deleteDoc(menuDoc); // Delete the menu document

      // Update the state to remove the deleted menu
      setMenus((prevMenus) => prevMenus.filter((menu) => menu.id !== menuId));
    } catch (error) {
      console.error("Error deleting the menu:", error);
    }
  };

  return (
    <div className='grid-container'>

      <Sidebar />
      <main className='main-container'>
        <h1 className='text-dark text-center'>Menu List</h1>
        <table className='user-table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Description</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {menus.map(menu => (
              <tr key={menu.id}>
                <td>{menu.name}</td>
                <td>{menu.price}</td>
                <td>
                  <img
                    src={menu.image}
                    alt={menu.name}
                    style={{ width: "50px", height: "30px", objectFit: "cover" }}
                  />
                </td>
                <td>{menu.description}</td>
                <td>{menu.rating}</td>
                <td className='actions'>
                 
                  <button onClick={() => handleUpdate(menu.id)} className='action-btn'>
                    <i className='ri-edit-line'style={{color:"green"}}></i>
                  </button>
                  <button onClick={() => deleteMenu(menu.id)} className='action-btn'>
                    <i className='ri-delete-bin-line' style={{color:"red"}}></i>
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

export default TeacherList;
