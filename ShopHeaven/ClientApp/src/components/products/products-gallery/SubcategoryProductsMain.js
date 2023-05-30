import { React, useState, Fragment } from "react";
import { Box, Paper, Typography, Grid, Slide, } from "@mui/material";
import { styled } from "@mui/material/styles";
import ProductCarouselCard from "../ProductCarouselCard";
import { theme } from "../../../theme";

export default function SubcategoryProductsMain(props) {

  const [products, setProducts] = useState(props.products);
  
  const ContentWrapper = styled(Box)({
    width: "100%",
    margin: "auto",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  });

  return (
    <Fragment>
        <ContentWrapper>
        <Grid
          container
          sx={{
            display: "flex",
            alignItems: "flex-start",
            flexGrow: 1,
          }}
        >
          {products?.map(
            (product, index) => (
              <Grid
                item 
                xs={12}
                sm={6}
                md={6}
                lg={4}
                xl={3}
                sx={{ display: "block", marginBottom: theme.spacing(2) }}
                key={index}
              >              
                <ProductCarouselCard product={product} />             
              </Grid>
            )
          )}
        </Grid>
        </ContentWrapper>
    </Fragment>
  );
}
