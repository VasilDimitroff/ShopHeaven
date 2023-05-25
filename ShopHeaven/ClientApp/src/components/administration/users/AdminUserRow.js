import { React, useState, Fragment } from "react";
import {
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Chip,
  Box,
  Grid, Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../../theme";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";
import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  Star,
  RateReview,
  Person,
  Edit,
  Delete,
} from "@mui/icons-material";

export default function AdminUserRow(props) {
  const [user, setUser] = useState(props.user);
  const [isDeleted, setIsDeleted] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [openDeleteForm, setOpenDeleteForm] = useState(false);

  function handleSetOpenEditForm() {
    if(isDeleted){
      return;
    }
    setOpenDeleteForm(false);
    setOpenEditForm((prev) => !prev);
  }

  function handleSetOpenDeleteForm() {
    setOpenEditForm(false);
    setOpenDeleteForm((prev) => !prev);
  }

  function onCancelButtonClicked() {
    setOpenDeleteForm((prev) => !prev);
  }

  function updateUser(updatedUser) {
    console.log("UPDATED User", updatedUser);
    setUser(updatedUser);
  }

  function userDeleted() {
    setIsDeleted(true);
  }

  function userUndeleted() {
    setIsDeleted(false);
  }

  function formatDate(date){
    const day = date.substring(8,10);
    const month = date.substring(5,7); 
    const year = date.substring(0,4);
  
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }

  const UserNameTableCell = styled(TableCell)({
    fontWeight: 500,
    fontSize: 18,
  });

  const UserInfoHolder = styled(Box)({
    marginTop: theme.spacing(1),
    [theme.breakpoints.up("lg")]: {
      display: "flex",
      alignItems: "center",
      gap: 15,
    },
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
        <TableCell sx={{ width: "20px", padding: 0, paddingLeft: 1 }}>
          <IconButton size="small" onClick={handleSetOpenEditForm}>
            {openEditForm ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <UserNameTableCell
          onClick={handleSetOpenEditForm}
          component="th"
          scope="row"
        >
          {!isDeleted ? user?.email : "USER DELETED"}
          {!isDeleted ? (
            <UserInfoHolder>
              <UserInfoText>
                <Chip
                  sx={{ padding: 0.5 }}
                  icon={<Star />}
                  variant="outlined"
                  color="warning"
                  label={`Username: ${user?.username}`}
                  size="small"
                />
              </UserInfoText>
              <UserInfoText>
                <Chip
                  sx={{ padding: 0.5 }}
                  icon={<RateReview />}
                  variant="outlined"
                  color="primary"
                  label={`Created on: ${formatDate(user?.createdOn)}`}
                  size="small"
                />
              </UserInfoText>
              <UserInfoText>
                <Chip
                  sx={{ padding: 0.5 }}
                  icon={<Person />}
                  variant="outlined"
                  label={`Roles: ${user?.roles?.join(", ")}`}
                  size="small"
                />
              </UserInfoText>
            </UserInfoHolder>
          ) : (
            <></>
          )}
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
              <StyledIconButton
                onClick={handleSetOpenDeleteForm}
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
          <Collapse in={openEditForm} timeout="auto" unmountOnExit>
            {/* pass roles and user */}
            <EditUser user={user}/>
          </Collapse>
          <Collapse in={openDeleteForm} timeout="auto" unmountOnExit>
            <DeleteUser user={user} onCancelButtonClicked={onCancelButtonClicked} userDeleted={userDeleted} userUndeleted={userUndeleted}/>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}
