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
import {
  Inbox,
  Drafts,
  Favorite,
  FavoriteBorder,
  AddShoppingCart,
  RemoveShoppingCart,
  AddCircle,
  RemoveCircle,
  Close,
} from "@mui/icons-material";

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
      return <Products />;
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
  }));

  const MainWrapper = styled(Box)({
    width: "80%",
    margin: "auto",
    [theme.breakpoints.down("md")]: {
      width: "95%",
    },
  });

  return (
    <MainWrapper>
      <BreadcrumbsBar breadcrumbsItems={breadcrumbs} />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Item>
              <List component="nav" aria-label="main mailbox folders">
                <ListItemButton
                  selected={selectedIndex === 1}
                  onClick={(event) => handleListItemClick(event, firstIndex)}
                >
                  <ListItemIcon>
                    <Inbox />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItemButton>
                <Divider />
                <ListItemButton
                  selected={selectedIndex === secondIndex}
                  onClick={(event) => handleListItemClick(event, secondIndex)}
                >
                  <ListItemIcon>
                    <Drafts />
                  </ListItemIcon>
                  <ListItemText primary="Users" />
                </ListItemButton>
                <Divider />
                <ListItemButton
                  selected={selectedIndex === thirdIndex}
                  onClick={(event) => handleListItemClick(event, thirdIndex)}
                >
                  <ListItemIcon>
                    <Drafts />
                  </ListItemIcon>
                  <ListItemText primary="Products" />
                </ListItemButton>
                <Divider />
                <ListItemButton
                  selected={selectedIndex === forthIndex}
                  onClick={(event) => handleListItemClick(event, forthIndex)}
                >
                  <ListItemIcon>
                    <Drafts />
                  </ListItemIcon>
                  <ListItemText primary="Categories" />
                </ListItemButton>
                <Divider />
                <ListItemButton
                  selected={selectedIndex === fifthIndex}
                  onClick={(event) => handleListItemClick(event, fifthIndex)}
                >
                  <ListItemIcon>
                    <Drafts />
                  </ListItemIcon>
                  <ListItemText primary="Coupons" />
                </ListItemButton>
                <ListItemButton
                  selected={selectedIndex === sixthIndex}
                  onClick={(event) => handleListItemClick(event, sixthIndex)}
                >
                  <ListItemIcon>
                    <Drafts />
                  </ListItemIcon>
                  <ListItemText primary="Orders" />
                </ListItemButton>
                <Divider />
                <ListItemButton
                  selected={selectedIndex === seventhIndex}
                  onClick={(event) => handleListItemClick(event, seventhIndex)}
                >
                  <ListItemIcon>
                    <Drafts />
                  </ListItemIcon>
                  <ListItemText primary="Reviews" />
                </ListItemButton>
                <Divider />
              </List>
            </Item>
          </Grid>
          <Grid item xs={10}>
            <Item>{renderSubmenu()}</Item>
          </Grid>
        </Grid>
      </Box>
    </MainWrapper>
  );
}
