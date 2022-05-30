import React, { SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import {
  Grid,
  CssBaseline,
  Typography,
  Avatar,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Header from "../../components/Header";
import SideNav from "../../components/SideNav";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { Permission } from "../../models/permission";

const RolesCreate = () => {
  const [redirect, setRedirect] = useState(false);
  const [permissions, setPermissions] = useState([]);
  const [selected, setSelected] = useState([] as number[]);
  const [name, setName] = useState("");
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
    const getPermissions = async () => {
      try {
        const { data } = await axios.get("permissions");

        setPermissions(data);
      } catch (e) {
        console.log(e);
      }
    };

    getPermissions();
  }, []);

  const check = (id: number) => {
    if (selected.some((s) => s === id)) {
      setSelected(selected.filter((s) => s !== id));
    }
    setSelected([...selected, id]);
  };

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.post("roles", {
      name,
      permissions: selected,
    });
    setNavigate(true);
  };

  if (redirect) {
    return <Navigate to="/login" />;
  }

  if (navigate) {
    return <Navigate to="/roles" />;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header name="Create Role" />
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
        <Typography variant="h6">Create Role</Typography>
        <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={submit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                sx={{ width: 300 }}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Permissions</Typography>
              <Box sx={{ display: "flex" }}>
                {permissions.map((p: Permission) => {
                  return (
                    <FormGroup key={p.id}>
                      <FormControlLabel
                        control={<Checkbox />}
                        label={p.name}
                        value={p.id}
                        onChange={() => check(p.id)}
                      />
                    </FormGroup>
                  );
                })}
              </Box>
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

export default RolesCreate;
