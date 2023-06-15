import { React, useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Alert,
  Zoom,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { RestoreFromTrash, Cancel } from "@mui/icons-material";
import { theme } from "../../../theme";
import { ApiEndpoints } from "../../../api/endpoints";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { noPermissionsForOperationMessage } from "../../../constants";

export default function UndeleteOrder(props) {
  let axiosPrivate = useAxiosPrivate();

  const [order, setOrder] = useState(props.order);
  const [undeleteOrderResponseMessage, setUndeleteOrderResponseMessage] =
    useState("");
  const [undeleteOrderErrorMessage, setUndeleteOrderErrorMessage] = useState("");
  const [isUndeleted, setIsUndeleted] = useState(false);

  function onUndeleteOrder() {
    undeleteOrder(order?.id);
  }

  async function undeleteOrder(orderId) {
    try {
      const controller = new AbortController();
      const response = await axiosPrivate.post(
        ApiEndpoints.orders.undeleteOrder,
        JSON.stringify({ id: orderId }),
        {
          signal: controller.signal,
        }
      );

      controller.abort();

      setUndeleteOrderErrorMessage("");
      setUndeleteOrderResponseMessage("Order " + order.id + " undeleted!");

      setIsUndeleted(true);
      props.updateOrder(response?.data);
    } catch (error) {
      setUndeleteOrderResponseMessage("");
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        setUndeleteOrderErrorMessage(noPermissionsForOperationMessage);
      } else {
        setUndeleteOrderErrorMessage(error?.response?.data);
      }
      console.log(error.message);
    }
  }

  const UndeleteOrderButton = styled(Button)({
    width: "100%",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
  });

  const ButtonsHolder = styled(Box)({
    display: "flex",
    width: "100%",
    margin: "auto",
    gap: 60,
    justifyContent: "center",
  });

  return (
    <Paper sx={{ padding: theme.spacing(2), marginTop: theme.spacing(2) }}>
      <Box
        sx={{
          textAlign: "center",
          marginLeft: theme.spacing(4),
          marginTop: theme.spacing(3),
        }}
      >
        <Typography variant="h6">
          Do you want to reveal order {order?.id}!
        </Typography>
      </Box>
      <ButtonsHolder>
        <UndeleteOrderButton
          onClick={onUndeleteOrder}
          startIcon={<RestoreFromTrash />}
          type="submit"
          size="large"
          variant="contained"
          color="primary"
          disabled={isUndeleted ? true : false}
        >
          UNDELETE ORDER
        </UndeleteOrderButton>
        <UndeleteOrderButton
          startIcon={<Cancel />}
          onClick={props.onUndeleteCancelButtonClicked}
          type="submit"
          size="large"
          variant="outlined"
          color="primary"
        >
          CANCEL
        </UndeleteOrderButton>
      </ButtonsHolder>
      {undeleteOrderResponseMessage ? (
        <Zoom in={undeleteOrderResponseMessage.length > 0 ? true : false}>
          <Alert sx={{ marginTop: theme.spacing(1) }} severity="success">
            {undeleteOrderResponseMessage}
          </Alert>
        </Zoom>
      ) : (
        <></>
      )}
      {undeleteOrderErrorMessage ? (
        <Zoom in={undeleteOrderErrorMessage.length > 0 ? true : false}>
          <Alert variant="filled" sx={{ marginTop: theme.spacing(1) }} severity="error">
            {undeleteOrderErrorMessage}
          </Alert>
        </Zoom>
      ) : (
        ""
      )}
    </Paper>
  );
}