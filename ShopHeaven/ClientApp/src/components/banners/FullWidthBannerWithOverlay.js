import { React, useState } from "react";
import { Box, Container, Button, Slide, Typography } from "@mui/material";
import { theme } from "../../theme";
import { styled } from "@mui/material/styles";

function FullWidthBannerWithOverlay(props) {

  const [showOverlay, setShowOverlay] = useState(!props.hoverOverlay);

const Banner =  styled(Box)({
  backgroundColor: theme.palette.primary.main,
  height: props.height,
  width: "100%",
  position: "relative"
});

const Overlay =  styled(Box)({
  backgroundColor: "rgba(0, 0, 0, 0.2)",
  height: props.height,
  position: "absolute",
  bottom: 0,
  width: "100%",
  display: showOverlay === true ? "flex" : "none",
});

const ButtonsHolder = styled(Container)({
width: "18%",
display: "flex",
alignItems: "center",
justifyContent: "space-between",
marginTop: theme.spacing(7),
[theme.breakpoints.down("lg")]: {
  width: "30%",
},
[theme.breakpoints.down("sm")]: {
  width: "50%",
  marginTop: theme.spacing(9),
},
});

const Info = styled(Typography)({
  textAlign:"center",
  paddingTop: theme.spacing(3),
  color: "white",
  fontSize: "22px",
  [theme.breakpoints.down("sm")]: {
    paddingTop: theme.spacing(2),
  },
})

  return (
    <Box pt={props.paddingTop} sx={{backgroundColor: theme.palette.appBackground.main}}>
      <Banner onMouseOver={() => setShowOverlay(true)} onMouseLeave={()=> setShowOverlay(!props.hoverOverlay)}>
      <Container><Info>{props.infoText}</Info></Container>
        <Slide direction="right" in={showOverlay}>
       
      <Overlay>
        
        <ButtonsHolder>
         
        {  props.buttonsTexts.map((buttonName, index) => {
            return (<Button key={index} variant="contained" color="secondary" size="large" sx={{ marginLeft: theme.spacing(1)}}>{buttonName}</Button>) 
        })}
        
        </ButtonsHolder>
      </Overlay>
      </Slide>
     </Banner>
    </Box>
  );
}

export default FullWidthBannerWithOverlay;
