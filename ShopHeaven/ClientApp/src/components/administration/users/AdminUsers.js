import { React, Fragment, useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  TableRow,
  TableCell,
  Table,
  TableBody,
  TableHead,
  TableContainer,
  Grid,
  Alert,
  Typography,
} from "@mui/material";
import { Search, Cancel } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { theme } from "../../../theme";
import Loader from "../../common/Loader";
import AdminUserRow from "./AdminUserRow";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { ApiEndpoints } from "../../../api/endpoints";
import {
  usersPerPageInAdminPanel,
  requestTimerMilliseconds,
} from "../../../constants";
import AppPagination from "../../common/AppPagination";
import { useNavigate, useLocation } from "react-router-dom";

export default function AdminUsers() {
  const axiosPrivate = useAxiosPrivate();

  //is data loading
  const [isLoading, setIsLoading] = useState(false);

  //users array
  const [users, setUsers] = useState();
  // all roles in the app
  const [applicationRoles, setApplicationRoles] = useState([]);

  //timer for delay request
  const [timer, setTimer] = useState(0);

  //current page with records
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(10);
  const [totalUsersCount, setTotalUsersCount] = useState(0);

  //searching values
  const [searchTerm, setSearchTerm] = useState("");
  const [searchUserProperty, setSearchUserProperty] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const effectRun = useRef(false);

  // searchTerm and filter criteria refs for input
  const searchInputRef = useRef();
  const propertySearchRef = useRef();

  useEffect(() => {
    let timeoutId;

    const controller = new AbortController();

    const getUsers = async () => {
      try {
        setIsLoading(true);

        let pagingModel = {
          recordsPerPage: usersPerPageInAdminPanel,
          page: page,
          searchTerm: searchTerm.trim(),
          criteria: searchUserProperty.trim(),
        };

        console.log("USER REQUEST ", pagingModel);

        const response = await axiosPrivate.post(
          ApiEndpoints.users.getAll,
          pagingModel,
          {
            signal: controller.signal,
          }
        );
        console.log(response.data);
        setUsers(response?.data?.users);
        setApplicationRoles(response?.data?.applicationRoles);
        setNumberOfPages(response?.data?.pagesCount);
        setTotalUsersCount(response?.data?.usersCount);

        if (page > response?.data?.pagesCount) {
          setPage(1);
        }

        setIsLoading(false);
      } catch (error) {
        console.log("ERROR: " + error);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    const delayGetUsersRequest = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (effectRun.current) {
          getUsers();
        }
      }, timer);
    };

    delayGetUsersRequest();

    return () => {
      controller.abort();
      effectRun.current = true; // update the value of effectRun to true
      clearTimeout(timeoutId);
      setTimer(0);
    };
  }, [page, searchTerm, searchUserProperty]);

  function onSearchUser(e) {
    e.preventDefault();

    let searchValue = searchInputRef.current.value;
    let propertyToSearch = propertySearchRef.current.value;

    if (!searchValue.trim()) {
      searchValue = "";
    }

    if (!propertyToSearch.trim()) {
      propertyToSearch = "";
    }
    setSearchTerm(searchValue);
    setSearchUserProperty(propertyToSearch);
    setTimer(requestTimerMilliseconds);
  }

  function clearSearchValue() {
    searchInputRef.current.value = "";
    propertySearchRef.current.value = "";
    setSearchTerm("");
    setSearchUserProperty("");
    setPage(1);
  }

  const UserTableCell = styled(TableCell)({
    fontSize: 18,
  });

  const PaginationHolder = styled(Box)({
    marginTop: theme.spacing(4),
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
  };

  const CancelButton = styled(Cancel)({
    position: "absolute",
    right: 5,
    top: 22,
    "&:hover": {
      color: theme.palette.primary.main,
      cursor: "pointer",
    },
  });

  const StyledSearchIcon = styled(Search)({
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    fontSize: "40px",
    position: "absolute",
    zIndex: 1,
  });

  return (
    <Box>
      <form>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={8}
            md={9}
            lg={9}
            sx={{ position: "relative" }}
          >
            <StyledSearchIcon />
            <input
              style={{
                position: "relative",
                width: "100%",
                border: "1px solid #C6BFBE",
                backgroundColor: "rgb(255,249,249)",
                padding: theme.spacing(0.65),
                paddingLeft: theme.spacing(5),
                borderRadius: theme.shape.borderRadius,
              }}
              ref={searchInputRef}
              onChange={onSearchUser}
              defaultValue={searchTerm}
              placeholder="Search user by name or email..."
            />
            <CancelButton onClick={clearSearchValue} />
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={3}>
            <select
              onChange={onSearchUser}
              style={StyledSelect}
              defaultValue={searchUserProperty}
              ref={propertySearchRef}
              name="filter"
            >
              <option value="">{"--- EMAIL AND USERNAME ---"}</option>
              <option value="email">Email</option>
              <option value="username">Username</option>
            </select>
          </Grid>
        </Grid>
      </form>
      {searchTerm || searchUserProperty ? (
        <Alert severity="info" variant="filled" sx={{ mt: 1 }}>
          <Typography>
            <b>{totalUsersCount} results</b> for{" "}
            <b>"{searchTerm ? searchTerm : <></>}"</b>
            {searchUserProperty ? (
              <Fragment>
                {" "}
                filtered by <b>{searchUserProperty}</b>
              </Fragment>
            ) : (
              <></>
            )}{" "}
            - (<b>Page {page}</b>)
          </Typography>
        </Alert>
      ) : (
        <></>
      )}
      {isLoading ? (
        <Box sx={{ padding: theme.spacing(3) }}>
          <Loader />
        </Box>
      ) : (
        <TableContainer component={Box}>
          <Table>
            <TableHead>
              <TableRow>
                <UserTableCell></UserTableCell>
                <UserTableCell align="center"></UserTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((user) => {
                return (
                  <AdminUserRow
                    key={user.id}
                    applicationRoles={applicationRoles}
                    user={user}
                  />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <PaginationHolder>
        <AppPagination
          page={page}
          setPage={setPage}
          numberOfPages={numberOfPages}
        />
      </PaginationHolder>
    </Box>
  );
}
