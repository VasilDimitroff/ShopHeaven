import React from "react";
import Carousel from "react-material-ui-carousel";
import { Box } from "@mui/material";
import CarouselItem from "./CarouselItem";
import { theme } from "./../../theme";

function HomeCarousel(props) {

  return (
    <Box>
      <Carousel
        animation="slide"
        swipe={false}
        navButtonsAlwaysVisible={true}
        indicators={false}
        sx={{
          borderTopRightRadius: theme.shape.borderRadius,
          borderBottomRightRadius: theme.shape.borderRadius,
          [theme.breakpoints.down("md")]: {
            borderTopLeftRadius: theme.shape.borderRadius,
            borderBottomLeftRadius: theme.shape.borderRadius,
          },
        }}
      >
        {props.items.map((item) => (
          <CarouselItem item={item} />
        ))}
      </Carousel>
    </Box>
  );
}

export default HomeCarousel;
