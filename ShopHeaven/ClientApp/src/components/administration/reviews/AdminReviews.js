import { React, Fragment, useState, useEffect, useRef } from "react";
import {
  Box,
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
import AdminReviewRow from "./AdminReviewRow";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { ApiEndpoints } from "../../../api/endpoints";
import {

  requestTimerMilliseconds,
  loginPath,
  reviewsPerPageInAdminPanel,
} from "../../../constants";
import AppPagination from "../../common/AppPagination";
import { useNavigate, useLocation } from "react-router-dom";

export default function AdminReviews() {
  const axiosPrivate = useAxiosPrivate();

  //is data loading
  const [isLoading, setIsLoading] = useState(false);

  //reviews array adn orderStatuses
  const [reviews, setReviews] = useState();

  // order statuses
  const [reviewStatuses, setReviewStatuses] = useState([]);

  //timer for delay request
  const [timer, setTimer] = useState(0);

  //current page with records
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(10);
  const [totalReviewsCount, setTotalReviewsCount] = useState(0);

  //searching values
  const [searchTerm, setSearchTerm] = useState("");
  const [searchReviewProperty, setSearchOrderProperty] = useState("");
  const [statusSearch, setStatusSearch] = useState("");

  //error message
  const [errorMessage, setErrorMessage] = useState("");

  //status message for child component
  const [isStatusUpdated, setIsStatusUpdated] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const effectRun = useRef(false);

  // searchTerm and filter criteria refs for input
  const searchInputRef = useRef();

  // by what to searc => username, product name,  ..???
  const propertySearchRef = useRef();

  // by what status to search => processing, delivered,  ..???
  const statusSearchRef = useRef();

  function handleReviewStatusUpdated() {
    setIsStatusUpdated(true);
  }

  useEffect(() => {
    let timeoutId;

    const controller = new AbortController();

    const getReviews = async () => {
      try {
        setIsLoading(true);

        let pagingModel = {
          recordsPerPage: reviewsPerPageInAdminPanel,
          page: page,
          status: statusSearch.trim(),
          searchTerm: searchTerm.trim(),
          criteria: searchReviewProperty.trim(),
        };

        console.log("review REQUEST ", pagingModel);

        const response = await axiosPrivate.post(
          ApiEndpoints.reviews.getAll,
          pagingModel,
          {
            signal: controller.signal,
          }
        );

        console.log(response.data);
        setReviews(response?.data?.reviews);
        setReviewStatuses(response?.data?.reviewStatuses);
        setNumberOfPages(response?.data?.pagesCount);
        setTotalReviewsCount(response?.data?.reviewsCount);

        if (page > response?.data?.pagesCount) {
          setPage(1);
        }


        setIsStatusUpdated(false);
        setIsLoading(false);
      } catch (error) {
        console.log("ERROR: " + error);
        navigate(`${loginPath}`, { state: { from: location }, replace: true });
      }
    };

    const delayGetReviewsRequest = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (effectRun.current) {
          getReviews();
        }
      }, timer);
    };

    delayGetReviewsRequest();

    return () => {
      controller.abort();
      effectRun.current = true;
      clearTimeout(timeoutId);
      setTimer(0);
    };
  }, [page, searchTerm, searchReviewProperty, statusSearch, isStatusUpdated]);


  useEffect(() => {
    setPage(1);
  }, [searchTerm, searchReviewProperty, statusSearch, isStatusUpdated])

  function onSearchReview(e) {
    e.preventDefault();

    setErrorMessage("");

    let searchValue = searchInputRef.current.value;
    let propertyToSearch = propertySearchRef.current.value;
    let statusToSearch = statusSearchRef.current.value;

    if (!searchValue.trim()) {
      searchValue = "";
    }

    if (!statusToSearch.trim()) {
      statusToSearch = "";
    }

    if (!propertyToSearch.trim() && searchValue.trim() && !statusToSearch) {
      propertyToSearch = "";
      searchValue = "";
      searchInputRef.current.value = "";
      setErrorMessage("Please select filter criteria");
    }

    setSearchTerm(searchValue);
    setSearchOrderProperty(propertyToSearch);
    setStatusSearch(statusToSearch);
    setTimer(requestTimerMilliseconds);
  }

  function clearSearchValue() {
    searchInputRef.current.value = "";
    propertySearchRef.current.value = "";
    statusSearchRef.current.value = "";

    setErrorMessage("");
    setSearchTerm("");
    setSearchOrderProperty("");
    setStatusSearch("");
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
            sm={12}
            md={8}
            lg={8}
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
              onChange={onSearchReview}
              defaultValue={searchTerm}
              placeholder="Enter search term and select filter..."
            />
            <CancelButton onClick={clearSearchValue} />
          </Grid>
          <Grid item xs={6} sm={6} md={2} lg={2}>
            <select
              onChange={onSearchReview}
              style={StyledSelect}
              defaultValue={searchReviewProperty}
              ref={propertySearchRef}
              name="filter"
            >
              <option value="">{"--- SEARCH BY ---"}</option>
              <option value="Email">AUTHOR EMAIL</option>
              <option value="Username">AUTHOR USERNAME</option>
              <option value="ProductName">PRODUCT NAME</option>
            </select>
          </Grid>
          <Grid item xs={6} sm={6} md={2} lg={2}>
            <select
              onChange={onSearchReview}
              style={StyledSelect}
              defaultValue={statusSearch}
              ref={statusSearchRef}
              name="filter"
            >
              <option value="">{"--- REVIEW STATUS ---"}</option>
              {
                reviewStatuses?.map(status => {
                  return <option key={status} value={status}>{status}</option>
                })
              }
            </select>
          </Grid>
        </Grid>
      </form>
      {
        errorMessage ?
          <Alert severity="error" variant="filled" sx={{ mt: 1 }}>
            {errorMessage}
          </Alert>

          : <></>
      }

      {((searchTerm && searchReviewProperty) || statusSearch) && !errorMessage ? (
        <Alert severity="info" sx={{ mt: 1 }}>
          <Typography>
            <b>{totalReviewsCount} results</b>
            {searchTerm && searchReviewProperty ? <> for <b>"{searchTerm}"</b></> : <></>}
            {searchReviewProperty ? (
              <Fragment>
                {" "}
                filtered by <b>{searchReviewProperty}</b>
              </Fragment>
            ) : (
              <></>
            )}

            {statusSearch ? (
              <Fragment>
                {" "}
                with status <b>{statusSearch}</b>
              </Fragment>
            ) : (
              <></>
            )}


            {" "}
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
                {reviews?.map((review) => {
                return (
                  <AdminReviewRow
                    handleReviewStatusUpdated={handleReviewStatusUpdated}
                    key={review?.id}
                    reviewStatuses={reviewStatuses}
                    review={review}
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
