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
import { AddShoppingCart } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";
import { cartPath } from "../../constants";
import useAppSettings from "../../hooks/useAppSettings";

export default function CartSummary(props) {
  const { appSettings } = useAppSettings();

  const [cartSummary, setCartSummary] = useState(props.cartSummary)

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
        {
          cartSummary.totalPriceWithDiscount == cartSummary.totalPriceWithNoDiscount
          ? <></>
          : ( <Box>
            <Box>
              <RegularPriceHolder>
                <Typography>Regular price:</Typography>
                <Typography sx={{ textDecoration: "line-through" }}>
                  {appSettings.appCurrency.code}{" "}
                  {cartSummary.totalPriceWithNoDiscount.toFixed(2)}
                </Typography>
              </RegularPriceHolder>
            </Box>
            <DiscountHolder>
              <Typography>Discount:</Typography>
              <Typography>
                {appSettings.appCurrency.code} -
                {(
                  cartSummary.totalPriceWithNoDiscount -
                  cartSummary.totalPriceWithDiscount
                ).toFixed(2)}
              </Typography>
            </DiscountHolder>
          </Box>)
        }
        <PriceHolder>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            TOTAL PRICE:
          </Typography>
          <Typography
            variant="h5"
            sx={{ fontWeight: 500, color: theme.palette.error.main }}
          >
            {appSettings.appCurrency.code}{" "}
            {cartSummary.totalPriceWithDiscount.toFixed(2)}
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
