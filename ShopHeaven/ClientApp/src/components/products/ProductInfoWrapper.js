import { React } from "react";
import { Box, Grid, Rating, Typography, Chip } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link, useParams } from "react-router-dom";
import { Description, Info } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";
import Sidebar from "./Sidebar";
import ImageCarousel from "./ImageCarousel";
import { palette } from "@mui/system";
import ProductDescription from "./ProductDescription";

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
    marginBottom: theme.spacing(2),
  });

  return (
    <MainWrapper>
      <ProductName variant="h4">{props.product.name}</ProductName>
      <ContentWrapper>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={4}>
            <Box>
              {
              // first important part of the page
              } 
              <ImageCarousel images={props.product.images} />
            </Box>
          </Grid>
          <Grid container item xs={12} md={6} lg={8}>
            <Grid item xs={12} md={12} lg={6} sx={{ position: "relative", }}>
              {
              // second important part of the page
              } 
                <ProductDescription product={props.product}/>
            </Grid>
            <Grid
              item
              container
              xs={12}
              md={12}
              lg={6}
            >
               {
              // third important part of the page
              } 
              buttons
            </Grid>
          </Grid>
        </Grid>
      </ContentWrapper>
    </MainWrapper>
  );
}
