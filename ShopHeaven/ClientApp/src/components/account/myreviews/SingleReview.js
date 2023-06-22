import { React, useState } from "react";
import {
	Box,
	Rating,
	Avatar,
	Paper,
	Typography,
	Stack,
	Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../../theme";
import useAuth from "../../../hooks/useAuth";
import { SubdirectoryArrowRight } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { singleProductBasePath } from "../../../constants";

export default function SingleReview(props) {
	const [review, setReview] = useState(props.review);

	const { auth } = useAuth();

	function formatDate(date) {
		console.log("DATE IS", date);
		const minutes = date.substring(14, 16);
		const hour = date.substring(11, 13);
		const day = date.substring(8, 10);
		const month = date.substring(5, 7);
		const year = date.substring(0, 4);

		const formattedDate = `${day}/${month}/${year}, ${hour}:${minutes}`;
		return formattedDate;
	}

	const Author = styled(Typography)({
		fontWeight: 500,
		fontSize: 16,
	});

	const StyledPaper = styled(Paper)({
		padding: theme.spacing(3),
	});

	const ContentHolder = styled(Box)({
		marginTop: theme.spacing(2),
	});

	const Date = styled(Typography)({
		color: "gray",
		fontSize: 13,
	});

	const StyledChip = styled(Chip)({
		fontWeight: 500,
		borderRadius: theme.shape.borderRadius,
		fontSize: 11,
	});

	return (
		<StyledPaper key={review.id} variant="elevation" elevation={1}>
			{review?.product?.id ? (
				<Stack flexDirection={"row"} flexWrap={"wrap"} sx={{ mb: 1, ml: 1 }}>
					<SubdirectoryArrowRight sx={{ color: "gray", fontSize: 18 }} />
					<Link to={`${singleProductBasePath}${review.product.id}`}>
						<Typography sx={{ color: "gray", fontSize: 12, ml: 1 }}>
							to {review.product.name}
						</Typography>
					</Link>
				</Stack>
			) : (
				<></>
			)}
			<Stack
				flexWrap={"wrap"}
				direction={"row"}
				spacing={1}
				alignItems={"center"}
			>
				<Avatar
					sx={{
						bgcolor: theme.palette.primary.main,
						width: 30,
						height: 30,
					}}
				>
					{review.email[0].toUpperCase()}
				</Avatar>
				<Author>{review.email}</Author>
				<Date>on: {formatDate(review.createdOn)}</Date>
				{auth?.email == review.email ? (
					<StyledChip
						label={review.status}
						size="small"
						color={review.status == "Approved" ? "success" : "error"}
					/>
				) : (
					<></>
				)}
			</Stack>
			<Stack
				flexWrap={"wrap"}
				direction={"row"}
				spacing={1}
				alignItems={"center"}
				sx={{ mt: 1 }}
			>
				<Rating
					name="read-only"
					size="small"
					value={review.ratingValue}
					max={5}
					readOnly
				/>
				<Typography>({review.ratingValue} stars)</Typography>
			</Stack>
			<ContentHolder>
				<Typography>{review.content}</Typography>
			</ContentHolder>
		</StyledPaper>
	);
}
