import { React, useState, Fragment, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Grid,
  Button,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled } from "@mui/material/styles";
import { theme } from "../../../theme";
import BreadcrumbsBar from "../../BreadcrumbsBar";
import SubcategoryProductsSidebar from "./SubcategoryProductsSidebar";
import SubcategoryProductsMain from "./SubcategoryProductsMain";

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

export default function SubcategoryProducts() {
  const params = useParams();
  const [subcategoryId, setSubcategoryId] = useState(params.subcategoryId);

  const [showSidebar, setShowSidebar] = useState(true);
  const [sortCriteria, setSortCriteria] = useState("Newest");
  const isBiggerOrMd = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    setShowSidebar(isBiggerOrMd);
  }, [isBiggerOrMd]);

  function handleOpenSidebar() {
    if (!isBiggerOrMd) {
      setShowSidebar((prev) => !prev);
    }
  }

  function handleSortCriteria(newCriteria) {
    setSortCriteria(newCriteria);
  }

  const MainWrapper = styled(Box)({
    width: "80%",
    margin: "auto",
    marginTop: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      width: "95%",
    },
  });

  const SidebarHolder = styled(Box)({
    display: showSidebar ? "block" : "none",
  });

  const FiltersButton = styled(Box)({
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  });

  const HeadingHolder = styled(Box)({
    display: "flex",
    gap: 10,
    marginBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
    alignItems: "center",
  });

  const ButtonsHolder = styled(Box)({
    display: "flex",
    gap: 10,
    [theme.breakpoints.up("md")]: {
      marginLeft: "18%",
    },
  });

  const FiltersHeading = styled(Typography)({
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  });

  return (
    <Fragment>
      <BreadcrumbsBar breadcrumbsItems={breadcrumbs} />
      <MainWrapper>
        <Box>
          <Box>
            <HeadingHolder>
              <FiltersHeading variant="h5">FILTERS</FiltersHeading>
              <ButtonsHolder>
                <TextField
                  sx={{ width: "150px" }}
                  select
                  label="Sort products"
                  defaultValue={sortCriteria}
                  variant="filled"
                  size="small"
                  onChange={(e) => handleSortCriteria(e.target.value)}
                >
                  <MenuItem value="Newest">Newest</MenuItem>
                  <MenuItem value="Price low to high">
                    Price low to high
                  </MenuItem>
                  <MenuItem value="Price high to low">
                    Price high to low
                  </MenuItem>
                  <MenuItem value="Rating (descending)">
                    Rating (descending)
                  </MenuItem>
                  <MenuItem value="% discount">% discount</MenuItem>
                </TextField>
                {!isBiggerOrMd ? (
                  <FiltersButton>
                    <Button
                      size="large"
                      variant="contained"
                      onClick={handleOpenSidebar}
                    >
                      Filters
                    </Button>
                  </FiltersButton>
                ) : (
                  <></>
                )}
              </ButtonsHolder>
            </HeadingHolder>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <SidebarHolder>
                <SubcategoryProductsSidebar />
              </SidebarHolder>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={9}
              lg={9}
              sx={{ position: "relative" }}
            >
              <SubcategoryProductsMain />
            </Grid>
          </Grid>
        </Box>
      </MainWrapper>
    </Fragment>
  );
}
