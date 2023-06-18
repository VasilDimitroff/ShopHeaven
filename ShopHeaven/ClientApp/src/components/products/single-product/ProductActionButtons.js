import { React, useState, useRef, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import {
    Box,
    Chip,
    Typography,
    Card,
    CardContent,
    Button,
    Snackbar,
    Slide,
    InputBase,
    Stack,
    IconButton,
} from "@mui/material";
import {
    Favorite,
    FavoriteBorder,
    AddShoppingCart,
    AddCircle,
    RemoveCircle,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { theme } from "../../../theme";
import useAuth from "../../../hooks/useAuth";
import useUser from "../../../hooks/useUser";
import useAppSettings from "../../../hooks/useAppSettings";
import { ApiEndpoints } from "../../../api/endpoints";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import {
    noPermissionsForOperationMessage,
    cartPath,
    loginPath,
} from "../../../constants";

export default function ProductActionButtons(props) {
    const { appSettings } = useAppSettings();
    const { auth } = useAuth();
    const { setUser } = useUser();

    const location = useLocation();
    const from = location.pathname;

    let axiosPrivate = useAxiosPrivate();

    const [product, setProduct] = useState(props.product);

    const [addToCartResponseMessage, setAddToCartResponseMessage] = useState("");
    const [addToCartErrorMessage, setAddToCartErrorMessage] = useState("");

    const [addOrRemoveToWishlistResponseMessage, setAddOrRemoveToWishlistResponseMessage] = useState("");
    const [addOrRemoveToWishlistErrorMessage, setAddOrRemoveToWishlistErrorMessage] = useState("");

    let [productsQuantity, setProductsQuantity] = useState(1);

    const quantityRef = useRef();

    useEffect(() => {
        setProduct(props.product);
    }, [props.product]);

    function onAddProductToCart() {
        const requestData = {
            userId: auth.userId,
            cartId: auth.cartId,
            productId: product.id,
            quantity: parseInt(quantityRef.current.value),
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

            setProduct((prev) => {
                return {
                    ...prev,
                    quantity: prev.quantity - response?.data?.quantity,
                };
            });

            setUser((prev) => {
                return {
                    ...prev,
                    cartProductsCount: response?.data?.productsInCartCount,
                };
            });

            setAddToCartErrorMessage("");
            setAddToCartResponseMessage(
                `You have added product ${product.name} in the cart ${response?.data?.quantity} time(s)`
            );
        } catch (error) {
            if (error?.response?.status === 401 || error?.response?.status === 403) {
                setAddToCartErrorMessage(noPermissionsForOperationMessage);
            } else {
                setAddToCartErrorMessage(error?.response?.data);
            }

            console.log(error);
        } finally {
            setProductsQuantity(1);
        }
    }

    function onAddOrRemoveProductToWishlist() {
        const requestData = {
            userId: auth.userId,
            wishlistId: auth.wishlistId,
            productId: product.id,
        };

        addOrRemoveProductToWishlist(requestData);
    }

    async function addOrRemoveProductToWishlist(requestData) {
        try {
            const controller = new AbortController();

            let requestUrl = ApiEndpoints.wishlists.addProduct;

            if (product.isInUserWishlist) {
                requestUrl = ApiEndpoints.wishlists.deleteProduct;
            }

            const response = await axiosPrivate.post(
                requestUrl,
                requestData,
                {
                    signal: controller.signal,
                }
            );

            controller.abort();

            let responseMessage = `You added product ${product.name} in your favorites`;

            if (product.isInUserWishlist) {
                responseMessage = `You removed product ${product.name} from your favorites`;
            }

            setProduct((prev) => {
                return {
                    ...prev,
                    isInUserWishlist: response?.data?.isProductInTheWishlist,
                };
            });

            setUser((prev) => {
                return {
                    ...prev,
                    wishlistProductsCount: response?.data?.productsInWishlistCount,
                };
            });

            setAddOrRemoveToWishlistErrorMessage("");
            setAddOrRemoveToWishlistResponseMessage(responseMessage);

            console.log("ADD TO WISHLIST RESPONSE", response?.data);
        } catch (error) {
            setAddOrRemoveToWishlistResponseMessage("")
            if (error?.response?.status === 401 || error?.response?.status === 403) {
                setAddOrRemoveToWishlistErrorMessage(noPermissionsForOperationMessage);
            } else {
                setAddOrRemoveToWishlistErrorMessage(error?.response?.data);
            }

            console.log(error);
        }
    }

    function handleSetProductsQuantity(value) {
        value = parseInt(value);

        let result = productsQuantity + value;

        if (result < 1) {
            value = 0;
        }

        if (result > product.quantity) {
            if (product.isAvailable) {
                setAddToCartErrorMessage(
                    `In stock are ${product.quantity} items only! It is the maximum quantity you can purchase.`
                );
            } else {
                setAddToCartErrorMessage(
                    `Product is out of stock! You cannot purchase it!`
                );
            }
        } else {
            setProductsQuantity((prev) => (prev += value));
        }
    }

    function handleCloseAddToCartSnackbar() {
        setAddToCartErrorMessage("");
        setAddToCartResponseMessage("");
    }

    function handleCloseAddToWishlistSnackbar() {
        setAddOrRemoveToWishlistErrorMessage("");
        setAddOrRemoveToWishlistResponseMessage("");
    }

    const Discount = styled(Typography)({
        color: "gray",
        fontWeight: 400,
        letterSpacing: -1,
        textDecoration: "line-through",
        fontSize: 16,
        textAlign: "center",
    });

    const PriceHolder = styled(Box)({
        color: theme.palette.error.main,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
    });

    const StyledChip = styled(Chip)({
        color: theme.palette.white.main,
        fontWeight: 500,
        backgroundColor: theme.palette.secondary.main,
        borderRadius: theme.shape.borderRadius,
    });

    const QuantityHolder = styled(Box)({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        fontSize: 17,
        marginTop: theme.spacing(1.5),
    });

    const ActionButtons = styled(Stack)({
        marginTop: theme.spacing(3),
    });

    const ActionButton = styled(Button)({
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    });

    const BootstrapInput = styled(InputBase)(({ theme }) => ({
        width: 40,
        "label + &": {
            marginTop: theme.spacing(3),
        },
        "& .MuiInputBase-input": {
            color: "black",
            textAlign: "center",
            borderRadius: "50%",
            backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
            border: "1px solid #ced4da",
            fontSize: 17,
            "&:focus": {
                borderColor: theme.palette.primary.main,
                boxShadow: theme.palette.dropdown.boxShadow.main,
            },
            "&:disabled": {},
        },
    }));

    const GoToCartButton = styled(Typography)({
        textAlign: "center",
        cursor: "pointer",
        marginTop: theme.spacing(1.5),
        fontSize: 14,
        color: theme.palette.primary.main,
        "&:hover": {
            textDecoration: "underline",
        },
    });

    function renderPrice() {
        const price = product.price - product.price * (product.discount / 100);
        let finalPrice;
        let priceWithNoDiscountToRender;

        finalPrice = `${appSettings.appCurrency.code} ${price.toFixed(2)}`;
        priceWithNoDiscountToRender = `${appSettings.appCurrency.code
            } ${product.price.toFixed(2)}`;
        let renderResult;

        if (product.discount > 0) {
            renderResult = (
                <Box>
                    <Box>
                        <Box sx={{ justifyContent: "center", display: "flex", mb: 1 }}>
                            <StyledChip
                                size="small"
                                variant="filled"
                                label={`Save ${product.discount}%`}
                            ></StyledChip>
                        </Box>
                        <Discount gutterBottom>{priceWithNoDiscountToRender}</Discount>
                    </Box>
                    <PriceHolder>
                        <Typography variant="h5" sx={{ fontWeight: 600 }}>
                            {finalPrice}
                        </Typography>
                    </PriceHolder>
                </Box>
            );
        } else {
            renderResult = (
                <PriceHolder>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        {finalPrice}
                    </Typography>
                </PriceHolder>
            );
        }

        return renderResult;
    }

    return (
        <Box>
            <Card>
                <CardContent>
                    {renderPrice()}
                    {!auth.isLogged ? (
                        <Box sx={{ padding: theme.spacing(5, 0) }}>
                            <Typography sx={{ textAlign: "center", mb: 2 }}>
                                Log in to purchase!
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Link to={loginPath} state={{ from }}>
                                    <Button size="big" color="secondary" variant="contained">
                                        LOGIN
                                    </Button>
                                </Link>
                            </Box>
                        </Box>
                    ) : (
                        <>
                            <QuantityHolder>
                                <IconButton color="primary" onClick={() => handleSetProductsQuantity(-1)}>
                                    {" "}
                                    <RemoveCircle />
                                </IconButton>
                                <BootstrapInput
                                    inputRef={quantityRef}
                                    defaultValue={productsQuantity}
                                    id="bootstrap-input"
                                    color="primary"
                                />
                                <IconButton color="primary" onClick={() => handleSetProductsQuantity(1)}>
                                    <AddCircle />
                                </IconButton>
                            </QuantityHolder>
                            <Typography sx={{ textAlign: "center", mt: 1 }}>
                                {`${product.quantity} items left`}
                            </Typography>
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

                            <Snackbar
                                onClose={handleCloseAddToWishlistSnackbar}
                                autoHideDuration={9000}
                                ContentProps={{
                                    style: {
                                        backgroundColor: theme.palette.error.main,
                                        textAlign: "center",
                                    },
                                }}
                                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                                open={addOrRemoveToWishlistErrorMessage.length > 0 ? true : false}
                                TransitionComponent={Slide}
                                message={`${addOrRemoveToWishlistErrorMessage}`}
                            ></Snackbar>
                            <Snackbar
                                onClose={handleCloseAddToWishlistSnackbar}
                                autoHideDuration={6000}
                                ContentProps={{
                                    style: {
                                        textAlign: "center",
                                    },
                                }}
                                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                                open={addOrRemoveToWishlistResponseMessage.length > 0 ? true : false}
                                TransitionComponent={Slide}
                                message={`${addOrRemoveToWishlistResponseMessage}`}
                            ></Snackbar>


                            <ActionButtons spacing={1.5}>
                                <ActionButton
                                    onClick={onAddProductToCart}
                                    variant="contained"
                                    size="large"
                                    startIcon={<AddShoppingCart />}
                                >
                                    ADD TO CART
                                </ActionButton>
                                <ActionButton
                                    onClick={onAddOrRemoveProductToWishlist}
                                    variant="outlined"
                                    size="large"
                                    startIcon={product.isInUserWishlist ? <Favorite sx={{ color: theme.palette.error.main }} /> : <FavoriteBorder />}
                                >
                                    {product.isInUserWishlist ? "ADDED TO FAVORITES" : "ADD TO FAVORITES"}
                                </ActionButton>
                            </ActionButtons>
                            <Link to={`${cartPath}`}>
                                <GoToCartButton>Go to cart</GoToCartButton>
                            </Link>
                        </>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}
