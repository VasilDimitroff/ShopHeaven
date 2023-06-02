import { Box, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../../theme";
import ProductCarouselCard from "./ProductCarouselCard";

function ProductCarouselSlide(props) {

  const SlideWrapper = styled(Box)({
    marginTop: theme.spacing(2.5),
    display: "flex",
    gap: 1,
  });

  return (
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
          {props.products
            ?.slice(0, props.cardsPerSlide)
            ?.map((product, index) => (
              <Grid
                item
                key={product.id}
                xs={1}
                sm={2}
                md={2}
                lg={2}
                xl={2}
              >
                {
                  <ProductCarouselCard
                    product={product}
                    image={product?.image}
                  />
                }
              </Grid>
            ))}
        </Grid>
      </SlideWrapper>
    </Box>
  );
}

export default ProductCarouselSlide;
