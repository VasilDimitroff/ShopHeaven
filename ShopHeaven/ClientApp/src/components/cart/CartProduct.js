import { React, Fragment, useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Close } from "@mui/icons-material";
import {
  useMediaQuery,
  Box,
  Grid,
  Paper,
  Typography,
  Stack,
  Chip,
  IconButton,
  InputBase,
  Divider,
  Alert,
  Zoom
} from "@mui/material";
import { RemoveCircle, AddCircle } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";
import { cartPath, noPermissionsForOperationMessage } from "../../constants";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { ApiEndpoints } from "../../api/endpoints";
import useAuth from "../../hooks/useAuth";
import useAppSettings from "../../hooks/useAppSettings";

export default function CartProduct(props) {
  const { auth } = useAuth();
  const { appSettings } = useAppSettings();
  const axiosPrivate = useAxiosPrivate();

  const [productInCart, setProductInCart] = useState(props.productInCart);
  const [purchasedQuantityOfProduct, setPurchasedQuantityOfProduct] =
    useState(productInCart.purchasedQuantity); // example, it must come from props.product

  const [addToCartResponseMessage, setAddToCartResponseMessage] = useState("");
  const [addToCartErrorMessage, setAddToCartErrorMessage] = useState("");

  const quantityRef = useRef();

  const isSmallOrDown = useMediaQuery(theme.breakpoints.down("sm"));
  const isMdOrDown = useMediaQuery(theme.breakpoints.down("md"));
  const isLgOrDown = useMediaQuery(theme.breakpoints.down("lg"));

  function onAddProductToCart() {
    const requestData = {
      userId: auth.userId,
      cartId: auth.cartId,
      productId: productInCart.id,
      quantity: parseInt(quantityRef.current.value),
    };

    addProductToCart(requestData);
  }

  async function addProductToCart(requestData) {
    try {
      console.log("Add to CART REQUEST", requestData);
      const controller = new AbortController();

      const response = await axiosPrivate.post(
        ApiEndpoints.carts.addProduct,
        requestData,
        {
          signal: controller.signal,
        }
      );

      controller.abort();

      setPurchasedQuantityOfProduct(response?.data?.quantity);

      setAddToCartErrorMessage("");
      setAddToCartResponseMessage(
        `You have added product ${productInCart.name} in the cart ${response?.data?.quantity} time(s)`
      );
    } catch (error) {
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        setAddToCartErrorMessage(noPermissionsForOperationMessage);
      } else {
        setAddToCartErrorMessage(error?.response?.data);
      }

      console.log(error);
    }
  }

  function clearErrorMessage () { setAddToCartErrorMessage(``);}

  function handleSetProductInCartQuantity(value) {
    setAddToCartErrorMessage(``)

    value = parseInt(value);

    if (purchasedQuantityOfProduct  + value < 1) {
      setPurchasedQuantityOfProduct(1)
      setAddToCartErrorMessage(`You have to purchase almost 1 item of product!`);
      return;
   }

   if (!productInCart.isAvailable) {
    setAddToCartErrorMessage(`Product is out of stock! You cannot purchase it!`);
    return;
   } 
    
   if (purchasedQuantityOfProduct + value > productInCart.inStockQuantity) {
      setAddToCartErrorMessage(`In stock are ${productInCart.inStockQuantity} items! You cannot purchase more than this count.`);
      return;
   } 
    
    setPurchasedQuantityOfProduct(prev => prev += value); 
  }

  const ImageHolder = styled(Box)({
    width: isSmallOrDown ? "50%" : "75%",
    maxWidth: "200px",
    height: 0,
    paddingBottom: isSmallOrDown ? "50%" : "75%",
    position: "relative",
    overflow: "hidden",
  });

  const InfoHolder = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });

  const LabelHolder = styled(InfoHolder)({
    margin: theme.spacing(1, 0),
  });

  const QuantityHolder = styled(InfoHolder)({
    marginTop: theme.spacing(1.5),
  });

  const RegularPrice = styled(Typography)({
    textDecoration: "line-through",
    color: "gray",
    fontSize: 14,
  });

  const FinalPriceHolder = styled(Box)({
    display: "block",
    textAlign: "center",
    gap: theme.spacing(0.8),
    marginTop: theme.spacing(1),
    fontWeight: 500,
    color: theme.palette.error.main,
  });

  const StyledChip = styled(Chip)({
    color: theme.palette.white.main,
    fontWeight: 500,
    backgroundColor: theme.palette.secondary.main,
    borderRadius: theme.shape.borderRadius,
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

  const LinkButton = styled(Typography)({
    textAlign: "right",
    cursor: "pointer",
    marginTop: theme.spacing(1.5),
    fontSize: 14,
    color: theme.palette.primary.main,
    [theme.breakpoints.down("lg")]: {
      marginTop: theme.spacing(1.5),
    },
    "&:hover": {
      textDecoration: "underline",
    },
  });

  return (
    <Paper sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sm={3}
          md={3}
          lg={3}
          display="flex"
          alignContent="center"
          justifyContent="center"
          //sx={{ border: "1px solid black" }}
        >
          <ImageHolder>
            <img
              style={{
                cursor: "pointer",
                borderRadius: "15%",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                top: 0,
                left: 0,
                padding: theme.spacing(1),
              }}
              src={productInCart.image}
            />
          </ImageHolder>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          lg={6}
          //sx={{ border: "1px solid black" }}
        >
          <Stack spacing={1.2}>
            <Typography sx={{ lineHeight: 1, fontSize: 18, fontWeight: 500 }}>
              {productInCart.name}
            </Typography>
            <Divider />
            <Stack spacing={2} flexWrap="wrap" direction="row">
              {productInCart.hasGuarantee ? (
                <Chip
                  variant="outlined"
                  color="success"
                  size="small"
                  label="Warranty"
                />
              ) : (
                <></>
              )}

              <Chip
                variant="outlined"
                color="success"
                size="small"
                label={"Available"}
              />
               <Chip
                variant="outlined"
                color="success"
                size="small"
                label={`NALI4NI: ${productInCart.inStockQuantity}`}
              />
            </Stack>          
            <Typography>{productInCart.description}</Typography>
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          sm={3}
          md={3}
          lg={3}
          sx={{
            paddingBottom: theme.spacing(1),
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {productInCart.discount > 0 ? (
            <LabelHolder>
              <StyledChip
                size="small"
                variant="filled"
                label={`Save ${appSettings.appCurrency.code} ${(
                  (productInCart.purchasedQuantity *
                    productInCart.price *
                    productInCart.discount) /
                  100
                ).toFixed(2)}`} //55 lw
              />
            </LabelHolder>
          ) : (
            <></>
          )}
          <FinalPriceHolder>
            {productInCart.discount > 0 ? (
              <RegularPrice>
                {appSettings.appCurrency.code}{" "}
                {(
                  productInCart.purchasedQuantity * productInCart.price
                ).toFixed(2)}
              </RegularPrice>
            ) : (
              <></>
            )}
            <Typography variant="h6">
              {appSettings.appCurrency.code}{" "}
              {(
                productInCart.purchasedQuantity * productInCart.price -
                (productInCart.purchasedQuantity *
                  productInCart.price *
                  productInCart.discount) /
                  100
              ).toFixed(2)}
            </Typography>
          </FinalPriceHolder>
          <QuantityHolder>
            <IconButton onClick={() => handleSetProductInCartQuantity(-1)}>
              <RemoveCircle sx={{ color: theme.palette.primary.main }} />
            </IconButton>
            <BootstrapInput
              inputRef={quantityRef}
              id="bootstrap-input"
              readOnly
              color="primary"
              value={purchasedQuantityOfProduct}
            />
            <IconButton onClick={() => handleSetProductInCartQuantity(1)}>
              <AddCircle sx={{ color: theme.palette.primary.main }} />
            </IconButton>
          </QuantityHolder>
          <Stack
            gap={isMdOrDown ? (isSmallOrDown ? 2 : 1) : 2}
            flexWrap="wrap"
            flexDirection="row"
            justifyContent={"center"}
          >
            <Link to={`${"cartPath"}`}>
              <LinkButton>Delete</LinkButton>
            </Link>
            <Link to={`${"cartPath"}`}>
              <LinkButton>Add to favorites</LinkButton>
            </Link>
          </Stack>
        </Grid>
      </Grid>
      {addToCartErrorMessage ? (
            <Zoom
              in={addToCartErrorMessage.length > 0 ? true : false}
            >
              <Alert
                sx={{ marginTop: theme.spacing(2) }}
                variant="filled"
                severity="error"
                onClose={clearErrorMessage}
              >
                {addToCartErrorMessage}
              </Alert>
            </Zoom>
          ) : (
            <></>
          )}
    </Paper>
  );
}
