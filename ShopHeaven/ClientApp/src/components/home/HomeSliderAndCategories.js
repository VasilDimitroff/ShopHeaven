import Reactnn from "react";
import { Box, Grid } from "@mui/material";
import HomeCarousel from "./HomeCarousel";
import CategoriesHomeList from "./CategoriesHomeList";
import { theme } from "../../theme";

export default function HomeSliderAndCategories(props) {
  return (
    <Box sx={{ paddingTop: theme.spacing(11),}}>
      <Grid
        container
        sx={{
          width: "80%",
          [theme.breakpoints.down("md")]: {
            width: "95%",
          },
          margin: "auto",
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
            <CategoriesHomeList categories={props.categories} />
        </Grid>
        <Grid item xs={12} md={7} lg={7} xl={9} sx={{paddingTop: theme.spacing(1)}}>       
            <HomeCarousel items={props.items}/>     
        </Grid>
      </Grid>
    </Box>
  );
}
