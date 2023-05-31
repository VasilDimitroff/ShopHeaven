import { React, useState, Fragment, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Grid,
  Button,
  Paper,
  Rating,
  Checkbox,
  Chip,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Cancel, Search } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { theme } from "../../../theme";
import BreadcrumbsBar from "../../common/BreadcrumbsBar";
import AppPagination from "../../common/AppPagination";
import CircleLoader from "../../common/CircleLoader";
import ProductCarouselCard from "../products-carousel/ProductCarouselCard";
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
  eighthGroupProductPriceRange,
  initialRatingFilterValue,
  oneStarRatingValue,
  twoStarsRatingValue,
  threeStarsRatingValue,
  fourStarsRatingValue,
  fiveStarsRatingValue,
  sortByNewest,
  sortByPriceAscending,
  sortByPriceDescending,
  sortByDiscountPercentDescending,
  sortByRating,
  maxApplicationPrice,
} from "../../../constants";
import { ApiEndpoints } from "../../../api/endpoints";
import axios from "../../../api/axios";

export default function SubcategoryProducts() {
  //time during user type data
  const [timer, setTimer] = useState(0);

  //data states
  const params = useParams();

  const [products, setProducts] = useState();
  const [category, setCategory] = useState({});
  const [subcategory, setSubcategory] = useState({ id: params.subcategoryId });

  //show sidebar state (for mobile devices)
  const [showSidebar, setShowSidebar] = useState(true);

  //sort products by criteria
  const [sortCriteria, setSortCriteria] = useState(""); // string

  //is screen size bigger than or middle
  const isBiggerOrMd = useMediaQuery(theme.breakpoints.up("md"));

  //is request loading
  const [isLoading, setIsLoading] = useState(false);

  //is search field on focus
  const [isSearchFieldOnFocus, setIsSearchFieldInFocus] = useState(false);

  //current page with records - pagination states
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(10);
  const [totalProductsCount, setTotalProductsCount] = useState(0);

  //filters
  const [filters, setFilters] = useState({
    availabilityFilterChecked: false, // true/false
    priceRange: maxProductPriceRangeGroup, // "0-5000000" as string
    rating: initialRatingFilterValue, // 0
    searchTerm: "",
  });

  //inputRefs
  const searchInputRef = useRef();
  const sortingRef = useRef();

  //for request
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

    const getProducts = async () => {
      try {
        setIsLoading(true);

        let pricesArray = filters.priceRange.split(" - ");
        let lowestPrice = parseFloat(pricesArray[0].trim());
        let highestPrice = null;

        if (filters.priceRange === eighthGroupProductPriceRange) {
          highestPrice = parseFloat(maxApplicationPrice.trim());
        } else {
          highestPrice = parseFloat(pricesArray[1].trim());
        }

        let pagingModel = {
          recordsPerPage: productsPerPageInSubCategoryPage,
          page: page,
          searchTerm: filters.searchTerm,
          sortingCriteria: sortCriteria,
          subcategoryId: params.subcategoryId,
          inStock: filters.availabilityFilterChecked,
          rating: filters.rating,
          lowestPrice: lowestPrice,
          highestPrice: highestPrice,
        };

        console.log("REQUIEST ", pagingModel);

        const response = await axios.post(
          ApiEndpoints.products.getBySubcategoryId,
          pagingModel,
          {
            signal: controller.signal,
          }
        );

        //console.log(response?.data);

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
  }, [page, filters, sortCriteria, params]);

  function onSearchProduct(e) {
    e.preventDefault();
    setIsSearchFieldInFocus(true);
    let searchValue = searchInputRef.current.value;

    if (!searchValue.trim()) {
      searchValue = "";
    }

    setFilters((prev) => {
      return {
        ...prev,
        searchTerm: searchValue,
      };
    });

    setTimer(requestTimerMilliseconds);
  }

  function clearSearchValues() {
    searchInputRef.current.value = "";
    setFilters((prev) => {
      return {
        ...prev,
        searchTerm: "",
      };
    });

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
    let sortingCriteria = sortingRef.current.value;
    setSortCriteria(sortingCriteria);
  }

  function handleAvailabilityChecked(e) {
    let availabilityValue = e.target.value === "true" ? true : false;

    if (filters.availabilityFilterChecked) {
      availabilityValue = false;
    }
    setFilters((prev) => {
      return {
        ...prev,
        availabilityFilterChecked: availabilityValue,
      };
    });
  }

  function handlePriceRangeChanged(e) {
    let priceRangeRawString = e.target.value;

    if (priceRangeRawString === filters.priceRange) {
      priceRangeRawString = maxProductPriceRangeGroup;
    }

    setFilters((prev) => {
      return {
        ...prev,
        priceRange: priceRangeRawString,
      };
    });
  }

  function handleRatingFilterChanged(e) {
    let ratingFilterValue = parseInt(e.target.value);

    if (ratingFilterValue == filters.rating) {
      ratingFilterValue = initialRatingFilterValue;
    }

    setFilters((prev) => {
      return {
        ...prev,
        rating: ratingFilterValue,
      };
    });
  }

  function handleDeleteInStockFilter() {
    setFilters((prev) => {
      return {
        ...prev,
        availabilityFilterChecked: false,
      };
    });
  }

  function handleDeletePriceRangeFilter() {
    setFilters((prev) => {
      return {
        ...prev,
        priceRange: maxProductPriceRangeGroup,
      };
    });
  }

  function handleDeleteRatingFilter() {
    setFilters((prev) => {
      return {
        ...prev,
        rating: initialRatingFilterValue,
      };
    });
  }

  function handleDeleteSearchTerm() {
    setFilters((prev) => {
      return {
        ...prev,
        searchTerm: "",
      };
    });
  }

  const StyledSelect = {
    cursor: "pointer",
    width: "100%",
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    border: "1px solid #C6BFBE",
    textTransform: "uppercase",
    fontSize: 14,
    backgroundColor: "rgb(255,249,249)",
  };

  const PaginationHolder = styled(Box)({
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(1),
  });

  const ContentWrapper = styled(Box)({
    width: "80%",
    margin: "auto",
    display: "block",
    marginTop: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      width: "95%",
    },
  });

  const FiltersButton = styled(Box)({
    marginTop: theme.spacing(1),
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
      // marginLeft: "18%",
    },
  });

  const FiltersHeading = styled(Box)({
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  });

  const StyledPaper = styled(Paper)({
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(0),
  });

  const ProductsWrapper = styled(Box)({
    width: "100%",
    margin: "auto",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  });

  const SubheadingChip = styled(Chip)({
    fontSize: 14,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  });

  const HeadingChip = styled(Chip)({
    fontSize: 22,
    padding: theme.spacing(2.2),
    fontWeight: 500,
    width: "100%",
    borderRadius: theme.shape.borderRadius,
  });

  const CancelButton = styled(Cancel)({
    position: "absolute",
    right: 5,
    top: -30,
    zIndex: 1,
    "&:hover": {
      color: theme.palette.primary.main,
      cursor: "pointer",
    },
  });

  const StyledSearchIcon = styled(Search)({
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    fontSize: "40px",
    position: "absolute",
    zIndex: 1,
  });

  const Heading = styled(Typography)({
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: 30,
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(-2),
  });

  return (
    <Fragment>
      <BreadcrumbsBar breadcrumbsItems={breadcrumbs} />
      <ContentWrapper>
        <Heading>
          {subcategory.name} - {totalProductsCount} PRODUCTS
        </Heading>
        <Box>
          <Box>
            <HeadingHolder>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={3} lg={3}>
                  <FiltersHeading>
                    <HeadingChip
                      label="FILTERS"
                      variant="filled"
                      color="secondary"
                    />
                  </FiltersHeading>
                </Grid>
                <Grid item xs={12} sm={12} md={9} lg={9}>
                  <ButtonsHolder>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={12} md={8} lg={8}>
                        <StyledSearchIcon />
                        <input
                          style={{
                            width: "100%",
                            border: "1px solid #C6BFBE",
                            backgroundColor: "rgb(255,249,249)",
                            padding: theme.spacing(0.65),
                            paddingLeft: theme.spacing(5),
                            borderRadius: theme.shape.borderRadius,
                          }}
                          onChange={(e) => onSearchProduct(e)}
                          defaultValue={filters.searchTerm}
                          ref={searchInputRef}
                          id="search-product"
                          autoFocus={isSearchFieldOnFocus}
                          placeholder="Search product by name or brand..."
                        />
                        <Box sx={{ position: "relative" }}>
                          <CancelButton onClick={clearSearchValues} />
                        </Box>
                      </Grid>

                      <Grid item xs={12} sm={12} md={4} lg={4}>
                        <select
                          onChange={handleSortCriteria}
                          defaultValue={sortCriteria}
                          style={StyledSelect}
                          ref={sortingRef}
                          id="sort-products"
                          name="sortCriteria"
                        >
                          <option value="">{"--- SORT ---"}</option>
                          <option value={sortByNewest}>{"NEWEST"}</option>
                          <option value={sortByPriceAscending}>
                            {"PRICE: LOWEST FIRST"}
                          </option>
                          <option value={sortByPriceDescending}>
                            {"PRICE: HIGHEST FIRST"}
                          </option>
                          <option value={sortByDiscountPercentDescending}>
                            {"% DISCOUNT"}
                          </option>
                          <option value={sortByRating}>{"RATING"}</option>
                        </select>
                      </Grid>
                    </Grid>
                  </ButtonsHolder>

                  {!isBiggerOrMd ? (
                    <FiltersButton>
                      <Button
                        sx={{ width: "100%" }}
                        size="small"
                        color="secondary"
                        variant="contained"
                        onClick={handleOpenSidebar}
                      >
                        {showSidebar ? "HIDE FILTERS" : "SHOW FILTERS"}
                      </Button>
                    </FiltersButton>
                  ) : (
                    <></>
                  )}
                </Grid>
              </Grid>
            </HeadingHolder>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <Box sx={{ display: showSidebar ? "block" : "none" }}>
                <StyledPaper>
                  <Divider>
                    <SubheadingChip
                      label="IN STOCK"
                      variant="filled"
                      color="primary"
                    />
                  </Divider>
                  <form>
                    <Grid>
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
                        <label htmlFor="instock">In Stock only</label>
                      </Grid>
                    </Grid>
                  </form>
                  <Divider>
                    <SubheadingChip
                      label="PRICE RANGE"
                      variant="filled"
                      color="primary"
                    />
                  </Divider>
                  <form>
                    <Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Checkbox
                          size="medium"
                          checked={
                            filters.priceRange === firstGroupProductPriceRange
                          }
                          onChange={handlePriceRangeChanged}
                          type="checkbox"
                          id="price-range-1"
                          name="price-range"
                          value={firstGroupProductPriceRange}
                        />
                        <label htmlFor="price-range-1">
                          {firstGroupProductPriceRange}
                        </label>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Checkbox
                          size="medium"
                          checked={
                            filters.priceRange === secondGroupProductPriceRange
                          }
                          onChange={handlePriceRangeChanged}
                          type="checkbox"
                          id="price-range-2"
                          name="price-range"
                          value={secondGroupProductPriceRange}
                        />
                        <label htmlFor="price-range-2">
                          {secondGroupProductPriceRange}
                        </label>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Checkbox
                          size="medium"
                          checked={
                            filters.priceRange === thirdGroupProductPriceRange
                          }
                          onChange={handlePriceRangeChanged}
                          type="checkbox"
                          id="price-range-3"
                          name="price-range"
                          value={thirdGroupProductPriceRange}
                        />
                        <label htmlFor="price-range-3">
                          {thirdGroupProductPriceRange}
                        </label>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Checkbox
                          size="medium"
                          checked={
                            filters.priceRange === forthGroupProductPriceRange
                          }
                          onChange={handlePriceRangeChanged}
                          type="checkbox"
                          id="price-range-4"
                          name="price-range"
                          value={forthGroupProductPriceRange}
                        />
                        <label htmlFor="price-range-4">
                          {forthGroupProductPriceRange}
                        </label>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Checkbox
                          size="medium"
                          checked={
                            filters.priceRange === fifthGroupProductPriceRange
                          }
                          onChange={handlePriceRangeChanged}
                          type="checkbox"
                          id="price-range-5"
                          name="price-range"
                          value={fifthGroupProductPriceRange}
                        />
                        <label htmlFor="price-range-5">
                          {fifthGroupProductPriceRange}
                        </label>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Checkbox
                          size="medium"
                          checked={
                            filters.priceRange === sixthGroupProductPriceRange
                          }
                          onChange={handlePriceRangeChanged}
                          type="checkbox"
                          id="price-range-6"
                          name="price-range"
                          value={sixthGroupProductPriceRange}
                        />
                        <label htmlFor="price-range-6">
                          {sixthGroupProductPriceRange}
                        </label>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Checkbox
                          size="medium"
                          checked={
                            filters.priceRange === seventhGroupProductPriceRange
                          }
                          onChange={handlePriceRangeChanged}
                          type="checkbox"
                          id="price-range-7"
                          name="price-range"
                          value={seventhGroupProductPriceRange}
                        />
                        <label htmlFor="price-range-7">
                          {seventhGroupProductPriceRange}
                        </label>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Checkbox
                          size="medium"
                          checked={
                            filters.priceRange === eighthGroupProductPriceRange
                          }
                          onChange={handlePriceRangeChanged}
                          type="checkbox"
                          id="price-range-8"
                          name="price-range"
                          value={eighthGroupProductPriceRange}
                        />
                        <label htmlFor="price-range-8">
                          {eighthGroupProductPriceRange}
                        </label>
                      </Grid>
                    </Grid>
                  </form>

                  <Divider>
                    <SubheadingChip
                      label="RATING"
                      variant="filled"
                      color="primary"
                    />
                  </Divider>
                  <form>
                    <Grid>
                      <Grid
                        sx={{ display: "flex", alignItems: "center" }}
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                      >
                        <Checkbox
                          size="medium"
                          checked={filters.rating === fiveStarsRatingValue}
                          onChange={handleRatingFilterChanged}
                          type="checkbox"
                          id="rating-5"
                          name="rating-filter"
                          value={fiveStarsRatingValue}
                        />
                        <Rating readOnly value={5} size="small" />
                        (5)
                      </Grid>
                      <Grid
                        sx={{ display: "flex", alignItems: "center" }}
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                      >
                        <Checkbox
                          size="medium"
                          checked={filters.rating === fourStarsRatingValue}
                          onChange={handleRatingFilterChanged}
                          type="checkbox"
                          id="rating-4"
                          name="rating-filter"
                          value={fourStarsRatingValue}
                        />
                        <Rating readOnly value={4} size="small" />
                        (4)
                      </Grid>
                      <Grid
                        sx={{ display: "flex", alignItems: "center" }}
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                      >
                        <Checkbox
                          size="medium"
                          checked={filters.rating === threeStarsRatingValue}
                          onChange={handleRatingFilterChanged}
                          type="checkbox"
                          id="rating-3"
                          name="rating-filter"
                          value={threeStarsRatingValue}
                        />
                        <Rating readOnly value={3} size="small" />
                        (3)
                      </Grid>
                      <Grid
                        sx={{ display: "flex", alignItems: "center" }}
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                      >
                        <Checkbox
                          size="medium"
                          checked={filters.rating === twoStarsRatingValue}
                          onChange={handleRatingFilterChanged}
                          type="checkbox"
                          id="rating-2"
                          name="rating-filter"
                          value={twoStarsRatingValue}
                        />
                        <Rating readOnly value={2} size="small" />
                        (2)
                      </Grid>
                      <Grid
                        sx={{ display: "flex", alignItems: "center" }}
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                      >
                        <Checkbox
                          size="medium"
                          checked={filters.rating === oneStarRatingValue}
                          onChange={handleRatingFilterChanged}
                          type="checkbox"
                          id="rating-1"
                          name="rating-filter"
                          value={oneStarRatingValue}
                        />
                        <Rating readOnly value={1} size="small" />
                        (1)
                      </Grid>
                    </Grid>
                  </form>
                </StyledPaper>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={9}
              lg={9}
              sx={{ position: "relative" }}
            >
              {isLoading ? (
                <CircleLoader />
              ) : (
                <Fragment>
                  <Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      {filters.searchTerm ||
                      filters.availabilityFilterChecked ||
                      filters.priceRange !== maxProductPriceRangeGroup ||
                      filters.rating != initialRatingFilterValue ? (
                        <Typography
                          sx={{
                            mr: 1,
                            mb: 1,
                            display: isBiggerOrMd ? "inline" : "block",
                          }}
                        >
                          Filters applied:
                        </Typography>
                      ) : (
                        <></>
                      )}
                      {filters.searchTerm ? (
                        <Chip
                          sx={{ fontWeight: 500, mr: 1, mb: 1 }}
                          label={`Keyword: ${filters.searchTerm.toUpperCase()}`}
                          color="secondary"
                          variant="outlined"
                          onDelete={handleDeleteSearchTerm}
                        />
                      ) : (
                        <></>
                      )}
                      {filters.availabilityFilterChecked ? (
                        <Chip
                          sx={{ fontWeight: 500, mr: 1, mb: 1 }}
                          label="IN STOCK"
                          color="secondary"
                          variant="outlined"
                          onDelete={handleDeleteInStockFilter}
                        />
                      ) : (
                        <></>
                      )}
                      {filters.priceRange != maxProductPriceRangeGroup ? (
                        <Chip
                          sx={{ fontWeight: 500, mr: 1, mb: 1 }}
                          label={`PRICE RANGE: ${filters.priceRange}`}
                          color="secondary"
                          variant="outlined"
                          onDelete={handleDeletePriceRangeFilter}
                        />
                      ) : (
                        <></>
                      )}
                      {filters.rating ? (
                        <Chip
                          sx={{ fontWeight: 500, mr: 1, mb: 1 }}
                          label={`RATING: ${
                            filters.rating !== fiveStarsRatingValue
                              ? `ABOVE ${filters.rating}`
                              : `${filters.rating}`
                          }`}
                          color="secondary"
                          variant="outlined"
                          onDelete={handleDeleteRatingFilter}
                        />
                      ) : (
                        <></>
                      )}
                    </Grid>
                  </Grid>
                  <ProductsWrapper>
                    <Grid
                      container
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        flexGrow: 1,
                      }}
                    >
                      {products?.map((product, index) => (
                        <Grid
                          item
                          xs={12}
                          sm={4}
                          md={6}
                          lg={4}
                          xl={3}
                          sx={{
                            display: "block",
                            marginBottom: theme.spacing(2),
                          }}
                          key={index}
                        >
                          <ProductCarouselCard product={product} />
                        </Grid>
                      ))}
                    </Grid>
                  </ProductsWrapper>
                  <PaginationHolder>
                    <AppPagination
                      setPage={setPage}
                      page={page}
                      numberOfPages={numberOfPages}
                    />
                  </PaginationHolder>
                </Fragment>
              )}
            </Grid>
          </Grid>
        </Box>
      </ContentWrapper>
    </Fragment>
  );
}
