import {
  Paper,
  Button,
  Box,
  Container,
  Typography,
  Slide,
  Grid,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";
import ProductCarouselCard from "./ProductCarouselCard";

function ProductCarouselSlide(props, cardsPerSlide, slideHeading) {
  const SliderImage = styled("img")({
    width: "100%",
    objectFit: "cover",
    height: 765,

    [theme.breakpoints.down("md")]: {
      height: 400,
    },
  });

  const SliderButton = styled(Button)({
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(2),
  });

  const StyledProductCarouselCard = styled(ProductCarouselCard)({});

  const SlideWrapper = styled(Box)({
    marginTop: theme.spacing(4.4),
    display: "flex",
    gap: 1,
  });

  return (
    <Box>
      <Typography variant="h4">{props.slideHeading}</Typography>
      <SlideWrapper>
        <Grid
          container
          columns={{ xs: 1, sm: 4, md: 6, lg: 10, xl: 12 }}
          sx={{
            display: "flex",
            alignItems: "flex-start",
            flexGrow: 1,
          }}
        >
          {Array.from(props.items.slice(0, props.cardsPerSlide)).map(
            (product) => (
              <Grid
                xs={1}
                sm={2}
                md={2}
                lg={2}
                xl={2}
                sx={{ display: "block" }}
              >
                <StyledProductCarouselCard product={product} />
              </Grid>
            )
          )}
        </Grid>
      </SlideWrapper>
    </Box>
  );
}
//<div sx={{position: "absolute", zIndex:"100", top: "0px", backgroundColor: "black", height: "300px", marginTop: "400px"}}>{props.item.description}</div>
export default ProductCarouselSlide;
