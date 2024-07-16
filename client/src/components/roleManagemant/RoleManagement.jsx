import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Chip,
  OutlinedInput,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
  IconButton,
} from "@mui/material";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import Navbar from "../../navbar/Navbar";
import "./roleManagement.css";

const menuList = [
  "user-management",
  "role-management",
  "profile",
  "notifications",
  "dashboard",
  "reports",
  "settings",
];

const RoleManagement = () => {
  const [roles, setRoles] = useState([
    { name: "Admin", menus: ["user-management", "dashboard"], active: true },
    { name: "Manager", menus: ["reports", "notifications"], active: true },
  ]);
  const [roleName, setRoleName] = useState("");
  const [selectedMenus, setSelectedMenus] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleRoleNameChange = (event) => {
    setRoleName(event.target.value);
  };

  const handleMenuChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedMenus(typeof value === "string" ? value.split(",") : value);
  };

  const handleCreateNewRole = () => {
    setRoleName("");
    setSelectedMenus([]);
    setEditIndex(roles.length); // Set edit index to the new role
  };

  const handleSaveRole = () => {
    const newRole = { name: roleName, menus: selectedMenus, active: true };
    const updatedRoles = [...roles];
    if (editIndex !== null && editIndex < roles.length) {
      updatedRoles[editIndex] = newRole;
    } else {
      updatedRoles.push(newRole);
    }
    setRoles(updatedRoles);
    setRoleName("");
    setSelectedMenus([]);
    setEditIndex(null);
  };

  const handleEditRole = (index) => {
    const role = roles[index];
    setRoleName(role.name);
    setSelectedMenus(role.menus);
    setEditIndex(index);
  };

  return (
    <Container
      sx={{ display: "flex", height: "100vh", padding: 0 }}
      className="roleSection"
    >
      <Navbar />
      <Box sx={{ width: "25%", bgcolor: "grey.200", p: 2 }}>
        <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={handleCreateNewRole}
        >
          Create New Role
        </Button>
      </Box>
      <Box sx={{ width: "75%", p: 2 }}>
        <h1>Manage Roles</h1>
        {(editIndex !== null || roles.length === 0) && (
          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}
          >
            <TextField
              label="Role Name"
              variant="outlined"
              value={roleName}
              onChange={handleRoleNameChange}
            />
            <FormControl variant="outlined">
              <InputLabel id="menu-select-label">Menus</InputLabel>
              <Select
                labelId="menu-select-label"
                multiple
                value={selectedMenus}
                onChange={handleMenuChange}
                input={
                  <OutlinedInput id="select-multiple-chip" label="Menus" />
                }
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {menuList.map((menu) => (
                  <MenuItem key={menu} value={menu}>
                    {menu}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="success"
              fullWidth
              onClick={handleSaveRole}
              startIcon={<SaveIcon />}
            >
              Save Role
            </Button>
          </Box>
        )}
        <TransitionGroup component={List}>
          {roles.map((role, index) => (
            <CSSTransition key={index} timeout={500} classNames="role">
              <ListItem
                sx={{ border: "1px solid #ccc", borderRadius: "4px", mb: 2 }}
              >
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText
                  primary={role.name}
                  secondary={`Menus: ${role.menus.join(", ")}`}
                />
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => handleEditRole(index)}
                >
                  <EditIcon />
                </IconButton>
              </ListItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </Box>
    </Container>
  );
};

export default RoleManagement;
