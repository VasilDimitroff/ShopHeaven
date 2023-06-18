import { React, useState, useEffect, useRef } from "react";
import { Box, Grid, Stack, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MainWrapper } from "../../styles/styles";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { ApiEndpoints } from "../../api/endpoints";
import { favoritesPath } from "../../constants";
import BreadcrumbsBar from "../common/BreadcrumbsBar";
import FavoriteProduct from "./FavoriteProduct";

const breadcrumbs = [
  {
    name: "Home",
    uri: "/",
  },
  {
    name: `Favorites`,
    uri: `${favoritesPath}`,
  },
];

export default function Cart() {
  const [productsInWishlist, setProductsInWishlist] = useState([]);
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

    const getFavorites = async () => {
      try {
        const response = await axiosPrivate.post(
          ApiEndpoints.wishlists.getProducts,
          {
            wishlistId: auth.wishlistId,
            userId: auth.userId,
          },
          {
            signal: controller.signal,
          }
        );
        
        setProductsInWishlist(response?.data);

        setDeleteProductDOMelement(false);

        console.log("WISHLSIT RESPONSE: ", response?.data);

      } catch (error) {
        console.log(error);
      }
    };

    if (effectRun.current) {
      getFavorites();
    }

    return () => {
      effectRun.current = true;
      controller.abort();
    };
  }, [deleteProductDOMelement]);

  function productDeleted() { setDeleteProductDOMelement(true) };

  function quantityUpdated(productId, newQuantity) { 
  
    setProductsInWishlist((prevProducts) => {
      return prevProducts.map((product) => {
        if (product.id === productId) {
          return { ...product, purchasedQuantity: newQuantity };
        }
        return product;
      });
    });
   }

  return (
    <Box>
      <BreadcrumbsBar breadcrumbsItems={breadcrumbs} />
      <MainWrapper>
        {productsInWishlist.length > 0 ? (
          <Grid container spacing={0}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Stack spacing={2}>
                {productsInWishlist?.map((product) => {
                  return (
                    <FavoriteProduct
                      key={product.id}
                      productInWishlist={product}
                      productDeleted={productDeleted}
                      quantityUpdated={quantityUpdated}
                    />
                  );
                })}
              </Stack>
            </Grid>
          </Grid>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              mt: 4,
            }}
          >
            <Typography variant="h5" textAlign="center">
              YOU HAVE NO FAVORITES YET!
            </Typography>
            <Button
              onClick={() => navigate("/")}
              variant="contained"
              size="large"
            >
              GO TO HOME
            </Button>
          </Box>
        )}
      </MainWrapper>
    </Box>
  );
}
