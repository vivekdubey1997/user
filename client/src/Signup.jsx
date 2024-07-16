import React, { useState } from "react";
import "./Signup.css";
import { FaGoogle, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8001/api/auth/signup",
        {
          firstname: firstName,
          lastname: lastName,
          email,
          password,
        }
      );

      if (response.status === 201) {
        setMessage("Registration successful! You can now log in.");
        setTimeout(() => {
          navigate("/login");
        }, 2000); // Redirect to home page after 2 seconds
        setIsError(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setMessage("Email is already in use.");
      } else {
        setMessage("An error occurred during registration. Please try again.");
      }
      setIsError(true);
    }
  };

  return (
    <div className="SignupContainer">
      <div className="form-container">
        <div className="header">
          <div className="superlist-logo">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.875 4.875V8.75"
                stroke="#D7E894"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.875 11.25V15.125"
                stroke="#D7E894"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.375 11.125H9.375"
                stroke="#D7E894"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.375 6.125H9.375"
                stroke="#D7E894"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.375 1.125H9.375"
                stroke="#D7E894"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p>SmartCRM</p>
          </div>
          <h1>Register now and be part of our vibrant community!</h1>
          <p>Welcome Guest!</p>
        </div>
        <div className="form-section">
          <form onSubmit={handleSubmit}>
            <div className="login-options">
              <p>Register with:</p>
              <div className="icons">
                <FaGoogle size={24} />
                <FaGithub size={24} />
                <FaLinkedin size={24} />
              </div>
            </div>
            <div className="form-fields">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="tooltip">
                <p>Already Registered?</p>
                <Link to="/login">Login</Link>
              </div>
            </div>
            {message && (
              <div className={`message ${isError ? "error" : "success"}`}>
                {message}
              </div>
            )}
            <button type="submit" className="submit-button">
              Register
            </button>
          </form>
        </div>
      </div>
      <div className="footer"></div>
    </div>
  );
};

export default Signup;
