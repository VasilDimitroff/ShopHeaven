import { Box, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../../theme";
import ProductCarouselCard from "./ProductCarouselCard";
import { useEffect } from "react";

function ProductCarouselSlide(props) {

  useEffect(() => {
    console.log("2. IN CAROUSEL SLIDE IS ", props.products);
  }, [props.products]);

  const SlideWrapper = styled(Box)({
    marginTop: theme.spacing(2.5),
    display: "flex",
    gap: 1,
  });

  return (props.products ? (
    <Box>
      <SlideWrapper>
        <Grid
          container
          columns={{ xs: 2, sm: 4, md: 6, lg: 10, xl: 12 }}
          sx={{
            display: "flex",
            alignItems: "flex-start",
            flexGrow: 1,
          }}
        >
          {/*      {products?.slice(0, props.cardsPerSlide)?.map((product, index) => (  */}

          {props.products?.slice(0, props.cardsPerSlide)?.map((product, index) => (
              
                <Grid    
                  item
                  key={product.id}
                  xs={1}
                  sm={2}
                  md={2}
                  lg={2}
                  xl={2}
                  sx={{ display: "block" }}
                >
                 {  <ProductCarouselCard product={product} image={product?.image} />}
                </Grid>
              
          ))}
        </Grid>
      </SlideWrapper>
    </Box>
  ) : (
    ""
   ) );
}
//<div sx={{position: "absolute", zIndex:"100", top: "0px", backgroundColor: "black", height: "300px", marginTop: "400px"}}>{props.item.description}</div>
export default ProductCarouselSlide;
