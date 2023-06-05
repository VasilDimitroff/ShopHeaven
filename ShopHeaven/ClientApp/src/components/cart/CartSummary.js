import { React, Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Paper,
  Stack,
  Typography,
  Button,
  Snackbar,
  Slide,
} from "@mui/material";
import { Close, Favorite, AddShoppingCart } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";
import { cartPath } from "../../constants";

export default function CartSummary() {
  useEffect(() => {}, []);

  const RegularPriceHolder = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "gray",
    fontWeight: 500,
    fontSize: 20,
    textAlign: "right",
    marginTop: theme.spacing(2),
  });

  const PriceHolder = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  });

  const DiscountHolder = styled(Box)({
    display: "flex",
    color: "gray",
    alignItems: "center",
    justifyContent: "space-between",
  });

  const ActionButton = styled(Button)({
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    width: "100%",
    marginTop: theme.spacing(3),
  });

  return (
    <Paper sx={{ p: 2 }}>
      <Stack spacing={1}>
        <Typography align="center" variant="h6" fontWeight={400}>
          ORDER SUMMARY:
        </Typography>
        <Box>
          <RegularPriceHolder>
            <Typography>Regular price:</Typography>
            <Typography sx={{ textDecoration: "line-through" }}>
              $ 200
            </Typography>
          </RegularPriceHolder>
        </Box>
        <DiscountHolder>
          <Typography>Discount:</Typography>
          <Typography>$ -30.50</Typography>
        </DiscountHolder>
        <PriceHolder>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            TOTAL PRICE:
          </Typography>
          <Typography
            variant="h5"
            sx={{ fontWeight: 500, color: theme.palette.error.main }}
          >
            $ 150.20
          </Typography>
        </PriceHolder>
        <Box>
          <ActionButton
            //onClick={onAddProductToCart}
            variant="contained"
            size="large"
            startIcon={<AddShoppingCart />}
          >
            GO TO CHECKOUT
          </ActionButton>
        </Box>
      </Stack>
    </Paper>
  );
}
