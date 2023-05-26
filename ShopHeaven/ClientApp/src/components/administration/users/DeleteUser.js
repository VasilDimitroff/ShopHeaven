import { React, useState, Fragment } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Alert,
  AlertTitle,
  Zoom,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../../theme";
import { ApiEndpoints } from "../../../api/endpoints";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { noPermissionsForOperationMessage } from "../../../constants";

export default function DeleteUser(props) {
  let axiosPrivate = useAxiosPrivate();

  const [user, setUser] = useState(props.user);
  const [deleteResponse, setDeleteResponse] = useState(undefined);
  const [undeleteResponse, setUndeleteResponse] = useState(undefined);
  const [undoDeleteButtonClicked, setUndoDeleteButtonClicked] = useState(false);
  const [deleteUserResponseMessage, setDeleteUserResponseMessage] =
    useState("");
  const [deleteUserErrorMessage, setDeleteUserErrorMessage] =
    useState("");
  const [isDeleted, setIsDeleted] = useState(false);

  function refreshPage() {
    window.location.reload(false);
  }

  function onDeleteUser() {
    deleteUser(user.id);
  }

  async function deleteUser(userId) {
    try {
      const controller = new AbortController();

      const response = await axiosPrivate.post(
        ApiEndpoints.users.deleteUser,
        JSON.stringify({ id: userId }),
        {
          signal: controller.signal,
        }
      );

      controller.abort();

      setDeleteUserErrorMessage("");
      setDeleteUserResponseMessage(
        "User " + user.email + " deleted!"
      );
      setUndeleteResponse(undefined);
      setDeleteResponse(response?.data);
      setUndoDeleteButtonClicked(false);
      
      setIsDeleted(true);
      props.userDeleted();
      console.log(response?.data);
    } catch (error) {
      setDeleteUserResponseMessage("");
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        setDeleteUserErrorMessage(
          "You have no permissions to perform the operation"
        );
      } else {
        setDeleteUserErrorMessage(error?.response?.data);
      }
      console.log(error.message);
    }
  } 

  function onUndeleteUser() {
    undeleteUser(user.id);
  }

  const ErrorAlert = styled(Alert)({
    fontWeight: 500,
    color: theme.palette.error.main,
  });

  async function undeleteUser(userId) {
    try {
      const controller = new AbortController();
      const response = await axiosPrivate.post(
        ApiEndpoints.users.undeleteUser,
        JSON.stringify({ id: userId }),
        {
          signal: controller.signal,
        }
      );

      controller.abort();

      setDeleteUserErrorMessage("");
      setDeleteUserResponseMessage(
        "User " + user.email + " undeleted!"
      );
      setDeleteResponse(undefined);
      setUndeleteResponse(response?.data);
      setUndoDeleteButtonClicked(true);

      setIsDeleted(false);
      props.userUndeleted();
      console.log(response?.data);
    } catch (error) {
      setDeleteUserResponseMessage("");
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        setDeleteUserErrorMessage(noPermissionsForOperationMessage);
      } else {
        setDeleteUserErrorMessage("Error!");
      }
      console.log(error.message);
    }
  }

  const DeleteUserButton = styled(Button)({
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
      {deleteResponse || undeleteResponse ? (
        deleteResponse ? (
          <Alert severity="warning">
            <AlertTitle>
              User {user.email} successfully deleted!
            </AlertTitle>
            <ul>
              <li>1 user deleted</li>
              <li>{deleteResponse?.deletedReviews} reviews deleted</li>
              <li>{deleteResponse?.deletedTags} tags deleted</li>
              <li>{deleteResponse?.deletedCarts} cart products deleted</li>
              <li>
                {deleteResponse?.deletedWishlists} wishlist products deleted
              </li>
              <li>{deleteResponse?.deletedOrders} order products deleted</li>
              <li>
                {deleteResponse?.deletedLabels} labels of products deleted
              </li>
              <li>{deleteResponse?.deletedImages} product images deleted</li>
              <li>
                {deleteResponse?.deletedSpecifications} product specifications
                deleted
              </li>
            </ul>
            <Box sx={{ display: "flex", gap: 2 }}>
              {!undoDeleteButtonClicked ? (
                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  onClick={onUndeleteUser}
                >
                  UNDO DELETE
                </Button>
              ) : (
                ""
              )}
              <Button size="small" variant="contained" onClick={refreshPage}>
                REFRESH
              </Button>
            </Box>
          </Alert>
        ) : (
          <Alert severity="success">
            <AlertTitle>
              User {user.email} successfully revealed!
            </AlertTitle>
            <ul>
              <li>1 user revealed</li>
              <li>{undeleteResponse?.revealedReviews} reviews revealed</li>
              <li>{undeleteResponse?.revealedTags} tags revealed</li>
              <li>{undeleteResponse?.revealedCarts} cart products revealed</li>
              <li>
                {undeleteResponse?.revealedWishlists} wishlist products revealed
              </li>
              <li>{undeleteResponse?.revealedOrders} order products revealed</li>
              <li>
                {undeleteResponse?.revealedLabels} labels of products revealed
              </li>
              <li>{undeleteResponse?.revealedImages} product images revealed</li>
              <li>
                {undeleteResponse?.revealedSpecifications} product specifications
                revealed
              </li>
            </ul>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button size="small" variant="contained" onClick={refreshPage}>
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
              You are on the way to delete user {user.email.toUpperCase()}!
            </Typography>
            <Typography variant="p" color="error">
              If you do that, you will delete all related tags, images, labels, specifications and reviews!
            </Typography>
          </Box>
          <ButtonsHolder>
            <DeleteUserButton
              onClick={onDeleteUser}
              type="submit"
              size="large"
              variant="outlined"
              color="error"
              disabled={isDeleted ? true : false}
            >
              DELETE USER
            </DeleteUserButton>
            <DeleteUserButton
              onClick={props.onCancelButtonClicked}
              type="submit"
              size="large"
              variant="contained"
              color="error"
            >
              CANCEL
            </DeleteUserButton>
          </ButtonsHolder>
          {deleteUserResponseMessage ? (
            <Zoom in={deleteUserResponseMessage.length > 0 ? true : false}>
              <Alert sx={{ marginTop: theme.spacing(1) }} severity="success">
                {deleteUserResponseMessage}
              </Alert>
            </Zoom>
          ) : (
            ""
          )}
          {deleteUserErrorMessage ? (
            <Zoom in={deleteUserErrorMessage.length > 0 ? true : false}>
              <ErrorAlert sx={{ marginTop: theme.spacing(1) }} severity="error">
                {deleteUserErrorMessage}
              </ErrorAlert>
            </Zoom>
          ) : (
            ""
          )}
        </Fragment>
      )}
    </Paper>
  );
}
