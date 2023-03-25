import React from "react";
import { Box, Grid } from "@mui/material";
import HomeCarousel from "./HomeCarousel";
import CategoriesHomeList from "./CategoriesHomeList";
import { theme } from "../../theme";

export default function HomeSliderAndCategories(props) {
  return (
    <Box sx={{ backgroundColor: theme.palette.appBackground.main }}>
      <Grid
        container
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
          item
          xs={12}
          md={5}
          lg={5}
          xl={3}
          sx={{
            [theme.breakpoints.down("md")]: {
              display: "none",
            },
          }}
        >
          <Box sx={{ marginTop: theme.spacing(2) }}>
            <CategoriesHomeList categories={props.categories} />
          </Box>
        </Grid>
        <Grid item xs={12} md={7} lg={7} xl={9}>
          <Box
            sx={{
              display: "block",
              [theme.breakpoints.up("md")]: {
                 marginLeft: theme.spacing(0),
              },
              width: "100%",
              marginTop: theme.spacing(3),
            }}
          >
            <HomeCarousel items={props.items}/>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
