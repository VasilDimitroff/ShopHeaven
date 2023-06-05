import { useState } from "react";
import { Paper, Box, Typography, Chip, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "./../../theme";
import { useNavigate } from "react-router-dom";
import { subcategoryProductsBaseUrl, subcategoriesOfMainCategoryBaseUrl, singleProductBasePath } from "../../constants";

function CarouselItem(props) {
  const [product, setProduct] = useState(props.product);
  const navigate = useNavigate();

  const StyledChip = styled(Chip)({
    textTransform: "uppercase",
    fontWeight: 500,
    letterSpacing: 0.6,
  });

  const SliderImage = styled("img")({
    width: "100%",
    objectFit: "cover",
    height: 646,
    [theme.breakpoints.down("lg")]: {
      height: 646,
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
      textAlign: "center",
    },
  });

  const ProductDescription = styled(Typography)({
    marginTop: theme.spacing(1),
    paddingBottom: theme.spacing(3),
    textShadow: "1px 1px 0px #373737;",
    cursor: "pointer",
    [theme.breakpoints.down("md")]: {
      fontSize: "12px",
    },
  });

  const ProductName = styled(Typography)({
    marginTop: theme.spacing(2),
    textTransform: "uppercase",
    cursor: "pointer",
    textShadow: "2px 2px 1px #373737;",
    [theme.breakpoints.down("md")]: {
      fontSize: "20px",
    },
  });

  return (
    <Paper sx={{ position: "relative", marginTop: theme.spacing(1) }}>
      <SliderImage src={product.image.url} />
      <ContentWrapper>
        <Box sx={{ display: "flex", gap: 2 }}>
          
            <StyledChip
             onClick={() => navigate(`${subcategoriesOfMainCategoryBaseUrl}${product.category.id}`)}
              variant="filled"
              clickable={true}
              color="primary"
              label={product.category.name}
            />
          
          <StyledChip
            onClick={() => navigate(`${subcategoryProductsBaseUrl}${product.subcategory.id}`)}
            variant="filled"
            clickable={true}
            color="secondary"
            label={product.subcategory.name}
          />
        </Box>
        <Box onClick={() => navigate(`${singleProductBasePath}${product.id}`)}>
        <ProductName variant="h4">
          {product.name.length > 70
            ? `${product.name.slice(0, 70)}...`
            : `${product.name}`}
        </ProductName>
        <ProductDescription>
          {product.description.length > 200
            ? `${product.description.slice(0, 200)}...`
            : `${product.description}`}
        </ProductDescription>
        </Box>
        <Box sx={{ marginBottom: theme.spacing(7) }}>
      
          <Button onClick={() => navigate(`${singleProductBasePath}${product.id}`)} variant="contained" size="small">
            VIEW PRODUCT
          </Button>
     
        </Box>

      </ContentWrapper>
    </Paper>   
  );
}

export default CarouselItem;
