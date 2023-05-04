import { React, Fragment, useRef, useEffect, useState,} from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import {
  Box,
  TextField,
  Paper,
  Container,
  Button,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { theme } from "../../theme";
import { styled } from "@mui/material/styles";
import BreadcrumbsBar from "../BreadcrumbsBar";
import FullWidthBanner from "../banners/FullWidthBanner";
import {
  validateEmail,
  validatePassword,
  login,
} from "../../services/authService";

export default function Login() {
  const { setAuth } = useAuth();

  const emailRef = useRef();
  const passwordRef = useRef();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [pwd, setPwd] = useState("");
  const [validPassword, setValidPassword] = useState(true);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  useEffect(() => {
    setValidEmail(validateEmail(email));
  }, [validEmail]);

  useEffect(() => {
    setValidPassword(validatePassword(pwd));
  }, [validPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    setEmail(user.email);
    setPwd(user.password);

    let emailValidation = validateEmail(user.email);
    setValidEmail(emailValidation);

    let passwordValidation = validatePassword(user.password);
    setValidPassword(passwordValidation);

    if (!emailValidation || !passwordValidation) {
      return;
    }

    try {
      const response = await login(user);

      const userId = response?.data?.id;
      const jwtToken = response?.data?.jwtToken;
      const roles = response?.data?.roles;
      const email = response?.data?.email;

      setAuth({
        userId: userId,
        jwtToken: jwtToken,
        roles: roles,
        email: email,
        isLogged: true,
      });

      setSuccess(true);
      refreshState();

      console.log("----------------");
      console.log("TOKEN IS: " + response.data.jwtToken);
      console.log("EMAIL IS: " + response.data.email);
      console.log("ID IS: " + response.data.id);
      console.log("ROLES ARE: " + response.data.roles.length);
    } catch (err) {
      handleError(err);
    }
  };

  function handleError(err) {
    if (!err?.response) {
      setErrMsg("No Server Response");
    } else {
      setErrMsg(
        "Login failed! Check if the e-mail and password are entered correctly."
      );
    }
  }

  function refreshState() {
    setErrMsg("");

    setEmail("");
    setPwd("");

    setValidEmail(true);
    setValidPassword(true);
  }

  const breadcrumbs = [
    {
      name: "Home",
      uri: "/",
    },
    {
      name: "Login",
      uri: "/login",
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

  const ErrorMessageHolder = styled(Typography)({
    color: theme.palette.error.main,
    paddingTop: theme.spacing(1),
    width: "80%",
    display: "flex",
    margin: "auto",
  });

  const SuccessHolder = styled(Box)({
    textAlign: "center",
    color: theme.palette.success.main,
    width: "80%",
    display: "block",
    margin: "auto",
  });

  const SignInButton = styled(Button)({
    width: "60%",
    display: "block",
    margin: "auto",
    marginTop: theme.spacing(3),
  });

  return (
    <Fragment>
      <BreadcrumbsBar breadcrumbsItems={breadcrumbs} />
      <FormWrapper>
        {success === true ? (
          <SuccessHolder>
            <Typography variant="h5">
              <InfoIcon />
              You logged in successfully!
            </Typography>
            <SignInButton variant="contained" size="large">
              <Link
                style={{
                  textDecoration: "none",
                  color: theme.palette.white.main,
                }}
                to="/"
              >
                Go to home
              </Link>
            </SignInButton>
          </SuccessHolder>
        ) : (
          <Fragment>
            <FormHeading variant="h5">LOG IN YOUR ACCOUNT</FormHeading>
            <Container>
              <ErrorMessageHolder>
                <Typography variant="p">
                  <b>{errMsg}</b>
                </Typography>
              </ErrorMessageHolder>
              <form onSubmit={handleSubmit}>
                <ProductInfoInput
                  inputRef={emailRef}
                  autoComplete="off"
                  required
                  defaultValue={email}
                  id="email"
                  label="Email"
                  type="text"
                  variant="filled"
                />
                {!validEmail && email ? (
                  <ErrorMessageHolder>
                    <Typography variant="p">
                      <InfoIcon /> Invalid Email!
                    </Typography>
                  </ErrorMessageHolder>
                ) : (
                  ""
                )}
                <ProductInfoInput
                  inputRef={passwordRef}
                  required
                  defaultValue={pwd}
                  id="password"
                  label="Password"
                  type="password"
                  variant="filled"
                />
                {!validPassword && pwd ? (
                  <ErrorMessageHolder>
                    <Typography variant="p">
                      <InfoIcon /> Invalid Password! Password must contain at
                      least 10 characters, including lowercase and uppercase,
                      digit and special symbol!
                    </Typography>
                  </ErrorMessageHolder>
                ) : (
                  ""
                )}
                <RegisterButton type="submit" variant="contained" size="large">
                  LOG IN
                </RegisterButton>
              </form>
              <LinkHolder>
                <Link to="/register">You haven't account? Create one!</Link>
              </LinkHolder>
            </Container>
          </Fragment>
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
