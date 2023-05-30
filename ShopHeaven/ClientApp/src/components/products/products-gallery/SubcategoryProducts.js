import { React, useState, Fragment, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Grid,
  Button,
  TextField,
  MenuItem,
  Typography,
  Paper,
  Switch,
  FormGroup,
  Rating,
  FormControlLabel,
  Checkbox,
  Stack,
  Collapse
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled } from "@mui/material/styles";
import { theme } from "../../../theme";
import BreadcrumbsBar from "../../common/BreadcrumbsBar";
import AppPagination from "../../common/AppPagination";
import SubcategoryProductsSidebar from "./SubcategoryProductsSidebar";
import SubcategoryProductsMain from "./SubcategoryProductsMain";
import { productsPerPageInSubCategoryPage, requestTimerMilliseconds, allCategoriesUrl, subcategoryProductsBaseUrl } from "../../../constants";
import { ApiEndpoints } from "../../../api/endpoints";
import axios from "../../../api/axios";

export default function SubcategoryProducts() {

  const params = useParams();
  const [subcategoryId, setSubcategoryId] = useState(params.subcategoryId);

  const [showSidebar, setShowSidebar] = useState(true);
  const [sortCriteria, setSortCriteria] = useState("Newest");
  const isBiggerOrMd = useMediaQuery(theme.breakpoints.up("md"));

  const [isLoading, setIsLoading] = useState(false);

  const [timer, setTimer] = useState(0);

  //current page with records
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(10);
  const [totalProductsCount, setTotalProductsCount] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchProductByCategoryId, setSearchProductByCategoryId] =
    useState("");

  const [products, setProducts] = useState();
  const [category, setCategory] = useState({});
  const [subcategory, setSubcategory] = useState({ id: subcategoryId });

  const effectRun = useRef(false);

  const searchInputRef = useRef();
  const categorySearchRef = useRef();

  const breadcrumbs = [
    {
      name: "Home",
      uri: "/",
    },
    {
      name: "Categories",
      uri: `${allCategoriesUrl}`,
    },
    {
      name: `${subcategory.name}`,
      uri: `${subcategoryProductsBaseUrl}${subcategory.id}`,
    },
  ];

  useEffect(() => {
    let timeoutId;

    const controller = new AbortController();

    const getProducts = async () => {
      try {
        setIsLoading(true);

        let pagingModel = {
          recordsPerPage: productsPerPageInSubCategoryPage,
          page: page,
          searchTerm: "",
          subcategoryId: subcategoryId,
        };

        console.log("REQUIEST ", pagingModel);

        const response = await axios.post(
          ApiEndpoints.products.getBySubcategoryId,
          pagingModel,
          {
            signal: controller.signal,
          }
        );

        console.log(response?.data);

        setProducts(response?.data?.products);
        setCategory(response?.data?.category);
        setSubcategory(response?.data?.subcategory);
        setNumberOfPages(response?.data?.pagesCount);
        setTotalProductsCount(response?.data?.productsCount)  

        if (page > response?.data?.pagesCount) {
          setPage(1)
        }

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    const delayGetProductsRequest = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (effectRun.current) {
          getProducts();
        }
      }, timer); 
    };

    delayGetProductsRequest();

    return () => {
      effectRun.current = true; // update the value of effectRun to true
      controller.abort();
      clearTimeout(timeoutId);
      setTimer(0);
    };
  }, [page, searchTerm, searchProductByCategoryId]);




  function onSearchProduct(e) {
    e.preventDefault();

    let searchValue = searchInputRef.current.value;
    let categoryId = categorySearchRef.current.value;

    if (!searchValue.trim()) {
      searchValue = "";
    }

    if (!categoryId.trim()) {
      categoryId = "";
    }
    setSearchTerm(searchValue);
    setSearchProductByCategoryId(categoryId);
    setTimer(requestTimerMilliseconds);
  }

  function clearSearchValues() {
    searchInputRef.current.value = "";
    categorySearchRef.current.value = "";
    setSearchTerm("");
    setSearchProductByCategoryId("");
    setPage(1);
  }

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

  function applyFilters() {}

  const PaginationHolder = styled(Box)({
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(1),
  });

  const MainWrapper = styled(Box)({
    width: "80%",
    margin: "auto",
    marginTop: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      width: "95%",
    },
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

  const StyledPaper = styled(Paper)({
    padding: theme.spacing(2),
  });

  const RatingHolder = styled(Box)({
    display: "flex",
    alignItems: "center",
  });

  const ApplyFiltersButton = styled(Button)({
    width: "100%",
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
              <Collapse in={showSidebar}>
                <Stack spacing={2}>
                  <StyledPaper>
                    <Typography variant="h6">In Stock</Typography>
                    <Switch defaultChecked />
                  </StyledPaper>
                  <StyledPaper>
                    <Typography variant="h6">Price Range</Typography>
                    <FormGroup>
                      <FormControlLabel control={<Checkbox />} label="1-50" />
                      <FormControlLabel control={<Checkbox />} label="51-100" />
                      <FormControlLabel
                        control={<Checkbox />}
                        label="100-200"
                      />
                      <FormControlLabel
                        control={<Checkbox />}
                        label="200-500"
                      />
                      <FormControlLabel
                        control={<Checkbox />}
                        label="500-1000"
                      />
                      <FormControlLabel
                        control={<Checkbox />}
                        label="1000-1500"
                      />
                      <FormControlLabel
                        control={<Checkbox />}
                        label="1500-2000"
                      />
                      <FormControlLabel control={<Checkbox />} label="2000+" />
                    </FormGroup>
                  </StyledPaper>
                  <StyledPaper>
                    <Typography variant="h6">Rating</Typography>
                    <RatingHolder>
                      <FormControlLabel label="5" control={<Checkbox />} />
                      <Rating readOnly value={5} size="small" />
                    </RatingHolder>
                    <RatingHolder>
                      <FormControlLabel label="4" control={<Checkbox />} />
                      <Rating readOnly value={4} size="small" />
                    </RatingHolder>
                    <RatingHolder>
                      <FormControlLabel label="3" control={<Checkbox />} />
                      <Rating readOnly value={3} size="small" />
                    </RatingHolder>
                    <RatingHolder>
                      <FormControlLabel label="2" control={<Checkbox />} />
                      <Rating readOnly value={2} size="small" />
                    </RatingHolder>
                    <RatingHolder>
                      <FormControlLabel label="1" control={<Checkbox />} />
                      <Rating readOnly value={1} size="small" />
                    </RatingHolder>
                  </StyledPaper>
                  <ApplyFiltersButton
                    onClick={applyFilters}
                    variant="contained"
                  >
                    APPLY FILTERS
                  </ApplyFiltersButton>
                </Stack>
              </Collapse>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={9}
              lg={9}
              sx={{ position: "relative" }}
            >
              <SubcategoryProductsMain products={products} />
              <PaginationHolder>
                <AppPagination
                  setPage={setPage}
                  page={page}
                  numberOfPages={numberOfPages}
                />
              </PaginationHolder>
            </Grid>
          </Grid>
        </Box>
      </MainWrapper>
    </Fragment>
  );
}
