import { Box, Grid, Slide, } from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";
import ImageCarouselItem from "./ImageCarouselItem";

export default function ImageCarouselSlide(props) {

  const StyledProductCarouselCard = styled(ImageCarouselItem)({});

  const SlideWrapper = styled(Box)({
    marginTop: theme.spacing(2.5),
    display: "flex",
    gap: 1,
  });

  return (
    <Box>
      <SlideWrapper>
        <Grid
          container
          columns={{ xs: 2, sm: 4, md: 6, lg: 10, xl: 12 }}
          sx={{
            display: "flex",
            alignItems: "flex-start",
            flexGrow: 1,
          }}
        >
          {Array.from(props.images.slice(0, props.cardsPerSlide)).map(
            (image, index) => (
              <Slide in={true} direction="up" key={index}>
              <Grid
                item 
                xs={1}
                sm={2}
                md={2}
                lg={2}
                xl={2}
                sx={{ display: "block" }}
                onClick={() => props.setIndex(index, props.slideIndex)}
              >              
                <StyledProductCarouselCard image={image} />             
              </Grid>
              </Slide>
            )
          )}
        </Grid>
      </SlideWrapper>
    </Box>
  );
};
