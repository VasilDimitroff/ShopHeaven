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
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";
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
import UndeleteUser from "./UndeleteUser";

export default function AdminUserRow(props) {
  const [user, setUser] = useState(props.user);

  const [openEditForm, setOpenEditForm] = useState(false);
  const [openDeleteForm, setOpenDeleteForm] = useState(false);
  const [openUndeleteForm, setOpenUndeleteForm] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  function handleSetOpenEditForm() {
    if (user?.isDeleted) {
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

  function updateUser(updatedUser) {
    setUser(updatedUser);
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

  const UserNameTableCell = styled(TableCell)({
    fontWeight: 500,
    fontSize: 18,
  });

  const UserInfoText = styled(Box)({
    fontSize: 13,
    fontWeight: 400,
    [theme.breakpoints.down("lg")]: {
      marginTop: theme.spacing(0.4),
    },
  });

  const StyledIconButton = styled(IconButton)({
    borderWidth: "1.5px",
    borderStyle: "solid",
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
        <UserNameTableCell
          onClick={handleSetOpenEditForm}
          component="th"
          scope="row"
        >
          <IconButton size="small">
            {openEditForm ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
          {user?.isDeleted ? (
            <>
              {user?.email}
              <Typography
                color="error"
                sx={{ display: "inline", fontWeight: 500 }}
              >
                {" "}
                (User Deleted)
              </Typography>
            </>
          ) : (
            <>{user?.email}</>
          )}
          <Grid container spacing={1} columns={4}>
            <Grid item xs={4} sm={2} md={1} lg={1}>
              <Tooltip title={`Username: ${user?.username}`} placement="bottom-start" arrow>
                <UserInfoText>
                  <Chip
                    sx={{ padding: 0.5 }}
                    icon={<AccountCircle />}
                    variant="outlined"
                    color="primary"
                    label={`Username: ${user?.username}`}
                    size="small"
                  />
                </UserInfoText>
              </Tooltip>
            </Grid>
            <Grid item xs={4} sm={2} md={1} lg={1}>
              <Tooltip
                placement="bottom-start"
                title={`Created on: ${formatDate(user?.createdOn)}`}
                arrow
              >
                <UserInfoText>
                  <Chip
                    sx={{ padding: 0.5 }}
                    icon={<Event />}
                    variant="outlined"
                    color="primary"
                    label={`Created on: ${formatDate(user?.createdOn)}`}
                    size="small"
                  />
                </UserInfoText>
              </Tooltip>
            </Grid>
            <Grid item xs={4} sm={2} md={1} lg={1}>
              <Tooltip
                placement="bottom-start"
                title={`User has these roles: ${user?.roles?.map(
                  (x) => x.name
                )}`}
                arrow
              >
                <UserInfoText>
                  <Chip
                    sx={{ padding: 0.5 }}
                    icon={<Group />}
                    variant="outlined"
                    label={`User roles: ${user?.roles?.map((x) => x.name)}`}
                    size="small"
                    color="primary"
                  />
                </UserInfoText>
              </Tooltip>
            </Grid>
            <Grid item xs={4} sm={2} md={1} lg={1}>
              <Tooltip
                placement="bottom-start"
                title={`Is user deleted: ${user?.isDeleted ? "Yes" : "No"}`}
                arrow
              >
                <UserInfoText>
                  <Chip
                    sx={{ padding: 0.5 }}
                    icon={<Delete />}
                    variant="outlined"
                    label={`Deleted: ${user?.isDeleted ? "Yes" : "No"}`}
                    size="small"
                    color={user?.isDeleted ? "error" : "success"}
                  />
                </UserInfoText>
              </Tooltip>
            </Grid>
          </Grid>
        </UserNameTableCell>
        <TableCell align="center">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <StyledIconButton
                onClick={handleSetOpenEditForm}
                color="warning"
                size="small"
              >
                <Edit />
              </StyledIconButton>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              {!user?.isDeleted ? (
                <StyledIconButton
                  onClick={handleSetOpenDeleteForm}
                  color="error"
                  size="small"
                >
                  <Delete />
                </StyledIconButton>
              ) : (
                <StyledIconButton
                  onClick={handleSetOpenUndeleteForm}
                  color="success"
                  size="small"
                >
                  <RestoreFromTrash />
                </StyledIconButton>
              )}
            </Grid>
          </Grid>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={openEditForm} timeout="auto" unmountOnExit>
            <EditUser
              user={user}
              applicationRoles={props.applicationRoles}
              updateUser={updateUser}
            />
          </Collapse>
          <Collapse in={openDeleteForm} timeout="auto" unmountOnExit>
            <DeleteUser
              user={user}
              onCancelButtonClicked={onCancelButtonClicked}
              updateUser={updateUser}
            />
          </Collapse>
          <Collapse in={openUndeleteForm} timeout="auto" unmountOnExit>
            <UndeleteUser
              onUndeleteCancelButtonClicked={onUndeleteCancelButtonClicked}
              updateUser={updateUser}
              user={user}
            />
          </Collapse>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={8000}
            message={`${user.email} is deleted! To edit the user, first you should undelete it!`}
            severity="error"
            onClose={handleSnackbarClose}
          />
        </TableCell>
      </TableRow>
    </Fragment>
  );
}