import React from "react";
import { Box,  Container, TextField,Slide, Typography,  Button, InputAdornment, Paper} from "@mui/material";
import { theme } from "../../theme";
import { styled } from "@mui/material/styles";
import { Person, Email } from "@mui/icons-material";
function SubscribeForm(props) {
  const Banner = styled(Box)({
    //backgroundColor: theme.palette.common.white.main,
    height: props.height,
    width: "100%",
    position: "relative",
    [theme.breakpoints.down("md")]: {
      height: props.heightSm,
    },
  });

  const Overlay = styled(Box)({
    paddingTop: props.ContentPaddingTop,
    //backgroundColor: "rgba(0, 0, 0, 0.0)",
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
    fontSize: "22px",
    [theme.breakpoints.down("md")]: {
      paddingBottom: theme.spacing(0),
    },
  });

  const StyledTextField = styled(TextField)({
    //color: "#ffffff",
    //backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderTopRightRadius: theme.shape.borderRadius,
    borderTopLeftRadius: theme.shape.borderRadius,
    width: "100%"
  });

  const FormWrapper = styled(Box)({
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(3),
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
          <Overlay>
            <Info>{props.infoText}</Info>
            <FormHolder>
              <FormWrapper>
                <InputBox>
                  <StyledTextField
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person
                            sx={{
                              fontSize: "34px",
                              pt: theme.spacing(1),
                              pb: theme.spacing(1),
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                    label="Name"
                    variant="outlined"
                    placeholder="Your Name"
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
                              pt: theme.spacing(1),
                              pb: theme.spacing(1),
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                    label="E-mail"
                    variant="outlined"
                    placeholder="Your E-mail"
                  />
                </InputBox>
                <SubscribeButton
                  variant="contained"
                  size="large"
                  color="secondary"
                >
                  SUBSCRIBE
                </SubscribeButton>
              </FormWrapper>
            </FormHolder>
          </Overlay>
      </Banner>
    </MainWrapper>
  );
}

export default SubscribeForm;
