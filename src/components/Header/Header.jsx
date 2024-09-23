import React, { useRef } from "react";
import { Container } from "reactstrap";
import { Link } from "react-router-dom"; // Import Link from react-router-dom for routing.
import "./header.css";
import { useDispatch , useSelector} from 'react-redux';
import { setLogout } from '../../state/index'; // Adjust path as necessary
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuRef = useRef();
  const user = useSelector(state => {
    console.log("Current Redux state:", state);
    return state.user;
  });

  const menuToggle = () => menuRef.current.classList.toggle("active__menu");

  const handleLogout = async () => {
    // Call the logout endpoint
    const response = await fetch('http://localhost:3002/logout', { method: 'GET' });
    if (response.ok) {
      // Clear user state in Redux
      alert("logout successfully")
      dispatch(setLogout());

      // Redirect to login page
      navigate("/");
    } else {
      alert("Failed to log out. Please try again.");
    }
  };

 
  return (
    <header className="header">
      <Container>
        <div className="d-flex align-items-center justify-content-between">
          <div className="logo">
            <h2>
              <Link to="/home" style={{ textDecoration: "none", color: "#0a2b1e" }}>
              <i className="ri-pantone-line"></i> Rouem.
                </Link>
            </h2>
          </div>
          <div className="nav d-flex align-items-center gap-5">
            <div className="nav__menu" ref={menuRef} onClick={menuToggle}>
              <ul className="nav__list">
                <li className="nav__item"><Link to="/home">Home</Link></li>
                <li className="nav__item"><Link to="/about">About</Link></li>
                <li className="nav__item"><Link to="/courses">Courses</Link></li>
                <li className="nav__item"><Link to="/contact">Contact</Link></li>
                {user?._id && <li className="nav__item"><Link to={`/profile/${user._id}`} className="profile">Profile</Link></li>}

              </ul>
            </div>
            <button className="btn" onClick={handleLogout}>Logout</button>
          </div>
          <div className="mobile__menu">
            <span>
              <i className="ri-menu-line" onClick={menuToggle}></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};



export default Header;
