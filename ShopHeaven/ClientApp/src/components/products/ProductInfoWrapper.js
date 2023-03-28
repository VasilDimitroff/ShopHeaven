import { React } from "react";
import { Box, Grid, Container } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link, useParams } from "react-router-dom";
import { Info } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";
import Sidebar from "./Sidebar";
import ImageCarousel from "./ImageCarousel";

export default function ProductInfoWrapper(props) {
  const ContentWrapper = styled(Box)({
    width: "80%",
    margin: "auto",
    display: "flex",
    marginTop: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      width: "95%",
    },
  });

  return (
    <div>
      <ContentWrapper>
        <Grid container sx={{ border: "5px solid green" }}>
          <Grid item xs={12} md={6} lg={4} sx={{ border: "3px solid yellow" }}>
            <Box><ImageCarousel images={props.product.images}/></Box>
          </Grid>
          <Grid container item xs={12} md={6} lg={8}>
            <Grid item xs={12} md={12} lg={6} sx={{ border: "3px solid blue" }}>
              <Box>info</Box>
            </Grid>
            <Grid
              item
              container
              xs={12}
              md={12}
              lg={6}
              sx={{ border: "3px solid blue" }}
            >
              <Box>buttons area</Box>
            </Grid>
          </Grid>
        </Grid>
      </ContentWrapper>
    </div>
  );
}
