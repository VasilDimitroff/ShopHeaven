import { React, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import { Outlet, Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import BreadcrumbsBar from "../BreadcrumbsBar";
import { theme } from "../../theme";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReviewsIcon from "@mui/icons-material/Reviews";
import {
  PeopleAlt,
  ShoppingBag,
  Category,
  Discount,
  ShoppingCartCheckout,
} from "@mui/icons-material";

const breadcrumbs = [
  {
    name: "Home",
    uri: "/",
  },
  {
    name: "Admin",
    uri: "/admin",
  },
];

export default function Admin() {
  let [firstSelected, setFirstSelected] = useState(false);
  let [secondSelected, setSecondSelected] = useState(false);
  let [thirdSelected, setThirdSelected] = useState(false);
  let [forthSelected, setForthSelected] = useState(false);
  let [fifthSelected, setFifthSelected] = useState(false);
  let [sixthSelected, setSixthSelected] = useState(false);
  let [seventhSelected, setSeventhSelected] = useState(false);

  function setSelectedItem(item) {
    if (item === 1) {
      setFirstSelected(true);
      setSecondSelected(false);
      setThirdSelected(false);
      setForthSelected(false);
      setFifthSelected(false);
      setSixthSelected(false);
      setSeventhSelected(false);
    } else if (item === 2) {
      setFirstSelected(false);
      setSecondSelected(true);
      setThirdSelected(false);
      setForthSelected(false);
      setFifthSelected(false);
      setSixthSelected(false);
      setSeventhSelected(false);
    } else if (item === 3) {
      setFirstSelected(false);
      setSecondSelected(false);
      setThirdSelected(true);
      setForthSelected(false);
      setFifthSelected(false);
      setSixthSelected(false);
      setSeventhSelected(false);
    } else if (item === 4) {
      setFirstSelected(false);
      setSecondSelected(false);
      setThirdSelected(false);
      setForthSelected(true);
      setFifthSelected(false);
      setSixthSelected(false);
      setSeventhSelected(false);
    } else if (item === 5) {
      setFirstSelected(false);
      setSecondSelected(false);
      setThirdSelected(false);
      setForthSelected(false);
      setFifthSelected(true);
      setSixthSelected(false);
      setSeventhSelected(false);
    } else if (item === 6) {
      setFirstSelected(false);
      setSecondSelected(false);
      setThirdSelected(false);
      setForthSelected(false);
      setFifthSelected(false);
      setSixthSelected(true);
      setSeventhSelected(false);
    } else if (item === 7) {
      setFirstSelected(false);
      setSecondSelected(false);
      setThirdSelected(false);
      setForthSelected(false);
      setFifthSelected(false);
      setSixthSelected(false);
      setSeventhSelected(true);
    }
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  }));

  const MainWrapper = styled(Box)({
    width: "80%",
    margin: "auto",
    [theme.breakpoints.down("md")]: {
      width: "95%",
    },
  });

  const StyledListItemText = styled(ListItemText)({
    [theme.breakpoints.down("lg")]: {
      display: "none",
    },
    marginLeft: theme.spacing(-2),
  });

  const StyledList = styled(List)({
    display: "block",
    margin: "auto",
    [theme.breakpoints.down("lg")]: {
      display: "flex",
    },
  });

  const StyledLink = styled(Link)({
    textDecoration: "none",
    textTransform: "uppercase",
    fontWeight: 600,
    color: "#000",
    display: "block",
  });

  const MobileMenuText = styled(Typography)({
    [theme.breakpoints.down("lg")]: {
      fontSize: 12,
      display: "block",
    },
    display: "none",
  });

  return (
    <MainWrapper>
      <BreadcrumbsBar breadcrumbsItems={breadcrumbs} />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={12} lg={2}>
            <Item>
              <StyledList>
                <Grid container spacing={1}>
                  <StyledLink to="/admin">
                    <ListItemButton
                      onClick={() => {
                        setSelectedItem(1);
                      }}
                      selected={firstSelected}
                    >
                      <ListItemIcon>
                        <DashboardIcon sx={{ margin: "auto" }} />
                      </ListItemIcon>
                      <StyledListItemText primary="Dashboard" />
                    </ListItemButton>
                    <MobileMenuText>Dashboard</MobileMenuText>
                  </StyledLink>
                  <Divider />
                  <StyledLink to="/admin/users">
                    <ListItemButton
                      onClick={() => {
                        setSelectedItem(2);
                      }}
                      selected={secondSelected}
                    >
                      <ListItemIcon>
                        <PeopleAlt sx={{ margin: "auto" }} />
                      </ListItemIcon>
                      <StyledListItemText primary="Users" />
                    </ListItemButton>
                    <MobileMenuText>Users</MobileMenuText>
                  </StyledLink>
                  <Divider />
                  <StyledLink to="/admin/products">
                    <ListItemButton
                      onClick={() => {
                        setSelectedItem(3);
                      }}
                      selected={thirdSelected}
                    >
                      <ListItemIcon>
                        <ShoppingBag sx={{ margin: "auto" }} />
                      </ListItemIcon>
                      <StyledListItemText primary="Products" />
                    </ListItemButton>
                    <MobileMenuText>Products</MobileMenuText>
                  </StyledLink>
                  <Divider />
                  <StyledLink to="/admin/categories">
                    <ListItemButton
                      onClick={() => {
                        setSelectedItem(4);
                      }}
                      selected={forthSelected}
                    >
                      <ListItemIcon>
                        <Category sx={{ margin: "auto" }} />
                      </ListItemIcon>
                      <StyledListItemText primary="Categories" />
                    </ListItemButton>
                    <MobileMenuText>Categories</MobileMenuText>
                  </StyledLink>
                  <Divider />
                  <StyledLink to="/admin/coupons">
                    <ListItemButton
                      onClick={() => {
                        setSelectedItem(5);
                      }}
                      selected={fifthSelected}
                    >
                      <ListItemIcon>
                        <Discount sx={{ margin: "auto" }} />
                      </ListItemIcon>
                      <StyledListItemText primary="Coupons" />
                    </ListItemButton>
                    <MobileMenuText>Coupons</MobileMenuText>
                  </StyledLink>
                  <StyledLink to="/admin/orders">
                    <ListItemButton
                      onClick={() => {
                        setSelectedItem(6);
                      }}
                      selected={sixthSelected}
                    >
                      <ListItemIcon>
                        <ShoppingCartCheckout sx={{ margin: "auto" }} />
                      </ListItemIcon>
                      <StyledListItemText primary="Orders" />
                    </ListItemButton>
                    <MobileMenuText>Orders</MobileMenuText>
                  </StyledLink>
                  <Divider />
                  <StyledLink to="/admin/reviews">
                    <ListItemButton
                      onClick={() => {
                        setSelectedItem(7);
                      }}
                      selected={seventhSelected}
                    >
                      <ListItemIcon>
                        <ReviewsIcon sx={{ margin: "auto" }} />
                      </ListItemIcon>
                      <StyledListItemText primary="Reviews" />
                    </ListItemButton>
                    <MobileMenuText>Reviews</MobileMenuText>
                  </StyledLink>
                  <Divider />
                </Grid>
              </StyledList>
            </Item>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={10}>
            <Outlet />
          </Grid>
        </Grid>
      </Box>
    </MainWrapper>
  );
}