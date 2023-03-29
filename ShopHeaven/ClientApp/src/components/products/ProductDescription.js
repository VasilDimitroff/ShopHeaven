  import {  Box, Chip, Typography, Rating, } from "@mui/material";
  import { LinkedIn, GitHub, } from "@mui/icons-material";
  import { styled } from "@mui/material/styles";
  import { theme } from "../../theme";
  
  export default function ProductDescription(props) {
    
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
    color: props.product.isAvailable
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
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  })

    return (
        <div>
               <Box>
              <RatingWrapper>
                <Rating
                  readOnly
                  size="medium"
                  label="stars"
                  defaultValue={props.product.rating}
                  precision={0.5}
                />
                <RatingText>{`${
                  props.product.rating
                } (${1} reviews)`}</RatingText>
              </RatingWrapper>
              <BrandWrapper>
                <BrandInfo>{`Brand: ${props.product.brand}`}</BrandInfo>
              </BrandWrapper>
              <DescriptionWrapper>
                <InStockInfo>{`${
                  props.product.isAvailable ? "In Stock" : "Out of Stock"
                }`}</InStockInfo>
              </DescriptionWrapper>
              <DescriptionWrapper>
                <GuaranteeText>Guarantee:</GuaranteeText>
                <InStockInfo>{`${
                  props.product.hasGuarantee ? "Yes" : "No"
                }`}</InStockInfo>
              </DescriptionWrapper>
              <DescriptionWrapper>
                <Typography>{props.product.description.length > 650 ? `${props.product.description.slice(0, 650)}...` : props.product.description}</Typography>
              </DescriptionWrapper>
              </Box>
              <Box>
              <TagsWrapper>
                Tags:
                {props.product.tags.map((tag, index) => (
                  <StyledChip key={index} label={tag} color="secondary"></StyledChip>
                ))}
              </TagsWrapper>
              </Box>
        </div>
    );
  }
  