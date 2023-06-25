import { React, useState, useEffect, useRef } from "react";
import { Box, Typography, Alert, Grid } from "@mui/material";
import { Cancel, Search } from "@mui/icons-material";
import { MainWrapper } from "../../../styles/styles";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { ApiEndpoints } from "../../../api/endpoints";
import {
	myReviewsPath,
	requestTimerMilliseconds,
	reviewsPerPageInMyReviewsPage,
} from "../../../constants";
import { theme } from "../../../theme";
import { styled } from "@mui/material/styles";
import BreadcrumbsBar from "../../common/BreadcrumbsBar";
import CircleLoader from "../../common/CircleLoader";
import SingleReview from "./SingleReview";
import AppPagination from "../../common/AppPagination";

const breadcrumbs = [
	{
		name: "Home",
		uri: "/",
	},
	{
		name: `My Reviews`,
		uri: `${myReviewsPath}`,
	},
];

export default function MyReviews() {
	const [myReviews, setMyReviews] = useState([]);

	const [reviewUpdated, setReviewUpdated] = useState(false);

	const { auth } = useAuth();
	const axiosPrivate = useAxiosPrivate();

	const effectRun = useRef(false);

	//is data loading
	const [isLoading, setIsLoading] = useState(false);

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

	// searchTerm and filter criteria refs for input
	const searchInputRef = useRef();

	// by what to searc => username, product name,  ..???
	const propertySearchRef = useRef();

	// by what status to search => processing, delivered,  ..???
	const statusSearchRef = useRef();

	useEffect(() => {
		let timeoutId;

		const controller = new AbortController();

		const getReviews = async () => {
			try {
				setIsLoading(true);

				let pagingModel = {
					userId: auth.userId,
					recordsPerPage: reviewsPerPageInMyReviewsPage,
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
				setMyReviews(response?.data?.reviews);
				setReviewStatuses(response?.data?.reviewStatuses);
				setNumberOfPages(response?.data?.pagesCount);
				setTotalReviewsCount(response?.data?.reviewsCount);

				if (page > response?.data?.pagesCount) {
					setPage(1);
				}

				setIsLoading(false);
			} catch (error) {
				console.log("ERROR: " + error);
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
	}, [page, searchTerm, searchReviewProperty, statusSearch, reviewUpdated]);

	useEffect(() => {
		setPage(1);
	}, [searchTerm, searchReviewProperty, statusSearch, reviewUpdated]);

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

	function updatedReview() {
		setReviewUpdated(true);
	}

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
			<BreadcrumbsBar breadcrumbsItems={breadcrumbs} />
			<MainWrapper>
				{!isLoading ? (
					<>
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
										{reviewStatuses?.map((status) => {
											return (
												<option key={status} value={status}>
													{status}
												</option>
											);
										})}
									</select>
								</Grid>
							</Grid>
						</form>
						{errorMessage ? (
							<Alert severity="error" variant="filled" sx={{ mt: 1 }}>
								{errorMessage}
							</Alert>
						) : (
							<></>
						)}

						{((searchTerm && searchReviewProperty) || statusSearch) &&
						!errorMessage ? (
							<Alert severity="info" sx={{ mt: 1 }}>
								<Typography>
									<b>{totalReviewsCount} results</b>
									{searchTerm && searchReviewProperty ? (
										<>
											{" "}
											for <b>"{searchTerm}"</b>
										</>
									) : (
										<></>
									)}
									{searchReviewProperty ? (
										<>
											{" "}
											filtered by <b>{searchReviewProperty}</b>
										</>
									) : (
										<></>
									)}
									{statusSearch ? (
										<>
											{" "}
											with status <b>{statusSearch}</b>
										</>
									) : (
										<></>
									)}{" "}
									- (<b>Page {page}</b>)
								</Typography>
							</Alert>
						) : (
							<></>
						)}

						<Grid container spacing={1.5} sx={{mt:1}}>
							{myReviews?.map((review) => {
								return <Grid item xs={12} key={review.id}><SingleReview review={review} /></Grid>;
							})}
						</Grid>
						<PaginationHolder>
							<AppPagination
								setPage={setPage}
								page={page}
								numberOfPages={numberOfPages}
								scroll={false}
							/>
						</PaginationHolder>
					</>
				) : (
					<CircleLoader />
				)}
			</MainWrapper>
		</Box>
	);
}
