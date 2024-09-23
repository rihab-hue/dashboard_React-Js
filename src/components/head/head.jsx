import React, { useState } from "react";
import { BsJustify } from "react-icons/bs";
import "./header.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth"; // Ensure correct import path
import { auth } from "../../firebaseConfig"; // Ensure correct import path for auth

function Header({ OpenSidebar }) {
  const [error, setError] = useState(false); // Track error state
  const [errorMsg, setErrorMsg] = useState(""); // Error message state
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User disconnected successfully");
      navigate("/");
      // If using Redux, dispatch a logout action here
      // dispatch(setLogout()); // Example action
    } catch (err) {
      console.error("Error during sign-out:", err.message);
      setError(true);
      setErrorMsg(err.message); // Show error message if sign-out fails
    }
  };

  return (
    <>
      <header className="header">
        <div className="menu-icon">
          <BsJustify className="icon" onClick={OpenSidebar} />
        </div>
        <div className="logoutbtn">
          <button onClick={handleLogout} className="btn">
            Logout
          </button>
        </div>
        {error && <div className="error-message">{errorMsg}</div>}{" "}
        {/* Display error message if needed */}
      </header>
    </>
  );
}

export default Header;
