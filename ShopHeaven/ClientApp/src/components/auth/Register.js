import { React, Fragment, useRef, useEffect, useState } from "react";
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
import {
  validateEmail,
  validatePassword,
  passwordsMatch,
  registerUser,
} from "../../services/authService";

export default function Register() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [matchPwd, setMatchPwd] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd, matchPwd]);

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
    marginBottom: theme.spacing(4),
  });

  const LinkHolder = styled(Box)({
    paddingTop: theme.spacing(2),
    fontSize: 16,
    width: "80%",
    display: "flex",
    margin: "auto",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    const isFormValid = validateForm(email, password, confirmPassword);

    if (!isFormValid) {
        return;
    }

    const user = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    try {
      const response = await registerUser(user);
      console.log("RESPONSE: " + response.data);
      setErrMsg("");
      setSuccess(true);

      setEmail("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response.status === 403) {
        setErrMsg("Email already taken!");
      } else {
        setErrMsg("Registration Failed!");
      }
    }
  };

  function validateForm(email, password, confirmPassword) {
    const isEmailValid = validateEmail(email);

    if (!isEmailValid) {
      setErrMsg("Invalid Email");
      return false;
    }

    const isPasswordValid = validatePassword(password);

    if (!isPasswordValid) {
      setErrMsg("Invalid Password");
      return false;
    }

    const arePasswordsMatch = passwordsMatch(password, confirmPassword);

    if (!arePasswordsMatch) {
      setErrMsg("Passwords must match!");
      return false;
    }

    return true;
  }

  return (
    <Fragment>
      <BreadcrumbsBar breadcrumbsItems={breadcrumbs} />
      <FormWrapper>
        {success === true ? (
          <section>
            <h1>You are registered succesfully!</h1>
            <p>
              <a href="#">Sign In</a>
            </p>
          </section>
        ) : (
          <>
            <FormHeading variant="h4"> REGISTER PROFILE</FormHeading>
            <p>{errMsg}</p>
            <Container>
              <form onSubmit={handleSubmit}>
                <ProductInfoInput
                  inputRef={emailRef}
                  autoComplete="off"
                  required
                  id="email"
                  label="Email"
                  type="text"
                  variant="filled"
                />

                <ProductInfoInput
                  inputRef={passwordRef}
                  required
                  id="password"
                  label="Password"
                  type="password"
                  variant="filled"
                />

                <ProductInfoInput
                  inputRef={confirmPasswordRef}
                  required
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
          </>
        )}
      </FormWrapper>
      <Box sx={{ mt: theme.spacing(3) }}>
        <FullWidthBanner
          paddingTop={theme.spacing(3.5)}
          height={250}
          heightSm={180}
          image="https://img.freepik.com/free-psd/online-shopping-banner-template_23-2148644052.jpg?w=2000"
        />
      </Box>
    </Fragment>
  );
}
