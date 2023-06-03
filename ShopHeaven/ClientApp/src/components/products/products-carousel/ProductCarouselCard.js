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
} from "@mui/material";
import { ShoppingCart, Favorite } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { singleProductBasePath } from "../../../constants";
import { theme } from "../../../theme";

function ProductCarouselCard(props) {
  const navigate = useNavigate();
  const [product, setProduct] = useState(props.product);

  const [subcategory, setSubcategory] = useState(props.subcategory);

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
  })

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
    display: '-webkit-box',
    WebkitLineClamp: 3, // 3 rows
    WebkitBoxOrient: 'vertical',
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
            <RatingText component="legend">{product.rating} stars</RatingText>
          </RatingWrapper>
          {product?.discount > 0 ? (
            <Box
              sx={{
                height: 25,
                color: "gray",
                textDecoration: "line-through",
              }}
            >
              {product.currency} {product.price.toFixed(2)}
            </Box>
          ) : (
            <Box sx={{ height: 25 }}></Box>
          )}
          <PriceAndActionsWrapper>
            <PriceText variant="h6">
              {`${product.currency} ${(
                Math.round(
                  (product.price - (product.price * product.discount) / 100) *
                    100
                ) / 100
              ).toFixed(2)}`}
            </PriceText>
            <Box>
              <IconButton
                size="large"
                variant="contained"
                sx={{
                  "&:hover": {
                    color: theme.palette.primary.main,
                  },
                }}
              >
                <ShoppingCart sx={{ fontSize: "26px" }} />
              </IconButton>
            </Box>
          </PriceAndActionsWrapper>
        </Box>
      </CardContent>
    </StyledCard>
  );
}

export default ProductCarouselCard;
