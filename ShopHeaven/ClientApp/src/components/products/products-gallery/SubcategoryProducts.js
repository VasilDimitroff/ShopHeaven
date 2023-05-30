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
  Collapse,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled } from "@mui/material/styles";
import { theme } from "../../../theme";
import BreadcrumbsBar from "../../common/BreadcrumbsBar";
import AppPagination from "../../common/AppPagination";
import SubcategoryProductsSidebar from "./SubcategoryProductsSidebar";
import SubcategoryProductsMain from "./SubcategoryProductsMain";
import {
  productsPerPageInSubCategoryPage,
  requestTimerMilliseconds,
  allCategoriesUrl,
  subcategoryProductsBaseUrl,
  maxProductPriceRangeGroup,
  firstGroupProductPriceRange,
  secondGroupProductPriceRange,
  thirdGroupProductPriceRange,
  forthGroupProductPriceRange,
  fifthGroupProductPriceRange,
  sixthGroupProductPriceRange,
  seventhGroupProductPriceRange,
  eighthGroupProductPriceRange
} from "../../../constants";
import { ApiEndpoints } from "../../../api/endpoints";
import axios from "../../../api/axios";

export default function SubcategoryProducts() {
  //data states
  const params = useParams();
  const [products, setProducts] = useState();
  const [category, setCategory] = useState({});
  const [subcategory, setSubcategory] = useState({ id: params.subcategoryId });

  //show sidebar state (for mobile devices)
  const [showSidebar, setShowSidebar] = useState(true);

  //sort products by criteria
  const [sortCriteria, setSortCriteria] = useState("Newest");

  //is screen size bigger than or middle
  const isBiggerOrMd = useMediaQuery(theme.breakpoints.up("md"));

  //is request loading
  const [isLoading, setIsLoading] = useState(false);

  //time during user type data
  const [timer, setTimer] = useState(0);

  //current page with records - pagination states
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(10);
  const [totalProductsCount, setTotalProductsCount] = useState(0);

  //inputRefs
  const searchInputRef = useRef();

  //filters
  const [filters, setFilters] = useState({
    availabilityFilterChecked: false, // bool
    priceRange: maxProductPriceRangeGroup, // "101-500"
  });


  const [searchTerm, setSearchTerm] = useState("");

  const effectRun = useRef(false);

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
   
    const lowestPrice = filters.priceRange.split(" -")[0];
    const highestPrice = filters.priceRange.split(" - ")[1]

    console.log("TUKA GLEDASH - LOW", lowestPrice)
    console.log("TUKA GLEDASH - HIGH", highestPrice)
    const getProducts = async () => {
      try {
        setIsLoading(true);

        let pagingModel = {
          recordsPerPage: productsPerPageInSubCategoryPage,
          page: page,
          searchTerm: "",
          subcategoryId: subcategory.id,
          inStock: filters.availabilityFilterChecked,
          lowestPrice: parseFloat(lowestPrice.trim()),
          highestPrice: parseFloat(highestPrice.trim())
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
        setTotalProductsCount(response?.data?.productsCount);

        if (page > response?.data?.pagesCount) {
          setPage(1);
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
  }, [page, searchTerm, filters]);

  function onSearchProduct(e) {
    e.preventDefault();

    //get data from input redst inputRef.Current.Value and validate it
    let searchValue = searchInputRef.current.value;

    setSearchTerm(searchValue);
    setTimer(requestTimerMilliseconds);
  }

  function clearSearchValues() {
    //clear inputs refs
    setSearchTerm("");
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

  function handleAvailabilityChecked(e) {
    const availabilityValue = e.target.value === "true" ? true : false;
    setFilters(prev => {
      return {
        ...prev,
        availabilityFilterChecked: availabilityValue
      }
    });
    console.log(e.target.value);
  }

  function handlePriceRangeChanged(e) {
    const priceRangeRawString = e.target.value;
    setFilters(prev => {
      return {
        ...prev,
        priceRange: priceRangeRawString
      }
    });
  }

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

                    <form>
                      <Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <Checkbox
                            size="medium"
                            checked={filters.availabilityFilterChecked === false}
                            onChange={handleAvailabilityChecked}
                            type="checkbox"
                            id="all"
                            name="availability"
                            value={false}
                          />
                          <label htmlFor="all">All</label>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <Checkbox
                            size="medium"
                            checked={filters.availabilityFilterChecked === true}
                            onChange={handleAvailabilityChecked}
                            type="checkbox"
                            id="instock"
                            name="availability"
                            value={true}
                          />
                          <label htmlFor="instock">In Stock</label>
                        </Grid>
                      </Grid>
                    </form>
                  </StyledPaper>
                  <StyledPaper>
                    <Typography variant="h6">Price Range</Typography>
                    <form>
                      <Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                          <Checkbox
                            size="medium"
                            checked={filters.priceRange === maxProductPriceRangeGroup}
                            onChange={handlePriceRangeChanged}
                            type="checkbox"
                            id="price-range-0"
                            name="price-range"
                            value={maxProductPriceRangeGroup}
                          />
                          <label htmlFor="price-range-0">All prices</label>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <Checkbox
                            size="medium"
                            checked={filters.priceRange === firstGroupProductPriceRange}
                            onChange={handlePriceRangeChanged}
                            type="checkbox"
                            id="price-range-1"
                            name="price-range"
                            value={firstGroupProductPriceRange}
                          />
                          <label htmlFor="price-range-1">{firstGroupProductPriceRange}</label>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <Checkbox
                            size="medium"
                            checked={filters.priceRange === secondGroupProductPriceRange}
                            onChange={handlePriceRangeChanged}
                            type="checkbox"
                            id="price-range-2"
                            name="price-range"
                            value={secondGroupProductPriceRange}
                          />
                          <label htmlFor="price-range-2">{secondGroupProductPriceRange}</label>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <Checkbox
                            size="medium"
                            checked={filters.priceRange === thirdGroupProductPriceRange}
                            onChange={handlePriceRangeChanged}
                            type="checkbox"
                            id="price-range-3"
                            name="price-range"
                            value={thirdGroupProductPriceRange}
                          />
                          <label htmlFor="price-range-3">{thirdGroupProductPriceRange}</label>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <Checkbox
                            size="medium"
                            checked={filters.priceRange === forthGroupProductPriceRange}
                            onChange={handlePriceRangeChanged}
                            type="checkbox"
                            id="price-range-4"
                            name="price-range"
                            value={forthGroupProductPriceRange}
                          />
                          <label htmlFor="price-range-4">{forthGroupProductPriceRange}</label>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <Checkbox
                            size="medium"
                            checked={filters.priceRange === fifthGroupProductPriceRange}
                            onChange={handlePriceRangeChanged}
                            type="checkbox"
                            id="price-range-5"
                            name="price-range"
                            value={fifthGroupProductPriceRange}
                          />
                          <label htmlFor="price-range-5">{fifthGroupProductPriceRange}</label>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <Checkbox
                            size="medium"
                            checked={filters.priceRange === sixthGroupProductPriceRange}
                            onChange={handlePriceRangeChanged}
                            type="checkbox"
                            id="price-range-6"
                            name="price-range"
                            value={sixthGroupProductPriceRange}
                          />
                          <label htmlFor="price-range-6">{sixthGroupProductPriceRange}</label>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <Checkbox
                            size="medium"
                            checked={filters.priceRange === seventhGroupProductPriceRange}
                            onChange={handlePriceRangeChanged}
                            type="checkbox"
                            id="price-range-7"
                            name="price-range"
                            value={seventhGroupProductPriceRange}
                          />
                          <label htmlFor="price-range-7">{seventhGroupProductPriceRange}</label>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <Checkbox
                            size="medium"
                            checked={filters.priceRange === eighthGroupProductPriceRange}
                            onChange={handlePriceRangeChanged}
                            type="checkbox"
                            id="price-range-8"
                            name="price-range"
                            value={eighthGroupProductPriceRange}
                          />
                          <label htmlFor="price-range-8">{eighthGroupProductPriceRange}</label>
                        </Grid>
                      </Grid>
                    </form>
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
                  <ApplyFiltersButton variant="contained">
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
