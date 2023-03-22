import { Paper, Button, Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "./../../theme";

function CarouselItem(props) {
  const SliderImage = styled("img")({
    width: "100%",
    objectFit: "cover",
    height: 765,

    [theme.breakpoints.down("md")]: {
      height: 400,
    },
  });

  const SliderButton = styled(Button)({
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(2),
  });

  return (
    <Paper sx={{ position: "relative" }}>
      <SliderImage src={props.item.image} />
      <Box
        sx={{
          width: "100%",
          position: "absolute",

          backgroundColor: "rgba(0,0,0,.5)",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          bottom: 0,
        }}
      >
        <Container>
          <Typography variant="h4" sx={{ marginTop: theme.spacing(3),  [theme.breakpoints.down("md")]: {
             fontSize: "22px"
          }, }}>
            {props.item.name}
          </Typography>
          <Typography sx={{
             marginTop: theme.spacing(1),
             [theme.breakpoints.down("md")]: {
                fontSize: "12px"
             },
          }}>
            {props.item.description.length > 200
              ? `${props.item.description.slice(0, 200)}...`
              : `${props.item.description.slice(0, 200)}`}
          </Typography>
          <SliderButton variant="contained" color="secondary" size="large">
            <Typography>Check it out!</Typography>
          </SliderButton>
        </Container>
      </Box>
    </Paper>
  );
}
//<div sx={{position: "absolute", zIndex:"100", top: "0px", backgroundColor: "black", height: "300px", marginTop: "400px"}}>{props.item.description}</div>
export default CarouselItem;
