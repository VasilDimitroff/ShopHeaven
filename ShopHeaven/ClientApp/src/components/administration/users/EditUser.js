import { React, useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  Paper,
  Chip,
  InputBase,
  Grid,
  Divider,
  Alert,
  Zoom,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { AccountCircle, AddCircle, RemoveCircle } from "@mui/icons-material";
import { theme } from "../../../theme";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { ApiEndpoints } from "../../../api/endpoints";
import {
  applicationUserRole,
  noPermissionsForOperationMessage,
  usernameRequiredLength
} from "../../../constants";

export default function EditUser(props) {
  // api requests
  const axiosPrivate = useAxiosPrivate();

  const [user, setUser] = useState(props.user);

  //user is in these roles
  const [userRoles, setUserRoles] = useState(user.roles); // array[{roleId, name}]

  //dropdown with all roles of the app
  const [applicationRoles, setApplicationRoles] = useState(
    props.applicationRoles
  );

  //product editing refs
  const userNameRef = useRef();
  const userEmailRef = useRef();
  const addToRoleRef = useRef();
  const removeFromRoleRef = useRef();

  //errors
  const [messages, setMessages] = useState({
    userNameError: "",
    userEmailError: "",
  });

  const [editUserResponseMessage, setEditUserResponseMessage] = useState("");
  const [editUserErrorMessage, setEditUserErrorMessage] = useState("");

  const [addUserToRoleResponse, setAddUserToRoleResponse] = useState("");
  const [addUserToRoleErrorMessage, setAddUserToRoleErrorMessage] =
    useState("");

  const [
    removeUserFromRoleResponseMessage,
    setRemoveUserFromRoleResponseMessage,
  ] = useState("");
  const [removeUserFromRoleErrorMessage, setRemoveUserFromRoleErrorMessage] =
    useState("");

  useEffect(() => {}, [messages]);

  function setValuesToStates() {
    setUser((prev) => {
      return {
        ...prev,
        username: userNameRef.current.value,
        email: userEmailRef.current.value,
      };
    });
  }

  function onRemoveUserFromRole() {
    let roleId = removeFromRoleRef.current.value;
    let roleName = userRoles.find((x) => x.roleId === roleId)?.name;

    if (roleName.toLowerCase() === applicationUserRole.toLowerCase()) {
      setRemoveUserFromRoleResponseMessage("");
      setRemoveUserFromRoleErrorMessage(
        `You cannot remove user from ${applicationUserRole} role`
      );
      return;
    } else {
      setRemoveUserFromRoleErrorMessage("");
    }

    const newRoles = userRoles.filter((x) => x.roleId !== roleId);
    setUserRoles(newRoles);

    const userRole = {
      userId: user.id,
      roleId: roleId,
    };

    removeUserFromRole(userRole);
  }

  async function removeUserFromRole(userRole) {
    try {
      const controller = new AbortController();

      const response = await axiosPrivate.post(
        ApiEndpoints.users.removeUserFromRole,
        userRole,
        {
          signal: controller.signal,
        }
      );

      controller.abort();

      setRemoveUserFromRoleErrorMessage("");
      setRemoveUserFromRoleResponseMessage(
        `${
          user.email
        } successfully removed from the role! Now he is in roles: ${response?.data?.roles?.map(
          (r) => r.name
        )}`
      );
      console.log("ADDDU SER", response?.data)
      props.updateUser(response?.data);
    } catch (error) {
      setRemoveUserFromRoleResponseMessage("");

      if (error?.response?.status === 401 || error?.response?.status === 403) {
        setRemoveUserFromRoleErrorMessage(noPermissionsForOperationMessage);
      } else {
        setRemoveUserFromRoleErrorMessage(error?.response?.data);
      }
      console.log(error?.message);
    } finally {
      setAddUserToRoleErrorMessage("");
      setAddUserToRoleResponse("");
    }
  }

  function onAddUserToRole() {
    let roleId = addToRoleRef.current.value;
    let repeatedRole = userRoles.find((x) => x.roleId === roleId);

    if (repeatedRole) {
      setAddUserToRoleResponse("");
      setAddUserToRoleErrorMessage(
        `User already has role ${repeatedRole.name}`
      );
      return;
    } else {
      setAddUserToRoleErrorMessage("");
    }

    let role = applicationRoles.find((x) => x.roleId === roleId);

    setUserRoles((userRoles) => [...userRoles, role]);

    const userRole = {
      userId: user.id,
      roleId: roleId,
    };

    addUserToRole(userRole);
  }

  async function addUserToRole(userRole) {
    try {
      const controller = new AbortController();

      const response = await axiosPrivate.post(
        ApiEndpoints.users.addUserToRole,
        userRole,
        {
          signal: controller.signal,
        }
      );

      controller.abort();

      setAddUserToRoleErrorMessage("");
      setAddUserToRoleResponse(
        `${
          user.email
        } successfully added to new role! Now he is in roles: ${response?.data?.roles?.map(
          (r) => r.name
        )}`
      );
          console.log("ADDDU SER", response?.data)
     props.updateUser(response?.data);
    } catch (error) {
      setAddUserToRoleResponse("");

      if (error?.response?.status === 401 || error?.response?.status === 403) {
        setAddUserToRoleErrorMessage(noPermissionsForOperationMessage);
      } else {
        setAddUserToRoleErrorMessage(error?.response?.data);
      }
      console.log(error?.message);
    } finally {
      setRemoveUserFromRoleErrorMessage("");
      setRemoveUserFromRoleResponseMessage("");
    }
  }

  function onEditUser(e) {
    e.preventDefault();

    setValuesToStates();

    let isFormValid = validateForm();

    if (!isFormValid) {
      return;
    }

    const editedUser = {
      id: user.id,
      username: userNameRef.current.value.trim(),
      email: userEmailRef.current.value.trim(),
    };

    console.log("DATA ", editedUser)

    editUser(editedUser);
  }

  async function editUser(editedUser) {
    try {
      const controller = new AbortController();

      const response = await axiosPrivate.post(
        ApiEndpoints.users.editUser,
        editedUser,
        {
          signal: controller.signal,
        }
      );

      controller.abort();

      setEditUserErrorMessage("");
      setEditUserResponseMessage(`${user.email} successfully updated`);

      props.updateUser(response?.data);
    } catch (error) {
      setEditUserResponseMessage("");

      if (error?.response?.status === 401 || error?.response?.status === 403) {
        setEditUserErrorMessage(noPermissionsForOperationMessage);
      } else {
        setEditUserErrorMessage(error?.response?.data);
      }
      console.log(error?.message);
    }
  }

  function validateForm() {
    let isValid = true;
    let errors = [];

    if (userNameRef.current.value.length < usernameRequiredLength) {

      let msg = `Username must contain at least ${usernameRequiredLength} characters`;
      errors.push(msg);

      setMessages((prev) => {
        return {
          ...prev,
          userNameError: msg,
        };
      });

      isValid = false;
    } else {
      setMessages((prev) => {
        return {
          ...prev,
          userNameError: "",
        };
      });
    }

    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!userEmailRef.current.value.match(mailformat)) {
      let msg = "Please enter valid email format!";
      errors.push(msg);

      setMessages((prev) => {
        return {
          ...prev,
          userEmailError: msg,
        };
      });

      isValid = false;
    } else {
      setMessages((prev) => {
        return {
          ...prev,
          userEmailError: "",
        };
      });
    }

    if (!isValid) {
      let final =
        "The next validation errors occurs. Please resolve them and try again: \r\n";
      for (let i = 0; i < errors.length; i++) {
        final += ` (${i + 1}). ${errors[i]} \r\n`;
      }

      console.log("EDITING ERRORS", final);

      setEditUserResponseMessage("");
      setEditUserErrorMessage(final);
    }

    return isValid;
  }

  const MainWrapper = styled(Paper)({
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  });

  const UserInfoInput = styled(InputBase)({
    background: "rgb(255,249,249)",
    width: "100%",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    paddingTop: theme.spacing(0.3),
    paddingBottom: theme.spacing(0.3),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
  });

  const InputBox = styled(Box)({
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  });

  const EditUserButton = styled(Button)({
    width: "100%",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
  });

  const StyledSelect = {
    cursor: "pointer",
    width: "100%",
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    border: "1px solid #C6BFBE",
    textTransform: "uppercase",
    fontSize: 14,
    backgroundColor: "rgb(255,249,249)",
    marginTop: theme.spacing(1),
  };

  const RoleButton = styled(Button)({
    width: "100%",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
  });

  const HeadingChip = styled(Chip)({
    fontSize: 21,
    padding: theme.spacing(2),
    fontWeight: 500,
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    color: theme.palette.white.main,
    backgroundColor: theme.palette.secondary.main,
  });

  const SubheadingChip = styled(Chip)({
    fontSize: 12,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  });

  const ErrorAlert = styled(Alert)({
    fontWeight: 500,
    color: theme.palette.error.main,
  });

  return (
    <MainWrapper>
      <Divider>
        <HeadingChip label="MAIN INFO" variant="outlined" color="secondary" />
      </Divider>
      <form component="form" onSubmit={onEditUser}>
        <InputBox>
          <Divider>
            <SubheadingChip label="EMAIL" variant="outlined" color="primary" />
          </Divider>
          <UserInfoInput
            inputRef={userEmailRef}
            placeholder={user.email}
            defaultValue={user.email}
          />
          {messages.userEmailError ? (
            <ErrorAlert severity="error">{messages.userEmailError}</ErrorAlert>
          ) : (
            <></>
          )}
        </InputBox>
        <Divider>
          <SubheadingChip label="USERNAME" variant="outlined" color="primary" />
        </Divider>
        <InputBox>
          <UserInfoInput
            inputRef={userNameRef}
            placeholder={user.username}
            defaultValue={user.username}
          />
          {messages.userNameError ? (
            <ErrorAlert severity="error">{messages.userNameError}</ErrorAlert>
          ) : (
            <></>
          )}
        </InputBox>
        <EditUserButton type="submit" size="big" variant="contained">
          EDIT USER
        </EditUserButton>
      </form>
      <Box>
        {editUserResponseMessage ? (
          <Zoom in={editUserResponseMessage.length > 0 ? true : false}>
            <Alert sx={{ marginTop: theme.spacing(1) }} severity="success">
              {editUserResponseMessage}
            </Alert>
          </Zoom>
        ) : (
          ""
        )}
        {editUserErrorMessage ? (
          <Zoom in={editUserErrorMessage.length > 0 ? true : false}>
            <ErrorAlert sx={{ marginTop: theme.spacing(1) }} severity="error">
              {editUserErrorMessage}
            </ErrorAlert>
          </Zoom>
        ) : (
          ""
        )}
      </Box>
      <InputBox>
        <Divider>
          <HeadingChip
            label="ROLES MANAGEMENT"
            variant="outlined"
            color="secondary"
          />
        </Divider>
        <Grid container spacing={3} sx={{ textAlign: "center" }}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Divider>
              <SubheadingChip
                label="ADD USER TO ROLE"
                variant="outlined"
                color="primary"
              />
            </Divider>
            <select
              style={StyledSelect}
              ref={addToRoleRef}
              name="role"
              defaultValue={undefined}
            >
              {applicationRoles
                ?.filter(
                  (x) => !userRoles.some((item) => item.roleId === x.roleId)
                )
                .map((role) => (
                  <option key={role?.roleId} value={role?.roleId}>
                    {role?.name}
                  </option>
                ))}
            </select>
            <RoleButton
              disabled={
                applicationRoles?.filter(
                  (x) => !userRoles.some((item) => item.roleId === x.roleId)
                ).length < 1
              }
              onClick={onAddUserToRole}
              variant="contained"
              size="small"
            >
              ADD TO ROLE
            </RoleButton>
            {addUserToRoleErrorMessage ? (
              <ErrorAlert severity="error">
                {addUserToRoleErrorMessage}
              </ErrorAlert>
            ) : (
              <></>
            )}
            {addUserToRoleResponse ? (
              <Alert sx={{ fontWeight: 500 }} severity="success">
                {addUserToRoleResponse}
              </Alert>
            ) : (
              <></>
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Divider>
              <SubheadingChip
                label="REMOVE FROM ROLE"
                variant="outlined"
                color="primary"
              />
            </Divider>
            <select
              style={StyledSelect}
              name="userRole"
              defaultValue={undefined}
              ref={removeFromRoleRef}
            >
              {userRoles?.map((role) => (
                <option key={role?.roleId} value={role.roleId}>
                  {role?.name}
                </option>
              ))}
            </select>
            <RoleButton
              onClick={onRemoveUserFromRole}
              variant="contained"
              size="small"
            >
              REMOVE FROM ROLE
            </RoleButton>
            {removeUserFromRoleErrorMessage ? (
              <ErrorAlert severity="error">
                {removeUserFromRoleErrorMessage}
              </ErrorAlert>
            ) : (
              <></>
            )}
            {removeUserFromRoleResponseMessage ? (
              <Alert sx={{ fontWeight: 500 }} severity="success">
                {removeUserFromRoleResponseMessage}
              </Alert>
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
      </InputBox>
    </MainWrapper>
  );
}