import { useState } from "react";
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
import { theme } from "../../../theme";

function ProductCarouselCard(props) {
  const [product, setProduct] = useState(props.product);

  const ProductCardMedia = styled(CardMedia)({
    height: 250,
    position: "relative",
  });

  const LabelsHolder = styled(Box)({
    position: "absolute",
    top: 10,
    left: -12,
    borderTopLeftRadius: "0px",
    borderBottomLeftRadius: "0px",
    borderTopRightRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
  });

  const StyledCardActionArea = styled(CardActionArea)({
    height: 95,
    minHeight: 95,
    maxHeight: 95,
    display: "block",
  });

  const ProductName = styled(Typography)({
    fontWeight: "600",
    fontSize: "120%",
    lineHeight: 1.1,
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

  const ActionsWrapper = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    gap: 1,
  });

  const RatingText = styled(Typography)({
    marginLeft: theme.spacing(1),
  });

  const PriceText = styled(Typography)({
    color: theme.palette.secondary.main,
    fontWeight: "600",
  });

  const StyledCard = styled(Card)({
    marginLeft: theme.spacing(0.7),
    marginRight: theme.spacing(0.7),
    minHeight: 400,
  });

  const InStockState = styled(Box)({
    fontWeight: 500,
    color:
      product.isAvailable === true
        ? theme.palette.success.main
        : theme.palette.error.main,
  });

  const ProductLabel = styled(Chip)({
    fontSize: 11,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    marginTop: theme.spacing(0.7),
  });

  return (
    <StyledCard>
      <CardActionArea>
        <ProductCardMedia title={product.name} image={product.thumbnail.url} />
        <LabelsHolder sx={{}}>
          {product.labels.map((label) => {
            return (
              <Box key={label}>
                <ProductLabel
                  label={label}
                  color="secondary"
                  variant="filled"
                />
              </Box>
            );
          })}
        </LabelsHolder>
      </CardActionArea>
      <CardContent>
        <Button variant="outlined" size="small">
          Category
        </Button>
        <StyledCardActionArea>
          <ProductName>
            {product.name.length > 60
              ? product.name.slice(0, 60) + "..."
              : product.name.slice(0, 60)}
          </ProductName>
        </StyledCardActionArea>
        <InStockState>
          {product.isAvailable === true ? "In Stock" : "Out of stock"}
        </InStockState>
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

          <PriceAndActionsWrapper>
            <PriceText variant="h5">
              {product.currency.code} {product.price.toFixed(2)}
            </PriceText>
            <ActionsWrapper>
              <IconButton
                size="large"
                variant="contained"
                sx={{
                  "&:hover": {
                    color: theme.palette.error.main,
                  },
                }}
              >
                <Favorite sx={{ fontSize: "26px" }} />
              </IconButton>
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
            </ActionsWrapper>
          </PriceAndActionsWrapper>
        </Box>
      </CardContent>
    </StyledCard>
  );
}

export default ProductCarouselCard;