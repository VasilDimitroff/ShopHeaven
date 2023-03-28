import { React } from "react";
import { Box, Grid, Rating, Typography, Stack } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link, useParams } from "react-router-dom";
import { Info } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";
import Sidebar from "./Sidebar";
import ImageCarousel from "./ImageCarousel";

export default function ProductInfoWrapper(props) {
  const ContentWrapper = styled(Box)({
    display: "flex",
  });

  const MainWrapper = styled(Box)({
    width: "80%",
    margin: "auto",
    marginTop: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      width: "95%",
    },
  });

  const ProductName = styled(Typography)({
    marginBottom: theme.spacing(2)
  })

  const InfoWrapper = styled(Stack)({
    display:"flex",
    justifyContent: "center"
  })

  return (
    <MainWrapper>
      <ProductName variant="h4">{props.product.name}</ProductName>
      <ContentWrapper>   
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={5} sx={{ border: "1px solid yellow" }}>
            <Box><ImageCarousel images={props.product.images}/></Box>
          </Grid>
          <Grid container item xs={12} md={6} lg={7}>
            <Grid item xs={12} md={12} lg={6} sx={{ border: "1px solid blue" }}>
              <InfoWrapper spacing={1}>
                <Rating sx={{border: "1px solid black", display: "flex"}}name="half-rating" size="small" label="stars" defaultValue={props.product.rating} precision={0.5} />
                <Typography> stars</Typography>
              </InfoWrapper>
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
    </MainWrapper>
  );
}
