import React, { useState } from "react";
import {
  Box,
  List,
  ListItemText,
  ListItemButton,
  Divider,
  Fade,
  Button,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Label,
  RadioButtonChecked,
  KeyboardArrowRight,
  ArrowBackIos,
} from "@mui/icons-material";
import { theme } from "./../../theme";

let subcategories = [];
let mainCategoryOfSubcategoriesName;
let categoriesToShow;
let subCategoriesToShow;

export default function CategoriesHomeList(props) {
  function SetCategoriesToShow() {

    const isSmallerThanSm = useMediaQuery(theme.breakpoints.down("sm"));

    if (isSmallerThanSm === true) {
      categoriesToShow = 8;
    } else {
      categoriesToShow = 12;
    }

    return categoriesToShow;
  }

  function SetSubCategoriesToShow() {
    const isSmallerThanSm = useMediaQuery(theme.breakpoints.down("sm"));

    if (isSmallerThanSm === true) {
      subCategoriesToShow = SetCategoriesToShow() + 1;
    } else {
      subCategoriesToShow = subcategories.length;
    }

    return subCategoriesToShow;
  }

  categoriesToShow = SetCategoriesToShow();
  subCategoriesToShow = SetSubCategoriesToShow();

  function setSubCategoriesData(mainCategoryId) {
    setShowSubmenu(true);
    let searchedMainCategory = props.categories.find(
      (category) => category.id == mainCategoryId
    );
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
    display: props.categories.length > categoriesToShow ? "block" : "none",
  });

  const CategoriesWrapper = styled(Box)(({ theme }) => ({
    position: "relative",
  }));

  const Submenu = styled(Box)(({ theme }) => ({
    display: showSubmenu === true ? "block" : "none",
    backgroundColor: "white",
    position: "absolute",
    left: "100%",
    zIndex: 23,
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
    color: "white",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    marginTop: theme.spacing(-0.5),
    backgroundColor: theme.palette.secondary.main,
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  });

  const MainCategoryNameText = styled(Typography)({
    textTransform: "uppercase",
    fontWeight: "500",
    fontSize: "19px",
    lineHeight: 1.2,
    textAlign: "center",
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
    fontSize: "20px",
  });

  return (
    <CategoriesWrapper>
      <StyledList component="nav" aria-label="mailbox folders">
        <MenuHolder>
          <CategoriesHeading variant="h5">CATEGORIES</CategoriesHeading>
          {props.categories.slice(0, categoriesToShow).map((category) => {
            return (
              <div key={category.id}>
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
                        fontWeight: "500",
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
                </Box>
              </div>
            );
          })}

          <ViewAllButton variant="contained">VIEW ALL CATEGORIES</ViewAllButton>
        </MenuHolder>
        <Fade in={showSubmenu} timeout={400}>
          <Submenu
            onMouseEnter={() => setShowSubmenu(true)}
            onMouseLeave={() => setShowSubmenu(false)}
          >
            <SubcategoriesHeading>
              <CategoryItem
                onClick={() => setShowSubmenu(false)}
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  color: "white",
                  "&:hover": {
                    color: "black",
                  },
                }}
              >
                <ArrowBackIos />
                <MainCategoryNameText variant="h5">
                  {mainCategoryOfSubcategoriesName}
                </MainCategoryNameText>
              </CategoryItem>
            </SubcategoriesHeading>
            <MainCategoryName>
              <MainCategoryNameText component="h3">
                {mainCategoryOfSubcategoriesName}
              </MainCategoryNameText>
            </MainCategoryName>
            {subcategories
              .slice(0, subCategoriesToShow)
              .map((subcategory, index) => {
                return (
                  <Box key={index}>
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
            <ViewAllButton
              variant="contained"
              sx={{
                display: "none",
                [theme.breakpoints.down("md")]: {
                  display:
                    subcategories.length > subCategoriesToShow
                      ? "block"
                      : "none",
                },
              }}
            >
              VIEW ALL SUBCATEGORIES
            </ViewAllButton>
          </Submenu>
        </Fade>
      </StyledList>
    </CategoriesWrapper>
  );
}
