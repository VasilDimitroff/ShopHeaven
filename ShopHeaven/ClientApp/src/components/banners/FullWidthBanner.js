import React from "react";
import { Box, CardMedia, CardActionArea } from "@mui/material";
import { theme } from "../../theme";
import { styled } from "@mui/material/styles";

function FullWidthBanner(props) {

const StyledCard =  styled(CardMedia)({
    borderRadius: "none",
    height: props.height,
    width: "100%",
    [theme.breakpoints.down("md")]: {
        height: props.heightSm,
      },
});

  return (
    <Box pt={props.paddingTop}>
      <CardActionArea>
        <StyledCard
          component="img"
          image={props.image}
          alt="green iguana"
        />
      </CardActionArea>

    </Box>
  );
}

export default FullWidthBanner;
//rafc