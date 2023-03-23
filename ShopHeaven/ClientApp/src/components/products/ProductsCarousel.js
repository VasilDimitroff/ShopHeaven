import { React } from "react";
import Carousel from "react-material-ui-carousel";
import { Box } from "@mui/material";
import ProductCarouselSlide from "./ProductCarouseSlide";
import { theme } from "../../theme";
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function ProductsCarousel(props) {

  function SetCardsNumber() {
    let cardsPerSlide;

    const isBiggerOrXs = useMediaQuery(theme.breakpoints.up("xs"));
    const isBiggerOrSm = useMediaQuery(theme.breakpoints.up("sm"));
    const isBiggerOrMd = useMediaQuery(theme.breakpoints.up("md"));
    const isBiggerOrLg = useMediaQuery(theme.breakpoints.up("lg"));
    const isBiggerOrXl = useMediaQuery(theme.breakpoints.up("xl"));

    if (isBiggerOrXs === true) {
      cardsPerSlide = 1;
    }
    if (isBiggerOrSm === true) {
      cardsPerSlide = 2;
    }
    if (isBiggerOrMd === true) {
      cardsPerSlide = 3;
    }
    if (isBiggerOrLg === true) {
      cardsPerSlide = 5;
    }
    if (isBiggerOrXl === true) {
      cardsPerSlide = 6;
    }

    return cardsPerSlide;
  }

  function ReturnSlidesInfo() {
    let cardsCountPerSlide = SetCardsNumber();
    let slidesCount = Math.ceil(props.products.length / cardsCountPerSlide);

    let slidesInfo = [];

    for (
      let i = 0;
      i < slidesCount * cardsCountPerSlide;
      i = i + cardsCountPerSlide
    ) {
      slidesInfo.push({
        startIndex: i,
        cardsPerSlide: cardsCountPerSlide,
      });
    }

    return slidesInfo;
  }

  return (
    <Box>
      <Carousel
        animation="slide"
        swipe={false}
        navButtonsAlwaysVisible={true}
        indicators={true}
      >
        {ReturnSlidesInfo().map((rowInfo) => {
          return (
            <ProductCarouselSlide
              products={props.products.slice(
                rowInfo.startIndex,
                rowInfo.startIndex + rowInfo.cardsPerSlide
              )}
              cardsPerSlide={rowInfo.cardsPerSlide}
              slideHeading={`Category ${rowInfo.startIndex}`}
            />
          );
        })}
      </Carousel>
    </Box>
  );
}

export default ProductsCarousel;
