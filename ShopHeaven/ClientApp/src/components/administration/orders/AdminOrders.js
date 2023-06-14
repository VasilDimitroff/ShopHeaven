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
import AdminOrderRow from "./AdminOrderRow";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { ApiEndpoints } from "../../../api/endpoints";
import {
  ordersPerPageInAdminPanel,
  requestTimerMilliseconds,
  loginPath,
} from "../../../constants";
import AppPagination from "../../common/AppPagination";
import { useNavigate, useLocation } from "react-router-dom";

export default function AdminOrders() {
  const axiosPrivate = useAxiosPrivate();

  //is data loading
  const [isLoading, setIsLoading] = useState(false);

  //orders array adn orderStatuses
  const [orders, setOrders] = useState();

  // order statuses
  const [orderStatuses, setOrderStatuses] = useState([]);

  //timer for delay request
  const [timer, setTimer] = useState(0);

  //current page with records
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(10);
  const [totalOrdersCount, setTotalOrdersCount] = useState(0);

  //searching values
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOrderProperty, setSearchOrderProperty] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const effectRun = useRef(false);

  // searchTerm and filter criteria refs for input
  const searchInputRef = useRef();

  // by what to searc => username, product name,  ..???
  const propertySearchRef = useRef();

  useEffect(() => {
    let timeoutId;

    const controller = new AbortController();

    const getOrders = async () => {
      try {
        setIsLoading(true);

        let pagingModel = {
          recordsPerPage: ordersPerPageInAdminPanel,
          page: page,
          searchTerm: searchTerm.trim(),
          criteria: searchOrderProperty.trim(),
        };

        console.log("ORDER REQUEST ", pagingModel);

        const response = await axiosPrivate.post(
          ApiEndpoints.orders.getAll,
          pagingModel,
          {
            signal: controller.signal,
          }
        );
        console.log(response.data);
        setOrders(response?.data?.orders);
        setOrderStatuses(response?.data?.orderStatuses);
        setNumberOfPages(response?.data?.pagesCount);
        setTotalOrdersCount(response?.data?.ordersCount);

        if (page > response?.data?.pagesCount) {
          setPage(1);
        }

        setIsLoading(false);
      } catch (error) {
        console.log("ERROR: " + error);
        navigate(`${loginPath}`, { state: { from: location }, replace: true });
      }
    };

    const delayGetOrdersRequest = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (effectRun.current) {
          getOrders();
        }
      }, timer);
    };

    delayGetOrdersRequest();

    return () => {
      controller.abort();
      effectRun.current = true; 
      clearTimeout(timeoutId);
      setTimer(0);
    };
  }, [page, searchTerm, searchOrderProperty]);

  
  useEffect(() => {
    setPage(1);
  }, [searchTerm,searchOrderProperty])

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
    setSearchOrderProperty(propertyToSearch);
    setTimer(requestTimerMilliseconds);
  }

  function clearSearchValue() {
    searchInputRef.current.value = "";
    propertySearchRef.current.value = "";
    setSearchTerm("");
    setSearchOrderProperty("");
    setPage(1);
  }

  const OrderTableCell = styled(TableCell)({
    fontSize: 18,
  });

  const PaginationHolder = styled(Box)({
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(1),
  });

  const CancelButton = styled(Cancel)({
    position: "absolute",
    right: 5,
    top: 22,
    "&:hover": {
      color: theme.palette.primary.main,
      cursor: "pointer",
    },
  });

  const StyledSelect = {
    cursor: "pointer",
    width: "100%",
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    border: "1px solid #C6BFBE",
    textTransform: "uppercase",
    fontSize: 14,
  };

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
              placeholder="Search order by recipient, username, email, product or status..."
            />
            <CancelButton onClick={clearSearchValue} />
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={3}>
            <select
              onChange={onSearchUser}
              style={StyledSelect}
              defaultValue={searchOrderProperty}
              ref={propertySearchRef}
              name="filter"
            >
              <option value="">{"--- FILTER BY ---"}</option>
              <option value="recipient">RECIPIENT</option>
              <option value="email">EMAIL</option>
              <option value="username">USERNAME</option>
              <option value="product-name">PRODUCT NAME</option>
              {
                orderStatuses?.map(status => {
                  return <option key={status} value={status?.toLowerCase()}>{status}</option>
                })
              }
            </select>
          </Grid>
        </Grid>
      </form>
      {searchTerm || searchOrderProperty ? (
        <Alert severity="info" variant="filled" sx={{ mt: 1 }}>
          <Typography>
            <b>{totalOrdersCount} results</b> for{" "}
            <b>"{searchTerm ? searchTerm : <></>}"</b>
            {searchOrderProperty ? (
              <Fragment>
                {" "}
                filtered by <b>{searchOrderProperty}</b>
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
                <OrderTableCell></OrderTableCell>
                <OrderTableCell align="left"></OrderTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders?.map((order) => {
                return (
                  <AdminOrderRow
                    key={order?.id}
                    orderStatuses={orderStatuses}
                    order={order}
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
          scroll={true}
        />
      </PaginationHolder>
    </Box>
  );
}
