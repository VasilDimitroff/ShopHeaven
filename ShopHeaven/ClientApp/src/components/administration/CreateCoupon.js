import { React, useState, Fragment, useRef, useEffect } from "react";
import {
  Box,
  Button,
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Typography,
  Table,
  TableBody,
  TableHead,
  TableContainer,
  InputBase,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";
import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  Close,
  Delete,
  AddCircle,
  PhotoCamera,
} from "@mui/icons-material";
import axios from "axios";
import { ApiEndpoints } from "../../api/endpoints";


export default function CreateCoupon() {

  let couponNameRef = useRef();
  let couponDescriptionRef = useRef();

  const [createCouponResponseMessage, setCreateCouponResponseMessage] =
    useState("");
  const [createCouponErrorMessage, setCreateCouponErrorMessage] = useState(false);

  function clearFormValues() {
    couponNameRef.current.value = "";
    couponDescriptionRef.current.value = "";
    document.getElementById("create-coupon-image").value = "";
  }

  const InputBox = styled(Box)({
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  });

  const CreateCouponButton = styled(Button)({
    width: "100%",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
  });

  const ResponseMessage = styled(Typography)({
    textAlign: "center",
    color: theme.palette.success.main,
  });

  const ErrorResponseMessage = styled(Typography)({
    textAlign: "center",
    color: theme.palette.error.main,
  });

  const CouponInfoInput = styled(InputBase)({
    background: "rgb(255,249,249)",
    width: "100%",
    marginTop: theme.spacing(2),
    paddingTop: theme.spacing(0.3),
    paddingBottom: theme.spacing(0.3),
    paddingLeft: theme.spacing(1),
    paddingRigth: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
  });

  return (
    <Fragment>
 
            <Box sx={{ margin: 2 }}>
              <Typography variant="h6" gutterBottom component="div">
                COUPON INFO
              </Typography>
              <form component="form">
                <InputBox>
                  <CouponInfoInput
                    sx={{ fontSize: 24 }}
                    inputRef={couponNameRef}
                    placeholder="Min. 8-numbered code"
                  />
                </InputBox>
                <InputBox>
                  <CouponInfoInput
                    sx={{ fontSize: 24 }}
                    inputRef={couponNameRef}
                    placeholder="Amount in %"
                  />
                </InputBox>
                <Box sx={{display: "flex", gap: 2}}>
                <CreateCouponButton
                  type="submit"
                  size="medium"
                  variant="contained"
                >
                  CREATE COUPON
                </CreateCouponButton>
                </Box>
              </form>
            </Box>
      <ResponseMessage>{createCouponResponseMessage}</ResponseMessage>
      {createCouponErrorMessage ? (
        <ErrorResponseMessage>
          An error during coupon editing!
        </ErrorResponseMessage>
      ) : (
        ""
      )}
    </Fragment>
  );
}