import { Paper, Box, Typography, Chip, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "./../../theme";

function CarouselItem(props) {
  const StyledChip = styled(Chip)({
    textTransform: "uppercase",
    fontWeight: 500,
    letterSpacing: 0.6,
    cursor: "pointer",
  });

  const SliderImage = styled("img")({
    width: "100%",
    objectFit: "cover",
    height: 623,
    [theme.breakpoints.down("lg")]: {
      height: 625,
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
    <Paper sx={{ position: "relative" }}>
      <SliderImage src={props.item.image} />
      <ContentWrapper>
        <Box sx={{ display: "flex", gap: 2 }}>
          <StyledChip variant="filled" color="primary" label="Category name" />
          <StyledChip
            variant="filled"
            color="secondary"
            label="Subcategory name"
          />
        </Box>
        <Typography
          variant="h4"
          sx={{
            marginTop: theme.spacing(2),
            textTransform: "uppercase",
            textShadow: "2px 2px 1px #373737;",
            [theme.breakpoints.down("md")]: {
              fontSize: "22px",
            },
          }}
        >
          {props.item.name}
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
          {props.item.description.length > 200
            ? `${props.item.description.slice(0, 200)}...`
            : `${props.item.description.slice(0, 200)}`}
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
