import { React, useState, useEffect, useRef } from "react";
import { Box, Grid, Stack, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { ApiEndpoints } from "../../api/endpoints";
import { cartPath, checkoutPath } from "../../constants";
import BreadcrumbsBar from "../common/BreadcrumbsBar";

const breadcrumbs = [
  {
    name: "Home",
    uri: "/",
  },
  {
    name: `Cart`,
    uri: `${cartPath}`,
  },
  {
    name: `Checkout`,
    uri: `${checkoutPath}`,
  },
];

export default function Checkout() {
  const [productsInCart, setProductsInCart] = useState([]);
  const [cartSummary, setCartSummary] = useState();
  const [deleteProductDOMelement, setDeleteProductDOMelement] = useState(false);

  const { auth } = useAuth();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const effectRun = useRef(false);

  useEffect(() => {
    window.scroll(0, 0);
  }, [])

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
        
        setProductsInCart(response?.data?.products);
        setCartSummary(response?.data?.summary);

        setDeleteProductDOMelement(false);

        console.log("CART RESPONSE: ", response?.data);

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
  }, []);

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
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={9}>
             edno
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={3}>
            dve
            </Grid>
          </Grid>
      </MainWrapper>
    </Box>
  );
}
