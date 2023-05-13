import { React, useState, Fragment } from "react";
import { Box, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../../theme";
import BreadcrumbsBar from "../../BreadcrumbsBar";
import SubcategoryProductsSidebar from "./SubcategoryProductsSidebar";
import SubcategoryProductsMain from "./SubcategoryProductsMain";

export default function SubcategoryProducts() {
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
    display: "flex",
  });

  const MainWrapper = styled(Box)({
    width: "80%",
    margin: "auto",
    marginTop: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      width: "95%",
    },
  });

  return (
    <Fragment>
      <BreadcrumbsBar breadcrumbsItems={breadcrumbs} />
      <MainWrapper>
        <ContentWrapper>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <Box>
                {/* first important part of the page */}
                <SubcategoryProductsSidebar />
              </Box>
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
