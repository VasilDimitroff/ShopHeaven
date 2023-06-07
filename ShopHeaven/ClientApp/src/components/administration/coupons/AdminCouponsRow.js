import { React, useState, Fragment } from "react";
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
  Paper,
  Chip,
  Grid,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../../theme";
import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  Edit,
  Delete,
  AddCircle,
  RemoveCircle,
  Person,
  ShoppingBag,
  Category,
  Label,
} from "@mui/icons-material";
import EditCoupon from "./EditCoupon";
import DeleteCoupon from "./DeleteCoupon";

export default function AdminCouponsRow(props) {
  const [coupon, setCoupon] = useState(props.coupon);
  const [isDeleted, setIsDeleted] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);

  function updateCoupon(newName, newDescription) {
    setCoupon((prev) => {
      return {
        ...prev,
        name: newName,
        description: newDescription,
      };
    });
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


  const StyledButtonBox = styled(Box)({
    marginTop: theme.spacing(2),
  });

  const CouponNumberTableCell = styled(TableCell)({
    fontWeight: 500,
    fontSize: 18,
    "&:hover": {
      cursor: "pointer",
      background: "#EAEAF7",
    },
  });

  const StyledIconButton = styled(IconButton)({
    borderWidth: "1.5px",
    borderStyle: "solid",
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
        <CouponNumberTableCell
          onClick={handleShowEditForm}
          component="th"
          scope="row"
        >
          <IconButton aria-label="expand row" size="small">
            {true ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
          {!isDeleted ? <>{coupon?.name}</> : "COUPON DELETED"}
          {!isDeleted ? (
            <Grid container spacing={1} columns={3}>
              <Grid item xs={3} sm={1} md={1} lg={1}>
                <Tooltip
                  title={`5 subcategories`}
                  placement="bottom-start"
                  arrow
                >
                  <CouponInfoText>
                    <Chip
                      sx={{ padding: 0.5 }}
                      icon={<Category />}
                      variant="outlined"
                      color="primary"
                      label={`Applied to 5 orders`}
                      size="small"
                    />
                  </CouponInfoText>
                </Tooltip>
              </Grid>
            </Grid>
          ) : (
            <></>
          )}
        </CouponNumberTableCell>
        <TableCell>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <StyledIconButton
                onClick={handleShowEditForm}
                color="warning"
                size="small"
              >
                <Edit />
              </StyledIconButton>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <StyledIconButton
                onClick={handleShowDeleteForm}
                color="error"
                size="small"
              >
                <Delete />
              </StyledIconButton>
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
                category={coupon}
              />
            </Box>
          </Collapse>
          <Collapse in={openEditForm} timeout="auto" unmountOnExit>
            <Box>
              <EditCoupon
                coupon={coupon}
                updateCoupon={updateCoupon}
              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}
