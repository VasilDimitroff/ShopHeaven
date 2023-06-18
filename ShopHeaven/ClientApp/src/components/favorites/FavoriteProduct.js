import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
	useMediaQuery,
	Box,
	Grid,
	Paper,
	Typography,
	Stack,
	Chip,
	Divider,
	Slide,
	Snackbar,
	Button,
} from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";
import {
	noPermissionsForOperationMessage,
	singleProductBasePath,
} from "../../constants";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { ApiEndpoints } from "../../api/endpoints";
import useAuth from "../../hooks/useAuth";
import useUser from "../../hooks/useUser";
import useAppSettings from "../../hooks/useAppSettings";

export default function FavoriteProduct(props) {
	//app hooks
	const { auth } = useAuth();
	const { setUser } = useUser();
	const { appSettings } = useAppSettings();

	//api
	const axiosPrivate = useAxiosPrivate();

	//nav
	const navigate = useNavigate();

	//main states for component
	const [productInWishlist, setProductInWishlist] = useState(
		props.productInWishlist
	);

	//error/response messages
	const [deleteFromWishlistErrorMessage, setDeleteFromWishlistErrorMessage] =
		useState("");

	const [addToCartResponseMessage, setAddToCartResponseMessage] = useState("");
	const [addToCartErrorMessage, setAddToCartErrorMessage] = useState("");

	//get resolution type (bool)
	const isSmallOrDown = useMediaQuery(theme.breakpoints.down("sm"));
	const isMdOrDown = useMediaQuery(theme.breakpoints.down("md"));

	useEffect(() => {
		setProductInWishlist(props.productInWishlist);
	}, [props.productInWishlist, productInWishlist]);

	function onDeleteProductFromWishlist() {
		const requestData = {
			userId: auth.userId,
			wishlistId: auth.wishlistId,
			productId: productInWishlist.id,
		};

		deleteProductFromWishlist(requestData);
	}

	async function deleteProductFromWishlist(requestData) {
		try {
			const controller = new AbortController();

			const response = await axiosPrivate.post(
				ApiEndpoints.wishlists.deleteProduct,
				requestData,
				{
					signal: controller.signal,
				}
			);

			props.productDeleted();

			setUser((prev) => {
				return {
					...prev,
					wishlistProductsCount: response?.data?.productsInWishlistCount,
				};
			});

			controller.abort();

			setDeleteFromWishlistErrorMessage(``);
		} catch (error) {
			if (error?.response?.status === 401 || error?.response?.status === 403) {
				setDeleteFromWishlistErrorMessage(noPermissionsForOperationMessage);
			} else {
				setDeleteFromWishlistErrorMessage(error?.response?.data);
			}

			console.log(error);
		}
	}

	function onAddProductToCart(quantityValue) {
		if (productInWishlist.inStockQuantity < quantityValue) {
			setAddToCartErrorMessage(`Product has not enough quantity!`);
			return;
		}

		setAddToCartErrorMessage("");

		const requestData = {
			userId: auth.userId,
			cartId: auth.cartId,
			productId: productInWishlist.id,
			quantity: quantityValue,
		};

		addProductToCart(requestData);
	}

	async function addProductToCart(requestData) {
		try {
			const controller = new AbortController();

			const response = await axiosPrivate.post(
				ApiEndpoints.carts.addProduct,
				requestData,
				{
					signal: controller.signal,
				}
			);

			controller.abort();

			setUser((prev) => {
				return {
					...prev,
					cartProductsCount: response?.data?.productsInCartCount,
				};
			});

			setAddToCartErrorMessage("");
			setAddToCartResponseMessage(
				`You added product ${productInWishlist.name} in your cart`
			);
		} catch (error) {
			setAddToCartResponseMessage("");
			if (error?.response?.status === 401 || error?.response?.status === 403) {
				setAddToCartErrorMessage(noPermissionsForOperationMessage);
			} else {
				setAddToCartErrorMessage(error?.response?.data);
			}

			console.log(error);
		}
	}

	function handleCloseErrorSnackbar() {
		setDeleteFromWishlistErrorMessage("");
	}

	function handleCloseAddToCartSnackbar() {
		setAddToCartErrorMessage("");
		setAddToCartResponseMessage("");
	}

	const ImageHolder = styled(Box)({
		width: isSmallOrDown ? "50%" : "75%",
		maxWidth: "200px",
		height: 0,
		paddingBottom: isSmallOrDown ? "50%" : "75%",
		position: "relative",
		overflow: "hidden",
	});

	const ProductName = styled(Typography)({
		cursor: "pointer",
		lineHeight: 1,
		fontSize: 18,
		fontWeight: 500,
		"&:hover": {
			color: theme.palette.primary.main,
			textDecoration: "underline",
		},
	});

	const InfoHolder = styled(Box)({
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	});

	const LabelHolder = styled(InfoHolder)({
		margin: theme.spacing(1, 0),
	});

	const RegularPrice = styled(Typography)({
		textDecoration: "line-through",
		color: "gray",
		fontSize: 14,
	});

	const FinalPriceHolder = styled(Box)({
		display: "block",
		textAlign: "center",
		gap: theme.spacing(0.8),
		marginTop: theme.spacing(1),
		fontWeight: 500,
		color: theme.palette.error.main,
	});

	const StyledChip = styled(Chip)({
		color: theme.palette.white.main,
		fontWeight: 500,
		backgroundColor: theme.palette.secondary.main,
		borderRadius: theme.shape.borderRadius,
	});

	const LinkButton = styled(Typography)({
		textAlign: "right",
		cursor: "pointer",
		marginTop: theme.spacing(1.5),
		fontSize: 14,
		color: theme.palette.primary.main,
		[theme.breakpoints.down("lg")]: {
			marginTop: theme.spacing(1.5),
		},
		"&:hover": {
			textDecoration: "underline",
		},
	});

	return (
		<Paper sx={{ p: 2 }}>
			<Grid container spacing={2}>
				<Grid
					item
					xs={12}
					sm={3}
					md={3}
					lg={3}
					display="flex"
					alignContent="center"
					justifyContent="center"
				>
					<ImageHolder>
						<img
							onClick={() =>
								navigate(`${singleProductBasePath}${productInWishlist.id}`)
							}
							style={{
								cursor: "pointer",
								borderRadius: "15%",
								width: "100%",
								height: "100%",
								objectFit: "cover",
								position: "absolute",
								top: 0,
								left: 0,
								padding: theme.spacing(1),
							}}
							src={productInWishlist.image}
						/>
					</ImageHolder>
				</Grid>
				<Grid item xs={12} sm={6} md={6} lg={6}>
					<Stack spacing={1.2}>
						<ProductName
							onClick={() =>
								navigate(`${singleProductBasePath}${productInWishlist.id}`)
							}
						>
							{productInWishlist.name}
						</ProductName>
						<Divider />
						<Stack spacing={2} flexWrap="wrap" direction="row">
							{productInWishlist.hasGuarantee ? (
								<Chip
									variant="outlined"
									color="success"
									size="small"
									label="Warranty"
								/>
							) : (
								<></>
							)}

							<Chip
								variant="outlined"
								color={productInWishlist.isAvailable ? "success" : "error"}
								size="small"
								label={
									productInWishlist.isAvailable ? "Available" : "Not Available"
								}
							/>
						</Stack>
						<Typography>
							{productInWishlist.description.length > 400
								? productInWishlist.description.substring(0, 400) + "..."
								: productInWishlist.description}
						</Typography>
					</Stack>
				</Grid>
				<Grid
					item
					xs={12}
					sm={3}
					md={3}
					lg={3}
					sx={{
						paddingBottom: theme.spacing(1),
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
					}}
				>
					{productInWishlist.discount > 0 ? (
						<LabelHolder>
							<StyledChip
								size="small"
								variant="filled"
								label={`Save ${appSettings.appCurrency.code} ${(
									(productInWishlist.price * productInWishlist.discount) /
									100
								).toFixed(2)}`}
							/>
						</LabelHolder>
					) : (
						<></>
					)}
					<FinalPriceHolder>
						{productInWishlist.discount > 0 ? (
							<RegularPrice>
								{appSettings.appCurrency.code}{" "}
								{productInWishlist.price.toFixed(2)}
							</RegularPrice>
						) : (
							<></>
						)}
						<Typography variant="h6">
							{appSettings.appCurrency.code}{" "}
							{(
								productInWishlist.price -
								(productInWishlist.price * productInWishlist.discount) / 100
							).toFixed(2)}
						</Typography>
					</FinalPriceHolder>
					<Button
						onClick={() => onAddProductToCart(1)}
						variant="contained"
						size="medium"
						startIcon={<AddShoppingCart />}
					>
						ADD TO CART
					</Button>
					<Box sx={{ display: "flex", justifyContent: "center" }}>
						<LinkButton onClick={onDeleteProductFromWishlist}>
							Delete from favorites
						</LinkButton>
					</Box>
				</Grid>
			</Grid>
			<Snackbar
				onClose={handleCloseErrorSnackbar}
				autoHideDuration={6000}
				ContentProps={{
					style: {
						backgroundColor: theme.palette.error.main,
						textAlign: "center",
					},
				}}
				anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
				open={deleteFromWishlistErrorMessage.length > 0 ? true : false}
				TransitionComponent={Slide}
				message={`${deleteFromWishlistErrorMessage}`}
			></Snackbar>
			<Snackbar
				onClose={handleCloseAddToCartSnackbar}
				autoHideDuration={9000}
				ContentProps={{
					style: {
						backgroundColor: theme.palette.error.main,
						textAlign: "center",
					},
				}}
				anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
				open={addToCartErrorMessage.length > 0 ? true : false}
				TransitionComponent={Slide}
				message={`${addToCartErrorMessage}`}
			></Snackbar>
			<Snackbar
				onClose={handleCloseAddToCartSnackbar}
				autoHideDuration={6000}
				ContentProps={{
					style: {
						textAlign: "center",
					},
				}}
				anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
				open={addToCartResponseMessage.length > 0 ? true : false}
				TransitionComponent={Slide}
				message={`${addToCartResponseMessage}`}
			></Snackbar>
		</Paper>
	);
}
