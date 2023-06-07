import { React, Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Paper,
  Stack,
  Typography,
  Button,
  Slide,
  IconButton,
  Divider,
  InputBase,
  Chip,
  Zoom,
  Alert
} from "@mui/material";
import { AddShoppingCart, ArrowCircleRight } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";
import useAppSettings from "../../hooks/useAppSettings";
import { fontWeight } from "@mui/system";

export default function CartSummary(props) {
  const { appSettings } = useAppSettings();

  const [cartSummary, setCartSummary] = useState(props.cartSummary);

  function removeCoupon() {}

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
    [theme.breakpoints.up("lg")]: {
      display: "block",
      margin: "auto",
      textAlign: "center"
    },
    alignItems: "center",
    justifyContent: "space-between",
  });

  const CouponHolder = styled(Paper)({
    display: "flex",
    flexDirection: "column",
    gap: 12,
    padding: theme.spacing(2),
  });

  const CouponInput = styled(InputBase)({
    paddingLeft: theme.spacing(2),
    border: "1px solid rgba(0, 0, 0, 0.2)",
    borderRadius: theme.shape.borderRadius,
    width: "100%",
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
    <Stack spacing={2}>
      <Paper sx={{ p: 2 }}>
        <Stack spacing={1}>
          <Typography align="center" variant="h6" fontWeight={400}>
            ORDER SUMMARY:
          </Typography>
          {cartSummary.totalPriceWithDiscount ==
          cartSummary.totalPriceWithNoDiscount ? (
            <></>
          ) : (
            <Box>
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
            </Box>
          )}
          <PriceHolder>
            <Typography sx={{ fontWeight: 600, fontSize: 18 }}>
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
      <CouponHolder>
        <Typography sx={{fontWeight: 500}}>Have a discount coupon?</Typography>
        <Box sx={{ display: "flex", flex: 1 }}>
          <CouponInput variant="outlined" placeholder="EXAMPLE: 45B2AT0B" />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton color="primary" sx={{ p: "5px" }}>
            <ArrowCircleRight sx={{ fontSize: 30 }} />
          </IconButton>
        </Box>
        <Box>
          <Chip variant="outlined" label={`REMOVE COUPON: ${"45B2AT0B"}`} color="error" size="small" onDelete={removeCoupon}/>
        </Box>
        <Zoom in={true}>
          <Alert
            sx={{ marginTop: theme.spacing(2) }}
            variant="filled"
            severity="error"
            //onClose={clearQuantityBlockMesssage}
          >
            {"ERROR COUPON MESSAGE"}
          </Alert>
        </Zoom>
      </CouponHolder>
 
    </Stack>
  );
}
