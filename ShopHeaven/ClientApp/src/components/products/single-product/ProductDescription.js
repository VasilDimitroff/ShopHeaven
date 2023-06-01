  import {  Box, Chip, Typography, Rating } from "@mui/material";
  import useMediaQuery from "@mui/material/useMediaQuery";
  import { styled } from "@mui/material/styles";
  import { theme } from "../../../theme";
import { useState } from "react";
  
  export default function ProductDescription(props) {

    const [product, setProduct] = useState(props.product);

  function DescriptionLength() {
    let charactersToShowForDescription = 100;

    const isBiggerOrXs = useMediaQuery(theme.breakpoints.up("xs"));
    const isBiggerOrSm = useMediaQuery(theme.breakpoints.up("sm"));
    const isBiggerOrMd = useMediaQuery(theme.breakpoints.up("md"));
    const isBiggerOrLg = useMediaQuery(theme.breakpoints.up("lg"));
    const isBiggerOrXl = useMediaQuery(theme.breakpoints.up("xl"));

    if (isBiggerOrXs === true) {
      charactersToShowForDescription = 1000;
    }
    if (isBiggerOrSm === true) {
      charactersToShowForDescription = 1000;
    }
    if (isBiggerOrMd === true) {
      charactersToShowForDescription = 570;
    }
    if (isBiggerOrLg === true) {
      charactersToShowForDescription = 600;
    }
    if (isBiggerOrXl === true) {
      charactersToShowForDescription = 650;
    }

    return charactersToShowForDescription;
  }

  const RatingWrapper = styled(Box)({
    display: "flex",
  });

  const RatingText = styled(Typography)({
    marginLeft: theme.spacing(1),
    fontWeight: 500,
  });

  const TagsWrapper = styled(Box)({
    display: "flex",
    justifyContent: "flex-start",
    gap: 8,
    bottom: 0,
    fontWeight: 500,
    position: "absolute",
    alignItems: "center",
    [theme.breakpoints.down("lg")]: {
      position: "relative",
    },
  });

  const DescriptionWrapper = styled(Box)({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: "flex",
  });

  const BrandWrapper = styled(Box)({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: "flex",
  });

  const InStockInfo = styled(Typography)({
    fontWeight: 500,
    fontSize: 18,
    color: product.isAvailable
      ? theme.palette.success.main
      : theme.palette.error.main,
  });

  const BrandInfo = styled(Typography)({
    fontWeight: 500,
    fontSize: 18,
  });

  const GuaranteeText = styled(Typography)({
    fontWeight: 500,
    fontSize: 18,
    marginRight: theme.spacing(1),
  });

  const StyledChip = styled(Chip)({
    cursor: "pointer",
    borderRadius: theme.shape.borderRadius,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  })

  function renderDescription(){
    return (
      <Typography>
        {product.description.length > DescriptionLength()
          ? `${product.description.slice(0, DescriptionLength())}...`
          : product.description}
      </Typography>
    );
  }

    return (
        <div>
               <Box>
              <RatingWrapper>
                <Rating
                  readOnly
                  size="medium"
                  label="stars"
                  defaultValue={product.rating}
                  precision={0.5}
                />
                <RatingText>{`${
                  product.rating
                } (${product.reviews.length} reviews)`}</RatingText>
              </RatingWrapper>
              <BrandWrapper>
                <BrandInfo>{`Brand: ${product.brand}`}</BrandInfo>
              </BrandWrapper>
              <DescriptionWrapper>
                <GuaranteeText>Guarantee:</GuaranteeText>
                <InStockInfo>{product.hasGuarantee ? "Yes" : "No" }</InStockInfo>
              </DescriptionWrapper>
              <DescriptionWrapper>
                {renderDescription() }
              </DescriptionWrapper>
              </Box>
              <Box>
              <TagsWrapper>
                Tags:
                {product.tags.map((tag, index) => (
                  <StyledChip key={index} label={tag} color="secondary"></StyledChip>
                ))}
              </TagsWrapper>
              </Box>
        </div>
    );
  }
  