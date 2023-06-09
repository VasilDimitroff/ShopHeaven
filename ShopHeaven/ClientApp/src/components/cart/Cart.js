import { React, useState, useEffect, useRef } from "react";
import { Box, Grid, Stack, Typography, Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MainWrapper, HeadingChip } from "../../styles/styles";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { ApiEndpoints } from "../../api/endpoints";
import { cartPath } from "../../constants";
import BreadcrumbsBar from "../common/BreadcrumbsBar";
import CartSummary from "./CartSummary";
import CartProduct from "./CartProduct";

const breadcrumbs = [
	{
		name: "Home",
		uri: "/",
	},
	{
		name: `Cart`,
		uri: `${cartPath}`,
	},
];

export default function Cart() {
	const [productsInCart, setProductsInCart] = useState([]);
	const [cartSummary, setCartSummary] = useState();
	const [deleteProductDOMelement, setDeleteProductDOMelement] = useState(false);
	const [
		addedOrRemovedProductFromFavorites,
		setAddedOrRemovedProductFromFavorites,
	] = useState(false);

	const { auth } = useAuth();
	const navigate = useNavigate();
	const axiosPrivate = useAxiosPrivate();

	const effectRun = useRef(false);

	useEffect(() => {
		window.scroll(0, 0);
	}, []);

	useEffect(() => {
		const controller = new AbortController();

		const getCart = async () => {
			try {
				const response = await axiosPrivate.post(
					ApiEndpoints.carts.getProducts,
					{
						cartId: auth.cartId,
						userId: auth.userId,
					},
					{
						signal: controller.signal,
					}
				);

				setProductsInCart(response?.data?.products);
				setCartSummary(response?.data?.summary);

				setDeleteProductDOMelement(false);
				setAddedOrRemovedProductFromFavorites(false);

				console.log("CART RESPONSE: ", response?.data);
			} catch (error) {
				console.log(error);
			}
		};

		if (effectRun.current) {
			getCart();
		}

		return () => {
			effectRun.current = true;
			controller.abort();
		};
	}, [deleteProductDOMelement, addedOrRemovedProductFromFavorites]);

	function productDeleted() {
		setDeleteProductDOMelement(true);
	}

	function productUpdated() {
		setAddedOrRemovedProductFromFavorites(true);
	}

	function quantityUpdated(productId, newQuantity, cartSummary) {
		setProductsInCart((prevProducts) => {
			return prevProducts.map((product) => {
				if (product.id === productId) {
					return { ...product, purchasedQuantity: newQuantity };
				}
				return product;
			});
		});

		setCartSummary(cartSummary);
	}

	return (
		<Box>
			<BreadcrumbsBar breadcrumbsItems={breadcrumbs} />
			<MainWrapper>
				<Divider>
					<HeadingChip label="YOUR CART" variant="outlined" color="secondary" />
				</Divider>
				{productsInCart.length > 0 ? (
					<Grid container spacing={2}>
						<Grid item xs={12} sm={12} md={12} lg={9}>
							<Stack spacing={2}>
								{productsInCart?.map((product) => {
									return (
										<CartProduct
											key={product.id}
											productInCart={product}
											productDeleted={productDeleted}
											quantityUpdated={quantityUpdated}
											productUpdated={productUpdated}
										/>
									);
								})}
							</Stack>
						</Grid>
						<Grid item xs={12} sm={12} md={12} lg={3}>
							<CartSummary cartSummary={cartSummary} />
						</Grid>
					</Grid>
				) : (
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							gap: 4,
							mt: 4,
						}}
					>
						<Typography variant="h5" textAlign="center">
							YOUR CART IS EMPTY!
						</Typography>
						<Button
							onClick={() => navigate("/")}
							variant="contained"
							size="large"
						>
							GO TO HOME
						</Button>
					</Box>
				)}
			</MainWrapper>
		</Box>
	);
}
