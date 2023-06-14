import { React, useState, Fragment } from "react";
import {
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Chip,
  Box,
  Grid,
  Typography,
  Snackbar,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../../theme";
import { ActionIconButton } from "../../../styles/styles";
import DeleteOrder from "./DeleteOrder";
import EditOrder from "./EditOrder";
import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  Group,
  Event,
  AccountCircle,
  Delete,
  RestoreFromTrash,
  Info,
  MoreHoriz,
  Paid,
  Person,
} from "@mui/icons-material";
import useAppSettings from "../../../hooks/useAppSettings";
import UndeleteOrder from "./UndeleteOrder";

export default function AdminOrderRow(props) {
  const { appSettings } = useAppSettings();

  const [order, setOrder] = useState(props.order);
  const [orderStatuses, setOrderStatuses] = useState(props.orderStatuses);

  const [openEditForm, setOpenEditForm] = useState(false);
  const [openDeleteForm, setOpenDeleteForm] = useState(false);
  const [openUndeleteForm, setOpenUndeleteForm] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  function handleSetOpenEditForm() {
    if (order?.isDeleted) {
      setOpenSnackbar((prev) => !prev);
      return;
    }
    setOpenDeleteForm(false);
    setOpenUndeleteForm(false);
    setOpenEditForm((prev) => !prev);
  }

  function handleSetOpenDeleteForm() {
    setOpenEditForm(false);
    setOpenUndeleteForm(false);
    setOpenDeleteForm((prev) => !prev);
  }

  function handleSetOpenUndeleteForm() {
    setOpenEditForm(false);
    setOpenDeleteForm(false);
    setOpenUndeleteForm((prev) => !prev);
  }

  function onCancelButtonClicked() {
    setOpenDeleteForm((prev) => !prev);
  }

  function onUndeleteCancelButtonClicked() {
    setOpenUndeleteForm((prev) => !prev);
  }

  function updateOrder(updatedOrder) {
    setOrder(updatedOrder);
  }

  function handleSnackbarClose() {
    setOpenSnackbar((prev) => !prev);
  }

  function formatDate(date) {
    const minutes = date.substring(14, 16);
    const hour = date.substring(11, 13);
    const day = date.substring(8, 10);
    const month = date.substring(5, 7);
    const year = date.substring(0, 4);

    const formattedDate = `${day}/${month}/${year}, ${hour}:${minutes}`;
    return formattedDate;
  }

  const OrderTableCell = styled(TableCell)({
    fontWeight: 500,
    fontSize: 18,
  });

  const OrderInfoText = styled(Box)({
    fontSize: 13,
    fontWeight: 400,
    [theme.breakpoints.down("lg")]: {
      marginTop: theme.spacing(0.4),
    },
  });

  const StyledSelect = {
    cursor: "pointer",
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    border: "1px solid #C6BFBE",
    textTransform: "uppercase",
    fontSize: 14,
  };


  return (
    <Fragment>
      <TableRow
        sx={{
          "&:hover": {
            cursor: "pointer",
            background: "#EAEAF7",
          },
        }}
      >
        <OrderTableCell
          onClick={handleSetOpenEditForm}
          component="th"
          scope="row"
        >
          <IconButton size="small">
            {openEditForm ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
          {order?.isDeleted ? (
            <>
              {order?.id}
              <Typography
                color="error"
                sx={{ display: "inline", fontWeight: 500 }}
              >
                {" "}
                (Order Deleted)
              </Typography>
            </>
          ) : (
            <>{order?.id}</>
          )}
          <Grid container spacing={1} columns={5}>
            <Grid item xs={4} sm={2} md={1} lg={1}>
              <Tooltip title={`By: ${order?.createdBy}`} placement="bottom-start" arrow>
                <OrderInfoText>
                  <Chip
                    sx={{ padding: 0.5 }}
                    icon={<AccountCircle />}
                    variant="outlined"
                    color="primary"
                    label={`By: ${order?.createdBy}`}
                    size="small"
                  />
                </OrderInfoText>
              </Tooltip>
            </Grid>
            <Grid item xs={4} sm={2} md={1} lg={1}>
              <Tooltip
                placement="bottom-start"
                title={`Created on: ${formatDate(order?.createdOn)}`}
                arrow
              >
                <OrderInfoText>
                  <Chip
                    sx={{ padding: 0.5 }}
                    icon={<Event />}
                    variant="outlined"
                    color="primary"
                    label={`Created: ${formatDate(order?.createdOn)}`}
                    size="small"
                  />
                </OrderInfoText>
              </Tooltip>
            </Grid>
            <Grid item xs={4} sm={2} md={1} lg={1}>
              <Tooltip
                placement="bottom-start"
                title={`Recipient of the order is: ${order?.recipient}`}
                arrow
              >
                <OrderInfoText>
                  <Chip
                    sx={{ padding: 0.5 }}
                    icon={<Person/>}
                    variant="outlined"
                    label={`For: ${order?.recipient}`}
                    size="small"
                    color="primary"
                  />
                </OrderInfoText>
              </Tooltip>
            </Grid>
            <Grid item xs={4} sm={2} md={1} lg={1}>
              <Tooltip
                placement="bottom-start"
                title={`Total amount paid for this order: ${appSettings.appCurrency.code} ${order?.payment?.amount}`}
                arrow
              >
                <OrderInfoText>
                  <Chip
                    sx={{ padding: 0.5 }}
                    icon={<Paid />}
                    variant="outlined"
                    label={`Paid: ${appSettings.appCurrency.code} ${order?.payment?.amount}`}
                    size="small"
                    color="primary"
                  />
                </OrderInfoText>
              </Tooltip>
            </Grid>
            <Grid item xs={4} sm={2} md={1} lg={1}>
              <Tooltip
                placement="bottom-start"
                title={`Is order deleted: ${order?.isDeleted ? "Yes" : "No"}`}
                arrow
              >
                <OrderInfoText>
                  <Chip
                    sx={{ padding: 0.5 }}
                    icon={<Delete />}
                    variant="outlined"
                    label={`Deleted: ${order?.isDeleted ? "Yes" : "No"}`}
                    size="small"
                    color={order?.isDeleted ? "error" : "success"}
                  />
                </OrderInfoText>
              </Tooltip>
            </Grid>
          </Grid>
        </OrderTableCell>
        <TableCell align="center">
          <Grid container spacing={5} sx={{ display: "flex", alignItems: "center" }}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Box>
                <select
                  style={StyledSelect}
                  name="status"
                  defaultValue={order?.status}
                >
                  {orderStatuses?.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <ActionIconButton
                onClick={handleSetOpenEditForm}
                color="info"
                size="small"
              >
                <MoreHoriz />
              </ActionIconButton>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              {!order?.isDeleted ? (
                <ActionIconButton
                  onClick={handleSetOpenDeleteForm}
                  color="error"
                  size="small"
                >
                  <Delete />
                </ActionIconButton>
              ) : (
                <ActionIconButton
                  onClick={handleSetOpenUndeleteForm}
                  color="success"
                  size="small"
                >
                  <RestoreFromTrash />
                </ActionIconButton>
              )}
            </Grid>
          </Grid>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          {
            <Collapse in={openEditForm} timeout="auto" unmountOnExit>
              <EditOrder
                order={order}
                orderStatuses={props.orderStatuses}
                updateOrder={updateOrder}
              />
            </Collapse>
          }
          <Collapse in={openDeleteForm} timeout="auto" unmountOnExit>
            <DeleteOrder
              order={order}
              onCancelButtonClicked={onCancelButtonClicked}
              updateOrder={updateOrder}
            />
          </Collapse>
          <Collapse in={openUndeleteForm} timeout="auto" unmountOnExit>
            <UndeleteOrder
              onUndeleteCancelButtonClicked={onUndeleteCancelButtonClicked}
              updateOrder={updateOrder}
              order={order}
            />
          </Collapse>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={8000}
            message={`${order.email} is deleted! To edit the order, first you should undelete it!`}
            severity="error"
            onClose={handleSnackbarClose}
          />
        </TableCell>
      </TableRow>
    </Fragment>
  );
}