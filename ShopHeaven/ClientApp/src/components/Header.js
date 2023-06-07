import { React, useState, Fragment, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";
import useLogout from "../hooks/useLogout";
import { Link, useNavigate } from "react-router-dom";
import {
  Badge,
  AppBar,
  Box,
  List,
  Toolbar,
  Typography,
  ListItem,
  ListItemButton,
  ListItemText,
  InputBase,
  Avatar,
  Slide,
  Divider,
  IconButton,
  Fade,
  Button,
  Snackbar,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { theme } from "../theme";
import {
  Close,
  Search,
  Reviews,
  ShoppingCartCheckout,
  Favorite,
  Cancel,
  ShoppingCart,
  AccountCircle,
  Logout,
  Menu,
  AdminPanelSettings,
} from "@mui/icons-material";
import LoginIcon from "@mui/icons-material/Login";
import LogoSmall from "../static/images/shop_heaven_logo_small_2.png";
import LogoBig from "../static/images/shop_heaven_logo_big_2.png";
import MainMenu from "./home/MainMenu";
import { cartPath, loginPath } from "../constants";

export default function Header() {
  const { auth } = useAuth();
  const { user } = useUser();
  const logout = useLogout();
  const navigate = useNavigate();

  const [logoutMessage, setLogoutMessage] = useState("");

  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  function handleShowMobileMenu(value) {
    setShowMobileMenu(value);
  }

  function handleShowSearchBar(value) {
    setShowSearchBar(value);
  }

  function handleShowUserMenu(value) {
    setShowUserMenu(value);
  }

  async function signOut() {
    await logout();
    setLogoutMessage("You successfully logged out");
    //navigate("/");
  }

  function handleCloseSnackbar() {
    setLogoutMessage("");
  }

  function HideAllMenusExcept(setterFuncToShowMenu) {
    let useStatesSetterNames = [handleShowUserMenu, handleShowMobileMenu];

    for (let i = 0; i < useStatesSetterNames.length; i++) {
      if (setterFuncToShowMenu === useStatesSetterNames[i]) {
        useStatesSetterNames[i](true);
      } else {
        useStatesSetterNames[i](false);
      }
    }
  }
  const styledLink = {
    textDecoration: "none",
    color: "#000",
  };

  const CustomToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-around",
    width: "80%",
    margin: "auto",
    [theme.breakpoints.down("md")]: {
      width: "95%",
    },
  });

  const CustomCancel = styled(Cancel)({
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    paddingRight: theme.spacing(1),
  });

  const CustomSearchField = styled("div")({
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(0.5),
    marginLeft: theme.spacing(0.5),
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    borderRadius: theme.shape.borderRadius,
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: showSearchBar === true ? "flex" : "none",
    },
  });

  const CustomSearchButton = styled(Search)({
    cursor: "pointer",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    "&:hover": {
      opacity: 0.7,
    },
  });

  const CustomBadge = styled(Badge)({
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(3),
    },
    marginLeft: theme.spacing(5),
  });

  const UserMenu = styled(Box)({
    position: "fixed",
    zIndex: 5,
    width: "100%",
    maxWidth: 250,
    marginTop: theme.spacing(6),
    paddingTop: theme.spacing(2),
    right: "8%",
    borderRadius: theme.shape.borderRadius,
    display: showUserMenu === true ? "block" : "none",
    boxShadow: theme.palette.dropdown.boxShadow,
    backgroundColor: theme.palette.common.white
  });

  const CustomSearchInput = styled(InputBase)({
    color: "white",
    width: "92%",
  });

  const IconsArea = styled("div")({
    alignItems: "center",
    display: showSearchBar === true ? "none" : "flex",
  });

  const UserMenuListItem = styled(ListItemText)({
    marginLeft: theme.spacing(4),
  });

  const UserNameText = styled(Typography)({
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
    fontSize: "18px",
    fontWeight: "600",
    textAlign: "center",
    display: "block",
    width: "100%",
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
  });

  const Label = styled(Typography)({
    marginRight: theme.spacing(1),
    display: "none",
    [theme.breakpoints.up("lg")]: {
      display: "block",
    },
  });

  const BigLogoImage = styled("img")({
    width: "75%",
    marginLeft: theme.spacing(2),
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  });

  const SmallLogoImage = styled("img")({
    width: "25%",
    marginLeft: theme.spacing(2),
    paddingBottom: theme.spacing(1.5),
    paddingTop: theme.spacing(1.5),
    display: "block",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  });

  const MenuIcon = styled(IconButton)({
    display: showMobileMenu === true ? "none" : "block",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  });

  const CloseIcon = styled(IconButton)({
    display: showMobileMenu === true ? "block" : "none",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  });

  const DropDownMenuListItemButton = styled(ListItemButton)({
    "&:hover": {
      backgroundColor: "#d7edfd",
    },
  });

  const MobileMenuWrapper = styled(Box)({
    position: "fixed",
    zIndex: 3,
    top: theme.spacing(1),
    boxShadow: theme.palette.dropdown.boxShadow,
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  });

  return (
    <div>
      <AppBar position="fixed">
        <CustomToolbar>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <MenuIcon
              onClick={() =>
                showMobileMenu === true
                  ? handleShowMobileMenu(false)
                  : HideAllMenusExcept(handleShowMobileMenu)
              }
            >
              <Menu
                sx={{ fontSize: "35px", color: theme.palette.white.main }}
              />
            </MenuIcon>
            <CloseIcon onClick={() => handleShowMobileMenu(!showMobileMenu)}>
              <Close
                sx={{ fontSize: "35px", color: theme.palette.white.main }}
              />
            </CloseIcon>
            <Link to="/">
              <BigLogoImage src={LogoBig} />
            </Link>
            <Link to="/">
              <SmallLogoImage src={LogoSmall} />
            </Link>
          </Box>
          <CustomSearchField>
            <Search
              sx={{
                paddingLeft: theme.spacing(1),
                paddingRight: theme.spacing(1),
                fontSize: "40px",
              }}
            />
            <CustomSearchInput placeholder="Search..." />
            <CustomCancel
              sx={{ fontSize: "30px" }}
              onClick={() => handleShowSearchBar(false)}
            />
          </CustomSearchField>

          <IconsArea>
            <CustomSearchButton onClick={() => handleShowSearchBar(true)} />

            {!auth.isLogged ? (
              <Link to={loginPath}>
                <Button
                  sx={{
                    backgroundColor: theme.palette.secondary.main,
                    marginLeft: theme.spacing(2),
                  }}
                  variant="contained"
                  endIcon={<LoginIcon />}
                >
                  Login
                </Button>
              </Link>
            ) : (
              <Fragment>
                <CustomBadge
                  badgeContent={user.wishlistProductsCount}
                  color="secondary"
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      opacity: 0.7,
                    },
                  }}
                >
                  <Label>Favorites</Label>
                  <Favorite />
                </CustomBadge>

                <CustomBadge
                  onClick={() => navigate(cartPath)}
                  badgeContent={user.cartProductsCount}
                  color="secondary"
                  sx={{
                    border: "white",
                    "&:hover": {
                      opacity: 0.7,
                    },
                  }}
                >
                  <Label>Cart</Label>
                  <ShoppingCart />
                </CustomBadge>

                <CustomBadge
                  color="secondary"
                  onClick={() =>
                    showUserMenu === true
                      ? handleShowUserMenu(false)
                      : HideAllMenusExcept(handleShowUserMenu)
                  }
                  sx={{ cursor: "pointer" }}
                >
                  <IconButton>
                    <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>
                      {auth.email[0].toUpperCase()}
                    </Avatar>
                  </IconButton>
                </CustomBadge>
              </Fragment>
            )}
          </IconsArea>
        </CustomToolbar>
      </AppBar>
      {!auth.isLogged ? (
        <></>
      ) : (
        <Slide in={showUserMenu} direction="down">
          <UserMenu
            onClick={() => handleShowUserMenu(false)}
            unmountonexit="true"
            onMouseLeave={() =>
              showUserMenu === true
                ? handleShowUserMenu(false)
                : handleShowUserMenu(true)
            }
          >
            <List sx={{p: 0}}>
              <ListItem disablePadding>
                <DropDownMenuListItemButton>
                  <UserNameText component="h4">{auth.email}</UserNameText>
                </DropDownMenuListItemButton>
              </ListItem>
              <Divider />
              {auth?.roles?.includes("Administrator") ? (
                <Link style={styledLink} to="/admin">
                  <ListItem disablePadding>
                    <DropDownMenuListItemButton>
                      <AdminPanelSettings />
                      <UserMenuListItem primary="Admin Panel" />
                    </DropDownMenuListItemButton>
                  </ListItem>
                  <Divider />
                </Link>
              ) : (
                <></>
              )}
              <ListItem disablePadding>
                <DropDownMenuListItemButton>
                  <AccountCircle />
                  <UserMenuListItem primary="My Account" />
                </DropDownMenuListItemButton>
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <DropDownMenuListItemButton>
                  <ShoppingCartCheckout />
                  <UserMenuListItem primary="My Orders" />
                </DropDownMenuListItemButton>
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <DropDownMenuListItemButton>
                  <Reviews />
                  <UserMenuListItem primary="My Reviews" />
                </DropDownMenuListItemButton>
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <DropDownMenuListItemButton>
                  <Favorite />
                  <UserMenuListItem primary="Favorites" />
                </DropDownMenuListItemButton>
              </ListItem>
              <Divider />
              <ListItem disablePadding onClick={signOut}>
                <DropDownMenuListItemButton>
                  <Logout />
                  <UserMenuListItem primary="Logout" />
                </DropDownMenuListItemButton>
              </ListItem>
            </List>
          </UserMenu>
        </Slide>
      )}
      <Snackbar
        onClose={handleCloseSnackbar}
        autoHideDuration={6000}
        ContentProps={{
          style: {
            textAlign: "center",
            fontWeight: 500,
            fontSize: 18,
            cursor: "pointer",
          },
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={logoutMessage.length > 0 ? true : false}
        TransitionComponent={Slide}
        message={`${logoutMessage}`}
      ></Snackbar>
      <Fade in={showMobileMenu} timeout={500} unmountOnExit>
        <MobileMenuWrapper>
          <MainMenu handleShowMobileMenu={handleShowMobileMenu} />
        </MobileMenuWrapper>
      </Fade>
    </div>
  );
}
