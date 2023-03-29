import React from "react";
import Carousel from "react-material-ui-carousel";
import { Box, Paper } from "@mui/material";
import CarouselItem from "./CarouselItem";
import { theme } from "../../theme";

function HomeCarousel(props) {

  return (
    <Paper>
      <Carousel
        animation="slide"
        swipe={false}
        navButtonsAlwaysVisible={true}
        indicators={true}
        interval={7000}
        indicatorIconButtonProps={{
          style: {
            marginTop: theme.spacing(-13),
            position: "relative",
            zIndex:1,
          },
        }}
        activeIndicatorIconButtonProps={{
          style: {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.main,
          }, 
        }}
        indicatorContainerProps={{
          style: {
            position: "relative",
          },
        }}
        navButtonsProps={{
          style: {
            opacity: "0.7",
            backgroundColor: theme.palette.secondary.main,
          },
        }}
        sx={{
          borderTopRightRadius: theme.shape.borderRadius,
          borderBottomRightRadius: theme.shape.borderRadius,
          [theme.breakpoints.down("md")]: {
            borderTopLeftRadius: theme.shape.borderRadius,
            borderBottomLeftRadius: theme.shape.borderRadius,
          },
        }}
      >
        {props.items.map((item, index) => (
          <CarouselItem item={item} key={index} />
        ))}
      </Carousel>
    </Paper>
  );
}

export default HomeCarousel;
