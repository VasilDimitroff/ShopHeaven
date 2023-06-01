import { Box, Chip, Typography, Rating, Grid } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { VerifiedUser, GppBad, PrecisionManufacturing, AssignmentTurnedIn, AssignmentLate } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { theme } from "../../../theme";
import { useState } from "react";

export default function ProductDescription(props) {
  const [product, setProduct] = useState(props.product);

  const isBiggerOrXs = useMediaQuery(theme.breakpoints.up("xs"));
  const isBiggerOrSm = useMediaQuery(theme.breakpoints.up("sm"));
  const isBiggerOrMd = useMediaQuery(theme.breakpoints.up("md"));
  const isBiggerOrLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isBiggerOrXl = useMediaQuery(theme.breakpoints.up("xl"));

  function DescriptionLength() {
    let charactersToShowForDescription = 100;

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
      charactersToShowForDescription = 550;
    }
    if (isBiggerOrXl === true) {
      charactersToShowForDescription = 650;
    }

    return charactersToShowForDescription;
  }

  function renderDescription() {
    return (
      <Typography>
        {product.description.length > DescriptionLength()
          ? `${product.description.slice(0, DescriptionLength())}...`
          : product.description}
      </Typography>
    );
  }

    function renderAvailability(){
    return `${product.isAvailable ? "In Stock" : "Out of Stock" }`
  }

  const RatingWrapper = styled(Box)({
    display: "flex",
  });

  const RatingText = styled(Typography)({
    marginLeft: theme.spacing(1),
    fontWeight: 500,
  });

  const DescriptionWrapper = styled(Box)({
    marginBottom: theme.spacing(2),
    display: "flex",
  });

  const SubheadingInfoWrapper = styled(Box)({
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    display:"flex",
    justifyContent: "space-between",
    gap: 1
  });

  const InStockInfo = styled(Typography)({
    fontWeight: 500,
    fontSize: 18,
  });

  const BrandInfo = styled(Typography)({
    fontWeight: 500,
    fontSize:18,
  });

  const WarrantyText = styled(Typography)({
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
  });

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
          <RatingText>{`${product.rating} (${product.reviews.length} reviews)`}</RatingText>
        </RatingWrapper>
        <SubheadingInfoWrapper>
          <Box sx={{ display: "flex", gap: 1 }}>
            <PrecisionManufacturing
              sx={{ color: theme.palette.primary.main }}
            />
            <BrandInfo>{`Brand: ${product.brand}`}</BrandInfo>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            {product.isAvailable ? (
              <AssignmentTurnedIn sx={{ color: theme.palette.success.main }} />
            ) : (
              <AssignmentLate sx={{ color: theme.palette.error.main }} />
            )}
            <InStockInfo>{renderAvailability()}</InStockInfo>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            {
              product.hasGuarantee
              ?
              <VerifiedUser sx={{ color: theme.palette.success.main }} />
              :  <GppBad sx={{ color: theme.palette.error.main }} />
            }   
            <WarrantyText>
              {product.hasGuarantee ? "Has Warranty" : "No Warranty"}
            </WarrantyText>
          </Box>
        </SubheadingInfoWrapper>
        <DescriptionWrapper>{renderDescription()}</DescriptionWrapper>
      </Box>
      <Box>
        <b>TAGS: </b>
        <Grid
          spacing={1}
          direction="row"
          columns={product.tags.length}
          container
        >
          {product.tags.map((tag, index) => (
            <Grid key={tag} item xs={1} sm={1} md={1} lg={1}>
              <StyledChip
                size="small"
                label={tag}
                color="secondary"
              ></StyledChip>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}
