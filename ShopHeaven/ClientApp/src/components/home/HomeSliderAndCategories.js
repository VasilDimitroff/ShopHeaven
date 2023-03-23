import React, { useState } from "react";
import { Box, Grid, Slide } from "@mui/material";
import { styled } from "@mui/material/styles";
import HomeCarousel from "../home-carousel/HomeCarousel";
import CategoriesHomeList from "./CategoriesHomeList";
import { Category } from "@mui/icons-material";
import { theme } from "../../theme";

export default function HomeSliderAndCategories() {
  return (
    <Box sx={{ backgroundColor: theme.palette.appBackground.main }}>
      <Grid
        container
        spacing={2}
        sx={{
          width: "80%",
          [theme.breakpoints.down("md")]: {
            width: "95%",
          },
          margin: "auto",
          paddingTop: theme.spacing(8),
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Grid
          xs={12}
          md={4}
          lg={3}
          sx={{
            [theme.breakpoints.down("md")]: {
              display: "none",
            },
          }}
        >
          <Box sx={{ marginTop: theme.spacing(2) }}>
            <CategoriesHomeList />
          </Box>
        </Grid>
        <Grid xs={12} md={8} lg={9}>
          <Box
            sx={{
              display: "block",
              [theme.breakpoints.up("md")]: {
                /* marginLeft: theme.spacing(2.5), */
              },
              width: "100%",
              marginTop: theme.spacing(3),
            }}
          >
            <HomeCarousel />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
