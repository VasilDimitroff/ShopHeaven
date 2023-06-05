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
} from "@mui/material";
import { RemoveCircle, AddCircle } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";
import { cartPath, noPermissionsForOperationMessage, } from "../../constants";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { ApiEndpoints } from "../../api/endpoints";
import useAuth from "../../hooks/useAuth";

export default function CartProduct(props) {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const [productInCart, setProductInCart] = useState(props.product);
  const [purchasedQuantityOfProduct, setPurchasedQuantityOfProduct] =
    useState(1); // example, it must come from props.product

  const [addToCartResponseMessage, setAddToCartResponseMessage] = useState("");
  const [addToCartErrorMessage, setAddToCartErrorMessage] = useState("");

  const quantityRef = useRef();

  useEffect(() => {}, []);

  const isSmallOrDown = useMediaQuery(theme.breakpoints.down("sm"));
  const isMdOrDown = useMediaQuery(theme.breakpoints.down("md"));

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

  function handleSetProductInCartQuantity() {

    let value = quantityRef.current.value;

    //MUST GET FROM THE SERVER STOCK QUANTITY OF CURRENT PRODUCT! THIS LOGIC BELOW DONT WORK RIGHT!
    //THIS IS POSSIBLE TO CHANGE LOGIC ON SERVER TO REURN ONE MORE PROPERTY (AND CHANGE LOGIC IN PRODUCT PAGE FOR ADDING PRODUCT IN CART - view the code)
    // No! It is absolutely different model! We change props. model, not response 
    //FROM SERVER WE WEILL GET ARRAY OF ProductsCart, but with one more property => In stock quantity of product
    value = parseInt(value);

    //User cannot select 0 quantity
    if (value < 1) {
      value = 1;
    }

    //THIS ROW IS IMPORTANT! MUST CHECK IF RESULT > WHOLE QUANTITY OF PRODUCT (not product in cart!!!)
    if (value > productInCart.quantity) {
      setAddToCartErrorMessage(
        `Product is out of stock! You cannot purchase it!`
      );
    } else {
      setPurchasedQuantityOfProduct(value);
    }
  }

  const ImageHolder = styled(Box)({
    width: isSmallOrDown ? "30%" : "55%",
    maxWidth: "200px",
    height: 0,
    paddingBottom: isSmallOrDown ? "30%" : "55%",
    position: "relative",
    overflow: "hidden",
  });

  const InfoHolder = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });

  const LabelHolder = styled(InfoHolder)({
    margin: theme.spacing(1, 0)
  })

  const QuantityHolder = styled(InfoHolder)({
    marginTop: theme.spacing(1.5),
  })

  const RegularPrice = styled(Typography)({
    textDecoration: "line-through",
    color: "gray",
    fontSize: 14,
  });

  const FinalPriceHolder = styled(InfoHolder)({
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
              src="https://img.freepik.com/premium-psd/bottle-product-mockup-psd-beauty-packaging_53876-130082.jpg"
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
              Here will be the great name of the best product in the world!
            </Typography>
            <Divider/>
              <Stack spacing={2} flexWrap="wrap" direction="row">
                <Chip
                  variant="outlined"
                  color="success"
                  size="small"
                  label={"Warranty"}
                />
                <Chip
                  variant="outlined"
                  color="success"
                  size="small"
                  label={"Available"}
                />  
              </Stack>
            <Typography>
              Description Description Description Description Description
              Description
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={3} md={3} lg={3}>
          <Box>
            <LabelHolder>
              <StyledChip size="small" variant="filled" label={`Save ${5}%`} />
            </LabelHolder>
          </Box>

          <FinalPriceHolder>
            <RegularPrice>$40.50</RegularPrice>
            <Typography variant="h6">$40.50</Typography>
          </FinalPriceHolder>

          <QuantityHolder>
            <IconButton onClick={() => handleSetProductInCartQuantity()}>
              <RemoveCircle sx={{ color: theme.palette.primary.main }} />
            </IconButton>
            <BootstrapInput
              inputRef={quantityRef}
              defaultValue={purchasedQuantityOfProduct}
              id="bootstrap-input"
              color="primary"
            />
            <IconButton onClick={() => handleSetProductInCartQuantity()}>
              <AddCircle sx={{ color: theme.palette.primary.main }} />
            </IconButton>
          </QuantityHolder>
                      <Stack
              gap={2}
              flexWrap="wrap"
              flexDirection="row"
              justifyContent={isMdOrDown ? "center" : "flex-end"}
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
    </Paper>
  );
}
