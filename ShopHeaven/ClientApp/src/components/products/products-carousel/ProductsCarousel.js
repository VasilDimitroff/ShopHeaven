import { React, useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { Box, Typography } from "@mui/material";
import ProductCarouselSlide from "./ProductCarouselSlide";
import { theme } from "../../../theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled } from "@mui/material/styles";

function ProductsCarousel(props) {
  const [products, setProduct] = useState(props.products)

  useEffect(()=> {
    setProduct(props.products)
  }, [props.products])

  function SetCardsNumber() {
    let cardsPerSlide;

    const isBiggerOrXs = useMediaQuery(theme.breakpoints.up("xs"));
    const isBiggerOrSm = useMediaQuery(theme.breakpoints.up("sm"));
    const isBiggerOrMd = useMediaQuery(theme.breakpoints.up("md"));
    const isBiggerOrLg = useMediaQuery(theme.breakpoints.up("lg"));
    const isBiggerOrXl = useMediaQuery(theme.breakpoints.up("xl"));

    if (isBiggerOrXs === true) {
      cardsPerSlide = 2;
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
    let slidesCount = Math.ceil(products.length / cardsCountPerSlide);

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

  const CarouselWrapper = styled(Box)({
    margin: "auto",
    width: "100%",
    display: "block",
    width: "80%",
    display: "block",
    margin: "auto",
    paddingTop: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      width: "95%",
      paddingTop: theme.spacing(3),
    },
  });

  const StyledHeading = styled(Typography)({
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
    },
  });

  return (
    <Box>
      <CarouselWrapper>
        <StyledHeading variant="h4">{props.headingName}</StyledHeading>
        <Carousel
          animation="slide"
          swipe={false}
          navButtonsAlwaysVisible={true}
          indicators={true}
          interval={12000}
          cycleNavigation={false}
          indicatorIconButtonProps={{
            style: {
              marginTop: theme.spacing(3),
            },
          }}
          activeIndicatorIconButtonProps={{
            style: {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
            },
          }}
          navButtonsProps={{
            style: {
              opacity: "0.8",
              backgroundColor: theme.palette.primary.main,
              border: "2px solid black"
            },
          }}
        >
          {ReturnSlidesInfo().map((rowInfo) => {
            return (
              <ProductCarouselSlide
                key={rowInfo.startIndex}
                products={products?.slice(
                  rowInfo.startIndex,
                  rowInfo.startIndex + rowInfo.cardsPerSlide
                )}
              />
            );
          })}
        </Carousel>
      </CarouselWrapper>
    </Box>
  );
}

export default ProductsCarousel;
