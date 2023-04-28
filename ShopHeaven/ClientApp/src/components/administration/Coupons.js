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
  RemoveCircle,
} from "@mui/icons-material";
import axios from "axios";
import { ApiEndpoints } from "../../endpoints";
import CreateCoupon from './CreateCoupon'


function Row(props) {
  const [open, setOpen] = useState(false);

  let couponNameRef = useRef();
  let couponDescriptionRef = useRef();

  const [editCouponResponseMessage, setEditCouponResponseMessage] =
    useState("");
  const [editCouponErrorMessage, setEditCouponErrorMessage] = useState(false);

  function clearFormValues() {
    couponNameRef.current.value = "";
    couponDescriptionRef.current.value = "";
    document.getElementById("edit-coupon-image").value = "";
  }

  const CouponNameTableCell = styled(TableCell)({
    fontWeight: 500,
    fontSize: 18,
  });

  const InputBox = styled(Box)({
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  });

  const EditCouponButton = styled(Button)({
    width: "20%",
    [theme.breakpoints.down("lg")]: {
      width: "50%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "30%",
    },
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
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell align="left">{props.coupon.id}</TableCell>
        <CouponNameTableCell component="th" scope="row">
          {props.coupon.code}
        </CouponNameTableCell>
        <TableCell align="center">{`${props.coupon.amount}%`}</TableCell>
        <TableCell align="center">{`${props.coupon.orders} orders`}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              <Typography variant="h6" gutterBottom component="div">
                COUPON INFO
              </Typography>
              <form component="form">
                <InputBox>
                  <CouponInfoInput
                    sx={{ fontSize: 24 }}
                    inputRef={couponNameRef}
                    defaultValue={props.coupon.code}
                  />
                </InputBox>
                <Box sx={{display: "flex", gap: 2}}>
                <EditCouponButton
                  type="submit"
                  size="medium"
                  variant="contained"
                >
                  SAVE COUPON
                </EditCouponButton>
                <EditCouponButton
                  type="submit"
                  size="medium"
                  color="error"
                  variant="contained"
                >
                 DELETE COUPON
                </EditCouponButton>
                </Box>
              </form>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <ResponseMessage>{editCouponResponseMessage}</ResponseMessage>
      {editCouponErrorMessage ? (
        <ErrorResponseMessage>
          An error during coupon editing!
        </ErrorResponseMessage>
      ) : (
        ""
      )}
    </Fragment>
  );
}

export default function Coupons(props) {
  let couponNameRef = useRef();
  let couponDescriptionRef = useRef();;

  const [showCreateCoupon, setShowCreateCoupon] = useState(false);

  function handleShowCreateCoupon(){
    setShowCreateCoupon(!showCreateCoupon)
  }

  const CouponTableCell = styled(TableCell)({
    fontSize: 18,
  });

  const StyledButtonBox = styled(Box)({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  });

  return (
    <Box>
      <TableContainer>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell sx={{width: "50px"}} />
              <CouponTableCell align="left">ID</CouponTableCell>
              <CouponTableCell>CODE</CouponTableCell>
              <CouponTableCell align="center">
                AMOUNT
              </CouponTableCell>
              <CouponTableCell align="center">
                APLLIED TO
              </CouponTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.coupons.map((coupon, index) => {
              return <Row key={index} coupon={coupon} />;
            })}
          </TableBody>
        </Table>
        </TableContainer>
        <StyledButtonBox>
          <Button
            onClick={handleShowCreateCoupon}
            variant="contained"
            size="small"
            startIcon={showCreateCoupon === true ? <RemoveCircle/> : <AddCircle />}
          >
            {showCreateCoupon === false ? "Add new coupon" : "Hide creation fields"}
          </Button>
        </StyledButtonBox>
      
      <Collapse in={showCreateCoupon} timeout="auto" unmountOnExit>
        <CreateCoupon/>
       </Collapse>
      <Box>
      </Box>
    </Box>
  );
}