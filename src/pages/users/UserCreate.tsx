import React, { SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import {
  Grid,
  CssBaseline,
  Typography,
  Avatar,
  Select,
  InputLabel,
  MenuItem,
  Button,
} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Header from "../../components/Header";
import SideNav from "../../components/SideNav";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { SelectChangeEvent } from "@mui/material/Select";
import { Role } from "../../models/role";
import FormControl from "@mui/material/FormControl";

const UserCreate = () => {
  const [redirect, setRedirect] = useState(false);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role_id, setRoleId] = useState("");
  const [roles, setRoles] = useState([]);
  const [navigate, setNavigate] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        await axios.get("user");
      } catch (e) {
        setRedirect(true);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    const getRoles = async () => {
      const { data } = await axios.get("roles");
      setRoles(data);
    };
    getRoles();
  }, []);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.post("users", { first_name, last_name, email, role_id });
    setNavigate(true);
  };

  if (redirect) {
    return <Navigate to="/login" />;
  }

  if (navigate) {
    return <Navigate to="/users" />;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header name="Create User" />
      <SideNav />
      <Box
        sx={{
          mt: 12,
          ml: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <PersonAddAltOutlinedIcon />
        </Avatar>
        <Typography variant="h6">Create User</Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="roleId">Role</InputLabel>
                <Select
                  onChange={(e: SelectChangeEvent) => setRoleId(e.target.value)}
                  label="Role"
                >
                  {roles.map((r: Role) => {
                    return (
                      <MenuItem value={r.id} key={r.id}>
                        {r.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" size="small" sx={{ mt: 2 }}>
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default UserCreate;
