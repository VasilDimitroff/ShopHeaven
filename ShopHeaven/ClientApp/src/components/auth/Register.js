import { React, Fragment, useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Paper,
  Container,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import { theme } from "../../theme";
import { styled } from "@mui/material/styles";
import { passwordRequiredLength } from "../../constants";
import BreadcrumbsBar from "../common/BreadcrumbsBar";
import FullWidthBanner from "../banners/FullWidthBanner";
import {
  validateEmail,
  validatePassword,
  passwordsMatch,
  register,
} from "../../services/authService";

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

export default function Register() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [pwd, setPwd] = useState("");
  const [validPassword, setValidPassword] = useState(true);
  const [matchPwd, setMatchPwd] = useState("");
  const [validConfirmPassword, setValidConfirmPassword] = useState(true);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd, matchPwd]);

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
      confirmPassword: confirmPasswordRef.current.value,
    };

    setEmail(user.email);
    setPwd(user.password);
    setMatchPwd(user.confirmPassword);

    let emailValidation = validateEmail(user.email);
    setValidEmail(emailValidation);

    let passwordValidation = validatePassword(user.password);
    setValidPassword(passwordValidation);

    let arePasswordsMatch = passwordsMatch(user.password, user.confirmPassword);
    setValidConfirmPassword(arePasswordsMatch);

    if (!emailValidation || !passwordValidation || !arePasswordsMatch) {
      return;
    }

    try {
      const response = await register(user);
      refreshState();
      navigate("/login");
    } catch (err) {
      handleError(err);
    }
  };

  function handleError(err) {
    if (!err?.response) {
      setErrMsg("No Server Response");
    } else if (err.response.status === 403) {
      setErrMsg("Email already taken!");
    } else {
      setErrMsg("Registration Failed!");
    }
  }

  function refreshState() {
    setErrMsg("");

    setEmail("");
    setPwd("");
    setMatchPwd("");

    setValidEmail(true);
    setValidPassword(true);
    setValidConfirmPassword(true);
  }

  const ErrorAlert = styled(Alert)({
    fontWeight: 500,
    width: "100%",
    color: theme.palette.error.main,
  });

  const RegisterInfoInput = styled(TextField)({
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

  return (
    <Fragment>
      <BreadcrumbsBar breadcrumbsItems={breadcrumbs} />
      <FormWrapper>
        <Fragment>
          <FormHeading variant="h5"> REGISTER PROFILE</FormHeading>
          <Container>
            <form onSubmit={handleSubmit}>
              <RegisterInfoInput
                inputRef={emailRef}
                autoComplete="off"
                defaultValue={email}
                id="email"
                label="Email"
                type="text"
                variant="filled"
              />
              {!validEmail && email ? (
                <ErrorMessageHolder>
                  <ErrorAlert severity="error">Invalid Email!</ErrorAlert>
                </ErrorMessageHolder>
              ) : (
                ""
              )}
              <RegisterInfoInput
                inputRef={passwordRef}
                defaultValue={pwd}
                id="password"
                label="Password"
                type="password"
                variant="filled"
              />
              {!validPassword && pwd ? (
                <ErrorMessageHolder>
                  <ErrorAlert severity="error">
                    Invalid Password! Password must contain at least{" "}
                    {passwordRequiredLength} characters!
                  </ErrorAlert>
                </ErrorMessageHolder>
              ) : (
                ""
              )}
              <RegisterInfoInput
                inputRef={confirmPasswordRef}
                defaultValue={matchPwd}
                id="confirm-password"
                label="Confirm Password"
                type="password"
                variant="filled"
              />
              {!validConfirmPassword && matchPwd ? (
                <ErrorMessageHolder>
                  <ErrorAlert severity="error">
                    Passwords must match!
                  </ErrorAlert>
                </ErrorMessageHolder>
              ) : (
                ""
              )}
              <RegisterButton type="submit" variant="contained" size="large">
                REGISTER
              </RegisterButton>
            </form>
            {errMsg ? (
              <ErrorMessageHolder>
                <ErrorAlert severity="error">{errMsg}</ErrorAlert>
              </ErrorMessageHolder>
            ) : (
              <></>
            )}
            <LinkHolder>
              <Link to="/login">Already have a profile? Log in!</Link>
            </LinkHolder>
          </Container>
        </Fragment>
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
