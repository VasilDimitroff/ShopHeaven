import { React, useState } from "react";
import {
  Box,
  Chip,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton,
  Snackbar,
  Slide,
  InputBase,
  Alert,
} from "@mui/material";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";

export default function ProductActionButtons(props) {
    const [showError, setShowError] = useState(false);

 function enterQuantity(){
    const inputElement = document.getElementById('bootstrap-input');
    const errorElement = document.getElementById('error');

    if(inputElement.value < 1) {
        inputElement.value = 1;
    }

    if(inputElement.value > props.product.quantity) {
        setShowError(true);
        errorElement.style.display = "flex";
    } else {
        errorElement.style.display = "none";
    }
 }

 function handleSetShowError() {
    setShowError(false);
 }

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
    fontSize: 20,
  });

  const PriceHolder = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: 10,
  });

  const StyledChip = styled(Chip)({
    marginTop: theme.spacing(-1.4),
    color: theme.palette.white.main,
    fontWeight: 500,
    backgroundColor: theme.palette.secondary.main,
    borderRadius: theme.shape.borderRadius,
  });

  const MainPriceChip = styled(Chip)({
    marginTop: theme.spacing(-1),
    color: theme.palette.error.main,
    fontSize: 28,
    paddingTop: theme.spacing(2.8),
    paddingBottom: theme.spacing(2.8),
    paddingLeft: theme.spacing(0.3),
    paddingRight: theme.spacing(0.3),
    fontWeight: 600,
    backgroundColor: "#fff8f7",
    borderRadius: theme.shape.borderRadius,
  });

  const QuantityHolder = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: 17,
  });

  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    width: 70,

    'label + &': {
      marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        color: "black",
      textAlign: "center",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
      border: '1px solid #ced4da',
      fontSize: 17,
      '&:focus': {
        borderColor: theme.palette.primary.main,
        boxShadow: theme.palette.dropdown.boxShadow.main,
      },
    },
  }));

  function renderPrice() {
    const price =
      props.product.price -
      props.product.price * (props.product.discount / 100);
    let finalPrice;
    let priceWithNoDiscountToRender;

    finalPrice = `${props.product.currency} ${price.toFixed(2)}`;
    priceWithNoDiscountToRender = `${
      props.product.currency
    } ${props.product.price.toFixed(2)}`;
    let renderResult;

    if (props.product.discount > 0) {
      renderResult = (
        <Box>
          <Discount gutterBottom variant="h5">
            {priceWithNoDiscountToRender}
          </Discount>
          <PriceHolder>
            <MainPrice gutterBottom>
              <MainPriceChip
                size="medium"
                variant="filled"
                label={finalPrice}
              ></MainPriceChip>
            </MainPrice>
            <StyledChip
              size="small"
              variant="filled"
              label={`Save ${props.product.discount}%`}
            ></StyledChip>

          </PriceHolder>
        </Box>
      );
    } else {
      renderResult = (
        <PriceHolder>
          <MainPrice gutterBottom>
            <MainPriceChip
              size="medium"
              variant="filled"
              label={finalPrice}
            ></MainPriceChip>
          </MainPrice>
        </PriceHolder>
      );
    }

    return renderResult;
  }

  return (
    <Box>
      <Card>
        <CardContent>
          {renderPrice()}
         <Typography mb={theme.spacing(1)} mt={theme.spacing(1)}>Quantity:</Typography>
          <QuantityHolder>
            <BootstrapInput onChange={ ()=> enterQuantity()} defaultValue={1} id="bootstrap-input" />
            {`(${props.product.quantity} left)`}
          </QuantityHolder> 
          <Snackbar
          ContentProps={{
            style: {
               backgroundColor: theme.palette.error.main,
               textAlign: "center",
               fontWeight: 500,
               fontSize: 18
            },
          }}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          onClose={handleSetShowError}
          open={showError}
          severity="error"
          TransitionComponent={Slide}
          message={`In stock are ${props.product.quantity} items only! Please enter valid number`}
      ></Snackbar>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Box>
  );
}
