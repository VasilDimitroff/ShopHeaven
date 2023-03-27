import React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";
import ProductsCarousel from './ProductsCarousel';

export default function ProductsCarouselLine(props) {

    const CarouselWrapper = styled(Box)({
        margin: "auto", width: "100%", display: "block", width: "80%",
        display: "block",
        margin: "auto",
        
        paddingTop: theme.spacing(2),
        [theme.breakpoints.down("md")]: {
          width: "95%",
          paddingTop: theme.spacing(3),
        },
    })
    return (
      <Box>
        <CarouselWrapper>
          <ProductsCarousel products={props.products} headingName={props.headingName}/>
        </CarouselWrapper>
      </Box>
    );
  }
  