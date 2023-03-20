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
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
//import {styled, alpha } from '@emotion/styled';
import { theme } from "./../theme";
import {
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
} from "@mui/icons-material";
import LogoSmall from "../static/images/shop_heaven_logo_small_2.png";
import LogoBig from "../static/images/shop_heaven_logo_big_2.png";
import { display } from "@mui/system";
import ProductMenuListItem from "./ProductMenuListItem";

export default function NavMenu() {
  const [open, setOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showFavoritesMenu, setShowFavoritesMenu] = useState(false);
  const [deleteFromCart, setDeleteFromCart] = useState(false);

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
    let useStatesSetterNames = [setShowUserMenu, setShowFavoritesMenu];

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
    justifyContent: "space-between",
  });

  const CustomCancel = styled(Cancel)({
    [theme.breakpoints.up("sm")]: {
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
    width: "30%",
    [theme.breakpoints.down("sm")]: {
      display: open === true ? "flex" : "none",
      width: "70%",
    },
  });

  const CustomSearchButton = styled(Search)({
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  });

  const CustomBadge = styled(Badge)({
    marginRight: theme.spacing(4),
  });

  const UserMenu = styled(Box)({
    position: "absolute",
    zIndex: "100",
    width: "100%",
    maxWidth: 250,
    backgroundColor: theme.palette.dropdown.main,
    color: theme.palette.dropdown.main.color,
    marginTop: theme.spacing(-2),
    paddingTop: theme.spacing(2),
    right: "2.5%",
    borderRadius: theme.shape.borderRadius,
    display: showUserMenu === true ? "block" : "none",
    boxShadow: theme.palette.dropdown.boxShadow,
  });

  const FavoritesList = styled(List)({
    width: "100%",
    zIndex: "10",
    maxWidth: 360,
    position: "absolute",
    right: "2.5%",
    backgroundColor: theme.palette.dropdown.main,
    color: theme.palette.dropdown.main.color,
    marginTop: theme.spacing(-2),
    paddingTop: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    display: showFavoritesMenu === true ? "block" : "none",
    alignItems: "center",
    boxShadow: theme.palette.dropdown.boxShadow,
  });

  const CustomSearchInput = styled(InputBase)({
    color: "white",
    marginLeft: theme.spacing(1),
    width: "92%",
  });

  const IconsArea = styled("div")({
    alignItems: "center",
    display: open === true ? "none" : "flex",
  });

  const UserMenuListItem = styled(ListItemText)({
    marginLeft: theme.spacing(4),
  });

  const Label = styled(Typography)({
    marginRight: theme.spacing(1),
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  });

  const BigLogoImage = styled("img")({
    width: "18%",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  });

  const SmallLogoImage = styled("img")({
    width: "15%",
    paddingBottom: theme.spacing(1.5),
    paddingTop: theme.spacing(1.5),
    display: "block",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  });

  return (
    <div>
      <AppBar position="fixed">
        <CustomToolbar>
          <BigLogoImage src={LogoBig} />
          <SmallLogoImage src={LogoSmall} />
          <CustomSearchField>
            <Search sx={{ paddingLeft: "10px" }} />
            <CustomSearchInput placeholder="Search..." />
            <CustomCancel onClick={() => setOpen(false)} />
          </CustomSearchField>
          <IconsArea>
            <CustomSearchButton onClick={() => setOpen(true)} />
            <CustomBadge
              badgeContent={4}
              color="secondary"
              onClick={() =>
                showFavoritesMenu === true
                  ? setShowFavoritesMenu(false)
                  : HideAllMenusExcept(setShowFavoritesMenu)
              }
              sx={{ cursor: "pointer" }}
            >
              <Label>Favorites</Label>
              <Favorite />
            </CustomBadge>
            <CustomBadge badgeContent={2} color="secondary">
              <Label>Cart</Label>
              <ShoppingCart />
            </CustomBadge>
            <CustomBadge
              color="secondary"
              onClick={() =>
                showUserMenu === true
                  ? setShowUserMenu(false)
                  : HideAllMenusExcept(setShowUserMenu)
              }
              sx={{ cursor: "pointer" }}
            >
              <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>V</Avatar>
            </CustomBadge>
          </IconsArea>
        </CustomToolbar>
      </AppBar>

      <Slide in={showFavoritesMenu}>
        <FavoritesList
          onMouseLeave={() =>
            showFavoritesMenu === true
              ? setShowFavoritesMenu(false)
              : setShowFavoritesMenu(true)
          }
        >
          {products.map((product) => {
            return (
              <Box sx={{ display: "flex" }} spacing={2}>
                <ListItemButton
                  sx={{
                    backgroundColor: theme.palette.dropdown.main,
                    "&:hover": {
                      backgroundColor: theme.palette.onHoverButtonColor.main,
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <Image />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={product.name}
                    secondary={`Price: ${product.price}`}
                  />
                </ListItemButton>

                <ListItemButton
                  sx={{
                    cursor: "pointer",
                    color: theme.palette.success.main,
                    paddingTop: theme.spacing(3.5),
                    paddingBottom: theme.spacing(3.5),
                    justifyContent: "center",
                    backgroundColor: theme.palette.dropdown.main,
                    "&:hover": {
                      backgroundColor: theme.palette.onHoverButtonColor.main,
                    },
                  }}
                >
                  <AddShoppingCart />
                </ListItemButton>
                <ListItemButton
                  sx={{
                    cursor: "pointer",
                    color: theme.palette.error.main,
                    paddingTop: theme.spacing(3.5),
                    paddingBottom: theme.spacing(3.5),
                    justifyContent: "center",
                    backgroundColor: theme.palette.dropdown.main,
                    "&:hover": {
                      backgroundColor: theme.palette.onHoverButtonColor.main,
                    },
                  }}
                >
                  <Delete />
                </ListItemButton>
              </Box>
            );
          })}
        </FavoritesList>
      </Slide>

      <Slide in={showUserMenu} direction="down">
        <UserMenu
          onMouseLeave={() =>
            showUserMenu === true
              ? setShowUserMenu(false)
              : setShowUserMenu(true)
          }
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  backgroundColor: theme.palette.dropdown.main,
                  "&:hover": {
                    backgroundColor: theme.palette.onHoverButtonColor.main,
                  },
                }}
              >
                <AccountCircle />
                <UserMenuListItem primary="My Account" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  backgroundColor: theme.palette.dropdown.main,
                  "&:hover": {
                    backgroundColor: theme.palette.onHoverButtonColor.main,
                  },
                }}
              >
                <ShoppingCartCheckout />
                <UserMenuListItem primary="My Orders" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  backgroundColor: theme.palette.dropdown.main,
                  "&:hover": {
                    backgroundColor: theme.palette.onHoverButtonColor.main,
                  },
                }}
              >
                <Reviews />
                <UserMenuListItem primary="My Reviews" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  backgroundColor: theme.palette.dropdown.main,
                  "&:hover": {
                    backgroundColor: theme.palette.onHoverButtonColor.main,
                  },
                }}
              >
                <Favorite />
                <UserMenuListItem primary="Favorites" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  backgroundColor: theme.palette.dropdown.main,
                  "&:hover": {
                    backgroundColor: theme.palette.onHoverButtonColor.main,
                  },
                }}
              >
                <Logout />
                <UserMenuListItem primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </UserMenu>
      </Slide>
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
