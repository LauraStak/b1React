import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Header from "../components/Header";
import SideNav from "../components/SideNav";

const Profile = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirm, setPasswordConfirm] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get("user");

        setFirstName(data.first_name);
        setLastName(data.last_name);
        setEmail(data.email);
      } catch (e) {
        console.log(e);
      }
    };

    getData();
  }, []);

  const infoSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await axios.put("users/info", {
      first_name,
      last_name,
      email,
    });
  };

  const passwordSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await axios.put("users/info", {
      password,
      password_confirm,
    });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header name="Profile" />
      <SideNav />
      <Box
        sx={{
          marginTop: 15,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          ml: 10,
        }}
      >
        <Typography component="h1" variant="h4">
          Account Information
        </Typography>
        <Box component="form" onSubmit={infoSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="First Name"
            name="first_name"
            value={first_name}
            autoFocus
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Last Name"
            value={last_name}
            name="last_name"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            value={email}
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Save
          </Button>

          <Box
            sx={{
              mt: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h4">
              Account Information
            </Typography>
            <Box
              component="form"
              onSubmit={passwordSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="passwordConfirm"
                label="Password Confirm"
                type="password"
                onChange={(e) => {
                  setPasswordConfirm(e.target.value);
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
