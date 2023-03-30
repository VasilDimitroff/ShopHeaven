import React from "react";
import { Box,  Container, TextField,Slide, Typography,  Button, InputAdornment, Paper} from "@mui/material";
import { theme } from "../../theme";
import { styled } from "@mui/material/styles";
import { Person, Email } from "@mui/icons-material";
function SubscribeForm(props) {
  const Banner = styled(Box)({
    backgroundColor: theme.palette.primary.main,
    height: props.height,
    width: "100%",
    position: "relative",
    [theme.breakpoints.down("md")]: {
      height: props.heightSm,
    },
  });

  const Overlay = styled(Box)({
    paddingTop: props.ContentPaddingTop,
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: props.height,
    position: "absolute",
    bottom: 0,
    width: "100%",
    [theme.breakpoints.down("md")]: {
      height: props.heightSm,
      paddingTop: theme.spacing(4.5),
    },
    [theme.breakpoints.down("sm")]: {
      height: props.heightSm,
      paddingTop: theme.spacing(4),
    },
  });

  const FormHolder = styled(Container)({
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      width: "50%",
      paddingTop: theme.spacing(4),
    },
    [theme.breakpoints.down("sm")]: {
      width: "80%",
    },
  });

  const Info = styled(Typography)({
    textAlign: "center",
    paddingBottom: theme.spacing(4),
    color: "white",
    fontSize: "22px",
    [theme.breakpoints.down("md")]: {
      paddingBottom: theme.spacing(0),
    },
  });

  const StyledTextField = styled(TextField)({
    color: "#ffffff",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderTopRightRadius: theme.shape.borderRadius,
    borderTopLeftRadius: theme.shape.borderRadius,
    width: "100%"
  });

  const FormWrapper = styled(Box)({
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    [theme.breakpoints.down("md")]: {
      display: "block",
      width: "100%",
      margin: "auto",
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
    width: "100%",
    display: "block",
    margin: "auto",
    paddingTop: theme.spacing(1.75),
    paddingBottom: theme.spacing(1.75),
  });

  const MainWrapper = styled(Paper)({
    width: "80%",
    display: "block",
    margin: "auto",
    paddingBottom: props.padddingBottom,
    paddingTop:props.paddingTop,
    marginTop: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      width: "95%",
    },
  })

  return (
    <MainWrapper>
      <Banner>
        <Slide direction="right" in={true}>
          <Overlay>
            <Info>{props.infoText}</Info>
            <FormHolder>
              <FormWrapper variant="filled" >
                <InputBox>
                  <StyledTextField
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person
                            sx={{
                              fontSize: "34px",
                              color: theme.palette.white.main,
                              pt: theme.spacing(1),
                              pb: theme.spacing(1),
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                    id="input-with-sx"
                    label="Name"
                    color="white"
                    variant="filled"
                  />
                </InputBox>
                <InputBox>
                  <StyledTextField
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email
                            sx={{
                              fontSize: "34px",
                              color: theme.palette.white.main,
                              pt: theme.spacing(1),
                              pb: theme.spacing(1),
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                    id="input-with-sx"
                    label="E-mail"
                    color="white"
                    variant="filled"
                  />
                </InputBox>
                <SubscribeButton
                  variant="contained"
                  color="secondary"
                  size="large"
                >
                  SUBSCRIBE
                </SubscribeButton>
              </FormWrapper>
            </FormHolder>
          </Overlay>
        </Slide>
      </Banner>
    </MainWrapper>
  );
}

export default SubscribeForm;
