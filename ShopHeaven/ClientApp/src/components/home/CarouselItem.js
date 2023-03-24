import { Paper, Box, Container,Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "./../../theme";

function CarouselItem(props) {
  const SliderImage = styled("img")({
    width: "100%",
    objectFit: "cover",
    height: 765,

    [theme.breakpoints.down("md")]: {
      height: 300,
    },
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
            <Typography
              variant="h4"
              sx={{
                marginTop: theme.spacing(3),
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
                paddingBottom: theme.spacing(6),
                [theme.breakpoints.down("md")]: {
                  fontSize: "12px",
                },
              }}
            >
              {props.item.description.length > 200
                ? `${props.item.description.slice(0, 200)}...`
                : `${props.item.description.slice(0, 200)}`}
            </Typography>
            
          </Container>
        </Box>
    </Paper>
  );
}

export default CarouselItem;
