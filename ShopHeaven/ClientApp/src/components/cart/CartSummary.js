import { React, Fragment, useState, useEffect, useRef } from "react";
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
  Alert,
} from "@mui/material";
import { AddShoppingCart, ArrowCircleRight } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";
import { ApiEndpoints } from "../../api/endpoints";
import useAppSettings from "../../hooks/useAppSettings";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { noPermissionsForOperationMessage } from "../../constants";

export default function CartSummary(props) {
  const { appSettings } = useAppSettings();

  const axiosPrivate = useAxiosPrivate();

  const [cartSummary, setCartSummary] = useState(props.cartSummary);
  const [coupon, setCoupon] = useState(null);

  const [applyCouponResponseMessage, setApplyCouponResponseMessage] =
    useState("");
  const [applyCouponErrorMessage, setApplyCouponErrorMessage] = useState("");

  const couponRef = useRef();

  function onCouponApplied() {
    const couponValue = couponRef.current.value;
    console.log(couponValue);

    if(coupon) {
      setApplyCouponResponseMessage("");
      setApplyCouponErrorMessage("You can apply 1 coupon only!");
      return;
    }

    if (!couponValue || couponValue.trim().length != 8) {
      setCoupon(null);
      setApplyCouponResponseMessage("");
      setApplyCouponErrorMessage("Coupon must contain exact 8 characters");
      return;
    }

    const couponRequestModel = {
      code: couponValue.trim(),
    };

    verifyCoupon(couponRequestModel);
  }

  async function verifyCoupon(couponRequestModel) {
    try {
      const controller = new AbortController();

      const response = await axiosPrivate.post(
        ApiEndpoints.coupons.verifyCoupon,
        couponRequestModel,
        {
          signal: controller.signal,
        }
      );

      console.log(response?.data);
      setCoupon(response?.data);

      controller.abort();

      setApplyCouponErrorMessage("");
      setApplyCouponResponseMessage(
        `Coupon ${couponRequestModel.code} applied succesfully`
      );

      //change total summary price
      setCartSummary((prev) => {
        return {
          ...prev,
        };
      });
    } catch (error) {
      setCoupon(null);

      setApplyCouponResponseMessage("");
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        setApplyCouponErrorMessage(noPermissionsForOperationMessage);
      } else {
        setApplyCouponErrorMessage(error?.response?.data);
      }
      console.log(error.message);
    }
  }

  function removeCoupon() {
    setCartSummary(prev => {
      return {
        ...prev,
        
      }
    })
    setCoupon(null);
    setApplyCouponResponseMessage("");
    setApplyCouponErrorMessage("");
  }

  function clearSuccessMessage() {
    setApplyCouponResponseMessage("");
  }

  function clearErrorMessage() {
    setApplyCouponErrorMessage("");
  }

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
      textAlign: "center",
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
                  {cartSummary.totalDiscount.toFixed(2)}
                </Typography>
              </DiscountHolder>
            </Box>
          )}

          {
            coupon ?
            (<DiscountHolder>
              <Typography>Coupon discount:</Typography>
              <Typography>
                {`${appSettings.appCurrency.code} -${(cartSummary.totalPriceWithDiscount * coupon?.amount / 100).toFixed(2)} (-${coupon?.amount} %)`}
              </Typography>
            </DiscountHolder>)

            : <></>
          }

          <PriceHolder>
            <Typography sx={{ fontWeight: 600, fontSize: 18 }}>
              TOTAL PRICE:
            </Typography>
            <Typography
              variant="h5"
              sx={{ fontWeight: 500, color: theme.palette.error.main }}
            >
              {appSettings.appCurrency.code}{" "}
              {
                coupon
                ? ((cartSummary.totalPriceWithDiscount - (cartSummary.totalPriceWithDiscount * coupon?.amount / 100)).toFixed(2))
                : (cartSummary.totalPriceWithDiscount.toFixed(2))
              }
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
        <Typography sx={{ fontWeight: 500 }}>
          Have a discount coupon?
        </Typography>
        <Box sx={{ display: "flex", flex: 1 }}>
          <CouponInput
            variant="outlined"
            placeholder="EXAMPLE: 45B2AT0B"
            inputRef={couponRef}
            defaultValue={coupon?.code}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton
            onClick={onCouponApplied}
            color="primary"
            sx={{ p: "5px" }}
          >
            <ArrowCircleRight sx={{ fontSize: 30 }} />
          </IconButton>
        </Box>
        <Box>
          {!coupon ? (
            <></>
          ) : (
            <Chip
              variant="outlined"
              label={`REMOVE COUPON: ${coupon?.code}`}
              color="error"
              size="small"
              onDelete={removeCoupon}
            />
          )}
        </Box>
        {applyCouponResponseMessage ? (
          <Zoom in={applyCouponResponseMessage.length > 0 ? true : false}>
            <Alert
              onClose={clearSuccessMessage}
              sx={{ marginTop: theme.spacing(2) }}
              severity="success"
            >
              {applyCouponResponseMessage}
            </Alert>
          </Zoom>
        ) : (
          ""
        )}
        {applyCouponErrorMessage ? (
          <Zoom in={applyCouponErrorMessage.length > 0 ? true : false}>
            <Alert
              onClose={clearErrorMessage}
              sx={{ marginTop: theme.spacing(2) }}
              variant="filled"
              severity="error"
            >
              {applyCouponErrorMessage}
            </Alert>
          </Zoom>
        ) : (
          <></>
        )}
      </CouponHolder>
    </Stack>
  );
}
