import { React, useState, useEffect } from "react";
import {
  Box,
  Chip,
  Typography,
  Card,
  CardContent,
  Button,
  Snackbar,
  Slide,
  InputBase,
  Stack,
  IconButton,
  Grid,
} from "@mui/material";
import {
  Favorite,
  FavoriteBorder,
  AddShoppingCart,
  RemoveShoppingCart,
  AddCircle,
  RemoveCircle,
  Close
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { theme } from "../../../theme";

export default function ProductActionButtons(props) {
  const [product, setProduct] = useState(props.product)

  const [showError, setShowError] = useState(false);
  const [addToCart, setAddToCart] = useState(false);
  const [addToCartContent, setAddToCartContent] = useState("Add to cart");
  const [addToFavorites, setAddToFavorites] = useState(false);
  const [addToFavoritesContent, setAddToFavoritesContent] =
    useState("Add to favorites");
  let [productsQuantity, setProductsQuantity] = useState(1);

  useEffect(() => {

  }, [productsQuantity]);

  function handleSetProductsQuantity(value) {
    value = parseInt(value);

    let result = productsQuantity + value;

    if (result < 1) {
      value = 0;
    }

    if (result > product.quantity) {
      handleShowError();
    } else {
      setProductsQuantity((prev) => (prev += value));
      handleCloseError();
    }
  }

  function handleShowError() {
    setShowError(true);
  }

  function handleCloseError() {
    setShowError(false);
  }

  function handleAddToCart(value) {
    setAddToCart(value);

    if (value === false) {
      setAddToCartContent("Add to cart");
    } else {
      setAddToCartContent("Remove from cart");
    }

    console.log("Add to cart is " + addToCart);
  }

  function handleAddToFavorites(value) {
    setAddToFavorites(value);

    if (value === false) {
      setAddToFavoritesContent("Add to favorites");
    } else {
      setAddToFavoritesContent("Remove from favorites");
    }

    console.log("Add to favorites is " + addToFavorites);
  }

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
    color: theme.palette.white.main,
    fontWeight: 500,
    backgroundColor: theme.palette.secondary.main,
    borderRadius: theme.shape.borderRadius,
  });

  const MainPriceChip = styled(Chip)({
    letterSpacing: -1,
    fontSize: 25,
    paddingTop: theme.spacing(2.8),
    paddingBottom: theme.spacing(2.8),
    fontWeight: 600,
    borderRadius: theme.shape.borderRadius,
  });

  const QuantityHolder = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: 17,
  });

  const ActionButtons = styled(Stack)({
    marginTop: theme.spacing(3),
  });
  const ActionButton = styled(Button)({
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
  });

  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    width: 40,
    "label + &": {
      marginTop: theme.spacing(3),
    },
    "& .MuiInputBase-input": {
      color: "black",
      textAlign: "center",
      borderRadius: "50%",
      backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
      border: "1px solid #ced4da",
      fontSize: 17,
      "&:focus": {
        borderColor: theme.palette.primary.main,
        boxShadow: theme.palette.dropdown.boxShadow.main,
      },
      "&:disabled": {},
    },
  }));
  function renderFavoriteIcon(){
    return addToFavorites ? <Favorite /> : <FavoriteBorder />
  }

  function renderCartIcon(){
    return addToCart ? <RemoveShoppingCart /> : <AddShoppingCart />
  }

  function renderPrice() {
    const price =
      product.price -
      product.price * (product.discount / 100);
    let finalPrice;
    let priceWithNoDiscountToRender;

    finalPrice = `${product.currency.code} ${price.toFixed(2)}`;
    priceWithNoDiscountToRender = `${
      product.currency.code
    } ${product.price.toFixed(2)}`;
    let renderResult;

    if (product.discount > 0) {
      renderResult = (
        <Box>
          <Discount gutterBottom variant="h5">
            {priceWithNoDiscountToRender}
          </Discount>
          <PriceHolder>
            <MainPriceChip
              size="medium"
              variant="outlined"
              color="secondary"
              label={finalPrice}
            ></MainPriceChip>
            <StyledChip
              size="small"
              variant="filled"
              label={`Save ${product.discount}%`}
            ></StyledChip>
          </PriceHolder>
        </Box>
      );
    } else {
      renderResult = (
        <PriceHolder>
          <MainPriceChip
            size="medium"
            variant="outlined"
            color="secondary"
            label={finalPrice}
          ></MainPriceChip>
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
          <Typography mb={theme.spacing(1)} mt={theme.spacing(1)}>
            Quantity:
          </Typography>
          <QuantityHolder>
            <IconButton onClick={() => handleSetProductsQuantity(-1)}>
              {" "}
              <RemoveCircle />
            </IconButton>
            <BootstrapInput
              defaultValue={productsQuantity}
              id="bootstrap-input"
              readOnly
              color="primary"
            />
            <IconButton onClick={() => handleSetProductsQuantity(1)}>
              <AddCircle />
            </IconButton>
            {`(${product.quantity} left)`}
          </QuantityHolder>
          <Snackbar onClick={() => handleCloseError()}
            ContentProps={{
              style: {
                backgroundColor: theme.palette.error.main,
                textAlign: "center",
                fontWeight: 500,
                fontSize: 18,
                cursor: "pointer"
              },
            }}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={showError}
            TransitionComponent={Slide}
            message={`In stock are ${product.quantity} items only! It is the maximum quantity you can purchase. X`}
          >
       </Snackbar>
          <ActionButtons spacing={1.5}>
            <ActionButton
              onClick={() => handleAddToCart(!addToCart)}
              variant="contained"
              size="large"
              startIcon={ renderCartIcon() }>
              {addToCartContent}
            </ActionButton>
            <ActionButton
              onClick={() => handleAddToFavorites(!addToFavorites)}
              variant="outlined"
              size="large"
              startIcon={renderFavoriteIcon()}
            >
              {addToFavoritesContent}
            </ActionButton>
          </ActionButtons>
        </CardContent>
      </Card>
    </Box>
  );
}