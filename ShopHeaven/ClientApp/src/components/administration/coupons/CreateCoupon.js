import { React, useState, useRef } from "react";
import {
  Box,
  Typography,
  Paper,
  Alert,
  Zoom,
} from "@mui/material";
import { theme } from "../../../theme";
import { InputBox, UniversalInput, CompleteActionButton } from "../../../styles/styles";
import { AddCircle } from "@mui/icons-material";
import useAuth from "../../../hooks/useAuth";
import { ApiEndpoints } from "../../../api/endpoints";
import {
  allowedFileFormats,
  couponCodeLength,
  noPermissionsForOperationMessage,
} from "../../../constants";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export default function CreateCoupon(props) {
  let { auth } = useAuth();
  let axiosPrivate = useAxiosPrivate();

  let couponCodeRef = useRef();
  let couponAmountRef = useRef();

  const [couponCode, setCouponCode] = useState("");
  const [couponAmount, setCouponAmount] = useState(0);

  const [createCouponResponseMessage, setCreateCouponResponseMessage] =
    useState("");
  const [createCouponErrorMessage, setCreateCouponErrorMessage] = useState("");

  function onCreateCoupon(e) {
    e.preventDefault();

    const formCouponCode = couponCodeRef.current.value;
    const formCouponAmount = parseFloat(couponAmountRef.current.value);

    if (formCouponCode.trim().length != couponCodeLength) {
      setCreateCouponResponseMessage("");
      setCreateCouponErrorMessage(`Coupon code must be exact ${couponCodeLength} character long!`);
      return;
    }

    const newCoupon = {
      code: formCouponCode,
      amount: formCouponAmount,
    };

    createCoupon(newCoupon);
  }

  async function createCoupon(newCoupon) {
    try {
      const controller = new AbortController();

      const response = await axiosPrivate.post(
        ApiEndpoints.coupons.createCoupon,
        newCoupon,
        {
          signal: controller.signal,
        }
      );

      controller.abort();
      setCreateCouponErrorMessage("");
      setCreateCouponResponseMessage(
        `Coupon ${newCoupon.code} successfully created`
      );

      window.scroll(0, 0);

      props.couponsListChanged(response?.data);
    } catch (error) {
      setCreateCouponResponseMessage("");
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        setCreateCouponErrorMessage(noPermissionsForOperationMessage);
      } else {
        setCreateCouponErrorMessage(error?.response?.data);
      }
      console.log(error.message);
    }
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ ml: 2, mt: 2, mb: 2 }}>
        <Typography variant="h6" component="h2">
          ADD NEW COUPON
        </Typography>
        <Typography>
          Enter exact {couponCodeLength}-character coupon. No matter uppercase or lowercase.
          Amount is in %
        </Typography>
      </Box>

      <form onSubmit={onCreateCoupon}>
        <InputBox>
          <UniversalInput
            inputRef={couponCodeRef}
            label="Coupon code"
            defaultValue={couponCode}
            variant="outlined"
            placeholder="FOR EXAMPLE: 0AT725KA, DISC2023"
          />
        </InputBox>
        <InputBox>
          <UniversalInput
            inputRef={couponAmountRef}
            label="Coupon amount"
            defaultValue={couponAmount}
            variant="outlined"
            type="number"
            placeholder={"0.00"}
            inputProps={{
              step: "0.01",
              min: "0.00",
            }}
          />
        </InputBox>
        <InputBox>
          <CompleteActionButton
            color="secondary"
            startIcon={<AddCircle />}
            type="submit"
            size="large"
            variant="contained"
          >
            Create coupon
          </CompleteActionButton>
        </InputBox>
      </form>
      {createCouponResponseMessage ? (
        <Zoom in={createCouponResponseMessage.length > 0 ? true : false}>
          <Alert sx={{ marginTop: theme.spacing(1) }} severity="success">
            {createCouponResponseMessage}
          </Alert>
        </Zoom>
      ) : (
        ""
      )}
      {createCouponErrorMessage ? (
        <Zoom in={createCouponErrorMessage.length > 0 ? true : false}>
          <Alert
            sx={{ marginTop: theme.spacing(1) }}
            variant="filled"
            severity="error"
          >
            {createCouponErrorMessage}
          </Alert>
        </Zoom>
      ) : (
        ""
      )}
    </Paper>
  );
}
