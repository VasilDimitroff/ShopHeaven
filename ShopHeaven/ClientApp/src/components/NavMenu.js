import { React, useState } from "react";
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
  ListItemAvatar,
  Slide,
  Divider,
  IconButton,
  Fade,
  Container,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
//import {styled, alpha } from '@emotion/styled';
import { theme } from "./../theme";
import {
  Close,
  AddShoppingCart,
  Image,
  Delete,
  Search,
  Reviews,
  ShoppingCartCheckout,
  Favorite,
  Cancel,
  ShoppingCart,
  AccountCircle,
  Logout,
  Menu,
} from "@mui/icons-material";
import LogoSmall from "../static/images/shop_heaven_logo_small_2.png";
import LogoBig from "../static/images/shop_heaven_logo_big_2.png";
import { display } from "@mui/system";
import CategoriesHomeList from "./home/CategoriesHomeList";
//import { Button } from "bootstrap";

export default function NavMenu(props) {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showFavoritesMenu, setShowFavoritesMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  function handleShowMobileMenu(value) {
    setShowMobileMenu(value);
  }

  function handleShowFavoritesMenu(value) {
    setShowFavoritesMenu(value);
  }
  
  function handleShowSearchBar(value) {
    setShowSearchBar(value);
  }

  function handleShowUserMenu(value) {
    setShowUserMenu(value);
  }

  const products = [
    {
      name: "Product 1",
      price: "1.00",
    },
    {
      name: "Product 2",
      price: "2.00",
    },
    {
      name: "Product 3",
      price: "3.00",
    },
    {
      name: "Product 4",
      price: "4.00",
    },
  ];

  function HideAllMenusExcept(setterFuncToShowMenu) {
    let useStatesSetterNames = [
      handleShowUserMenu,
      handleShowFavoritesMenu,
      handleShowMobileMenu,
    ];

    for (let i = 0; i < useStatesSetterNames.length; i++) {
      if (setterFuncToShowMenu === useStatesSetterNames[i]) {
        useStatesSetterNames[i](true);
      } else {
        useStatesSetterNames[i](false);
      }
    }
  }

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
    zIndex: "100",
    width: "100%",
    maxWidth: 250,
    backgroundColor: theme.palette.dropdown.main,
    color: theme.palette.dropdown.main.color,
    marginTop: theme.spacing(6),
    paddingTop: theme.spacing(2),
    right: "8%",
    borderRadius: theme.shape.borderRadius,
    display: showUserMenu === true ? "block" : "none",
    boxShadow: theme.palette.dropdown.boxShadow,
  });

  const FavoritesList = styled(List)({
    width: "100%",
    zIndex: "10",
    maxWidth: 360,
    position: "absolute",
    right: "8%",
    backgroundColor: theme.palette.dropdown.main,
    color: theme.palette.dropdown.main.color,
    marginTop: theme.spacing(7),
    paddingTop: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    display: showFavoritesMenu === true ? "block" : "none",
    alignItems: "center",
    boxShadow: theme.palette.dropdown.boxShadow,
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
    paddingTop: theme.spacing(1),
    fontSize: "21px",
    fontWeight: "400",
    textAlign: "center"
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
    backgroundColor: theme.palette.dropdown.main,
    "&:hover": {
      backgroundColor: theme.palette.onHoverButtonColor.main,
    },
  });

  const StyledIconButton = styled(IconButton)({
    paddingLeft: theme.spacing(2.5),
    paddingRight: theme.spacing(2.5),
    justifyContent: "center",
    backgroundColor: theme.palette.dropdown.main,
    "&:hover": {
      backgroundColor: theme.palette.onHoverButtonColor.main,
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
            <MenuIcon  onClick={() =>
                  showMobileMenu === true
                    ? handleShowMobileMenu(false)
                    : HideAllMenusExcept(handleShowMobileMenu)
                }>
              <Menu
                sx={{ fontSize: "35px", color: theme.palette.white.main }}
               
              />
            </MenuIcon>
            <CloseIcon  onClick={() => handleShowMobileMenu(!showMobileMenu)}>
              <Close sx={{ fontSize: "35px", color: theme.palette.white.main }}/>
            </CloseIcon>
            <BigLogoImage src={LogoBig} />
            <SmallLogoImage src={LogoSmall} />
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
            <CustomBadge
              badgeContent={1}
              color="secondary"
              onClick={() =>
                showFavoritesMenu === true
                  ? handleShowFavoritesMenu(false)
                  : HideAllMenusExcept(handleShowFavoritesMenu)
              }
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
              badgeContent={2}
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
                  V
                </Avatar>
              </IconButton>
            </CustomBadge>
          </IconsArea>
        </CustomToolbar>
      </AppBar>

      <Slide in={showFavoritesMenu}>
        <FavoritesList
          onMouseLeave={() =>
            showFavoritesMenu === true
              ? handleShowFavoritesMenu(false)
              : handleShowFavoritesMenu(true)
          }
        >
          {products.map((product, index) => {
            return (
              <Box sx={{ display: "flex" }}  key={index} spacing={2}>
                <DropDownMenuListItemButton>
                  <ListItemAvatar>
                    <Avatar>
                      <Image />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={product.name}
                    secondary={`Price: ${product.price}`}
                  />
                </DropDownMenuListItemButton>
                <StyledIconButton sx={{ color: theme.palette.success.main }}>
                  <AddShoppingCart sx={{ fontSize: "30px" }} />
                </StyledIconButton>
                <StyledIconButton sx={{ color: theme.palette.error.main }}>
                  <Delete sx={{ fontSize: "30px" }} />
                </StyledIconButton>
              </Box>
            );
          })}
        </FavoritesList>
      </Slide>
      <Slide in={showUserMenu} direction="down">
        <UserMenu
          onMouseLeave={() =>
            showUserMenu === true
              ? handleShowUserMenu(false)
              : handleShowUserMenu(true)
          }
        >
          <List>
            <ListItem disablePadding>
              <Container>
                <UserNameText component="h4" >
                  VASIL DIMITROV
                </UserNameText>
              </Container>
            </ListItem>
            <Divider/>
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
            <ListItem disablePadding>
              <DropDownMenuListItemButton>
                <Logout />
                <UserMenuListItem primary="Logout" />
              </DropDownMenuListItemButton>
            </ListItem>
          </List>
        </UserMenu>
      </Slide>

      <Fade in={showMobileMenu} timeout={500}>
        <MobileMenuWrapper>
          <CategoriesHomeList categories={props.categories} />
        </MobileMenuWrapper>
      </Fade>
    </div>
  );
}

/*

import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from './api-authorization/LoginMenu';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
          <NavbarBrand tag={Link} to="/">ShopHeaven</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
              </NavItem>
              <LoginMenu>
              </LoginMenu>
            </ul>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}
*/
