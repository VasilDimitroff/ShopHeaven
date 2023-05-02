import  { React, Fragment, useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  TextField,
  Paper,
  Container,
  Button,
  Typography,
} from "@mui/material";
import { theme } from "../../theme";
import { styled } from "@mui/material/styles";
import BreadcrumbsBar from "../BreadcrumbsBar";
import FullWidthBanner from "../banners/FullWidthBanner";

export default function Register() {

  const breadcrumbs = [
    {
      name: "Home",
      uri: "/",
    },
    {
      name: "Register",
      uri: "/register",
    },
  ];

  const ProductInfoInput = styled(TextField)({
    background: "rgb(255,249,249)",
    width: "80%",
    display: "flex",
    margin: "auto",
    marginTop: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
  });

  const FormWrapper = styled(Paper)({
    width: "80%",
    display: "block",
    margin: "auto",
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    paddingTop: theme.spacing(5),
  });

  const RegisterButton = styled(Button)({
    width: "80%",
    display: "flex",
    margin: "auto",
    marginTop: theme.spacing(3),
  });

  const FormHeading = styled(Typography)({
    textAlign: "center",
    fontWeight: 500,
    marginBottom: theme.spacing(4)
  });

  const LinkHolder = styled(Box)({
    paddingTop: theme.spacing(2),
    fontSize: 16,
    width: "80%",
    display: "flex",
    margin: "auto",
  });

  return (
    <Fragment>
      <BreadcrumbsBar breadcrumbsItems={breadcrumbs} />
      <FormWrapper>
        <FormHeading variant="h4"> REGISTER PROFILE</FormHeading>
        <Container>
          <form>
            <ProductInfoInput
              autoFocus={true}
              id="email"
              label="Email"
              type="text"
              variant="filled"
            />
            <ProductInfoInput
              id="password"
              label="Password"
              type="password"
              variant="filled"
            />
            <ProductInfoInput
              id="confirm-password"
              label="Confirm Password"
              type="password"
              variant="filled"
            />
            <RegisterButton type="submit" variant="contained" size="large">
              REGISTER
            </RegisterButton>
          </form>
          <LinkHolder>
            <Link to="/login">Already have a profile? Log in!</Link>
          </LinkHolder>
        </Container>
      </FormWrapper>
      <Box sx={{mt: theme.spacing(3)}}>
      <FullWidthBanner paddingTop={theme.spacing(3.5)}
        height={250}
        heightSm={180}
        image="https://img.freepik.com/free-psd/online-shopping-banner-template_23-2148644052.jpg?w=2000"/>
      </Box> 
    </Fragment>
  );
}

//rafc
