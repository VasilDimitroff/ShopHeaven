import { React, useState, Fragment, useEffect } from "react";
import { Box, Grid, Typography, Button, Slide } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled } from "@mui/material/styles";
import { theme } from "../../../theme";
import BreadcrumbsBar from "../../BreadcrumbsBar";
import SubcategoryProductsSidebar from "./SubcategoryProductsSidebar";
import SubcategoryProductsMain from "./SubcategoryProductsMain";

export default function SubcategoryProducts() {
  const [showSidebar, setShowSidebar] = useState(true);
  const isBiggerOrMd = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(()=> {
    setShowSidebar(isBiggerOrMd)
  }, [isBiggerOrMd])

  const breadcrumbs = [
    {
      name: "Home",
      uri: "/",
    },
    {
      name: "Categories",
      uri: "/categories/1",
    },
    {
      name: "Subcategory",
      uri: "/categories/1/subcategories/1",
    },
    {
      name: "Products",
      uri: "/categories/1/subcategories/1/products",
    },
  ];

  const ContentWrapper = styled(Box)({
   
  });

  const MainWrapper = styled(Box)({
    width: "80%",
    margin: "auto",
    marginTop: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      width: "95%",
    },
  });

  const SidebarHolder = styled(Box)({
    [theme.breakpoints.down("md")]: {
      display: showSidebar ? "block" : "none"
    }, 
  })

  const FiltersButton = styled(Box)({
    [theme.breakpoints.up("md")]: {
      display: "none"
    },
  })

  function handleOpenSidebar(){
    setShowSidebar(prev => !prev);
  }

  return (
    <Fragment>
      <BreadcrumbsBar breadcrumbsItems={breadcrumbs} />
      <MainWrapper>
        <ContentWrapper>
              <Box sx={{display: "flex"}}>
                <Box><Button>Sort</Button></Box>
                <FiltersButton><Button onClick={handleOpenSidebar}>Filters</Button></FiltersButton>
              </Box>
          <Grid container spacing={3}> 
            <Grid item xs={12} sm={12} md={3} lg={3}>
             <Slide in={showSidebar} easing={theme.transitions.easing.easeInOut} timeout={200} direction="right" unmountOnExit>
                <SidebarHolder>
                  {/* first important part of the page */}
                  <SubcategoryProductsSidebar />
                </SidebarHolder>
              </Slide>
            </Grid>
            <Grid item xs={12} sm={12} md={9} lg={9}>
              {/* second important part of the page */}  
              <SubcategoryProductsMain />
            </Grid>
          </Grid>
        </ContentWrapper>
      </MainWrapper>
    </Fragment>
  );
}
