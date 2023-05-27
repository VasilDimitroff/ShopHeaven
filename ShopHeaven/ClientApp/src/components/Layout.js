import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="App">
      <Box sx={{ minHeight: "70vh", position: "relative" }}>
        <Header />
        <Outlet />
      </Box>
      <Box sx={{ position: "static", bottom: 0, width: "100%" }}>
        <Footer />
      </Box>
    </div>
  );
}
