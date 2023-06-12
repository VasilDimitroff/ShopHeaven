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
//import EditUser from "./EditUser";
import DeleteOrder from "./DeleteOrder";
import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  Group,
  Event,
  AccountCircle,
  Edit,
  Delete,
  RestoreFromTrash,
} from "@mui/icons-material";
import UndeleteOrder from "./UndeleteOrder";

export default function AdminOrderRow(props) {
  const [order, setOrder] = useState(props.order);

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
    const day = date.substring(8, 10);
    const month = date.substring(5, 7);
    const year = date.substring(0, 4);

    const formattedDate = `${day}/${month}/${year}`;
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
              {order?.email}
              <Typography
                color="error"
                sx={{ display: "inline", fontWeight: 500 }}
              >
                {" "}
                (User Deleted)
              </Typography>
            </>
          ) : (
            <>{order?.email}</>
          )}
          <Grid container spacing={1} columns={4}>
            <Grid item xs={4} sm={2} md={1} lg={1}>
              <Tooltip title={`Username: ${order?.id}`} placement="bottom-start" arrow>
                <OrderInfoText>
                  <Chip
                    sx={{ padding: 0.5 }}
                    icon={<AccountCircle />}
                    variant="outlined"
                    color="primary"
                    label={`Username: ${order?.isDeleted}`}
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
                    label={`Created on: ${formatDate(order?.createdOn)}`}
                    size="small"
                  />
                </OrderInfoText>
              </Tooltip>
            </Grid>
            <Grid item xs={4} sm={2} md={1} lg={1}>
              <Tooltip
                placement="bottom-start"
                title={`User has these roles: ${order?.roles?.map(
                  (x) => x.name
                )}`}
                arrow
              >
                <OrderInfoText>
                  <Chip
                    sx={{ padding: 0.5 }}
                    icon={<Group />}
                    variant="outlined"
                    label={`User roles: ${order?.roles?.map((x) => x.name)}`}
                    size="small"
                    color="primary"
                  />
                </OrderInfoText>
              </Tooltip>
            </Grid>
            <Grid item xs={4} sm={2} md={1} lg={1}>
              <Tooltip
                placement="bottom-start"
                title={`Is user deleted: ${order?.isDeleted ? "Yes" : "No"}`}
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
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <ActionIconButton
                onClick={handleSetOpenEditForm}
                color="warning"
                size="small"
              >
                <Edit />
              </ActionIconButton>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
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
            /*
             <Collapse in={openEditForm} timeout="auto" unmountOnExit>
           <EditUser
              user={user}
              applicationRoles={props.applicationRoles}
              updateOrder={updateOrder}
            />
          </Collapse>
            */
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