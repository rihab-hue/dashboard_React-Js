import React, { useState, useEffect } from "react";
import Sidebar from "../../components/aside/asideHeader";
import "./List.css";
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore'; // Import Firestore methods
import { db } from "../../firebaseConfig"; // Ensure this import is correct
import { useNavigate } from 'react-router-dom';

function RestoList() {
  const [restaurants, setRestaurants] = useState([]); // State to store restaurant data
  const navigate = useNavigate();


  useEffect(() => {
    const fetchResto = async () => {
      try {
        const restaurantsCollection = collection(db, "restaurants"); // Get the collection reference
        const snapshot = await getDocs(restaurantsCollection); // Fetch all documents in the collection

        const restaurantList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(), // Spread the document data
        }));

        setRestaurants(restaurantList); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching restaurant data:", error); // Log errors
      }
    };

    fetchResto();
  }, []); // Empty dependency array means this useEffect runs once when the component mounts



  const handleUpdate = (id) => {
    navigate(`/updateAdmin/${id}`);
    console.log("Update restaurant:", id); // Changed log message to reflect update action
  };

  const deleteResto = async (restoId) => {
    // Add confirmation dialog
    const confirmDelete = window.confirm("Are you sure you want to delete this restaurant?");
    
    if (!confirmDelete) {
      return; // If the user cancels, do nothing
    }

    try {
      const restoDoc = doc(db, "restaurants", restoId); // Get the document reference by restoId
      await deleteDoc(restoDoc); // Delete the resto document

      // Update the state to remove the deleted resto
      setRestaurants((prevRestaurants) => prevRestaurants.filter((restaurant) => restaurant.id !== restoId));
    } catch (error) {
      console.error("Error deleting the restaurant:", error);
    }
  };

  return (
    
    <div className="grid-container">
   
      <Sidebar />
      <main className="main-container">
        <h1 className="text-dark text-center">Restaurant List</h1>
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Cuisines</th>
              <th>Time</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.length > 0 ? (
              restaurants.map((restaurant) => (
                <tr key={restaurant.id}>
                  <td>{restaurant.name}</td>
                  <td>
                    <img
                      src={restaurant.featured_image}
                      alt={restaurant.name}
                      style={{ width: "50px", height: "30px", objectFit: "cover" }}
                    />
                  </td>
                  <td>{restaurant.cuisines}</td>
                  <td>{restaurant.time}</td>
                  <td>{restaurant.rating}</td>
                  <td className="actions">
                 
                    <button
                      onClick={() => handleUpdate(restaurant.id)}
                      className="action-btn"
                    >
                      <i className="ri-edit-line" style={{color:"green"}}></i>
                    </button>
                    <button
                     onClick={() => deleteResto(restaurant.id)}
                      className="action-btn"
                    >
                      <i className="ri-delete-bin-line" style={{color:"red"}}></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default RestoList;
