import { React, useState, Fragment, useRef } from "react";
import {
	TableRow,
	TableCell,
	IconButton,
	Collapse,
	Chip,
	Box,
	Grid,
	Typography,
	Snackbar,
	Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../../theme";
import { ActionIconButton } from "../../../styles/styles";
import DeleteReview from "./DeleteReview";
import EditReview from "./EditReview";
import {
	KeyboardArrowUp,
	KeyboardArrowDown,
	Event,
	AccountCircle,
	Delete,
	RestoreFromTrash,
	MoreHoriz,
	Person,
	Star,
} from "@mui/icons-material";
import UndeleteReview from "./UndeleteReview";
import { ApiEndpoints } from "../../../api/endpoints";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { noPermissionsForOperationMessage } from "../../../constants";

export default function AdminReviewRow(props) {
	const axiosPrivate = useAxiosPrivate();

	const [review, setReview] = useState(props.review);
	const [reviewsStatuses, setReviewsStatuses] = useState(props.reviewStatuses);

	const [updateStatusResponseMessage, setUpdateStatusResponseMessage] =
		useState("");
	const [updateStatusErrorMessage, setUpdateStatusErrorMessage] = useState("");
	const [openEditForm, setOpenEditForm] = useState(false);
	const [openDeleteForm, setOpenDeleteForm] = useState(false);
	const [openUndeleteForm, setOpenUndeleteForm] = useState(false);

	const [openSnackbar, setOpenSnackbar] = useState(false);

	const statusRef = useRef();

	function onStatusChanged(e) {
		e.preventDefault();

		let newStatus = statusRef.current.value;

		if (!newStatus.trim()) {
			newStatus = "";
		}

		const requestData = {
			id: review?.id,
			status: newStatus,
		};

		changeReviewStatus(requestData);
	}

	async function changeReviewStatus(requestData) {
		try {
			const controller = new AbortController();

			const response = await axiosPrivate.post(
				ApiEndpoints.reviews.changeStatus,
				requestData,
				{
					signal: controller.signal,
				}
			);

			controller.abort();

			setUpdateStatusResponseMessage(
				"Review " + review?.id + " status changed!"
			);
			setUpdateStatusErrorMessage("");

			console.log("UPDATE REVIEW STATUS RESPONSE", response?.data);

			setReview((prev) => {
				return {
					...prev,
					status: response?.data?.status,
				};
			});
			props.handleReviewStatusUpdated();
		} catch (error) {
			setUpdateStatusResponseMessage("");
			if (error?.response?.status === 401 || error?.response?.status === 403) {
				setUpdateStatusErrorMessage(noPermissionsForOperationMessage);
			} else {
				setUpdateStatusErrorMessage(error?.response?.data);
			}
			console.log(error.message);
		}
	}

	function handleSetOpenEditForm() {
		if (review?.isDeleted) {
			setOpenSnackbar((prev) => !prev);
			return;
		}
		setOpenDeleteForm(false);
		setOpenUndeleteForm(false);
		setOpenEditForm((prev) => !prev);
	}

	function handleSetOpenDeleteForm() {
		setOpenEditForm(false);
		setOpenUndeleteForm(false);
		setOpenDeleteForm((prev) => !prev);
	}

	function handleSetOpenUndeleteForm() {
		setOpenEditForm(false);
		setOpenDeleteForm(false);
		setOpenUndeleteForm((prev) => !prev);
	}

	function onCancelButtonClicked() {
		setOpenDeleteForm((prev) => !prev);
	}

	function onUndeleteCancelButtonClicked() {
		setOpenUndeleteForm((prev) => !prev);
	}

	function updateReview(updatedReview) {
		setReview(updatedReview);
	}

	function handleSnackbarClose() {
		setOpenSnackbar((prev) => !prev);
	}

	function handleCloseSuccessMessageSnackbar() {
		setUpdateStatusResponseMessage("");
	}

	function handleCloseErrorMessageSnackbar() {
		setUpdateStatusErrorMessage("");
	}

	function formatDate(date) {
		const minutes = date.substring(14, 16);
		const hour = date.substring(11, 13);
		const day = date.substring(8, 10);
		const month = date.substring(5, 7);
		const year = date.substring(0, 4);

		const formattedDate = `${day}/${month}/${year}, ${hour}:${minutes}`;
		return formattedDate;
	}

	const ReviewTableCell = styled(TableCell)({
		fontWeight: 500,
		fontSize: 18,
	});

	const ReviewInfoText = styled(Box)({
		fontSize: 13,
		fontWeight: 400,
		[theme.breakpoints.down("lg")]: {
			marginTop: theme.spacing(0.4),
		},
	});

	const StyledSelect = {
		cursor: "pointer",
		borderRadius: theme.shape.borderRadius,
		padding: theme.spacing(1),
		border: "1px solid #C6BFBE",
		textTransform: "uppercase",
		fontSize: 14,
	};

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
				<ReviewTableCell
					onClick={handleSetOpenEditForm}
					component="th"
					scope="row"
				>
					<IconButton size="small">
						{openEditForm ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
					</IconButton>
					{review?.isDeleted ? (
						<>
							{review?.content}
							<Typography
								color="error"
								sx={{ display: "inline", fontWeight: 500 }}
							>
								{" "}
								(Review Deleted)
							</Typography>
						</>
					) : (
						<>
							{review?.content?.length > 50
								? review?.content?.substring(0, 50) + "..."
								: review?.content}
						</>
					)}
					<Grid container spacing={1} columns={5}>
						<Grid item xs={4} sm={2} md={1} lg={1}>
							<Tooltip
								title={`Review leaved by: ${review?.email}`}
								placement="bottom-start"
								arrow
							>
								<ReviewInfoText>
									<Chip
										sx={{ padding: 0.5 }}
										icon={<AccountCircle />}
										variant="outlined"
										color="primary"
										label={`By: ${review?.email}`}
										size="small"
									/>
								</ReviewInfoText>
							</Tooltip>
						</Grid>
						<Grid item xs={4} sm={2} md={1} lg={1}>
							<Tooltip
								placement="bottom-start"
								title={`Created on: ${formatDate(review?.createdOn)}`}
								arrow
							>
								<ReviewInfoText>
									<Chip
										sx={{ padding: 0.5 }}
										icon={<Event />}
										variant="outlined"
										color="primary"
										label={`Created: ${formatDate(review?.createdOn)}`}
										size="small"
									/>
								</ReviewInfoText>
							</Tooltip>
						</Grid>
						<Grid item xs={4} sm={2} md={1} lg={1}>
							<Tooltip
								placement="bottom-start"
								title={`Product for which the review is: ${review?.product?.name}`}
								arrow
							>
								<ReviewInfoText>
									<Chip
										sx={{ padding: 0.5 }}
										icon={<Person />}
										variant="outlined"
										label={`To: ${review?.product?.name.substring(0, 20)}`}
										size="small"
										color="primary"
									/>
								</ReviewInfoText>
							</Tooltip>
						</Grid>
						<Grid item xs={4} sm={2} md={1} lg={1}>
							<Tooltip
								placement="bottom-start"
								title={`Rating of the review: ${review?.ratingValue.toFixed(
									2
								)}`}
								arrow
							>
								<ReviewInfoText>
									<Chip
										sx={{ padding: 0.5 }}
										icon={<Star />}
										variant="outlined"
										label={`Rating: ${review?.ratingValue.toFixed(2)}`}
										size="small"
										color="primary"
									/>
								</ReviewInfoText>
							</Tooltip>
						</Grid>
						<Grid item xs={4} sm={2} md={1} lg={1}>
							<Tooltip
								placement="bottom-start"
								title={`Is review deleted: ${review?.isDeleted ? "Yes" : "No"}`}
								arrow
							>
								<ReviewInfoText>
									<Chip
										sx={{ padding: 0.5 }}
										icon={<Delete />}
										variant="outlined"
										label={`Deleted: ${review?.isDeleted ? "Yes" : "No"}`}
										size="small"
										color={review?.isDeleted ? "error" : "success"}
									/>
								</ReviewInfoText>
							</Tooltip>
						</Grid>
					</Grid>
				</ReviewTableCell>
				<TableCell align="center">
					<Grid
						container
						spacing={5}
						sx={{ display: "flex", alignItems: "center" }}
					>
						<Grid item xs={12} sm={12} md={6} lg={6}>
							<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
								<select
									onChange={onStatusChanged}
									style={StyledSelect}
									name="status"
									ref={statusRef}
									defaultValue={review?.status}
								>
									{reviewsStatuses?.map((status) => (
										<option key={status} value={status}>
											{status}
										</option>
									))}
								</select>
							</Box>
						</Grid>
						<Grid item xs={12} sm={12} md={3} lg={3}>
							<ActionIconButton
								onClick={handleSetOpenEditForm}
								color="info"
								size="small"
							>
								<MoreHoriz />
							</ActionIconButton>
						</Grid>
						<Grid item xs={12} sm={12} md={3} lg={3}>
							{!review?.isDeleted ? (
								<ActionIconButton
									onClick={handleSetOpenDeleteForm}
									color="error"
									size="small"
								>
									<Delete />
								</ActionIconButton>
							) : (
								<ActionIconButton
									onClick={handleSetOpenUndeleteForm}
									color="success"
									size="small"
								>
									<RestoreFromTrash />
								</ActionIconButton>
							)}
						</Grid>
					</Grid>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
					{
						<Collapse in={openEditForm} timeout="auto" unmountOnExit>
							<EditReview review={review} updateReview={updateReview} />
						</Collapse>
					}
					<Collapse in={openDeleteForm} timeout="auto" unmountOnExit>
						<DeleteReview
							review={review}
							onCancelButtonClicked={onCancelButtonClicked}
							updateReview={updateReview}
						/>
					</Collapse>
					<Collapse in={openUndeleteForm} timeout="auto" unmountOnExit>
						<UndeleteReview
							onUndeleteCancelButtonClicked={onUndeleteCancelButtonClicked}
							updateReview={updateReview}
							review={review}
						/>
					</Collapse>
					<Snackbar
						open={openSnackbar}
						autoHideDuration={8000}
						message={`Review ${review.id} is deleted! To view the review, first you should undelete it!`}
						severity="error"
						onClose={handleSnackbarClose}
					/>
					<Snackbar
						open={updateStatusErrorMessage.length > 0}
						autoHideDuration={8000}
						message={`Review status updating failed!`}
						severity="error"
						onClose={handleCloseErrorMessageSnackbar}
					/>
					<Snackbar
						open={updateStatusResponseMessage.length > 0}
						autoHideDuration={8000}
						message={`Review status updated to ${review?.status}`}
						severity="error"
						onClose={handleCloseSuccessMessageSnackbar}
					/>
				</TableCell>
			</TableRow>
		</Fragment>
	);
}
