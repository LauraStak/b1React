import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
// import BarChartIcon from "@mui/icons-material/BarChart";
// import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

export const mainListItems = (
  <React.Fragment>
    <NavLink
      to="/"
      style={({ isActive }) =>
        isActive
          ? {
              color: "primary",
              background: "#7600dc",
              textDecoration: "none",
            }
          : { color: "black", background: "#f0f0f0", textDecoration: "none" }
      }
    >
      <ListItemButton component={Link}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </NavLink>
    <NavLink
      to="/users"
      style={({ isActive }) =>
        isActive
          ? {
              color: "primary",
              background: "#7600dc",
              textDecoration: "none",
            }
          : { color: "black", background: "#f0f0f0", textDecoration: "none" }
      }
    >
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItemButton>
    </NavLink>
    <NavLink
      to="/roles"
      style={({ isActive }) =>
        isActive
          ? {
              color: "primary",
              background: "#7600dc",
              textDecoration: "none",
            }
          : { color: "black", background: "#f0f0f0", textDecoration: "none" }
      }
    >
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIndIcon />
        </ListItemIcon>
        <ListItemText primary="Roles" />
      </ListItemButton>
    </NavLink>
    <NavLink
      to="/products"
      style={({ isActive }) =>
        isActive
          ? {
              color: "primary",
              background: "#7600dc",
              textDecoration: "none",
            }
          : { color: "black", background: "#f0f0f0", textDecoration: "none" }
      }
    >
      <ListItemButton>
        <ListItemIcon>
          <InventoryIcon />
        </ListItemIcon>
        <ListItemText primary="Products" />
      </ListItemButton>
    </NavLink>
    <NavLink
      to="/orders"
      style={({ isActive }) =>
        isActive
          ? {
              color: "primary",
              background: "#7600dc",
              textDecoration: "none",
            }
          : { color: "black", background: "#f0f0f0", textDecoration: "none" }
      }
    >
      <ListItemButton>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Orders" />
      </ListItemButton>
    </NavLink>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);
