import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import HomeCarousel from "../home-carousel/HomeCarousel";
import CategoriesHomeList from "./CategoriesHomeList";
import { Category } from "@mui/icons-material";
import { theme } from "../../theme";

export default function HomeSliderAndCategories() {
  return (
    <div>
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
            marginTop: theme.spacing(8),
            display: "flex",
            justifyContent: "space-between",
            border: "1px solid green",
          }}
        >
          <Grid
            xs={12}
            md={4}
            lg={3}
            sx={{
              border: "1px solid blue",
              height: "100%",

              [theme.breakpoints.down("md")]: {
                display: "none",
              },
            }}
          >
            <CategoriesHomeList />
          </Grid>
          <Grid xs={12} md={8} lg={9} sx={{ height: "100%" }}>
            <Box
              sx={{
                display: "block",
                marginTop: theme.spacing(1),
                [theme.breakpoints.up("md")]: {
                  marginLeft: theme.spacing(2.5),
                },
                width: "100%",
                border: "1px solid red",
              }}
            >
              <HomeCarousel />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
