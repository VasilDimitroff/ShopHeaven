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
	const [orders, setOrders] = useState([]);

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
	const [statusSearch, setStatusSearch] = useState("");

	//error message
	const [errorMessage, setErrorMessage] = useState("");

	//status message for child component
	const [isStatusUpdated, setIsStatusUpdated] = useState(false);

	const navigate = useNavigate();
	const location = useLocation();

	const effectRun = useRef(false);

	// searchTerm ref for input
	const searchInputRef = useRef();

	// by what to search => username, product name,  ..???
	const propertySearchRef = useRef();

	// by what status to search => processing, delivered,  ..???
	const statusSearchRef = useRef();

	function handleOrderStatusUpdated() {
		setIsStatusUpdated(true);
	}

	useEffect(() => {
		let timeoutId;

		const controller = new AbortController();

		const getOrders = async () => {
			try {
				setIsLoading(true);

				let pagingModel = {
					recordsPerPage: ordersPerPageInAdminPanel,
					page: page,
					status: statusSearch.trim(),
					searchTerm: searchTerm.trim(),
					criteria: searchOrderProperty.trim(),
					userId: null,
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


				setIsStatusUpdated(false);
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
	}, [page, searchTerm, searchOrderProperty, statusSearch, isStatusUpdated]);


	useEffect(() => {
		setPage(1);
	}, [searchTerm, searchOrderProperty, statusSearch, isStatusUpdated])

	function onSearchOrder(e) {
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
							onChange={onSearchOrder}
							defaultValue={searchTerm}
							placeholder="Enter search term and select filter..."
						/>
						<CancelButton onClick={clearSearchValue} />
					</Grid>
					<Grid item xs={6} sm={6} md={2} lg={2}>
						<select
							onChange={onSearchOrder}
							style={StyledSelect}
							defaultValue={searchOrderProperty}
							ref={propertySearchRef}
							name="filter"
						>
							<option value="">{"--- SEARCH BY ---"}</option>
							<option value="Recipient">RECIPIENT</option>
							<option value="Email">CREATOR EMAIL</option>
							<option value="Username">CREATOR USERNAME</option>
							<option value="ProductName">PRODUCT NAME</option>
						</select>
					</Grid>
					<Grid item xs={6} sm={6} md={2} lg={2}>
						<select
							onChange={onSearchOrder}
							style={StyledSelect}
							defaultValue={statusSearch}
							ref={statusSearchRef}
							name="filter"
						>
							<option value="">{"--- ORDER STATUS ---"}</option>
							{
								orderStatuses?.map(status => {
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

			{((searchTerm && searchOrderProperty) || statusSearch) && !errorMessage ? (
				<Alert severity="info" sx={{ mt: 1 }}>
					<Typography>
						<b>{totalOrdersCount} results</b>
						{searchTerm && searchOrderProperty ? <> for <b>"{searchTerm}"</b></> : <></>}
						{searchOrderProperty ? (
							<Fragment>
								{" "}
								filtered by <b>{searchOrderProperty}</b>
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
							{orders?.map((order) => {
								return (
									<AdminOrderRow
										handleOrderStatusUpdated={handleOrderStatusUpdated}
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
