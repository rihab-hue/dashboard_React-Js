import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/aside/asideHeader';
import './List.css'; 
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore'; // Import Firestore methods
import { db } from "../../firebaseConfig"; // Ensure this import is correct
import Header from '../../components/head/head';


function OrdersList() {
  const [Orders, setOrders] = useState([]); // State to store order data
  const navigate = useNavigate();
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  // Sidebar toggle
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };


  useEffect(() => {
    const fetchResto = async () => {
      try {
        const OrdersCollection = collection(db, "orders"); // Get the collection reference
        const snapshot = await getDocs(OrdersCollection); // Fetch all documents in the collection

        const orderList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(), // Spread the document data
        }));

        setOrders(orderList); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching order data:", error); // Log errors
      }
    };

    fetchResto();
  }, []); // Empty dependency array means this useEffect runs once when the component mounts

  const handleView = (id) => {
    console.log("View order:", id);
  };

  const handleUpdate = (id) => {
    navigate(`/UpdateCourse/${id}`);
    console.log("Update order:", id); // Changed log message to reflect update action
  };

  const deleteResto = async (restoId) => {
    // Add confirmation dialog
    const confirmDelete = window.confirm("Are you sure you want to delete this order?");
    
    if (!confirmDelete) {
      return; // If the user cancels, do nothing
    }

    try {
      const restoDoc = doc(db, "orders", restoId); // Get the document reference by restoId
      await deleteDoc(restoDoc); // Delete the resto document

      // Update the state to remove the deleted resto
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== restoId));
    } catch (error) {
      console.error("Error deleting the order:", error);
    }
  };

  return (
    <div className='grid-container'>
         
      <Sidebar />
      <main className='main-container'>
        <h1 className='text-dark text-center'>orders List</h1>
        <table className='user-table'>
          <thead>
         
            <tr>
              <th> Name</th>
              <th>email</th>
              <th>address</th>
              <th>mobile</th>
              <th>paymentMode</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Orders.map(order => (
              <tr key={order._id}>
                <td>{order.name}</td>
                <td>{order.email}</td>
                <td>{order.address}</td>
                <td>{order.mobile}</td>
                <td>{order.paymentMode}</td>
                <td className='actions'>
                 
                  <button onClick={() => handleUpdate(order._id)} className='action-btn'>
                    <i className='ri-edit-line' style={{color:"green"}}></i>
                  </button>
                  <button   onClick={() => deleteResto(order.id)} className='action-btn'>
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

export default OrdersList;
