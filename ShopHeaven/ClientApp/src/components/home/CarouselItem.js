import { useState } from "react";
import { Paper, Box, Typography, Chip, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "./../../theme";

function CarouselItem(props) {

  const [product, setProduct] = useState(props.product);

  const StyledChip = styled(Chip)({
    textTransform: "uppercase",
    fontWeight: 500,
    letterSpacing: 0.6,
    cursor: "pointer",
  });

  const SliderImage = styled("img")({
    width: "100%",
    objectFit: "cover",
    height: 670,
    [theme.breakpoints.down("lg")]: {
      height: 670,
    },
    [theme.breakpoints.down("md")]: {
      height: 450,
    },
    [theme.breakpoints.down("sm")]: {
      height: 340,
    },
  });

  const ContentWrapper = styled(Box)({
    width: "100%",
    position: "absolute",
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.0) 0%, " +
      "rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.7) 100%)",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    bottom: 0,
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      textAlign: "center"
    },
  });

  return (
    <Paper sx={{ position: "relative"}}>
      <SliderImage src={product.image} />
      <ContentWrapper>
        <Box sx={{ display: "flex", gap: 2 }}>
          <StyledChip variant="filled" color="primary" label={product.category.name} />
          <StyledChip
            variant="filled"
            color="secondary"
            label={product.subcategory.name}
          />
        </Box>
        <Typography
          variant="h4"
          sx={{
            marginTop: theme.spacing(2),
            textTransform: "uppercase",
            textShadow: "2px 2px 1px #373737;",
            [theme.breakpoints.down("md")]: {
              fontSize: "20px",
            },
          }}
        >
           {product.name.length > 70
            ? `${product.name.slice(0, 70)}...`
            : `${product.name}`}
        </Typography>
        <Typography
          sx={{
            marginTop: theme.spacing(1),
            paddingBottom: theme.spacing(3),
            textShadow: "1px 1px 0px #373737;",
            [theme.breakpoints.down("md")]: {
              fontSize: "12px",
            },
          }}
        >
          {product.description.length > 200
            ? `${product.description.slice(0, 200)}...`
            : `${product.description}`}
        </Typography>
        <Box sx={{ marginBottom: theme.spacing(7) }}>
          <Button variant="contained" size="small">
            VIEW PRODUCT
          </Button>
        </Box>
      </ContentWrapper>
    </Paper>
  );
}

export default CarouselItem;
