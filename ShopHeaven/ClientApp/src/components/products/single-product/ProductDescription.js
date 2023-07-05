import { Box, Chip, Typography, Rating, Grid, Stack } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
	VerifiedUser,
	GppBad,
	PrecisionManufacturing,
	AssignmentTurnedIn,
	AssignmentLate,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { theme } from "../../../theme";
import { useState } from "react";

export default function ProductDescription(props) {
	const [product, setProduct] = useState(props.product);

	const isBiggerOrXs = useMediaQuery(theme.breakpoints.up("xs"));
	const isBiggerOrSm = useMediaQuery(theme.breakpoints.up("sm"));
	const isBiggerOrMd = useMediaQuery(theme.breakpoints.up("md"));
	const isBiggerOrLg = useMediaQuery(theme.breakpoints.up("lg"));
	const isBiggerOrXl = useMediaQuery(theme.breakpoints.up("xl"));

	function DescriptionLength() {
		let charactersToShowForDescription = 100;

		if (isBiggerOrXs === true) {
			charactersToShowForDescription = 400;
		}
		if (isBiggerOrSm === true) {
			charactersToShowForDescription = 400;
		}
		if (isBiggerOrMd === true) {
			charactersToShowForDescription = 570;
		}
		if (isBiggerOrLg === true) {
			charactersToShowForDescription = 900;
		}
		if (isBiggerOrXl === true) {
			charactersToShowForDescription = 1000;
		}

		return charactersToShowForDescription;
	}

	function renderDescription() {
		return (
			<Typography>
				{product.description.length > DescriptionLength()
					? `${product.description.slice(0, DescriptionLength())}...`
					: product.description}
			</Typography>
		);
	}

	function renderAvailability() {
		return `${product.isAvailable ? "In Stock" : "Out of Stock"}`;
	}

	const RatingWrapper = styled(Box)({
		display: "flex",
	});

	const RatingText = styled(Typography)({
		marginLeft: theme.spacing(1),
		fontWeight: 500,
	});

	const DescriptionWrapper = styled(Box)({
		marginBottom: theme.spacing(2),
		display: "flex",
	});

	const SubheadingInfoWrapper = styled(Box)({
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(2),
		display: "flex",
		justifyContent: "space-between",
		gap: 1,
	});

	const InStockInfo = styled(Typography)({
		fontWeight: 500,
		fontSize: 18,
	});

	const BrandInfo = styled(Typography)({
		fontWeight: 500,
		fontSize: 18,
	});

	const WarrantyText = styled(Typography)({
		fontWeight: 500,
		fontSize: 18,
		marginRight: theme.spacing(1),
	});

	const StyledChip = styled(Chip)({
		marginTop: theme.spacing(0.7),
		marginRight: theme.spacing(0.7),
		borderRadius: theme.shape.borderRadius,
		fontWeight: 500,
		border: "0px solid white",
	});

	return (
		<div>
			<Box>
				<RatingWrapper>
					<Rating
						readOnly
						size="medium"
						label="stars"
						precision={0.5}
						defaultValue={product.rating}
					/>
					<RatingText>{`${product.rating.toFixed(2)} (${
						product.reviewsCount
					} reviews)`}</RatingText>
				</RatingWrapper>
				<SubheadingInfoWrapper>
					<Box sx={{ display: "flex", gap: 1 }}>
						<PrecisionManufacturing
							sx={{ color: theme.palette.primary.main }}
						/>
						<BrandInfo>{`Brand: ${product.brand}`}</BrandInfo>
					</Box>
					<Box sx={{ display: "flex", gap: 1 }}>
						{product.isAvailable ? (
							<AssignmentTurnedIn sx={{ color: theme.palette.success.main }} />
						) : (
							<AssignmentLate sx={{ color: theme.palette.error.main }} />
						)}
						<InStockInfo>{renderAvailability()}</InStockInfo>
					</Box>
					<Box sx={{ display: "flex", gap: 1 }}>
						{product.hasGuarantee ? (
							<VerifiedUser sx={{ color: theme.palette.success.main }} />
						) : (
							<GppBad sx={{ color: theme.palette.error.main }} />
						)}
						<WarrantyText>
							{product.hasGuarantee ? "Has Warranty" : "No Warranty"}
						</WarrantyText>
					</Box>
				</SubheadingInfoWrapper>
				<DescriptionWrapper>{renderDescription()}</DescriptionWrapper>
			</Box>
			<Box>
				<Stack flexWrap="wrap" spacing={0} direction="row">
					<StyledChip size="small" variant="outlined" label={"TAGS: "} />

					{product.tags.map((tag, index) => (
						<StyledChip
							clickable={true}
							key={index}
							size="small"
							label={tag}
							color="secondary"
						></StyledChip>
					))}
				</Stack>
			</Box>
		</div>
	);
}
