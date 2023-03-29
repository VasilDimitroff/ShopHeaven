import React from "react";
import {
  Box,
  Chip,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { LinkedIn, GitHub } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";

export default function ProductActionButtons(props) {
  const MainPrice = styled(Typography)({
    color: theme.palette.error.main,
    fontWeight: 500,
    letterSpacing: -1,
    fontSize: 30,
  });

  const Discount = styled(Typography)({
    color: "gray",
    fontWeight: 400,
    letterSpacing: -1,
    textDecoration: "line-through",
    fontSize: 22,
  });

  const PriceHolder = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: 12
  });

  const StyledChip = styled(Chip)({
    marginTop: theme.spacing(-1),
    color: theme.palette.white.main,
    fontWeight: 500,
    backgroundColor: theme.palette.secondary.main,
    borderRadius: theme.shape.borderRadius,
  })

  
  const MainPriceChip = styled(Chip)({
    marginTop: theme.spacing(-1),
    color: theme.palette.error.main,
    fontSize: 30,
    paddingTop: theme.spacing(3.5),
    paddingBottom: theme.spacing(3.5),
    paddingLeft: theme.spacing(0.3),
    paddingRight: theme.spacing(0.3),
    fontWeight: 600,
    backgroundColor: "#fff8f7",
    borderRadius: theme.shape.borderRadius,
  })

  function renderPrice() {
    const price =
      props.product.price -
      props.product.price * (props.product.discount / 100);
    let finalPrice;
    let priceWithNoDiscountToRender;

    if (props.product.currency === "lv") {
      finalPrice = `${price.toFixed(2)}${props.product.currency}`;
      priceWithNoDiscountToRender = `${props.product.price(2)} ${
        props.product.currency
      }`;
    } else {
      finalPrice = `${props.product.currency}${price.toFixed(2)}`;
      priceWithNoDiscountToRender = `${
        props.product.currency
      }${props.product.price.toFixed(2)}`;
    }

    let renderResult;

    if (props.product.discount > 0) {
      renderResult = (
        <Box>
          <PriceHolder>
            <MainPrice gutterBottom>
            <MainPriceChip component="div" size="medium" variant="filled" label={finalPrice}></MainPriceChip>       
            </MainPrice>
            <Discount gutterBottom variant="h5">
              {priceWithNoDiscountToRender}
            </Discount>
            <StyledChip size="small" variant="filled" label={`Save ${props.product.discount}%`}></StyledChip>
          </PriceHolder>
        </Box>
      );
    } else {
      renderResult = (
        <PriceHolder>
          <MainPrice gutterBottom>
          <MainPriceChip component="div" size="medium" variant="filled" label={finalPrice}></MainPriceChip>
          </MainPrice>
        </PriceHolder>
      );
    }

    return renderResult;
  }

  return (
    <Box>
      <Card sx={{}}>
        <CardContent>
          {renderPrice()}
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Box>
  );
}
