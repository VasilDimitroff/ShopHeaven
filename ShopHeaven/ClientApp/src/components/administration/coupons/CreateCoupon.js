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
import { AddPhotoAlternate, AddCircle } from "@mui/icons-material";
import useAuth from "../../../hooks/useAuth";
import { ApiEndpoints } from "../../../api/endpoints";
import {
  allowedFileFormats,
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

    if (formCouponCode.trim().length != 8) {
      setCreateCouponResponseMessage("");
      setCreateCouponErrorMessage("Coupon code must be exact 8 character long!");
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

  const CouponInfoInput = styled(TextField)({
    background: "rgb(255,249,249)",
    width: "100%",
    marginTop: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
  });

  const InputBox = styled(Box)({
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
  });

  const CreateCouponButton = styled(Button)({
    width: "100%",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
  });

  return (
    <Paper sx={{ padding: theme.spacing(2) }}>
      <Box sx={{ marginLeft: theme.spacing(4), marginTop: theme.spacing(2) }}>
        <Typography variant="h6" component="h2">
          ADD NEW COUPON
        </Typography>
        <Typography>
          Enter exat 8-character coupon. No matter uppercase or lowercase.
          Amount is in %
        </Typography>
      </Box>

      <form onSubmit={onCreateCoupon}>
        <InputBox>
          <CouponInfoInput
            inputRef={couponCodeRef}
            label="Coupon code"
            defaultValue={couponCode}
            variant="outlined"
            placeholder="FOR EXAMPLE: 0AT725KA, DISC2023"
          />
        </InputBox>
        <InputBox>
          <CouponInfoInput
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
          <CreateCouponButton
            color="secondary"
            startIcon={<AddCircle />}
            type="submit"
            size="large"
            variant="contained"
          >
            Create coupon
          </CreateCouponButton>
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
