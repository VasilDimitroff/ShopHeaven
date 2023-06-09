import { React, useState, Fragment } from "react";
import {
  Box,
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Stack,
  Chip,
  Grid,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../../theme";
import { ActionIconButton } from "../../../styles/styles";
import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  Edit,
  Delete,
  Category,
} from "@mui/icons-material";
import EditCoupon from "./EditCoupon";
import DeleteCoupon from "./DeleteCoupon";

export default function AdminCouponsRow(props) {
  const [coupon, setCoupon] = useState(props.coupon);
  const [isDeleted, setIsDeleted] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);

  function updateCoupon(newCoupon) {
    setCoupon(newCoupon);
  }

  function couponDeleted() {
    setIsDeleted(true);
  }

  function couponUndeleted() {
    setIsDeleted(false);
  }

  function onCancelButtonClicked() {
    setShowDeleteForm((prev) => !prev);
  }

  function handleShowEditForm() {
    if (isDeleted) {
      return;
    }

    setShowDeleteForm(false);
    setOpenEditForm((prev) => !prev);
  }

  function handleShowDeleteForm() {
    setOpenEditForm(false);
    setShowDeleteForm((prev) => !prev);
  }

  const CouponTableCell = styled(TableCell)({
    fontWeight: 500,
    fontSize: 18,
    "&:hover": {
      cursor: "pointer",
      background: "#EAEAF7",
    },
  });

  const CouponInfoText = styled(Box)({
    fontSize: 11,
    fontWeight: 400,
    [theme.breakpoints.down("lg")]: {
      marginTop: theme.spacing(0.4),
    },
  });

  return (
    <Fragment>
      <TableRow
        sx={{
          "&:hover": {
            cursor: "pointer",
            background: "#EAEAF7",
          },
          "& > *": { borderBottom: "unset" },
        }}
      >
        <CouponTableCell
          onClick={handleShowEditForm}
          component="th"
          scope="row"
        >
          <IconButton aria-label="expand row" size="small">
            {openEditForm ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
          {!isDeleted ? <>{coupon?.code}</> : "COUPON DELETED"}
          {!isDeleted ? (
            <Stack flexWrap={"wrap"} direction={"row"}>
              <Box>
                <Tooltip
                  title={`Coupon is applied to ${coupon?.ordersCount} orders`}
                  placement="bottom-start"
                  arrow
                >
                  <CouponInfoText>
                    <Chip
                      sx={{ padding: 0.5, cursor: "pointer" }}
                      icon={<Category />}
                      variant="outlined"
                      color="primary"
                      label={`to ${coupon?.ordersCount} orders`}
                      size="small"
                    />
                  </CouponInfoText>
                </Tooltip>
              </Box>
            </Stack>
          ) : (
            <></>
          )}
        </CouponTableCell>
        <CouponTableCell align="center" onClick={handleShowEditForm}>
          {`- ${coupon?.amount} %`}
        </CouponTableCell>
        <TableCell>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <ActionIconButton
                onClick={handleShowEditForm}
                color="warning"
                size="small"
              >
                <Edit />
              </ActionIconButton>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <ActionIconButton
                onClick={handleShowDeleteForm}
                color="error"
                size="small"
              >
                <Delete />
              </ActionIconButton>
            </Grid>
          </Grid>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={showDeleteForm} timeout="auto" unmountOnExit>
            <Box>
              <DeleteCoupon
                couponDeleted={couponDeleted}
                couponUndeleted={couponUndeleted}
                onCancelButtonClicked={onCancelButtonClicked}
                coupon={coupon}
              />
            </Box>
          </Collapse>
          <Collapse in={openEditForm} timeout="auto" unmountOnExit>
            <Box>
              <EditCoupon coupon={coupon} updateCoupon={updateCoupon} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}
