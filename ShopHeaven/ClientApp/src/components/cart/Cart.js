import { React, useState, useEffect, useRef } from "react";
import { Box, Grid, Stack, Typography, Container, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { ApiEndpoints } from "../../api/endpoints";
import { cartPath } from "../../constants";
import BreadcrumbsBar from "../common/BreadcrumbsBar";
import CartSummary from "./CartSummary";
import CartProduct from "./CartProduct";

const breadcrumbs = [
  {
    name: "Home",
    uri: "/",
  },
  {
    name: `Cart`,
    uri: `${cartPath}`,
  },
];

export default function Cart() {
  const [productsInCart, setProductsInCart] = useState([]);
  const [cartSummary, setCartSummary] = useState();
  const [deleteProductDOMelement, setDeleteProductDOMelement] = useState(false);

  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const effectRun = useRef(false);

  useEffect(() => {
    const controller = new AbortController();

    const getCart = async () => {
      try {
        const response = await axiosPrivate.post(
          ApiEndpoints.carts.getProducts,
          {
            cartId: auth.cartId,
            userId: auth.userId,
          },
          {
            signal: controller.signal,
          }
        );

        console.log("ZAQVKATA NANOVO: ", response);
        
        setProductsInCart(response?.data?.products);
        setCartSummary(response?.data?.summary);
        //console.log("CART RESPONSE: ", response?.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (effectRun.current) {
      getCart();
    }

    return () => {
      effectRun.current = true;
      controller.abort();
    };
  }, [deleteProductDOMelement]);

  function productDeleted(productId, cartSummary) {
   // var updatedProducts = productsInCart.filter((x) => x.id !== productId);
    //setProductsInCart(updatedProducts);
    setDeleteProductDOMelement(true);
   // setCartSummary(cartSummary);
  }

  const MainWrapper = styled(Box)({
    width: "80%",
    margin: "auto",
    marginTop: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      width: "95%",
    },
  });

  return (
    <Box>
      <BreadcrumbsBar breadcrumbsItems={breadcrumbs} />
      <MainWrapper>
        {productsInCart.length > 0 ? (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={9}>
              <Stack spacing={2}>
                {productsInCart?.map((product) => {
                  return (
                    <CartProduct
                      key={product.id}
                      productInCart={product}
                      productDeleted={productDeleted}
                    />
                  );
                })}
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={3}>
              <CartSummary cartSummary={cartSummary} />
            </Grid>
          </Grid>
        ) : (
          <Box>
            <Typography
              variant="h5"
              textTransform="uppercase"
              textAlign="center"
            >
              You have no items in your cart!
            </Typography>
            <Button variant="contained" size="large">
              GO TO HOME
            </Button>
          </Box>
        )}
      </MainWrapper>
    </Box>
  );
}
