import { React, useState, useEffect } from "react";
import { Box, Grid, Paper, List, ListItemButton, ListItemIcon, ListItemText,  Divider,} from "@mui/material";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import BreadcrumbsBar from "../BreadcrumbsBar";
import { theme } from "../../theme";
import Products from "./Products";
import Users from "./Users";
import Reviews from "./Reviews";
import Orders from "./Orders";
import Categories from "./Categories";
import Dashboard from "./Dashboard";
import Coupons from "./Coupons";
import { categories } from "../categories";
import { products } from "../products";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReviewsIcon from "@mui/icons-material/Reviews";
import { PeopleAlt,ShoppingBag, Category, Discount, ShoppingCartCheckout,} from "@mui/icons-material";

export default function Admin() {
  let firstIndex = 1;
  let secondIndex = 2;
  let thirdIndex = 3;
  let forthIndex = 4;
  let fifthIndex = 5;
  let sixthIndex = 6;
  let seventhIndex = 7;

  let [selectedIndex, setSelectedIndex] = useState(1);

  useEffect(() => {
    console.log("selectedIndex has been updated:", selectedIndex);   
  }, [selectedIndex]);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  function renderSubmenu() {
    if (selectedIndex == firstIndex) {
      return <Dashboard />;
    } else if (selectedIndex === secondIndex) {
      return <Users />;
    } else if (selectedIndex === thirdIndex) {
      return <Products categories={categories} products={products}/>;
    } else if (selectedIndex === forthIndex) {
      return <Categories categories={categories} />;
    } else if (selectedIndex === fifthIndex) {
      return <Coupons />;
    } else if (selectedIndex === sixthIndex) {
      return <Orders />;
    } else if (selectedIndex === seventhIndex) {
      return <Reviews />;
    }
  }

  const breadcrumbs = [
    {
      name: "Home",
      uri: "/",
    },
    {
      name: "Admin",
      uri: "/categories",
    },
  ];

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

  const TableHolderListItem = styled(Item)({
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  })

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
    marginLeft: theme.spacing(-2)
  });

  const StyledList = styled(List)({
    display: "block",
    [theme.breakpoints.down("lg")]: {
      display: "flex",
    },
  });

  return (
    <MainWrapper>
      <BreadcrumbsBar breadcrumbsItems={breadcrumbs} />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={12} lg={2}>
            <Item>
              <StyledList aria-label="main mailbox folders">
                <ListItemButton
                  selected={selectedIndex === 1}
                  onClick={(event) => handleListItemClick(event, firstIndex)}
                >
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <StyledListItemText primary="Dashboard" />
                </ListItemButton>
                <Divider />
                <ListItemButton
                  selected={selectedIndex === secondIndex}
                  onClick={(event) => handleListItemClick(event, secondIndex)}
                >
                  <ListItemIcon>
                    <PeopleAlt />
                  </ListItemIcon>
                  <StyledListItemText primary="Users" />
                </ListItemButton>
                <Divider />
                <ListItemButton
                  selected={selectedIndex === thirdIndex}
                  onClick={(event) => handleListItemClick(event, thirdIndex)}
                >
                  <ListItemIcon>
                    <ShoppingBag />
                  </ListItemIcon>
                  <StyledListItemText primary="Products" />
                </ListItemButton>
                <Divider />
                <ListItemButton
                  selected={selectedIndex === forthIndex}
                  onClick={(event) => handleListItemClick(event, forthIndex)}
                >
                  <ListItemIcon>
                    <Category />
                  </ListItemIcon>
                  <StyledListItemText primary="Categories" />
                </ListItemButton>
                <Divider />
                <ListItemButton
                  selected={selectedIndex === fifthIndex}
                  onClick={(event) => handleListItemClick(event, fifthIndex)}
                >
                  <ListItemIcon>
                    <Discount />
                  </ListItemIcon>
                  <StyledListItemText primary="Coupons" />
                </ListItemButton>
                <ListItemButton
                  selected={selectedIndex === sixthIndex}
                  onClick={(event) => handleListItemClick(event, sixthIndex)}
                >
                  <ListItemIcon>
                    <ShoppingCartCheckout />
                  </ListItemIcon>
                  <StyledListItemText primary="Orders" />
                </ListItemButton>
                <Divider />
                <ListItemButton
                  selected={selectedIndex === seventhIndex}
                  onClick={(event) => handleListItemClick(event, seventhIndex)}
                >
                  <ListItemIcon>
                    <ReviewsIcon />
                  </ListItemIcon>
                  <StyledListItemText primary="Reviews" />
                </ListItemButton>
                <Divider />
              </StyledList>
            </Item>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={10}>
            <TableHolderListItem>{renderSubmenu()}</TableHolderListItem>
          </Grid>
        </Grid>
      </Box>
    </MainWrapper>
  );
}
