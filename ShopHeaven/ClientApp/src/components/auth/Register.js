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
  const [validEmail, setValidEmail] = useState(true);
  const [pwd, setPwd] = useState("");
  const [validPassword, setValidPassword] = useState(true);
  const [matchPwd, setMatchPwd] = useState("");
  const [validConfirmPassword, setValidConfirmPassword] = useState(true);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd, matchPwd]);

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
      setSuccess(true);
      refreshState();
    } catch (err) {
      handleError(err);
    }
  };

  function handleError(err){
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

  function validateForm(email, password, confirmPassword) {
    const isEmailValid = validateEmail(email);

    let isFormValid = true;

    if (!isEmailValid) {
      setValidEmail(false);
      isFormValid = false;
    } else {
        setValidEmail(true);
    }    
    const isPasswordValid = validatePassword(password);

    if (!isPasswordValid) {
      setValidPassword(false);
      isFormValid = false;
    } else {
        setValidPassword(true);
    }

    const arePasswordsMatch = passwordsMatch(password, confirmPassword);

    if (!arePasswordsMatch) {
      setValidConfirmPassword(false);
      isFormValid = false;
    } else {
      setValidConfirmPassword(true);
    }

    return isFormValid;
  }

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
  })

  const SignInButton = styled(Button)({
    width: "60%",
    display: "block",
    margin: "auto",
    marginTop: theme.spacing(3)
  })

  return (
    <Fragment>
      <BreadcrumbsBar breadcrumbsItems={breadcrumbs} />
      <FormWrapper>
        {success === false ? (
          <SuccessHolder>
            <Typography variant="h5">Congratulations! You are registered successfully!</Typography>  
            <SignInButton variant="contained" size="large">
                <Link style={{textDecoration: "none", color: theme.palette.white.main}} to="/login">Sign in</Link>
             </SignInButton>
          </SuccessHolder>
        ) : (
          <Fragment>
            <FormHeading variant="h5"> REGISTER PROFILE</FormHeading>
            <Container>
            <ErrorMessageHolder><Typography variant="p"><b>{errMsg}</b></Typography></ErrorMessageHolder>
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
              {validEmail ? "" : <ErrorMessageHolder><Typography variant="p">Invalid Email</Typography></ErrorMessageHolder> }
                <ProductInfoInput
                  inputRef={passwordRef}
                  required
                  id="password"
                  label="Password"
                  type="password"
                  variant="filled"
                />
               {validPassword ? "" : <ErrorMessageHolder><Typography variant="p">Invalid Password</Typography></ErrorMessageHolder> }
                <ProductInfoInput
                  inputRef={confirmPasswordRef}
                  required
                  id="confirm-password"
                  label="Confirm Password"
                  type="password"
                  variant="filled"
                />
                {validConfirmPassword ? "" : <ErrorMessageHolder><Typography variant="p">Passwords must match!</Typography></ErrorMessageHolder> }
                <RegisterButton type="submit" variant="contained" size="large">
                  REGISTER
                </RegisterButton>
              </form>
              <LinkHolder>
                <Link to="/login">Already have a profile? Log in!</Link>
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
