import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import HomePage from "./components/homepage/HomePage";
import UserManagement from "./components/userManagemant/UserManagement";
import RoleManagement from "./components/roleManagemant/RoleManagement";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/role-management" element={<RoleManagement />} />

        {/* Add other routes here */}
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
