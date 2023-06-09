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
import { Delete, Cancel } from "@mui/icons-material";
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

      setDeleteResponse(response?.data);
      
      setIsDeleted(true);
      props.updateUser(response?.data);
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
              Be careful!
            </Typography>
          </Box>
          <ButtonsHolder>
            <DeleteUserButton
              startIcon={<Delete />}
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
              startIcon={<Cancel />}
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
              <Alert variant="filled" sx={{ marginTop: theme.spacing(1) }} severity="error">
                {deleteUserErrorMessage}
              </Alert>
            </Zoom>
          ) : (
            ""
          )}
        </Fragment>
    </Paper>
  );
}
