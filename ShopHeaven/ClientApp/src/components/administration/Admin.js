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
  Stack,
} from "@mui/material";
import { Outlet, Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import BreadcrumbsBar from "../common/BreadcrumbsBar";
import { theme } from "../../theme";
import {
  PeopleAlt,
  ShoppingBag,
  Category,
  Discount,
  ShoppingCartCheckout,
  Settings,
  Dashboard,
  Reviews,
  ArrowForwardIos,
  ArrowBackIos
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

  const [showMenuButtonsTexts, setShowMenuButtonsTexts] = useState(true);

  let [firstSelected, setFirstSelected] = useState(false);
  let [secondSelected, setSecondSelected] = useState(false);
  let [thirdSelected, setThirdSelected] = useState(false);
  let [forthSelected, setForthSelected] = useState(false);
  let [fifthSelected, setFifthSelected] = useState(false);
  let [sixthSelected, setSixthSelected] = useState(false);
  let [seventhSelected, setSeventhSelected] = useState(false);
  let [eightSelected, setEightSelected] = useState(false);

  function setSelectedItem(item) {
    if (item === 1) {
      setFirstSelected(true);
      setSecondSelected(false);
      setThirdSelected(false);
      setForthSelected(false);
      setFifthSelected(false);
      setSixthSelected(false);
      setSeventhSelected(false);
      setEightSelected(false);
    } else if (item === 2) {
      setFirstSelected(false);
      setSecondSelected(true);
      setThirdSelected(false);
      setForthSelected(false);
      setFifthSelected(false);
      setSixthSelected(false);
      setSeventhSelected(false);
      setEightSelected(false);
    } else if (item === 3) {
      setFirstSelected(false);
      setSecondSelected(false);
      setThirdSelected(true);
      setForthSelected(false);
      setFifthSelected(false);
      setSixthSelected(false);
      setSeventhSelected(false);
      setEightSelected(false);
    } else if (item === 4) {
      setFirstSelected(false);
      setSecondSelected(false);
      setThirdSelected(false);
      setForthSelected(true);
      setFifthSelected(false);
      setSixthSelected(false);
      setSeventhSelected(false);
      setEightSelected(false);
    } else if (item === 5) {
      setFirstSelected(false);
      setSecondSelected(false);
      setThirdSelected(false);
      setForthSelected(false);
      setFifthSelected(true);
      setSixthSelected(false);
      setSeventhSelected(false);
      setEightSelected(false);
    } else if (item === 6) {
      setFirstSelected(false);
      setSecondSelected(false);
      setThirdSelected(false);
      setForthSelected(false);
      setFifthSelected(false);
      setSixthSelected(true);
      setSeventhSelected(false);
      setEightSelected(false);
    } else if (item === 7) {
      setFirstSelected(false);
      setSecondSelected(false);
      setThirdSelected(false);
      setForthSelected(false);
      setFifthSelected(false);
      setSixthSelected(false);
      setSeventhSelected(true);
      setEightSelected(false);
    } else if (item === 8) {
      setFirstSelected(false);
      setSecondSelected(false);
      setThirdSelected(false);
      setForthSelected(false);
      setFifthSelected(false);
      setSixthSelected(false);
      setSeventhSelected(false);
      setEightSelected(true);
    }
  }

  function handleSetShowMenuButtonsTexts() {
    setShowMenuButtonsTexts(prev => !prev);
  }

  const MainWrapper = styled(Box)({
    width: "95%",
    margin: "auto",
    [theme.breakpoints.down("md")]: {
      width: "95%",
    },
  });

  const StyledListItemText = styled(ListItemText)({
    display: showMenuButtonsTexts ? "block" : "none",
    [theme.breakpoints.down("lg")]: {
      display: "none",
    },
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
    [theme.breakpoints.up("lg")]: {
      width: "100%",
    },
  });

  const MobileMenuText = styled(Typography)({
    [theme.breakpoints.down("lg")]: {
      fontSize: 12,
      display: "block",
    },
    display: "none",
    textAlign: "center"
  });

  const StyledListItemButton = styled(ListItemButton)({
    padding: theme.spacing(1.25, 0),
    [theme.breakpoints.down("lg")]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
  });

  const MenuHolder = styled(Stack)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
   
    [theme.breakpoints.down("lg")]: {
      padding:theme.spacing(0, 1)
    },
  })
  const MinimizeButtonListItemButton = styled(StyledListItemButton)({
    [theme.breakpoints.down("lg")]: {
      display: "none"
    },
  })

  return (
    <MainWrapper>
      <Box sx={{ marginBottom: theme.spacing(2) }}>
        <BreadcrumbsBar breadcrumbsItems={breadcrumbs} />
      </Box>
      <Box>
        <Grid container spacing={1}>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={showMenuButtonsTexts ? 2 : 0.50}
          >
            <Paper>
              <StyledList dense={true}>
                <MenuHolder direction="row" flexWrap="wrap">
                  <MinimizeButtonListItemButton
                    onClick={handleSetShowMenuButtonsTexts}
                    style={{ color: theme.palette.common.black }}
                  >
                    <ListItemIcon>
                      {showMenuButtonsTexts ? (
                        <ArrowBackIos sx={{ margin: "auto" }} />
                      ) : (
                        <ArrowForwardIos sx={{ margin: "auto" }} />
                      )}
                    </ListItemIcon>
                    <StyledListItemText primary="" />
                  </MinimizeButtonListItemButton>

                  <StyledLink to="/admin">
                    <StyledListItemButton
                      onClick={() => {
                        setSelectedItem(1);
                      }}
                      selected={firstSelected}
                      style={{
                        color: firstSelected
                          ? theme.palette.secondary.main
                          : theme.palette.common.black,
                      }}
                    >
                      <ListItemIcon>
                        <Dashboard
                          sx={{
                            margin: "auto",
                            color: theme.palette.secondary.main,
                          }}
                        />
                      </ListItemIcon>
                      <StyledListItemText primary="Dashboard" />
                    </StyledListItemButton>
                    <MobileMenuText>Dashboard</MobileMenuText>
                  </StyledLink>
                  <Divider />
                  <StyledLink to="/admin/users">
                    <StyledListItemButton
                      onClick={() => {
                        setSelectedItem(2);
                      }}
                      selected={secondSelected}
                      style={{
                        color: secondSelected
                          ? theme.palette.secondary.main
                          : theme.palette.common.black,
                      }}
                    >
                      <ListItemIcon>
                        <PeopleAlt
                          sx={{
                            margin: "auto",
                            color: theme.palette.secondary.main,
                          }}
                        />
                      </ListItemIcon>
                      <StyledListItemText primary="Users" />
                    </StyledListItemButton>
                    <MobileMenuText>Users</MobileMenuText>
                  </StyledLink>
                  <Divider />
                  <StyledLink to="/admin/products">
                    <StyledListItemButton
                      onClick={() => {
                        setSelectedItem(3);
                      }}
                      selected={thirdSelected}
                      style={{
                        color: thirdSelected
                          ? theme.palette.secondary.main
                          : theme.palette.common.black,
                      }}
                    >
                      <ListItemIcon>
                        <ShoppingBag
                          sx={{
                            margin: "auto",
                            color: theme.palette.secondary.main,
                          }}
                        />
                      </ListItemIcon>
                      <StyledListItemText primary="Products" />
                    </StyledListItemButton>
                    <MobileMenuText>Products</MobileMenuText>
                  </StyledLink>
                  <Divider />
                  <StyledLink to="/admin/categories">
                    <StyledListItemButton
                      onClick={() => {
                        setSelectedItem(4);
                      }}
                      selected={forthSelected}
                      style={{
                        color: forthSelected
                          ? theme.palette.secondary.main
                          : theme.palette.common.black,
                      }}
                    >
                      <ListItemIcon>
                        <Category
                          sx={{
                            margin: "auto",
                            color: theme.palette.secondary.main,
                          }}
                        />
                      </ListItemIcon>
                      <StyledListItemText primary="Categories" />
                    </StyledListItemButton>
                    <MobileMenuText>Categories</MobileMenuText>
                  </StyledLink>
                  <Divider />
                  <StyledLink to="/admin/coupons">
                    <StyledListItemButton
                      onClick={() => {
                        setSelectedItem(5);
                      }}
                      selected={fifthSelected}
                      style={{
                        color: fifthSelected
                          ? theme.palette.secondary.main
                          : theme.palette.common.black,
                      }}
                    >
                      <ListItemIcon>
                        <Discount
                          sx={{
                            margin: "auto",
                            color: theme.palette.secondary.main,
                          }}
                        />
                      </ListItemIcon>
                      <StyledListItemText primary="Coupons" />
                    </StyledListItemButton>
                    <MobileMenuText>Coupons</MobileMenuText>
                  </StyledLink>
                  <StyledLink to="/admin/orders">
                    <StyledListItemButton
                      onClick={() => {
                        setSelectedItem(6);
                      }}
                      selected={sixthSelected}
                      style={{
                        color: sixthSelected
                          ? theme.palette.secondary.main
                          : theme.palette.common.black,
                      }}
                    >
                      <ListItemIcon>
                        <ShoppingCartCheckout
                          sx={{
                            margin: "auto",
                            color: theme.palette.secondary.main,
                          }}
                        />
                      </ListItemIcon>
                      <StyledListItemText primary="Orders" />
                    </StyledListItemButton>
                    <MobileMenuText>Orders</MobileMenuText>
                  </StyledLink>
                  <Divider />
                  <StyledLink to="/admin/reviews">
                    <StyledListItemButton
                      onClick={() => {
                        setSelectedItem(7);
                      }}
                      selected={seventhSelected}
                      style={{
                        color: seventhSelected
                          ? theme.palette.secondary.main
                          : theme.palette.common.black,
                      }}
                    >
                      <ListItemIcon>
                        <Reviews
                          sx={{
                            margin: "auto",
                            color: theme.palette.secondary.main,
                          }}
                        />
                      </ListItemIcon>
                      <StyledListItemText primary="Reviews" />
                    </StyledListItemButton>
                    <MobileMenuText>Reviews</MobileMenuText>
                  </StyledLink>
                  <Divider />
                  <StyledLink to="/admin/settings">
                    <StyledListItemButton
                      onClick={() => {
                        setSelectedItem(8);
                      }}
                      selected={eightSelected}
                      style={{
                        color: eightSelected
                          ? theme.palette.secondary.main
                          : theme.palette.common.black,
                      }}
                    >
                      <ListItemIcon>
                        <Settings
                          sx={{
                            margin: "auto",
                            color: theme.palette.secondary.main,
                          }}
                        />
                      </ListItemIcon>
                      <StyledListItemText primary="Settings" />
                    </StyledListItemButton>
                    <MobileMenuText>Settings</MobileMenuText>
                  </StyledLink>
                  <Divider />
                </MenuHolder>
              </StyledList>
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={showMenuButtonsTexts ? 10 : 11.50}
          >
            <Outlet />
          </Grid>
        </Grid>
      </Box>
    </MainWrapper>
  );
}
