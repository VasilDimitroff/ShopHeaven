import React, { useState } from "react";
import {Box, List, ListItemText, ListItemButton, Divider, Fade, Button, Typography,} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Label, RadioButtonChecked, KeyboardArrowRight, ArrowBackIos, } from "@mui/icons-material";
import { theme } from "./../../theme";

let subcategories = [];
let mainCategoryOfSubcategoriesName;

export default function CategoriesHomeList(props) {

  function setSubCategoriesData(mainCategoryId) {
    setShowSubmenu(true);
    let searchedMainCategory = props.categories.find(category => category.id == mainCategoryId);
    subcategories = searchedMainCategory.subcategories;
    mainCategoryOfSubcategoriesName = searchedMainCategory.name;
  }

  const [showSubmenu, setShowSubmenu] = useState(false);

  const ViewAllButton = styled(Button)({
    width: "90%",
    display: "flex",
    margin: "auto",
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
    backgroundColor: theme.palette.primary.main,
    display: props.categories.length > 10 ? "block" : "none",
  });

  const CategoriesWrapper = styled(Box)(({ theme }) => ({
    position: "relative",
  }));

  const Submenu = styled(Box)(({ theme }) => ({
    display: showSubmenu === true ? "block" : "none",
    position: "absolute",
    [theme.breakpoints.down("md")]: {
      position: "fixed",
    },
    left: "100%",
    zIndex: 23,
    [theme.breakpoints.up("sm")]: {},
    [theme.breakpoints.down("md")]: {
      display: "block",
      paddingTop: theme.spacing(5),
      width: "90%",
      margin: "auto",
      position: "fixed",
      right: 0,
      left: 0,
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
      width: "100%",
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
    borderTopLeftRadius: theme.shape.borderRadius,
    borderBottomLeftRadius: theme.shape.borderRadius,
    [theme.breakpoints.down("md")]: {
      boxShadow: theme.palette.dropdown.boxShadow,
      borderTopRightRadius: theme.shape.borderRadius,
      borderBottomRightRadius: theme.shape.borderRadius,
      paddingTop: theme.spacing(5),
      width: "90%",
      margin: "auto",
      position: "fixed",
      right: 0,
      left: 0,
    },
  });

  const SubcategoriesHeading = styled(Box)({
    [theme.breakpoints.down("md")]: {
      display: showSubmenu === true ? "flex" : "none",
    },
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  });

  const StyledList = styled(List)({
    display: "flex",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      position: "relative",
    },
  });

  const MainCategoryName = styled(ListItemText)({
    backgroundColor:  theme.palette.primary.main,
    color: "white",
    paddingTop: theme.spacing(2.5),
    paddingBottom: theme.spacing(2.5),
  });

  const MainCategoryNameText = styled(Typography)({
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "500",
    fontSize: "19px",
    lineHeight: 1.2,
    textAlign: "center",
  });


  return (
    <CategoriesWrapper>
      <StyledList component="nav" aria-label="mailbox folders">
        <MenuHolder>
          <CategoriesHeading variant="h5">CATEGORIES</CategoriesHeading>
          {props.categories.slice(0, 12).map((category) => {
            return (
              <div>
              <Box
                sx={{ display: "flex" }}
                onMouseLeave={() => setShowSubmenu(!showSubmenu)}
              >
               
                <CategoryItem 
                  sx={{ backgroundColor: "white", display: "flex" }}
                > 
                  <RadioButtonChecked
                    onMouseEnter={() => setSubCategoriesData(category.id)}
                  />
                  <Typography
                    sx={{
                      marginLeft: theme.spacing(2),
                      width: "100%",
                      fontSize: "18px",
                      "&:hover": {
                        color: theme.palette.primary.main,
                      },
                    }}
                    onMouseEnter={() => setSubCategoriesData(category.id)}
                  >
                    {category.name}
                  </Typography>
                  <KeyboardArrowRight
                    onClick={() => setSubCategoriesData(category.id)}
                  />
                 
                </CategoryItem>
                
                <Divider />
              </Box></div>
            );
          })}

          <ViewAllButton variant="contained">VIEW ALL</ViewAllButton>
        </MenuHolder>
        <Fade in={showSubmenu} timeout={400}>
          <Submenu
            onMouseEnter={() => setShowSubmenu(true)}
            onMouseLeave={() => setShowSubmenu(false)}
          >
            {" "}
            <SubcategoriesHeading>
              <CategoryItem
                onClick={() => setShowSubmenu(false)}
                sx={{ backgroundColor: "#adcbff" }}
              >
                <ArrowBackIos />
                <CategoriesHeading
                  variant="h5"
                  sx={{
                    marginLeft: theme.spacing(2),
                    fontSize: "20px",
                  }}
                >
                  BACK TO MAIN CATEGORIES
                </CategoriesHeading>
              </CategoryItem>
            </SubcategoriesHeading>
            <MainCategoryName>
                <MainCategoryNameText component="h3" >
                 {mainCategoryOfSubcategoriesName}
                </MainCategoryNameText>
            </MainCategoryName>
            {subcategories.map((subcategory) => {
              return (
                <Box>
                  <CategoryItem>
                    <Label sx={{ fontSize: "14px" }} />
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
      </StyledList>
    </CategoriesWrapper>
  );
}
