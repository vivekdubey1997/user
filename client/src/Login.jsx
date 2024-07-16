import React, { useState } from "react";
import "./Signup.css";
import { FaGoogle, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8001/api/auth/login",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        setMessage("Login successful! Redirecting to home page...");
        setIsError(false);
        console.log(response);
        setTimeout(() => {
          navigate("/home");
        }, 2000); 
        localStorage.setItem("userId", response.data.user._id);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMessage("Invalid email or password.");
      } else {
        setMessage("An error occurred during login. Please try again.");
      }
      setIsError(true);
    }
  };

  return (
    <div className={`LoginContainer`}>
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
          <h1>Welcome back! Good to see you again.</h1>
          <p>Please Login!</p>
        </div>
        <div className="form-section">
          <form onSubmit={handleSubmit}>
            <div className="login-options">
              <p>Login with:</p>
              <div className="icons">
                <FaGoogle size={24} />
                <FaGithub size={24} />
                <FaLinkedin size={24} />
              </div>
            </div>
            <div className="form-fields">
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
                <p>Don't have an account?</p>
                <Link to="/signup">Signup</Link>
              </div>
            </div>
            {message && (
              <div className={`message ${isError ? "error" : "success"}`}>
                {message}
              </div>
            )}
            <button type="submit" className="submit-button">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
