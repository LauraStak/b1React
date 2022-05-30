import React, { SyntheticEvent } from "react";
import Header from "../../components/Header";
import SideNav from "../../components/SideNav";
import {
  CssBaseline,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Avatar,
} from "@mui/material";
import { useState, useEffect } from "react";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import axios from "axios";
import { Navigate } from "react-router-dom";
import ImageUpload from "../../components/ImageUpload";

const ProductsCreate = () => {
  const [redirect, setRedirect] = useState(false);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
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

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.post("products", {
      image,
      title,
      description,
      price,
    });
    setNavigate(true);
  };

  if (redirect) {
    return <Navigate to="/login" />;
  }

  if (navigate) {
    return <Navigate to="/products" />;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header name="Create Product" />
      <SideNav />
      <Box
        sx={{
          mt: 12,
          ml: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <PersonAddAltOutlinedIcon />
        </Avatar>
        <Typography variant="h6">Create Product</Typography>
        <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={submit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ display: "flex" }}>
                <TextField
                  required
                  fullWidth
                  id="image"
                  label="Image url"
                  name="image"
                  sx={{ width: 300 }}
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
                <ImageUpload uploaded={setImage} />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                sx={{ width: 300 }}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                sx={{ width: 300 }}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="price"
                label="Price"
                name="price"
                sx={{ width: 300 }}
                onChange={(e) => setPrice(e.target.value)}
              />
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

export default ProductsCreate;
