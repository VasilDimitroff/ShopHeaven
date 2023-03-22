import React, { useState } from "react";
import {
  Box,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Fade,
  Button,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import HomeCarousel from "./home-carousel/HomeCarousel";
import {
  Category,
  RadioButtonChecked,
  KeyboardArrowRight,
} from "@mui/icons-material";
import { theme } from "./../theme";

const categories = [
  {
    name: "Category 1 ",
    id: "1",
    subcategories: [
      "Category 1, Subcategory 1",
      "Category 1, Subcategory 2",
      "Category 1, Subcategory 3",
      "Category 1, Subcategory 4",
      "Category 1, Subcategory 5",
      "Category 1, Subcategory 6",
      "Category 1, Subcategory 7",
      "Category 1, Subcategory 8",
      "Category 1, Subcategory 9",
      "Category 1, Subcategory 10",
    ],
  },
  {
    name: "Category 2",
    id: "2",
    subcategories: [
      "Category 2, Subcategory 1",
      "Category 2, Subcategory 2",
      "Category 2, Subcategory 3",
      "Category 2, Subcategory 4",
      "Category 2, Subcategory 5",
      "Category 2, Subcategory 6",
      "Category 2, Subcategory 7",
      "Category 2, Subcategory 8",
      "Category 2, Subcategory 9",
      "Category 2, Subcategory 10",
    ],
  },
  {
    name: "Category 3",
    id: "3",
    subcategories: [
      "Category 3, Subcategory 1",
      "Category 3, Subcategory 2",
      "Category 3, Subcategory 3",
      "Category 3, Subcategory 4",
      "Category 3, Subcategory 5",
      "Category 3, Subcategory 6",
      "Category 3, Subcategory 7",
      "Category 3, Subcategory 8",
      "Category 3, Subcategory 9",
      "Category 3, Subcategory 10",
    ],
  },
  {
    name: "Category 4",
    id: "4",
    subcategories: [
      "Category 4, Subcategory 1",
      "Category 4, Subcategory 2",
      "Category 4, Subcategory 3",
      "Category 4, Subcategory 4",
      "Category 4, Subcategory 5",
      "Category 4, Subcategory 6",
      "Category 4, Subcategory 7",
      "Category 4, Subcategory 8",
      "Category 4, Subcategory 9",
      "Category 4, Subcategory 10",
    ],
  },
  {
    name: "Category 5",
    id: "5",
    subcategories: [
      "Category 5, Subcategory 1",
      "Category 5, Subcategory 2",
      "Category 5, Subcategory 3",
      "Category 5, Subcategory 4",
      "Category 5, Subcategory 5",
      "Category 5, Subcategory 6",
      "Category 5, Subcategory 7",
      "Category 5, Subcategory 8",
      "Category 5, Subcategory 9",
      "Category 5, Subcategory 10",
    ],
  },
  {
    name: "Category 6",
    id: "6",
    subcategories: [
      "Category 6, Subcategory 1",
      "Category 6, Subcategory 2",
      "Category 6, Subcategory 3",
      "Category 6, Subcategory 4",
      "Category 6, Subcategory 5",
      "Category 6, Subcategory 6",
      "Category 6, Subcategory 7",
      "Category 6, Subcategory 8",
      "Category 6, Subcategory 9",
      "Category 6, Subcategory 10",
    ],
  },
  {
    name: "Category 7",
    id: "7",
    subcategories: [
      "Category 7, Subcategory 1",
      "Category 7, Subcategory 2",
      "Category 7, Subcategory 3",
      "Category 7, Subcategory 4",
      "Category 7, Subcategory 5",
      "Category 7, Subcategory 6",
      "Category 7, Subcategory 7",
      "Category 7, Subcategory 8",
      "Category 7, Subcategory 9",
      "Category 7, Subcategory 10",
    ],
  },
  {
    name: "Category 8",
    id: "8",
    subcategories: [
      "Category 8, Subcategory 1",
      "Category 8, Subcategory 2",
      "Category 8, Subcategory 3",
      "Category 8, Subcategory 4",
      "Category 8, Subcategory 5",
      "Category 8, Subcategory 6",
      "Category 8, Subcategory 7",
      "Category 8, Subcategory 8",
      "Category 8, Subcategory 9",
      "Category 8, Subcategory 10",
    ],
  },
  {
    name: "Category 9 is unreal category",
    id: "9",
    subcategories: [
      "Category 9, Subcategory 1 is the best subcategory",
      "Category 9, Subcategory 2",
      "Category 9, Subcategory 3",
      "Category 9, Subcategory 4",
      "Category 9, Subcategory 5",
      "Category 9, Subcategory 6",
      "Category 9, Subcategory 7",
      "Category 9, Subcategory 8",
      "Category 9, Subcategory 9",
      "Category 9, Subcategory 10",
    ],
  },
  {
    name: "Category 10",
    id: "10",
    subcategories: [
      "Category 10, Subcategory 1",
      "Category 10, Subcategory 2",
      "Category 10, Subcategory 3",
      "Category 10, Subcategory 4",
      "Category 10, Subcategory 5",
      "Category 10, Subcategory 6",
      "Category 10, Subcategory 7",
      "Category 10, Subcategory 8",
      "Category 10, Subcategory 9",
      "Category 10, Subcategory 10",
    ],
  },
  {
    name: "Category 11",
    id: "11",
    subcategories: [
      "Category 11, Subcategory 1",
      "Category 11, Subcategory 2",
      "Category 11, Subcategory 3",
      "Category 11, Subcategory 4",
      "Category 11, Subcategory 5",
      "Category 11, Subcategory 6",
      "Category 11, Subcategory 7",
      "Category 11, Subcategory 8",
      "Category 11, Subcategory 9",
      "Category 11, Subcategory 10",
    ],
  },
  {
    name: "Category 12",
    id: "12",
    subcategories: [
      "Category 12, Subcategory 1",
      "Category 12, Subcategory 2",
      "Category 12, Subcategory 3",
      "Category 12, Subcategory 4",
      "Category 12, Subcategory 5",
      "Category 12, Subcategory 6",
      "Category 12, Subcategory 7",
      "Category 12, Subcategory 8",
      "Category 12, Subcategory 9",
      "Category 12, Subcategory 10",
    ],
  },
];

let subcategories = [];
let isMobileMenuButtonClicked;


export default function HomeSlider() {
  function showSubCategories(id) {
    setShowSubmenu(true);
    subcategories = categories[id - 1].subcategories;
  }

  const [showSubmenu, setShowSubmenu] = useState(true);

  const ViewAllButton = styled(Button)({
    width: "90%",
    display: "flex",
    margin: "auto",
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
    backgroundColor: theme.palette.primary.main,
    display: categories.length > 10 ? "block" : "none",
  });

  const CategoriesWrapper = styled(Box)(({ theme }) => ({
    position: "relative",
  }));

  const Submenu = styled(Box)(({ theme }) => ({
    display: showSubmenu === true ? "block" : "none",
    position: "absolute",
    left: "101%",
    zIndex: 2,
    [theme.breakpoints.up("sm")]: {},
    [theme.breakpoints.down("md")]: {
      left: 0,
      width: "100%"
    },
    boxShadow: theme.palette.dropdown.boxShadow,
  }));

  const CategoryItem = styled(ListItemButton)({
    backgroundColor: theme.palette.dropdown.main,
    "&:hover": {
      backgroundColor: theme.palette.onHoverButtonColor.main,
    },
    display: "flex",
    alignItems: "center",
    width: 270,
    paddingTop: theme.spacing(1.65),
    paddingBottom: theme.spacing(1.65),
    [theme.breakpoints.down("md")]: {
      width: "100%"
    },
  });

  const CategoriesHeading = styled(Typography)({
    textAlign: "center",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    fontWeight: 300,
  });

  const MenuHolder = styled(Box)({
    backgroundColor: "white",
    width: "100%",
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.down("sm")]: {
      display: "block",
      margin: "auto",
    },
  });

  return (
    <div>
      <Box sx={{ backgroundColor: theme.palette.appBackground.main }}>
        <Grid
          container
          spacing={2}
          sx={{
            width: "80%",
            [theme.breakpoints.down("md")]: {
              width: "95%",
            },
            margin: "auto",
            marginTop: theme.spacing(8),
            display: "flex",
            justifyContent: "space-between",
            border: "1px solid green",
          }}
        >
          <Grid xs={12} md={4} lg={3} sx={{ border: "1px solid blue", height: "100%" }}>
            <CategoriesWrapper>
              <List
                sx={{ display: "flex", width: "100%" }}
                component="nav"
                aria-label="mailbox folders"
              >
                <MenuHolder>
                  <CategoriesHeading variant="h5">CATEGORIES</CategoriesHeading>
                  {categories.slice(0, 12).map((category) => {
                    return (
                      <Box
                        sx={{ display: "flex" }}
                        onMouseLeave={() => setShowSubmenu(false)}
                      >
                        <CategoryItem
                          sx={{ backgroundColor: "white", display: "flex" }}
                        >
                          <RadioButtonChecked
                            onMouseEnter={() => showSubCategories(category.id)}
                          />
                          <Typography
                            sx={{
                              marginLeft: theme.spacing(2),
                              width: "100%",
                              fontSize: "18px",
                            }}
                            onMouseEnter={() => showSubCategories(category.id)}
                          >
                            {category.name}
                          </Typography>
                          <KeyboardArrowRight
                            onClick={() => showSubCategories(category.id)}
                          />
                        </CategoryItem>

                        <Divider />
                      </Box>
                    );
                  })}

                  <ViewAllButton variant="contained">VIEW ALL</ViewAllButton>
                </MenuHolder>
                <Fade in={showSubmenu} timeout={600}>
                  <Submenu
                    onMouseEnter={() => setShowSubmenu(true)}
                    onMouseLeave={() => setShowSubmenu(false)}
                  >
                    {subcategories.map((subcategory) => {
                      return (
                        <Box>
                          <CategoryItem>
                            <Category />
                            <Typography
                              sx={{
                                marginLeft: theme.spacing(2),
                                fontSize: "16px",
                              }}
                            >
                              {subcategory}
                            </Typography>
                          </CategoryItem>
                          <Divider />
                        </Box>
                      );
                    })}
                  </Submenu>
                </Fade>
              </List>
            </CategoriesWrapper>
          </Grid>
          <Grid xs={12} md={8} lg={9} sx={{ height: "100%" }}>
            <Box
              sx={{
                display: "block",
                marginTop: theme.spacing(1),
                [theme.breakpoints.up("md")]: {
                  marginLeft: theme.spacing(2.5),
                },
                width: "100%",
                border: "1px solid red",
              }}
            >
              <HomeCarousel />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
