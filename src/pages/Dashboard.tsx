import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { CssBaseline, Typography } from "@mui/material";
import Header from "../components/Header";
import SideNav from "../components/SideNav";
import axios from "axios";
import { Navigate } from "react-router-dom";
import * as c3 from "c3";

export default function Dashboard() {
  const [redirect, setRedirect] = useState(false);

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

  // useEffect(() => {
  //   const getInfo = async () => {
  //     const {data} = await axios.get("chart")
  //   }
  //   getInfo()
  // })

  c3.generate({
    bindto: "#chart",
    data: {
      x: "x",
      columns: [["x"], ["Sales"]],
      types: {
        Sales: "bar",
      },
    },
    axis: {
      x: {
        type: "timeseries",
        tick: {
          format: "%Y-%m-%d",
        },
      },
    },
  });

  if (redirect) {
    return <Navigate to="/login" />;
  }
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header name="Dashboard" />
      <SideNav />
      <Typography variant="h5">Daily Sales</Typography>
      <Box
        component="main"
        id="chart"
        sx={{ pt: 15, maxWidth: 1200, maxHeight: 1200 }}
      />
    </Box>
  );
}
