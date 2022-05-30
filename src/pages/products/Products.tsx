import React from "react";
import Header from "../../components/Header";
import SideNav from "../../components/SideNav";
import { CssBaseline, Box, Button } from "@mui/material";
import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Copyright from "../../components/Copyright";

import axios from "axios";
import { Navigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import { Link } from "react-router-dom";
import TablePaginationActions from "../../components/TablePagination";
import { Product } from "../../models/product";

const Products = () => {
  const [redirect, setRedirect] = useState(false);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
    const getProducts = async () => {
      try {
        const { data } = await axios.get("products");
        setProducts(data.data);
      } catch (e) {
        console.log(e);
      }
    };

    getProducts();
  }, []);

  const del = (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      axios.delete(`products/${id}`);
    }
    setProducts(products.filter((p: Product) => p.id !== id));
  };

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header name="Products" />
      <SideNav />
      <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
        <Button variant="outlined" size="small" sx={{ mb: 1 }}>
          <Link
            to="create"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Add
          </Link>
        </Button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="center">Image</TableCell>
                <TableCell align="center">Title</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? products.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : products
              ).map((product: Product) => (
                <TableRow
                  key={product.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ verticalAlign: "top" }}
                  >
                    {product.id}
                  </TableCell>
                  <TableCell align="right">
                    <img alt={product.title} src={product.image} width="70" />
                  </TableCell>
                  <TableCell align="center">{product.title}</TableCell>
                  <TableCell align="left">{product.description}</TableCell>
                  <TableCell align="right">{product.price}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => del(product.id)}
                      sx={{ width: 30 }}
                    >
                      Delete
                    </Button>
                    <Link
                      to={`/products/${product.id}/edit`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ width: 30 }}
                      >
                        Edit
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={5}
                  count={products.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </Box>
  );
};

export default Products;
