import { React, useState, useEffect, useRef } from "react";
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
} from "@mui/material";
import { Search, Cancel } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { theme } from "../../../theme";
import Loader from "../../common/Loader";
import AdminUserRow from "./AdminUserRow";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { ApiEndpoints } from "../../../api/endpoints";
import { usersPerPageInAdminPanel } from "../../../constants";
import AppPagination from "../../common/AppPagination";
import { useNavigate, useLocation } from "react-router-dom";

export default function AdminUsers() {
  const axiosPrivate = useAxiosPrivate();

  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState();

  //current page with records
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(10);

  const navigate = useNavigate();
  const location = useLocation();

  const effectRun = useRef(false);

  const [applicationRoles, setApplicationRoles] = useState([]);

  const searchInputRef = useRef();
  const roleSearchRef = useRef();

  useEffect(() => {
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        console.log("PAGE IS ", page);
        setIsLoading(true);

        let pagingModel = {
          recordsPerPage: usersPerPageInAdminPanel,
          page: page,
          searchTerm: "",
        };

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
        if (page > response?.data?.pagesCount) {
          setPage(1)
        }
        setIsLoading(false);
      } catch (error) {
        console.log("ERROR: " + error);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    if (effectRun.current) {
      getUsers();
    }

    return () => {
      controller.abort();
      effectRun.current = true; // update the value of effectRun to true
    };
  }, [page]);

  function clearSearchValue() {
    searchInputRef.current.value = "";
  }

  function onSearchUser(e) {
    e.preventDefault();

    const searchValue = searchInputRef.current.value;
    const userId = roleSearchRef.current.value;

    if (!searchValue.trim() || !userId.trim()) {
      return;
    }

    var filtered = users.filter((x) =>
      x.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setUsers(filtered);

    console.log(searchValue, userId);
  }

  const UserTableCell = styled(TableCell)({
    fontSize: 18,
  });

  const PaginationHolder = styled(Box)({
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(1),
  });

  const SearchInput = styled("input")({
    position: "relative",
    width: "100%",
    border: "1px solid #C6BFBE",
    backgroundColor: "rgb(255,249,249)",
    padding: theme.spacing(0.65),
    paddingLeft: theme.spacing(5),
    borderRadius: theme.shape.borderRadius,
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
      <form onSubmit={onSearchUser}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={12}
            md={7}
            lg={7}
            sx={{ position: "relative" }}
          >
            <StyledSearchIcon />
            <SearchInput ref={searchInputRef} placeholder="Search user by..." />
            <CancelButton onClick={clearSearchValue} />
          </Grid>
          <Grid item xs={8} sm={8} md={3} lg={4}>
            <select style={StyledSelect} ref={roleSearchRef} name="filter">
              <option value="email">Email</option>
              <option value="username">Username</option>
            </select>
          </Grid>
          <Grid item xs={4} sm={4} md={2} lg={1}>
            <Button
              sx={{ width: "100%", fontSize: 13 }}
              variant="contained"
              type="submit"
              color="primary"
            >
              SEARCH
            </Button>
          </Grid>
        </Grid>
      </form>
      <TableContainer component={Box}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  width: "20px",
                  padding: 0,
                  paddingLeft: theme.spacing(1),
                }}
              />
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
      {isLoading ? (
        <Box sx={{ padding: theme.spacing(3) }}>
          <Loader />
        </Box>
      ) : (
        <></>
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
