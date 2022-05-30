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
import { Role } from "../../models/role";
import TablePaginationActions from "../../components/TablePagination";

const Roles = () => {
  const [redirect, setRedirect] = useState(false);
  const [roles, setRoles] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - roles.length) : 0;

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
    const getRoles = async () => {
      try {
        const { data } = await axios.get("roles");

        setRoles(data);
      } catch (error) {
        console.log(error);
      }
    };

    getRoles();
  }, []);

  const del = (id: number) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      axios.delete(`roles/${id}`);
    }
    setRoles(roles.filter((r: Role) => r.id !== id));
  };

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header name="Roles" />
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
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? roles.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : roles
              ).map((role: Role) => (
                <TableRow
                  key={role.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {role.id}
                  </TableCell>
                  <TableCell align="right">{role.name}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => del(role.id)}
                      sx={{ mr: 1 }}
                    >
                      Delete
                    </Button>
                    <Link
                      to={`/roles/${role.id}/edit`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button variant="outlined" size="small">
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
                  colSpan={3}
                  count={roles.length}
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

export default Roles;
