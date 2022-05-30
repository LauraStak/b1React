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
import TablePaginationActions from "../../components/TablePagination";
import { Order } from "../../models/order";
import { OrderItem } from "../../models/order-item";

const Orders = () => {
  const [redirect, setRedirect] = useState(false);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState(0);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orders.length) : 0;

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
    const getOrders = async () => {
      try {
        const { data } = await axios.get("orders");
        setOrders(data.data);
      } catch (e) {
        console.log(e);
      }
    };

    getOrders();
  }, []);

  const hide = {
    maxHeight: 0,
    overflow: "hidden",
    transition: "1000ms ease-in",
  };

  const show = {
    maxHeight: "150",
    transition: "1000ms ease-out",
  };

  const select = (id: number) => {
    setSelected(selected !== id ? id : 0);
  };

  const handleExport = async () => {
    const { data } = await axios.post("export", {}, { responseType: "blob" });
    new Blob([data], { type: "texts/csv" });
    const url = window.URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = url;
    link.download = "orders.csv";
    link.click();
  };

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header name="Orders" />
      <SideNav />
      <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
        <Button
          variant="outlined"
          size="small"
          sx={{ mb: 1 }}
          onClick={handleExport}
        >
          Export
        </Button>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 750 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="left">#</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Total</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? orders.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : orders
              ).map((or: Order) => (
                <TableRow
                  key={or.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {or.id}
                  </TableCell>
                  <TableCell align="left">{or.name}</TableCell>
                  <TableCell align="left">{or.email}</TableCell>
                  <TableCell align="left">{or.total}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ width: 30 }}
                      onClick={() => select(or.id)}
                    >
                      View
                    </Button>
                  </TableCell>
                  <TableRow>
                    <Box style={selected === or.id ? show : hide}>
                      <TableCell colSpan={6}>
                        <Table size="small" aria-label="a dense table">
                          <TableHead>
                            <TableRow>
                              <TableCell align="left">#</TableCell>
                              <TableCell align="left">Product Title</TableCell>
                              <TableCell align="left">Quantity</TableCell>
                              <TableCell align="left">Price</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {or.order_items.map((oi: OrderItem) => {
                              return (
                                <TableRow
                                  key={oi.id}
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell align="left">{oi.id}</TableCell>
                                  <TableCell align="left">
                                    {oi.product_title}
                                  </TableCell>
                                  <TableCell align="left">
                                    {oi.quantity}
                                  </TableCell>
                                  <TableCell align="left">{oi.price}</TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </TableCell>
                    </Box>
                  </TableRow>
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
                  count={orders.length}
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

export default Orders;
