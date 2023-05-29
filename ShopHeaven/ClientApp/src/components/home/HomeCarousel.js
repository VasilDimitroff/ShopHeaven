import  { React, Fragment, useEffect, useRef, useState } from "react";
import Carousel from "react-material-ui-carousel";
import CarouselItem from "./CarouselItem";
import { ApiEndpoints } from "../../api/endpoints";
import { productsCountInHomeSlider, labelCriteriaForProductsInHomeSlider } from "../../constants";
import axios from "../../api/axios";
import { theme } from "../../theme";
import { Box } from "@mui/system";

function HomeCarousel() {
  const [products, setProducts] = useState([]);
  const effectRun = useRef(false);

  useEffect(() => {
    const controller = new AbortController();

    const getCategories = async () => {
      try {
        const requestBody = {
          labels: labelCriteriaForProductsInHomeSlider,
          productsCount: productsCountInHomeSlider
        }

        const response = await axios.post(
          ApiEndpoints.products.getByLabels,
          requestBody,
          {
            signal: controller.signal,
          }
        );
        console.log(response?.data);

        setProducts(response?.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (effectRun.current) {
      getCategories();
    }

    return () => {
      effectRun.current = true; // update the value of effectRun to true
      controller.abort();
    };
  }, []);

  return (
    <Box>
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
        {products?.map((product, index) => (
          <Fragment key={index}>
            <CarouselItem product={product} />
          </Fragment>
        ))}
      </Carousel>
    </Box>
  );
}

export default HomeCarousel;
