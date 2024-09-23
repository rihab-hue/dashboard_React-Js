import React, { useState } from 'react';
import './aside.css'; // Import CSS file for styling
import { Link } from 'react-router-dom';
import { FaUtensils, FaListAlt, FaShoppingCart } from 'react-icons/fa'; // Import icons from React Icons

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const [showAdminsDropdown, setShowAdminsDropdown] = useState(false);
  const [showCoursesDropdown, setShowCoursesDropdown] = useState(false);
  const [showTeachersDropdown, setShowTeachersDropdown] = useState(false);

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand' style={{color:"white"}}>
        <img
            src={require("../../assets/logo2.png")} // Ensure the path is correct
            alt="Logo"
            style={{ width: '100px', height: 'auto' }} // Adjust size as needed
          />
          Foodi
        </div>
     
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>

      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <div className="dropdown">
            <p onClick={() => setShowAdminsDropdown(!showAdminsDropdown)}>
              <FaUtensils className='icon' /> Restaurant_Management
            </p>
            {showAdminsDropdown && (
              <ul className="dropdown-content">
                <li className='linkContainer'>
                  <Link className='link' to="/addAdmin">Add Restaurant</Link>
                </li>
                <li className='linkContainer'>
                  <Link className='link' to="/adminsList">Restaurant List</Link>
                </li>
              </ul>
            )}
          </div>
        </li>
        <li className='sidebar-list-item'>
          <div className="dropdown">
            <p onClick={() => setShowTeachersDropdown(!showTeachersDropdown)}>
              <FaListAlt className='icon' /> Menu_Management
            </p>
            {showTeachersDropdown && (
              <ul className="dropdown-content">
                <li className='linkContainer'>
                  <Link className='link' to="/addTeacher">Add Menu</Link>
                </li>
                <li className='linkContainer'>
                  <Link className='link' to="/teachersList">Menu List</Link>
                </li>
              </ul>
            )}
          </div>
        </li>
        <li className='sidebar-list-item'>
          <div className="dropdown">
            <p onClick={() => setShowCoursesDropdown(!showCoursesDropdown)}>
              <FaShoppingCart className='icon' /> Order_Management
            </p>
            {showCoursesDropdown && (
              <ul className="dropdown-content">
                <li className='linkContainer'>
                  <Link className='link' to="/addCourse">Add Order</Link>
                </li>
                <li className='linkContainer'>
                  <Link className='link' to="/coursesList">Order List</Link>
                </li>
              </ul>
            )}
          </div>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
