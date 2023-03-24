import React from "react";
import {
  Box,
  Container,
  TextField,
  Slide,
  Typography,
  Button,
  FormControl,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import { theme } from "../../theme";
import { styled } from "@mui/material/styles";
import { AccountCircle } from "@mui/icons-material";
function SubscribeForm(props) {
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
    display: "flex",
  });

  const FormHolder = styled(Container)({
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      width: "50%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "80%",
    },
  });

  const Info = styled(Typography)({
    textAlign: "center",
    paddingTop: theme.spacing(3),
    color: "white",
    fontSize: "22px",
    [theme.breakpoints.down("md")]: {
        display: "none",
      },
  });

  const StyledTextField = styled(TextField)({
    color: "#ffffff",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderTopRightRadius: theme.shape.borderRadius,
    borderTopLeftRadius: theme.shape.borderRadius,
  });

  const FormWrapper = styled(Box)({
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    [theme.breakpoints.down("md")]: {
      display: "block",
      width: "100%",
      margin: "auto"
    },
  });

  const InputBox = styled(Box)({
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing(1.5),
    },
  });

  const SubscribeButton = styled(Button)({
    width: "80%",
    display: "block",
    margin: "auto",
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
  })

  return (
    <Box
      pt={props.paddingTop}
      sx={{ backgroundColor: theme.palette.appBackground.main, }}
    >
      <Banner>
          <Info>{props.infoText}</Info>
       
        <Slide direction="right" in={true}>
          <Overlay sx={{ display: "flex", alignItems:"center", border: "2px solid red"}}>
            <FormHolder>
         
              <FormWrapper variant="filled">
  
                <InputBox>
                  <AccountCircle
                    sx={{ color: theme.palette.white.main, fontSize: "60px" }}
                  />
                  <StyledTextField
                    id="input-with-sx"
                    label="Name"
                    color="white"
                    variant="filled"
                    sx={{fontSize: "34px"}}
                  />
                </InputBox>
                <InputBox>
                  <AccountCircle
                    sx={{ color: theme.palette.white.main, fontSize: "60px" }}
                  />
                  <StyledTextField
                    id="input-with-sx"
                    label="E-mail"
                    color="white"
                    variant="filled"
                  />
                </InputBox>
                <SubscribeButton variant="contained" color="secondary" size="large">
                  SUBSCRIBE
                </SubscribeButton>
              </FormWrapper>
            </FormHolder>
          </Overlay>
        </Slide>
      </Banner>
    </Box>
  );
}

export default SubscribeForm;
