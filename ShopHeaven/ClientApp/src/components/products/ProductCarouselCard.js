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
import { theme } from "../../theme";

function ProductCarouselCard(props) {
  const ProductCardMedia = styled(CardMedia)({
    height: 250,
    position: "relative",
  });

  const StyledCardContent = styled(CardContent)({});

  const ImageRibbon = styled(Chip)({
    position: "absolute",
    top: theme.spacing(2),
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

  return (
    <StyledCard>
      <CardActionArea>
        <ProductCardMedia
          title={props.product.name}
          image={props.product.image}
        />
        <ImageRibbon label="primary" color="secondary" variant="contained" />
      </CardActionArea>
      <StyledCardContent>
        <Button variant="outlined" size="small">
          Category
        </Button>
        <StyledCardActionArea>
          <ProductName>
            {props.product.name.slice(0, 60) > 60
              ? props.product.name.slice(0, 60) + "..."
              : props.product.name.slice(0, 60)}
          </ProductName>
        </StyledCardActionArea>
        <Box>
          <RatingWrapper>
            <Rating
              name="half-rating-read"
              defaultValue={2.5}
              precision={0.5}
              readOnly
              size="small"
            />
            <RatingText component="legend" sx={{}}>
              {props.product.rating} stars
            </RatingText>
          </RatingWrapper>

          <PriceAndActionsWrapper>
            <PriceText variant="h5">$10</PriceText>
            <ActionsWrapper>
              <IconButton size="large" variant="contained">
                <Favorite sx={{ fontSize: "26px" }} />
              </IconButton>
              <IconButton size="large" variant="contained">
                <ShoppingCart sx={{ fontSize: "26px" }} />
              </IconButton>
            </ActionsWrapper>
          </PriceAndActionsWrapper>
        </Box>
      </StyledCardContent>
    </StyledCard>
  );
}

export default ProductCarouselCard;
