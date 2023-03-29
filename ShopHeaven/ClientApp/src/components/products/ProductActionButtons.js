import { React, useState } from "react";
import {
  Box,
  Chip,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Snackbar,
  Slide,
  InputBase,
  Stack,
} from "@mui/material";
import { Favorite, FavoriteBorder, AddShoppingCart, RemoveShoppingCart } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";


export default function ProductActionButtons(props) {

  const [showError, setShowError] = useState(false);
  const [addToCart, setAddToCart] = useState(false);
  const [addToCartContent, setAddToCartContent] = useState("Add to cart");
  const [addToFavorites, setAddToFavorites] = useState(false);
  const [addToFavoritesContent, setAddToFavoritesContent] = useState("Add to favorites");


  function enterQuantity() {
    const inputElement = document.getElementById("bootstrap-input");

    if (inputElement.value < 1) {
      inputElement.value = 1;
    }

    if (inputElement.value > props.product.quantity) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  }

  function handleAddToCart(value){
    setAddToCart(value);

    if(value === false) {
        setAddToCartContent("Add to cart");
    } else {
        setAddToCartContent("Remove from cart");
    }
   
    console.log("Add to cart is " + addToCart);
  }

  function handleAddToFavorites(value){
    setAddToFavorites(value);

    if(value === false) {
        setAddToFavoritesContent("Add to favorites");
    } else {
        setAddToFavoritesContent("Remove from favorites");
    }

    console.log("Add to favorites is " + addToFavorites);
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

  const ActionButtons = styled(Stack)({
    marginTop: theme.spacing(3)
  })
  const ActionButton = styled(Button)({
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
  });

  const InStockInfo = styled(Typography)({
    fontWeight: 500,
    fontSize: 18,
    color: props.product.isAvailable
      ? theme.palette.success.main
      : theme.palette.error.main,
  });

  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    width: 70,
    "label + &": {
      marginTop: theme.spacing(3),
    },
    "& .MuiInputBase-input": {
      color: "black",
      textAlign: "center",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
      border: "1px solid #ced4da",
      fontSize: 17,
      "&:focus": {
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
        {}
      <Card>
        <CardContent>
          {renderPrice()}
          <InStockInfo>{`${
                  props.product.isAvailable ? "In Stock" : "Out of Stock"
                }`}</InStockInfo>
          <Typography mb={theme.spacing(1)} mt={theme.spacing(1)}>
            Quantity:
          </Typography>
          <QuantityHolder>
            <BootstrapInput
              onChange={() => enterQuantity()}
              defaultValue={1}
              id="bootstrap-input"
            />
            {`(${props.product.quantity} left)`}
          </QuantityHolder>
          <Snackbar
            ContentProps={{
              style: {
                backgroundColor: theme.palette.error.main,
                textAlign: "center",
                fontWeight: 500,
                fontSize: 18,
              },
            }}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            onClose={enterQuantity}
            open={showError}
            severity="error"
            TransitionComponent={Slide}
            message={`In stock are ${props.product.quantity} items only! Please enter valid number`}
          ></Snackbar>
          <ActionButtons spacing={1.5}>
            <ActionButton onClick={()=> handleAddToCart(!addToCart)} variant="contained" size="large" startIcon={addToCart ? <RemoveShoppingCart /> : <AddShoppingCart/>}>
             {addToCartContent}
            </ActionButton>
            <ActionButton onClick={()=> handleAddToFavorites(!addToFavorites)} variant="outlined" size="large" startIcon={addToFavorites ? <Favorite /> : <FavoriteBorder/>}>
            {addToFavoritesContent}
            </ActionButton>
          </ActionButtons>
        </CardContent>
      </Card>
    </Box>
  );
}
