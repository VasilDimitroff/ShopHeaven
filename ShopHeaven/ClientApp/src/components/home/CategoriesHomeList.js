import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import {
  Box,
  List,
  ListItemText,
  ListItemButton,
  Divider,
  Fade,
  Button,
  Typography,
  ListItem,
  Zoom,
  Tooltip,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled } from "@mui/material/styles";
import {
  Label,
  RadioButtonChecked,
  KeyboardArrowRight,
  ArrowBackIos,
} from "@mui/icons-material";
import { theme } from "./../../theme";
import { useNavigate, useLocation } from "react-router-dom";
import { ApiEndpoints } from "../../api/endpoints";
import axios from "../../api/axios";

let mainCategoryOfSubcategoriesName;

export default function CategoriesHomeList() {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  let categoriesToShow =
    useMediaQuery(theme.breakpoints.down("sm")) === true ? 8 : 9;
  let subCategoriesToShow =
    useMediaQuery(theme.breakpoints.down("sm")) === true
      ? categoriesToShow + 1
      : subcategories.length;

  const navigate = useNavigate();
  const location = useLocation();

  const effectRun = useRef(false);

  useEffect(() => {
    const controller = new AbortController();

    const getCategories = async () => {
      try {
        const response = await axios.get(ApiEndpoints.categories.getCategoryNames, {
          signal: controller.signal,
        });
        console.log(response?.data);

        setCategories(response?.data);
      } catch (error) {
        console.log(error);
        navigate("/login", { state: { from: location }, replace: true }); 
      }
    };

    if (effectRun.current) {
      getCategories();
    }

    return () => {
      effectRun.current = true; // update the value of effectRun to true
      controller.abort();
    };
  }, []);

  function handleShowSubmenu() {
    setShowSubmenu(prev => !prev);
  }

  function setSubCategoriesData(mainCategoryId) {
    setShowSubmenu(true);
    setSubcategories(sub => categories.find(cat => cat.id == mainCategoryId).subcategories);
    mainCategoryOfSubcategoriesName = categories.find(cat => cat.id == mainCategoryId).name;
  }

  const ViewAllButton = styled(Button)({
    width: "100%",
    paddingBottom: theme.spacing(1.75),
    paddingTop: theme.spacing(1.75),
    backgroundColor: theme.palette.secondary.main,
    display: categories.length > categoriesToShow ? "block" : "none",
    "&:hover": {},
    [theme.breakpoints.down("md")]: {
      color: theme.palette.white.main,
      backgroundColor: theme.palette.primary.main,
      "&:hover": {
        //backgroundColor: theme.palette.secondary.main,
      },
    },
  });

  const CategoriesWrapper = styled(Box)(({ theme }) => ({
    position: "relative",
  }));

  const Submenu = styled(Box)(({ theme }) => ({
    display: showSubmenu === true ? "block" : "none",
    backgroundColor: "white",
    marginTop: theme.spacing(9.5),
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
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.white.main,
    display: "flex",
    alignItems: "center",
    width: 270,
    paddingTop: theme.spacing(1.65),
    paddingBottom: theme.spacing(1.65),
    "&:hover": {
      color: theme.palette.white.main,
      backgroundColor: theme.palette.secondary.main,
    },
    [theme.breakpoints.down("md")]: {
      width: "100%",
      backgroundColor: theme.palette.white.main,
      color: "black",
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
      },
    },
  });

  const CategoriesHeading = styled(Typography)({
    textAlign: "center",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    fontSize: "30px",
    fontWeight: 400,
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.white.main,
    [theme.breakpoints.up("lg")]: {
      borderTopLeftRadius: theme.shape.borderRadius,
    },
    [theme.breakpoints.down("md")]: {
      backgroundColor: theme.palette.primary.main,
    },
  });

  const MenuHolder = styled(Box)({
    //backgroundColor: theme.palette.primary.main,
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
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  });

  const MainCategoryNameText = styled(Typography)({
    textTransform: "uppercase",
    fontWeight: "500",
    lineHeight: 1.2,
    textAlign: "center",
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
    fontSize: "20px",
  });

  const ViewAllButtonHolder = styled(ListItem)({
    paddingLeft: theme.spacing(1.2),
    paddingRight: theme.spacing(1.2),
    [theme.breakpoints.down("md")]: {
      backgroundColor: theme.palette.white.main,
    },
    "&:hover": {
      color: theme.palette.white.main,
    },
  });

  const SubCategoryItem = styled(CategoryItem)({
    backgroundColor: theme.palette.white.main,
    color: "black",
    "&:hover": {
      color: theme.palette.white.main,
      backgroundColor: theme.palette.primary.main,
    },
  });

  const ViewAllSubcategoriesButtonHolder = styled(ViewAllButtonHolder)({
    [theme.breakpoints.down("md")]: {
      backgroundColor: theme.palette.white.main,
    },
  });

  const ViewAllSubcategoriesButton = styled(ViewAllButton)({
    display: "none",
    [theme.breakpoints.down("md")]: {
      display: subcategories.length > subCategoriesToShow ? "flex" : "none",
    },
  });

  const CategoryName = styled(Typography)({
    marginLeft: theme.spacing(2),
    width: "100%",
    fontSize: "18px",
    fontWeight: "500",
  });

  return (
    <CategoriesWrapper sx={{border: "2px solid black"}}>
      <StyledList component="nav" aria-label="mailbox folders">
        <MenuHolder onMouseLeave={() => handleShowSubmenu()}>
          <CategoriesHeading variant="h5">CATEGORIES</CategoriesHeading>
          {categories.slice(0, categoriesToShow).map((category) => {
            return (
              <div key={category.id}>
                <Divider />
                <Tooltip
                  disableInteractive={true}
                  enterNextDelay={300}
                  enterDelay={300}
                  placement="bottom"
                  TransitionComponent={Zoom}
                  title="Click to view subcategories"
                  arrow
                >
                  <Box
                    sx={{ display: "flex" }}
                    onClick={() => setSubCategoriesData(category.id)}
                  >
                    <CategoryItem>
                      <RadioButtonChecked />
                      <CategoryName>
                        {category.name}
                      </CategoryName>
                      <KeyboardArrowRight />
                    </CategoryItem>
                  </Box>
                </Tooltip>
              </div>
            );
          })}
          <Divider />
          <ViewAllButtonHolder>
          <Link to="/categories" style={{ color: theme.palette.white.main, textDecoration: "none", width: "100%"}}>
            <ViewAllButton variant="contained">
             VIEW ALL CATEGORIES
            </ViewAllButton>
            </Link>
          </ViewAllButtonHolder>
        </MenuHolder>

        <Fade in={showSubmenu} timeout={400}>
          <Submenu
            onMouseEnter={() => handleShowSubmenu()}
          >
            <SubcategoriesHeading>
              <CategoryItem onClick={() => setShowSubmenu(true)}>
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
              .map((subcategory) => {
                return (
                  <Box key={subcategory.id}>
                    <SubCategoryItem>
                      <Label sx={{ fontSize: "14px" }} />
                      <Typography
                        sx={{
                          marginLeft: theme.spacing(2),
                          fontSize: "16px",
                        }}
                      >
                        {subcategory.name}
                      </Typography>
                    </SubCategoryItem>
                    <Divider />
                    <Divider />
                  </Box>
                );
              })}
            <ViewAllSubcategoriesButtonHolder>
              <ViewAllSubcategoriesButton variant="contained">
                VIEW ALL SUBCATEGORIES
              </ViewAllSubcategoriesButton>
            </ViewAllSubcategoriesButtonHolder>
          </Submenu>
        </Fade>
      </StyledList>
    </CategoriesWrapper>
  );
}
