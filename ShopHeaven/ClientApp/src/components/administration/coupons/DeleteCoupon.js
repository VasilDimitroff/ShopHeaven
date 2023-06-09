import { React, useState, Fragment } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Alert,
  AlertTitle,
  Zoom,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Delete, Cancel, Refresh, Undo } from "@mui/icons-material";
import { theme } from "../../../theme";
import { ApiEndpoints } from "../../../api/endpoints";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { noPermissionsForOperationMessage } from "../../../constants";

export default function DeleteCoupon(props) {

  let axiosPrivate = useAxiosPrivate();

  const [coupon, setCoupon] = useState(props.coupon);
  const [deleteResponse, setDeleteResponse] = useState(undefined);
  const [undeleteResponse, setUndeleteResponse] = useState(undefined);
  const [undoDeleteButtonClicked, setUndoDeleteButtonClicked] = useState(false);
  const [deleteCouponResponseMessage, setDeleteCouponResponseMessage] =
    useState("");
  const [deleteCouponErrorMessage, setDeleteCouponErrorMessage] =
    useState("");

  function refreshPage() {
    window.location.reload(false);
  }

  function onDeleteCoupon() {
    deleteCoupon(coupon.id);
  }

  async function deleteCoupon(couponId) {
    try {
      const controller = new AbortController();

      const response = await axiosPrivate.post(
        ApiEndpoints.coupons.deleteCoupon,
        JSON.stringify({ id: couponId }),
        {
          signal: controller.signal,
        }
      );

      controller.abort();

      setDeleteCouponErrorMessage("");
      setDeleteCouponResponseMessage(
        "Coupon " + coupon.code + " deleted!"
      );
      setUndeleteResponse(undefined);
      setDeleteResponse(response?.data);
      setUndoDeleteButtonClicked(false);
      props.couponDeleted();
      console.log(response?.data);
    } catch (error) {
      setDeleteCouponResponseMessage("");
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        setDeleteCouponErrorMessage(
          noPermissionsForOperationMessage
        );
      } else {
        setDeleteCouponErrorMessage(error?.response?.data);
      }
      console.log(error.message);
    }
  }

  function onUndeleteCoupon() {
    undeleteCoupon(coupon.id);
  }

  async function undeleteCoupon(couponId) {
    try {
      const controller = new AbortController();
      const response = await axiosPrivate.post(
        ApiEndpoints.coupons.undeleteCoupon,
        JSON.stringify({ id: couponId }),
        {
          signal: controller.signal,
        }
      );

      controller.abort();

      setDeleteCouponErrorMessage("");
      setDeleteCouponResponseMessage(
        "Coupon " + coupon.code + " undeleted!"
      );
      setDeleteResponse(undefined);
      setUndeleteResponse(response?.data);
      setUndoDeleteButtonClicked(true);

      props.couponUndeleted();
      console.log(response?.data);
    } catch (error) {
      setDeleteCouponResponseMessage("");
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        setDeleteCouponErrorMessage(
          noPermissionsForOperationMessage
        );
      } else {
        setDeleteCouponErrorMessage(error?.response?.data);
      }
      console.log(error.message);
    }
  }

  const DeleteCouponButton = styled(Button)({
    width: "100%",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
  });
  
  return (
    <Paper sx={{ padding: theme.spacing(2), marginTop: theme.spacing(2) }}>
      {deleteResponse || undeleteResponse ? (
        deleteResponse ? (
          <Alert severity="warning">
            <AlertTitle>Coupon {coupon.code} successfully deleted!</AlertTitle>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                {!undoDeleteButtonClicked ? (
                  <Button
                    sx={{ mt: 1 }}
                    startIcon={<Undo />}
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={onUndeleteCoupon}
                  >
                    UNDO DELETE
                  </Button>
                ) : (
                  ""
                )}
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
                sx={{ position: "relative" }}
              >
                <Button
                  sx={{ mt: 1 }}
                  startIcon={<Refresh />}
                  size="small"
                  variant="contained"
                  onClick={refreshPage}
                >
                  REFRESH
                </Button>
              </Grid>
            </Grid>
          </Alert>
        ) : (
          <Alert severity="success">
            <AlertTitle>Coupon {coupon.code} successfully revealed!</AlertTitle>
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <Button
                startIcon={<Refresh />}
                size="small"
                variant="contained"
                onClick={refreshPage}
              >
                REFRESH
              </Button>
            </Box>
          </Alert>
        )
      ) : (
        <Fragment>
          <Box
            sx={{
              textAlign: "center",
              marginLeft: theme.spacing(4),
              marginTop: theme.spacing(3),
            }}
          >
            <Typography variant="h6">
              You are on the way to delete coupon {coupon.code.toUpperCase()}!
            </Typography>
            <Typography variant="p" color="error">
              Be careful!
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <DeleteCouponButton
                onClick={onDeleteCoupon}
                type="submit"
                size="large"
                variant="outlined"
                color="error"
                startIcon={<Delete />}
              >
                DELETE
              </DeleteCouponButton>
            </Grid>
            <Grid
              item
              xs={6}
              sm={6}
              md={6}
              lg={6}
              sx={{ position: "relative" }}
            >
              <DeleteCouponButton
                onClick={props.onCancelButtonClicked}
                type="submit"
                size="large"
                variant="contained"
                color="error"
                startIcon={<Cancel />}
              >
                CANCEL
              </DeleteCouponButton>
            </Grid>
          </Grid>

          {deleteCouponResponseMessage ? (
            <Zoom in={deleteCouponResponseMessage.length > 0 ? true : false}>
              <Alert sx={{ marginTop: theme.spacing(1) }} severity="success">
                {deleteCouponResponseMessage}
              </Alert>
            </Zoom>
          ) : (
            ""
          )}
          {deleteCouponErrorMessage ? (
            <Zoom in={deleteCouponErrorMessage.length > 0 ? true : false}>
              <Alert sx={{ marginTop: theme.spacing(1) }} severity="error">
                {deleteCouponErrorMessage}
              </Alert>
            </Zoom>
          ) : (
            ""
          )}
        </Fragment>
      )}
    </Paper>
  );
}
