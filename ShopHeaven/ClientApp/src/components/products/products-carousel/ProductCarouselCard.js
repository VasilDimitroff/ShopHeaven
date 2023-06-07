import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Rating,
  Box,
  Typography,
  Card,
  CardActionArea,
  IconButton,
  Button,
  CardContent,
  CardMedia,
  Chip,
  Snackbar,
  Slide,
} from "@mui/material";
import { ShoppingCart, Favorite } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { loginPath, singleProductBasePath } from "../../../constants";
import { theme } from "../../../theme";
import useAppSettings from "../../../hooks/useAppSettings";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useUser from "../../../hooks/useUser";
import { ApiEndpoints } from "../../../api/endpoints";
import { noPermissionsForOperationMessage } from "../../../constants";

function ProductCarouselCard(props) {
  const { appSettings } = useAppSettings();
  const { auth } = useAuth();
  const { setUser } = useUser();
  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const [product, setProduct] = useState(props.product);

  const [subcategory, setSubcategory] = useState(props.subcategory);

  const [addToCartResponseMessage, setAddToCartResponseMessage] = useState("");
  const [addToCartErrorMessage, setAddToCartErrorMessage] = useState("");

  function onAddProductToCart() {
    if (!auth.isLogged) {
      navigate(loginPath);
    }

    let isValid = validateProductQuantity(1);

    if (!isValid) {
      return;
    }

    const requestData = {
      userId: auth.userId,
      cartId: auth.cartId,
      productId: product.id,
      quantity: 1,
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
    }
  }

  function validateProductQuantity(addQuantityValue) {
    if (!product.isAvailable) {
      setAddToCartErrorMessage(
        `Product is out of stock! You cannot purchase it!`
      );
      return false;
    }

    if (addQuantityValue > product.quantity) {
      setAddToCartErrorMessage(
        `In stock are ${product.quantity} items only! It is the maximum quantity you can purchase.`
      );
      return false;
    }

    return true;
  }

  function handleCloseSnackbar() {
    setAddToCartErrorMessage("");
    setAddToCartResponseMessage("");
  }

  const ProductCardMedia = styled(CardMedia)({
    height: 250,
    position: "relative",
  });

  const FavoriteIconHolder = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "rgba(255, 255, 255, 0.8)",
    "&:hover": {
      color: theme.palette.error.main,
    },
  });

  const FavoriteIcon = styled(Box)({
    position: "absolute",
    top: "35%",
    backgroundColor: "rgba(0, 0, 0, 0.00)",
    borderRadius: "50%",
    padding: theme.spacing(1.5),
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
  });

  const RibbonHolder = styled(Box)({
    position: "absolute",
    top: 10,
    left: -12,
    borderTopLeftRadius: "0px",
    borderBottomLeftRadius: "0px",
    borderTopRightRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
  });

  const ProductRibbon = styled(Chip)({
    fontSize: 14,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    marginTop: theme.spacing(0.7),
  });

  const LabelsHolder = styled(Box)({
    position: "absolute",
    bottom: 5,
    left: 8,
    display: "flex",
    gap: 5,
    justifyContent: "center",
  });

  const ProductLabel = styled(Chip)({
    fontSize: 14,
    borderRadius: 6,
  });

  const StyledCardActionArea = styled("div")({
    //lineHeight: '1.2em', // 1 row height
    height: "4.56em", // 3 rows
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 3, // 3 rows
    WebkitBoxOrient: "vertical",
    marginBottom: theme.spacing(1),
  });

  const ProductName = styled(Typography)({
    lineHeight: 1.2,
    fontWeight: 500,
    fontSize: "120%",
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.primary.main,
    },
  });

  const RatingWrapper = styled(Box)({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  });

  const PriceAndActionsWrapper = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  });

  const RatingText = styled(Typography)({
    marginLeft: theme.spacing(1),
    whiteSpace: "nowrap",
  });

  const PriceText = styled(Typography)({
    color: theme.palette.secondary.main,
    whiteSpace: "nowrap",
    fontWeight: 500,
  });

  const StyledCard = styled(Card)({
    marginLeft: theme.spacing(0.7),
    marginRight: theme.spacing(0.7),
    minHeight: 400,
  });

  return (
    <StyledCard>
      <CardActionArea>
        <ProductCardMedia
          onClick={() => navigate(`${singleProductBasePath}${product.id}`)}
          title={product.name}
          image={props.image}
        />
        <FavoriteIconHolder>
          <FavoriteIcon>
            <Box>
              <Favorite
                sx={{
                  fontSize: "30px",
                }}
              />
            </Box>
          </FavoriteIcon>
        </FavoriteIconHolder>
        <RibbonHolder>
          {product.discount > 0 ? (
            <Box>
              <ProductRibbon
                label={`- ${product.discount}%`}
                color="error"
                variant="filled"
              />
            </Box>
          ) : (
            <></>
          )}
        </RibbonHolder>
        <LabelsHolder>
          {product.labels.map((label) => {
            return (
              <ProductLabel
                key={label}
                label={label}
                color="primary"
                size="small"
                variant="filled"
              />
            );
          })}
        </LabelsHolder>
      </CardActionArea>
      <CardContent>
        {subcategory?.name ? (
          <Button variant="outlined" size="small">
            {subcategory?.name}
          </Button>
        ) : (
          <></>
        )}
        <StyledCardActionArea>
          <ProductName
            onClick={() => navigate(`${singleProductBasePath}${product.id}`)}
          >
            {product.name}
          </ProductName>
        </StyledCardActionArea>
        <Box>
          <RatingWrapper>
            <Rating
              name="half-rating-read"
              defaultValue={product.rating}
              precision={0.5}
              readOnly
              size="small"
            />
            <RatingText component="legend">
              {product.rating.toFixed(2)} stars
            </RatingText>
          </RatingWrapper>
          {product?.discount > 0 ? (
            <Box
              sx={{
                height: 25,
                color: "gray",
                textDecoration: "line-through",
              }}
            >
              {appSettings.appCurrency.code} {product.price.toFixed(2)}
            </Box>
          ) : (
            <Box sx={{ height: 25 }}></Box>
          )}
          <PriceAndActionsWrapper>
            <PriceText variant="h6">
              {`${appSettings.appCurrency.code} ${(
                Math.round(
                  (product.price - (product.price * product.discount) / 100) *
                    100
                ) / 100
              ).toFixed(2)}`}
            </PriceText>
            <Box>
              <IconButton
                onClick={onAddProductToCart}
                size="large"
                variant="contained"
                sx={{
                  color: theme.palette.primary.main,
                }}
              >
                <ShoppingCart sx={{ fontSize: "26px" }} />
              </IconButton>
            </Box>
          </PriceAndActionsWrapper>
        </Box>
      </CardContent>
      <Snackbar
        onClose={handleCloseSnackbar}
        autoHideDuration={10000}
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
        onClose={handleCloseSnackbar}
        autoHideDuration={10000}
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
    </StyledCard>
  );
}

export default ProductCarouselCard;
