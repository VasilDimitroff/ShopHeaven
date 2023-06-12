import React from "react";
import { Box, Grid } from "@mui/material";
import HomeCarousel from "./HomeCarousel";
import MainMenu from "./MainMenu";
import { theme } from "../../theme";

export default function HomeCarouselAndMainMenu() {
  return (
    <Box
      sx={{
        paddingTop: theme.spacing(11),
        width: "80%",
        [theme.breakpoints.down("md")]: {
          width: "95%",
        },
        margin: "auto",
      }}
    >
      <Grid
        container
        spacing={2}
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
          <MainMenu />
        </Grid>
        <Grid
          item
          xs={12}
          md={7}
          lg={7}
          xl={9}
        >
          <HomeCarousel />
        </Grid>
      </Grid>
    </Box>
  );
}
