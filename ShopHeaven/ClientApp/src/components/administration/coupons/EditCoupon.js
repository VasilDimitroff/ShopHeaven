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
import { Edit } from "@mui/icons-material";
import { ApiEndpoints } from "../../../api/endpoints";
import {couponCodeLength, noPermissionsForOperationMessage } from "../../../constants";
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
      setEditCouponErrorMessage(`Coupon code must be exact ${couponCodeLength} character long!`);
      return;
    }

    const couponRequest = {
      id: coupon.id,
      code: formCouponCode,
      amount: formCouponAmount
    }

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
      setEditCouponResponseMessage(`The new properties of the coupon: Code: ${response?.data?.code}, Amount: ${response?.data?.amount}`);

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

  const StyledInput = styled(TextField)({
    background: "rgb(255,249,249)",
    width: "100%",
    marginTop: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
  });

  const InputBox = styled(Box)({
    margin: theme.spacing(0, 4),
  });

  const CreateCategoryButton = styled(Button)({
    width: "100%",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
  });

  return (
    <Paper sx={{ padding: theme.spacing(2), marginTop: theme.spacing(2) }}>
    <Typography
      sx={{ marginLeft: theme.spacing(4), marginTop: theme.spacing(3) }}
      variant="h6"
      component="h2"
    >
      Edit Coupon {coupon.code}
    </Typography>
    <form onSubmit={onEditCoupon}>
      <InputBox>
        <StyledInput
          inputRef={couponCodeRef}
          label="Coupon code"
          variant="outlined"
          defaultValue={coupon.code}
        />
      </InputBox>
      <InputBox>
        <StyledInput
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
        <CreateCategoryButton
          color="secondary"
          startIcon={<Edit />}
          type="submit"
          size="large"
          variant="contained"
        >
          Edit coupon
        </CreateCategoryButton>
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
