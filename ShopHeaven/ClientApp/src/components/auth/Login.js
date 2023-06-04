import { React, Fragment, useRef, useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useUser from "../../hooks/useUser"
import { Link, useNavigate, useLocation } from "react-router-dom";
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
import { passwordRequiredLength, loginPath } from "../../constants";
import BreadcrumbsBar from "../common/BreadcrumbsBar";
import FullWidthBanner from "../banners/FullWidthBanner";
import {
  validateEmail,
  validatePassword,
  login,
} from "../../services/authService";

const breadcrumbs = [
  {
    name: "Home",
    uri: "/",
  },
  {
    name: "Login",
    uri: `${loginPath}`,
  },
];

export default function Login() {
  const { setAuth } = useAuth();
  const { setUser } = useUser();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  //const from = location.state?.from.pathname || "/";

  const emailRef = useRef();
  const passwordRef = useRef();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [pwd, setPwd] = useState("");
  const [validPassword, setValidPassword] = useState(true);

  const [errMsg, setErrMsg] = useState("");

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

      //for authProvider
      const userId = response?.data?.id;
      const jwtToken = response?.data?.jwtToken;
      const roles = response?.data?.roles;
      const email = response?.data?.email;
      const username = response?.data?.username;
      const refreshToken = response?.data?.refreshToken;
      const cartId = response?.data?.cartId;
      const wishlistId = response?.data?.wishlistId;

      //for userProvider
      const wishlistProductsCount = response?.data?.wishlistProductsCount;
      const cartProductsCount = response?.data?.cartProductsCount;

      setAuth({
        userId: userId,
        jwtToken: jwtToken,
        refreshToken: refreshToken,
        roles: roles,
        email: email,
        isLogged: true,
        cartId: cartId,
        wishlistId: wishlistId,
        username: username,
      });

      setUser({
        wishlistProductsCount: wishlistProductsCount,
        cartProductsCount: cartProductsCount
      });

      refreshState();
      navigate(from, { replace: true });

      console.log("----------------");
      console.log("TOKEN IS: " + response.data.jwtToken);
      console.log("EMAIL IS: " + response.data.email);
      console.log("ID IS: " + response.data.id);
      console.log("ROLES ARE: " + response.data.roles);
      console.log("REFRESH TOKEN IS: " + response.data.refreshToken);
      console.log("CREATED REFRESH TOKEN IS: " + response.data.tokenCreated);
      console.log("EXPIRES  REFRESH TOKEN IS: " + response.data.tokenExpires);
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

  const LoginInfoInput = styled(TextField)({
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

  const LoginButton = styled(Button)({
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

  const ErrorMessageHolder = styled(Box)({
    color: theme.palette.error.main,
    paddingTop: theme.spacing(1),
    width: "80%",
    display: "flex",
    margin: "auto",
  });

  const ErrorAlert = styled(Alert)({
    fontWeight: 500,
    width: "100%",
    color: theme.palette.error.main,
  });

  return (
    <Fragment>
      <BreadcrumbsBar breadcrumbsItems={breadcrumbs} />
      <FormWrapper>
        <Fragment>
          <FormHeading variant="h5">LOG IN YOUR ACCOUNT</FormHeading>
          <Container>
            <form onSubmit={handleSubmit}>
              <LoginInfoInput
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
              <LoginInfoInput
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
              <LoginButton type="submit" variant="contained" size="large">
                LOG IN
              </LoginButton>
            </form>
            {errMsg ? (
              <ErrorMessageHolder>
                <ErrorAlert severity="error">{errMsg}</ErrorAlert>
              </ErrorMessageHolder>
            ) : (
              <></>
            )}
            <LinkHolder>
              <Link to="/register">You haven't account? Create one!</Link>
            </LinkHolder>
          </Container>
        </Fragment>
      </FormWrapper>  
    </Fragment>
  );
}