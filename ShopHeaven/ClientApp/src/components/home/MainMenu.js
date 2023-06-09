import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  List,
  ListItemText,
  ListItemButton,
  Divider,
  Button,
  Typography,
  ListItem,
  Zoom,
  Tooltip,
  Grid,
  Collapse,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled } from "@mui/material/styles";
import {
  Label,
  RadioButtonChecked,
  KeyboardArrowRight,
  ArrowBackIos,
} from "@mui/icons-material";
import { theme } from "../../theme";
import {
  loadSubcategoriesInMainMenuTimerMilliseconds,
  hideSubmenuWhenUserIsOutsideTimerMilliseconds,
  categoriesToShowInMainMenuIfScreenIsSm,
  categoriesToShowInMainMenuIfScreenIsMd,
  allCategoriesUrl,
  subcategoriesOfMainCategoryBaseUrl,
  subcategoryProductsBaseUrl,
} from "../../constants";
import { ApiEndpoints } from "../../api/endpoints";
import axios from "../../api/axios";

let mainCategoryOfSubcategoriesName;

export default function MainMenu(props) {
  const navigate = useNavigate();

  let switchCategorySubcategoriesTimer;

  let hideSubmenuTimer = useRef(null);

  const [showSubmenu, setShowSubmenu] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);
  const [isLowerOrEqualThanMd, setIsLowerOrEqualThanMd] = useState(
    useMediaQuery(theme.breakpoints.down("md"))
  );

  let categoriesToShow =
    useMediaQuery(theme.breakpoints.down("sm")) === true
      ? categoriesToShowInMainMenuIfScreenIsSm
      : categoriesToShowInMainMenuIfScreenIsMd;
  let subCategoriesToShow =
    useMediaQuery(theme.breakpoints.down("sm")) === true
      ? categoriesToShow + 1
      : subcategories.length;

  const effectRun = useRef(false);

  useEffect(() => {
    const controller = new AbortController();

    const getCategories = async () => {
      try {
        const response = await axios.get(
          ApiEndpoints.categories.getCategoryNames,
          {
            signal: controller.signal,
          }
        );
        console.log(response?.data);

        setCategories(response?.data);
      } catch (error) {
        console.log(error);
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


  function setSubCategoriesData(mainCategoryId) {
    clearTimeout(switchCategorySubcategoriesTimer);

    setCurrentCategoryId(mainCategoryId);

    handleShowSubmenu(true);

    //if something dont work as expected, look at this!!!!! may be this if is not needed
    if(!isLowerOrEqualThanMd){
      switchCategorySubcategoriesTimer = setTimeout(
        () => {
          if (mainCategoryId === currentCategoryId) {
            setSubmenuWithData(mainCategoryId)
          }
        },
        !isLowerOrEqualThanMd ? loadSubcategoriesInMainMenuTimerMilliseconds : 0
      );
    } 
    else {
      setSubmenuWithData(mainCategoryId)
    }
  }

  function handleShowSubmenu(show) {
    clearTimeout(hideSubmenuTimer.current);

    if (show == true || isLowerOrEqualThanMd) {
      setShowSubmenu(show);
      return;
    }

    hideSubmenuTimer.current = setTimeout(() => {
      setShowSubmenu(show);
    }, hideSubmenuWhenUserIsOutsideTimerMilliseconds);
  }


  function setSubmenuWithData(mainCategoryId){
    const targetSubcategories = categories.find(
      (cat) => cat.id == mainCategoryId
    ).subcategories;

    setSubcategories(targetSubcategories);

    mainCategoryOfSubcategoriesName = categories.find(
      (cat) => cat.id == mainCategoryId
    ).name;
  }

  function handleCategoryLeave() {
    clearTimeout(switchCategorySubcategoriesTimer);
  }

  function navigateTo(url){
    if(isLowerOrEqualThanMd) {
      props.handleShowMobileMenu(false)
    }
    navigate(url);
  }

  const ViewAllButton = styled(Button)({
    width: "100%",
    paddingBottom: theme.spacing(1.75),
    paddingTop: theme.spacing(1.75),
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.white.main,
    display: categories.length > categoriesToShow ? "block" : "none",
    "&:hover": {},
    [theme.breakpoints.down("md")]: {
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
    width: "100%",
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
    width: "100%",
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

  const ViewAllCategoriesButtonHolder = styled(ViewAllButtonHolder)({
    cursor: "pointer",
    [theme.breakpoints.up("md")]: {
      borderBottomLeftRadius: theme.shape.borderRadius,
    },
  });

  const ViewAllSubcategoriesButton = styled(ViewAllButton)({
    display: "none",
    [theme.breakpoints.down("md")]: {
      display: subcategories.length > subCategoriesToShow ? "flex" : "none",
    },
  });

  const CategoryName = styled(Typography)({
    textTransform: "uppercase",
    marginLeft: theme.spacing(2),
    width: "100%",
    fontSize: 14,
    [theme.breakpoints.down("md")]: {
      fontSize: 16,
    },
    fontWeight: "500",
  });

  return (
    <CategoriesWrapper onMouseLeave={() => handleShowSubmenu(false)}>
      <StyledList component="nav" aria-label="mailbox folders">
        <MenuHolder>
          <CategoriesHeading variant="h5">CATEGORIES</CategoriesHeading>
          {categories.slice(0, categoriesToShow).map((category) => {
            return (
              <Box key={category.id} sx={{ position: "relative" }}>
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
                    onClick={() => !isLowerOrEqualThanMd ? navigateTo(`${subcategoriesOfMainCategoryBaseUrl}${category.id}`) : ""}
                    sx={{ display: "flex"}}
                    onMouseLeave={handleCategoryLeave}
                    onMouseEnter={() => setSubCategoriesData(category.id)}
                  >
                    {/* onClick={() => setSubCategoriesData(category.id)} */}
                    <CategoryItem>
                      <RadioButtonChecked />
                      <CategoryName>{category.name}</CategoryName>
                      <KeyboardArrowRight />
                    </CategoryItem>
                  </Box>
                </Tooltip>
              </Box>
            );
          })}
          <Divider />
          <ViewAllCategoriesButtonHolder>
            <Link
              to={`${allCategoriesUrl}`}
              onClick={() =>
                isLowerOrEqualThanMd ? props.handleShowMobileMenu(false) : ""
              }
              style={{
                textDecoration: "none",
                width: "100%",
              }}
            >
              <ViewAllButton variant="contained">
                VIEW ALL CATEGORIES
              </ViewAllButton>
            </Link>
          </ViewAllCategoriesButtonHolder>
        </MenuHolder>

        <Collapse in={showSubmenu} timeout={400} unmountOnExit>
          <Submenu
            onMouseLeave={() => handleShowSubmenu(false)}
            onMouseEnter={() => handleShowSubmenu(true)}
          >
            <SubcategoriesHeading>
              <CategoryItem onClick={() => handleShowSubmenu(!showSubmenu)}>
                <ArrowBackIos />
                <MainCategoryNameText variant="h5">
                  {mainCategoryOfSubcategoriesName}
                </MainCategoryNameText>
              </CategoryItem>
            </SubcategoriesHeading>
            <MainCategoryName>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <MainCategoryNameText component="h3">
                    {mainCategoryOfSubcategoriesName}
                  </MainCategoryNameText>
                </Grid>
              </Grid>
            </MainCategoryName>
            {subcategories.slice(0, subCategoriesToShow).map((subcategory) => {
              return (
                <Box onClick={() => navigateTo(`${subcategoryProductsBaseUrl}${subcategory.id}`)} key={subcategory.id}>
                  <SubCategoryItem>
                    <Label sx={{ fontSize: "14px" }} />
                    <Typography
                      sx={{
                        marginLeft: theme.spacing(2),
                        fontSize: "16px",
                        textTransform: "uppercase",
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
              <ViewAllSubcategoriesButton onClick={()=> navigateTo(`${subcategoriesOfMainCategoryBaseUrl}${currentCategoryId}`)} variant="contained">
                VIEW ALL SUBCATEGORIES
              </ViewAllSubcategoriesButton>
            </ViewAllSubcategoriesButtonHolder>
          </Submenu>
        </Collapse>
      </StyledList>
    </CategoriesWrapper>
  );
}