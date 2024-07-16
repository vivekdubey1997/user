import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { LiaTimesSolid } from "react-icons/lia";
import { NavLink } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navbar">
      <button onClick={toggleNavbar} className="toggle-button">
        {isOpen ? "" : <RxHamburgerMenu size={24} />}
      </button>
      <div className={`side-navbar ${isOpen ? "open" : ""}`}>
        <div className="closeBtn" onClick={toggleNavbar}>
          <LiaTimesSolid size={24} />
        </div>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/user-management">User Managemant</NavLink>
          </li>
          <li>
            <NavLink to="/role-management">Role Management</NavLink>
          </li>
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
          <li>
            <NavLink to="/notifications">Notifications</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/report">Reports</NavLink>
          </li>
          <li>
            <NavLink to="/settings">Settings</NavLink>
          </li>
          <li>
            <NavLink to="/login">Logout</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
