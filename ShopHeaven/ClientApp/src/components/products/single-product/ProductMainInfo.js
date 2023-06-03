import { React, useState, useEffect } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../../theme";
import ImageCarousel from "./image-carousel/ImageCarousel";
import ProductDescription from "./ProductDescription";
import ProductActionButtons from "./ProductActionButtons";

export default function ProductMainInfo(props) {
  const [product, setProduct] = useState(props.product);

  useEffect(()=> {
    setProduct(props.product)
  }, [props.product])

  const StyledPaper = styled(Paper)({
    padding: theme.spacing(3),
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
    marginBottom: theme.spacing(4),
    marginLeft: 0,
    lineHeight: 1.15,
    fontSize: 24
  });

  return (
    <MainWrapper>
        <StyledPaper>
          <ProductName>{product.name}</ProductName>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <Box>
                {
                  // first important part of the page
                  <ImageCarousel product={product} />
                }
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={5} sx={{ position: "relative" }}>
              {
                // second important part of the page
                <ProductDescription product={product}/>
              }
            </Grid>
            <Grid item xs={12} md={12} lg={3}>
              {
                // third important part of the page
                <ProductActionButtons product={product} />
              }
            </Grid>
          </Grid>
        </StyledPaper>
    </MainWrapper>
  );
}
