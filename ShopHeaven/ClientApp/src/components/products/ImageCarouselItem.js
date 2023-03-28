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

export default function ImageCarouselItem(props) {

  const ProductCardMedia = styled(CardMedia)({
    height: 55,
    position: "relative",
  });

  const StyledCard = styled(Card)({
    marginLeft: theme.spacing(0.7),
    marginRight: theme.spacing(0.7),
  });


  return (
    <StyledCard>
      <CardActionArea>
        <ProductCardMedia
          image={props.image}
        />
      </CardActionArea>
    </StyledCard>
  );
}
