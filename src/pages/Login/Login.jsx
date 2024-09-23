import "./Login.css";
import infinity from "../../assets/logo2.png";
import { useState } from "react";
import warning from "../../assets/warning.png";
import React from "react";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Proper camelCase
  const [email, setEmail] = useState(""); // Proper camelCase
  const [password, setPassword] = useState(""); // Proper camelCase
  const [error, setError] = useState(false); // Track error state
  const [errorMsg, setErrorMsg] = useState(""); // Proper camelCase for error message
  const navigate = useNavigate();

  //function login
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!email || !password) {
      setError(true);
      setErrorMsg("Please enter both email and password");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User connected successfully:", userCredential.user);
      navigate("/home");
      setIsLoggedIn(true); // Set state to logged in
      setError(false); // Clear error state on successful login
    } catch (err) {
      console.error("Error during sign-in:", err.message);
      setError(true);
      setErrorMsg(err.message); // Show specific error message
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User disconnected successfully");
      setIsLoggedIn(false); // Set state to logged out
    } catch (err) {
      console.error("Error during sign-out:", err.message);
      setError(true);
      setErrorMsg(err.message); // Show error message if sign-out fails
    }
  };

  return (
    <div className="login-page">
      <img className="logo" src={infinity} alt="Logo" />

      <h2 className="title">
        Foodie
        <br />
        Application
      </h2>
      {!isLoggedIn ? (
        <form onSubmit={handleLogin}>
          <div className="email">
            <input
              onChange={(e) => setEmail(e.target.value)} // Proper camelCase
              type="email"
              id="email"
              required
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="password">
            <input
              onChange={(e) => setPassword(e.target.value)} // Proper camelCase
              type="password"
              id="password"
              required
            />
            <label htmlFor="password">Password</label>
          </div>

          {error && <img src={warning} alt="Warning" className="status" />}
          {error && <span className="error">{errorMsg}</span>}

          <button type="submit">Sign In</button>
        </form>
      ) : (
        <div>
          <p>You are logged in</p>
          <button title="Logout" onClick={handleLogout}>
            Logout
          </button>{" "}
          {/* Changed onPress to onClick */}
        </div>
      )}
    </div>
  );
};

export default Login;
