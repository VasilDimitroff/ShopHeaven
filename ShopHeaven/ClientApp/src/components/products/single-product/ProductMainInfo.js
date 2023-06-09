import { React, useState, useEffect } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../../theme";
import { MainWrapper } from "../../../styles/styles";
import ImageCarousel from "./image-carousel/ImageCarousel";
import ProductDescription from "./ProductDescription";
import ProductActionButtons from "./ProductActionButtons";

export default function ProductMainInfo(props) {
  const [product, setProduct] = useState(props.product);
  const [totalReviewsCount, setTotalReviewsCount] = useState(
    props.totalReviewsCount
  );

  useEffect(() => {
    setProduct(props.product);
  }, [props.product]);

  const StyledPaper = styled(Paper)({
    padding: theme.spacing(3),
  });

  const ProductName = styled(Typography)({
    marginBottom: theme.spacing(4),
    marginLeft: 0,
    lineHeight: 1.15,
    fontSize: 24,
  });

  return (
    <MainWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={9}>
          <StyledPaper>
            <ProductName>{product.name}</ProductName>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={5}>
                <Box>
                  {
                    // first important part of the page
                    <ImageCarousel product={product} />
                  }
                </Box>
              </Grid>
              <Grid item xs={12} md={6} lg={7}>
                {
                  // second important part of the page
                  <ProductDescription product={product} />
                }
              </Grid>
            </Grid>
          </StyledPaper>
         
        </Grid>
        <Grid item xs={12} md={12} lg={3}>
            {
              // third important part of the page
              <ProductActionButtons product={product} />
            }
          </Grid>
      </Grid>
    </MainWrapper>
  );
}
