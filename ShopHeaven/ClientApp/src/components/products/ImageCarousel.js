import { React, useState } from "react";
import Carousel from "react-material-ui-carousel";
import {
  Box,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from "@mui/material";
import ImageCarouselSlide from "./ImageCarouselSlide";
import { theme } from "../../theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled } from "@mui/material/styles";
import { GetBigImageIndex } from "./ImageCarouselSlide";

function ImageCarousel(props) {
 
  const [bigImageIndex, setBigImageIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);

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
    let slidesCount = Math.ceil(props.images.length / cardsCountPerSlide);

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

  const setIndex = (imageIndex, slideIndex) => {
    setBigImageIndex(imageIndex);
    setSlideIndex(slideIndex);
  };

  let finalIndex = bigImageIndex + (slideIndex * SetCardsNumber());

  const StyledHeading = styled(Typography)({
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
    },
  });

  const ProductCardMedia = styled(CardMedia)({
    height: 355,
    position: "relative",
  });

  const StyledCard = styled(Card)({
    marginLeft: theme.spacing(0.7),
    marginRight: theme.spacing(0.7),
  });

  return (
    <Box>
      <Box>
        <StyledCard>
          <CardActionArea>
            <ProductCardMedia image={props.images[finalIndex]} />
          </CardActionArea>
        </StyledCard>
      </Box>
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
          },
        }}
      >
        {ReturnSlidesInfo().map((rowInfo, index) => {  
          return (
            <ImageCarouselSlide
              slideIndex={index}
              setIndex={setIndex}
              key={index}
              images={props.images.slice(
                rowInfo.startIndex,
                rowInfo.startIndex + rowInfo.cardsPerSlide
              )}
            />
          );
        })}
      </Carousel>
    </Box>
  );
}

export default ImageCarousel;
