import { React, useState, useRef } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Paper,
  Alert,
  Zoom,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../../theme";
import { InputBox, CompleteActionButton, ProductInfoInput } from "../../../styles/styles";
import { Edit } from "@mui/icons-material";
import { ApiEndpoints } from "../../../api/endpoints";
import {
  couponCodeLength,
  noPermissionsForOperationMessage,
} from "../../../constants";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export default function EditCoupon(props) {
  const axiosPrivate = useAxiosPrivate();

  let couponCodeRef = useRef();
  let couponAmountRef = useRef();

  const [coupon, setCoupon] = useState(props.coupon);

  const [editCouponResponseMessage, setEditCouponResponseMessage] =
    useState("");
  const [editCouponErrorMessage, setEditCouponErrorMessage] = useState("");

  function onEditCoupon(e) {
    e.preventDefault();

    const formCouponCode = couponCodeRef.current.value;
    const formCouponAmount = parseFloat(couponAmountRef.current.value);

    if (formCouponCode.trim().length < couponCodeLength) {
      setEditCouponResponseMessage("");
      setEditCouponErrorMessage(
        `Coupon code must be exact ${couponCodeLength} character long!`
      );
      return;
    }

    const couponRequest = {
      id: coupon.id,
      code: formCouponCode,
      amount: formCouponAmount,
    };

    editCoupon(couponRequest);
  }

  async function editCoupon(couponRequest) {
    try {
      const controller = new AbortController();

      const response = await axiosPrivate.post(
        ApiEndpoints.coupons.editCoupon,
        couponRequest,
        {
          signal: controller.signal,
        }
      );

      controller.abort();

      setCoupon(response?.data);

      setEditCouponErrorMessage("");
      setEditCouponResponseMessage(
        `The new properties of the coupon: Code: ${response?.data?.code}, Amount: -${response?.data?.amount}%`
      );

      window.scroll(0, 0);
      props.updateCoupon(response?.data);
    } catch (error) {
      setEditCouponResponseMessage("");
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        setEditCouponErrorMessage(noPermissionsForOperationMessage);
      } else {
        setEditCouponErrorMessage(error?.response?.data);
      }
      console.log(error.message);
    }
  }

  return (
    <Paper sx={{ padding: theme.spacing(2), marginTop: theme.spacing(2) }}>
      <Typography
        sx={{ ml: 2, mt: 3, mb:2 }}
        variant="h6"
        component="h2"
      >
        Edit Coupon {coupon.code}
      </Typography>
      <form onSubmit={onEditCoupon}>
        <InputBox>
          <ProductInfoInput
            inputRef={couponCodeRef}
            label="Coupon code"
            variant="outlined"
            defaultValue={coupon.code}
          />
        </InputBox>
        <InputBox>
          <ProductInfoInput
            inputRef={couponAmountRef}
            label="Coupon Amount"
            defaultValue={coupon.amount}
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
            startIcon={<Edit />}
            type="submit"
            size="large"
            variant="contained"
          >
            Edit coupon
          </CompleteActionButton>
        </InputBox>
      </form>
      {editCouponResponseMessage ? (
        <Zoom in={editCouponResponseMessage.length > 0 ? true : false}>
          <Alert sx={{ marginTop: theme.spacing(1) }} severity="success">
            {editCouponResponseMessage}
          </Alert>
        </Zoom>
      ) : (
        ""
      )}
      {editCouponErrorMessage ? (
        <Zoom in={editCouponErrorMessage.length > 0 ? true : false}>
          <Alert sx={{ marginTop: theme.spacing(1) }} severity="error">
            {editCouponErrorMessage}
          </Alert>
        </Zoom>
      ) : (
        <></>
      )}
    </Paper>
  );
}
