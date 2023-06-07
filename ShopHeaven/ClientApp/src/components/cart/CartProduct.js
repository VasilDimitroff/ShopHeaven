import { React, useState, useRef, useEffect } from "react";
import {
  useMediaQuery,
  Box,
  Grid,
  Paper,
  Typography,
  Stack,
  Chip,
  InputBase,
  Divider,
  Alert,
  Zoom,
  Slide,
  Snackbar,
  TextField,
} from "@mui/material";
import { RemoveCircle, AddCircle } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";
import { noPermissionsForOperationMessage } from "../../constants";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { ApiEndpoints } from "../../api/endpoints";
import useAuth from "../../hooks/useAuth";
import useUser from "../../hooks/useUser";
import useAppSettings from "../../hooks/useAppSettings";

export default function CartProduct(props) {

  //app hooks
  const { auth } = useAuth();
  const { setUser } = useUser();
  const { appSettings } = useAppSettings();

  //api
  const axiosPrivate = useAxiosPrivate();

  //main states for component
  const [productInCart, setProductInCart] = useState(props.productInCart);

  //error messages
  const [deleteFromCartErrorMessage, setDeleteFromCartErrorMessage] = useState("");
  const [changePurchasedQuantityErrorMessage, setChangePurchasedQuantityErrorMessage] = useState("");

  //refs
  const quantityRef = useRef();

  //get resulution type (bool)
  const isSmallOrDown = useMediaQuery(theme.breakpoints.down("sm"));
  const isMdOrDown = useMediaQuery(theme.breakpoints.down("md"));

useEffect(() => { setProductInCart(props.productInCart) }, [props.productInCart, productInCart])

  function onDeleteProductFromCart() {
    const requestData = {
      userId: auth.userId,
      cartId: auth.cartId,
      productId: productInCart.id,
    };

    deleteProductFromCart(requestData);
  }

  async function deleteProductFromCart(requestData) {
    try {
      const controller = new AbortController();

      const response = await axiosPrivate.post(
        ApiEndpoints.carts.deleteProduct,
        requestData,
        {
          signal: controller.signal,
        }
      );

      props.productDeleted();

      setUser((prev) => {
        return {
          ...prev,
          cartProductsCount: response?.data?.cartProductsCount,
        };
      });

      controller.abort();
    } catch (error) {
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        setDeleteFromCartErrorMessage(noPermissionsForOperationMessage);
      } else {
        setDeleteFromCartErrorMessage(error?.response?.data);
      }

      console.log(error);
    }
  }

function onChangeProductQuantity() {
    let newValue = quantityRef.current.value
    
    if(!newValue) {
      newValue = 1
    }

    let newQuantity = parseInt(quantityRef.current.value);

    let isValid = validateProductQuantityValue(newQuantity);

    if (!isValid) {
      return;
    }
  
    const requestData = {
      userId: auth.userId,
      cartId: auth.cartId,
      productId: productInCart.id,
      newQuantity: newQuantity,
    };

    setTimeout(() => {
      changeProductQuantity(requestData);
    }, 1000);
  }

  async function changeProductQuantity(requestData) {
    try {
      console.log("ADD TO CART REQUEST", requestData);

      const controller = new AbortController();

      //await new Promise((resolve) => setTimeout(resolve, 300));

      const response = await axiosPrivate.post(
        ApiEndpoints.carts.changeProductQuantity,
        requestData,
        {
          signal: controller.signal,
        }
      );

      controller.abort();

      console.log("CHANGE QUANTITY", response?.data)

      setUser((prev) => {
        return {
          ...prev,
          cartProductsCount: response?.data?.productsInCartCount,
        };
      });
      
      setProductInCart(prev => {
        return {
          ...prev,
          purchasedQuantity: response?.data?.productQuantity
        }
      })

      props.quantityUpdated(productInCart.id, response?.data?.productQuantity, response?.data?.summary);

      setChangePurchasedQuantityErrorMessage("");
    } catch (error) {

      if (error?.response?.status === 401 || error?.response?.status === 403) {
        setChangePurchasedQuantityErrorMessage(
          noPermissionsForOperationMessage
        );
      } else {
        setChangePurchasedQuantityErrorMessage(error?.response?.data);
      }

      console.log(error);
    }
  }


  function validateProductQuantityValue(value) {

    setChangePurchasedQuantityErrorMessage(``);

    if (value < 1) {

      setProductInCart(prev => {
        return {
          ...prev,
          purchasedQuantity: 1
        }
      })

      setChangePurchasedQuantityErrorMessage(
        `You have to purchase almost 1 item of product!`
      );

      return false;
    }

    if (!productInCart.isAvailable) {
      setChangePurchasedQuantityErrorMessage(
        `Product is out of stock! You cannot purchase it!`
      );

      return false;
    }

    if (value > productInCart.inStockQuantity) {
      setProductInCart(prev => {
        return {
          ...prev,
          purchasedQuantity: productInCart.inStockQuantity
        }
      })
      setChangePurchasedQuantityErrorMessage(
        `In stock are ${productInCart.inStockQuantity} items! You cannot purchase more than this count.`
      );
      return false;
    }

    return true;
  }



  function clearErrorMessage() {
    setChangePurchasedQuantityErrorMessage(``);
  }

  function handleCloseSnackbar() { setDeleteFromCartErrorMessage(""); }

  const ProductInfoInput = styled(TextField)({

    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    paddingTop: theme.spacing(0.3),
    paddingBottom: theme.spacing(0.3),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
  });

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
            <ProductInfoInput
              type="number"
              onChange={onChangeProductQuantity}
              inputRef={quantityRef}
              defaultValue={productInCart.purchasedQuantity}
              inputProps={{
               // min: "1",
               // max: productInCart.inStockQuantity
              }}
            />
          </QuantityHolder>
          <Stack
            gap={isMdOrDown ? (isSmallOrDown ? 2 : 1) : 2}
            flexWrap="wrap"
            flexDirection="row"
            justifyContent={"center"}
          >
            <LinkButton onClick={onDeleteProductFromCart}>Delete</LinkButton>
            <LinkButton>Add to favorites</LinkButton>
          </Stack>
        </Grid>
      </Grid>
      {changePurchasedQuantityErrorMessage ? (
        <Zoom
          in={changePurchasedQuantityErrorMessage.length > 0 ? true : false}
        >
          <Alert
            sx={{ marginTop: theme.spacing(2) }}
            variant="filled"
            severity="error"
            onClose={clearErrorMessage}
          >
            {changePurchasedQuantityErrorMessage}
          </Alert>
        </Zoom>
      ) : (
        <></>
      )}
      <Snackbar
        onClose={handleCloseSnackbar}
        autoHideDuration={6000}
        ContentProps={{
          style: {
            backgroundColor: theme.palette.error.main,
            textAlign: "center",
            fontWeight: 500,
            fontSize: 18,
            cursor: "pointer",
          },
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={deleteFromCartErrorMessage.length > 0 ? true : false}
        TransitionComponent={Slide}
        message={`${deleteFromCartErrorMessage}`}
      ></Snackbar>
    </Paper>
  );
}
