  import {  Box, Chip, Typography, Rating, } from "@mui/material";
  import useMediaQuery from "@mui/material/useMediaQuery";
  import { styled } from "@mui/material/styles";
  import { theme } from "../../theme";
  
  export default function ProductDescription(props) {

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
    borderRadius: theme.shape.borderRadius,
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
                <GuaranteeText>Guarantee:</GuaranteeText>
                <InStockInfo>{`${
                  props.product.hasGuarantee ? "Yes" : "No"
                }`}</InStockInfo>
              </DescriptionWrapper>
              <DescriptionWrapper>
                <Typography>{props.product.description.length > DescriptionLength() ? `${props.product.description.slice(0, DescriptionLength())}...` : props.product.description}</Typography>
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
  