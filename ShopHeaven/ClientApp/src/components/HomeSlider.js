import React, { useState } from "react";
import {
  Box,
  Grid,
  Stack,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Fade,
  Button
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Category, RadioButtonChecked } from "@mui/icons-material";
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
    name: "Category 9 is unreal category from the future",
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
];

let subcategories = [];

export default function HomeSlider() {
  function showSubCategories(id) {
    setShowSubmenu(true);
    subcategories = categories[id - 1].subcategories;
  }

  const [showSubmenu, setShowSubmenu] = useState(true);


  const Wrapper = styled(Box)(({ theme }) => ({
    position: "relative",
    left: 50,
    width: "90%",
    margin: "auto",
    marginTop: theme.spacing(8),
  }));

  const Submenu = styled(Box)(({ theme }) => ({
    display: showSubmenu === true ? "block" : "none",
    position: "absolute",
   
    [theme.breakpoints.up("sm")]: {
      left: 272,
    },
    [theme.breakpoints.down("sm")]: {
      left: 118,
    },
  }));

  const CategoryItem = styled(ListItemButton)({
    backgroundColor: theme.palette.dropdown.main,
    "&:hover": {
      backgroundColor: theme.palette.onHoverButtonColor.main,
    },
    display: "flex",
    alignItems: "center",
    width: 270
  });

  return (
    <div>
      <Box sx={{ backgroundColor: theme.palette.appBackground.main }}>
        <Wrapper>
          <Grid container spacing={2}>
            <Grid item xs={6} md={4}>
              <Stack spacing={2}>
                <List
                  sx={{ display: "flex" }}
                  component="nav"
                  aria-label="mailbox folders"
                >
                  <Box>
                    {categories.map((category) => {
                      return (
                        <Box
                          sx={{ display: "flex"}}
                          onMouseLeave={() => setShowSubmenu(false)}
                        >
                            <CategoryItem>
                              <RadioButtonChecked
                                onMouseEnter={() =>
                                  showSubCategories(category.id)
                                }
                              />
                              <ListItemText
                                primary={category.name}
                                sx={{ marginLeft: theme.spacing(2) }}
                                onMouseEnter={() =>
                                  showSubCategories(category.id)
                                }
                              />
                           
                            </CategoryItem>
                            <Divider/>
                        </Box>    
                      );
                    })}
            
                  <Button variant="contained" sx={{width: "100%", marginTop: theme.spacing(0.5)}}>VIEW ALL</Button>  
             
                  </Box>
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
                              <ListItemText
                                primary={`${subcategory}`}
                                sx={{ marginLeft: theme.spacing(2) }}
                              />
                            </CategoryItem>
                            <Divider />
                          </Box>
                        );
                      })}
                    </Submenu>
                  </Fade>
                </List>
              </Stack>
            </Grid>
            <Grid item xs={6} md={8}>
              <div>xs=6 md=8</div>
            </Grid>
          </Grid>
        </Wrapper>
      </Box>
    </div>
  );
}
