// src/components/UserList.js
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import "./UserManagement.css";
import Navbar from "../../navbar/Navbar";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8001/api/auth/");
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get("http://localhost:8001/api/roles/");
      return response.data;
    } catch (error) {
      console.error("Error fetching roles:", error);
      return [];
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const usersData = await fetchUsers();
      const rolesData = await fetchRoles();
      console.log(rolesData);
      console.log(usersData);
      setUsers(usersData);
      setRoles(rolesData);
    };
    loadData();
  }, []);

  const handleRoleChange = async (userId, roleId) => {
    console.log(userId, roleId);
    try {
      await axios.post("http://localhost:8001/api/users/assignrole", {
        userId,
        roleId,
      });
      const updatedUsers = users.map((user) =>
        user._id === userId
          ? { ...user, role: roles.find((role) => role._id === roleId) }
          : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  return (
    <div className="userSection">
      <Navbar />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Change Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>
                  <Avatar src={user.avatar} />
                </TableCell>
                <TableCell>
                  <div>{`${user.firstname} ${user.lastname}`}</div>
                  <div>@{user.email}</div>
                </TableCell>
                <TableCell>{user.role.name}</TableCell>
                <TableCell>
                  <FormControl variant="outlined" size="small" color="success">
                    <InputLabel>Role</InputLabel>
                    <Select
                      value={user.role._id}
                      onChange={(e) =>
                        handleRoleChange(user._id, e.target.value)
                      }
                      label="Role"
                    >
                      {roles.map((role) => (
                        <MenuItem key={role._id} value={role._id}>
                          {role.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserList;
