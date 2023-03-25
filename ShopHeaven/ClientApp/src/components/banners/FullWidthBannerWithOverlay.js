import { React, useState } from "react";
import { Box, Container, Button, Slide, Typography } from "@mui/material";
import { theme } from "../../theme";
import { styled } from "@mui/material/styles";

function FullWidthBannerWithOverlay(props) {
  const [showOverlay, setShowOverlay] = useState(!props.hoverOverlay);

  function handleShowOverlay(value){
    setShowOverlay(value);
  }

  const Banner = styled(Box)({
    backgroundColor: theme.palette.primary.main,
    height: props.height,
    width: "100%",
    position: "relative",
  });

  const Overlay = styled(Box)({
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    height: props.height,
    position: "absolute",
    bottom: 0,
    width: "100%",
    display: showOverlay === true ? "block" : "none",
  });

  const ButtonsHolder = styled(Container)({
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("lg")]: {
      width: "30%",
      marginTop: theme.spacing(3.5),
    },
    [theme.breakpoints.down("sm")]: {
      width: "50%",
      marginTop: theme.spacing(1),
    },
  });

  const Info = styled(Typography)({
    textAlign: "center",
    paddingTop: theme.spacing(3),
    color: "white",
    fontSize: "22px",
    width: "100%",
    lineHeight: 1.2,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing(2),
    },
  });

  return (
    <Box
      pt={props.paddingTop}
      sx={{ backgroundColor: theme.palette.appBackground.main }}
    >
      <Banner
        onMouseOver={() => handleShowOverlay(true)}
        onMouseLeave={() => handleShowOverlay(!props.hoverOverlay)}
      >
        <Slide direction="right" in={showOverlay}>
          <Overlay>
            <Info>{props.infoText}</Info>
            <ButtonsHolder>
              {props.buttonsTexts.map((buttonName, index) => {
                return (
                  <Button
                    key={index}
                    variant="contained"
                    color="secondary"
                    size="large"
                    sx={{ marginLeft: theme.spacing(1) }}
                  >
                    {buttonName}
                  </Button>
                );
              })}
            </ButtonsHolder>
          </Overlay>
        </Slide>
      </Banner>
    </Box>
  );
}

export default FullWidthBannerWithOverlay;
