import React, { SyntheticEvent, useRef, useState, useEffect } from "react";
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
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import ImageUpload from "../../components/ImageUpload";

const ProductsEdit = () => {
  const [redirect, setRedirect] = useState(false);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [navigate, setNavigate] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const { id } = useParams();

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
    const getProduct = async () => {
      try {
        const { data } = await axios.get(`products/${id}`);
        setImage(data.image);
        setTitle(data.title);
        setDescription(data.description);
        setPrice(data.price);
      } catch (e) {
        console.log(e);
      }
    };

    getProduct();
  }, [id]);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.put(`products/${id}`, {
      image,
      title,
      description,
      price,
    });
    setNavigate(true);
  };

  const updateImage = (url: string) => {
    if (ref.current) {
      ref.current.value = url;
    }
    setImage(url);
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
      <Header name="Edit Product" />
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
        <Typography variant="h6">Edit Product</Typography>
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
                  ref={ref}
                  onChange={(e) => setImage(e.target.value)}
                />
                <ImageUpload uploaded={updateImage} />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                value={title}
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
                value={description}
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
                value={price}
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

export default ProductsEdit;
