import { React, useState, useEffect, useRef, Fragment } from "react";
import {
  Box,
  Button,
  TableRow,
  TableCell,
  Collapse,
  Table,
  TableBody,
  TableHead,
  TableContainer,
  Grid,
  Typography,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../../theme";
import { RemoveCircle, AddCircle, Search, Cancel } from "@mui/icons-material";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import { ApiEndpoints } from "../../../api/endpoints";
import { productsPerPageInAdminPanel, requestTimerMilliseconds, productsSortingCriteriaInAdminProductsPanel, loginPath } from "../../../constants";
import CreateProduct from "./CreateProduct";
import AdminProductRow from "./AdminProductRow";
import AppPagination from "../../common/AppPagination";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "../../common/Loader";

export default function AdminProducts() {
  const [showCreateProduct, setShowCreateProduct] = useState(false);
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
  const [categories, setCategories] = useState([]);

  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  const effectRun = useRef(false);

  const searchInputRef = useRef();
  const categorySearchRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let timeoutId;

    const controller = new AbortController();

    const getProducts = async () => {
      try {
        setIsLoading(true);

        let pagingModel = {
          userId: auth.userId,
          recordsPerPage: productsPerPageInAdminPanel,
          page: page,
          searchTerm: searchTerm,
          categoryId: searchProductByCategoryId,
          sortingCriteria: productsSortingCriteriaInAdminProductsPanel
        };

        console.log("REQUIEST ", pagingModel);

        const response = await axiosPrivate.post(
          ApiEndpoints.products.getAllWithCreationInfo,
          pagingModel,
          {
            signal: controller.signal,
          }
        );

        console.log(response?.data);

        setNumberOfPages(response?.data?.pagesCount);
        setTotalProductsCount(response?.data?.productsCount)  
        setCategories(response?.data?.categories);
        setProducts(response?.data?.products);


        if (page > response?.data?.pagesCount) {
          setPage(1)
        }

        setIsLoading(false);
      } catch (error) {
        console.log(error);
        navigate(`${loginPath}`, { state: { from: location }, replace: true });
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


  useEffect(() => {
    setPage(1);
  }, [searchTerm,searchProductByCategoryId])

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

  function handleShowCreateProduct() {
    setShowCreateProduct((prev) => !prev);
  }

  function productListChanged(newProduct) {
    setProducts((prev) => [...prev, newProduct]);
  }

  const MainCategoryTableCell = styled(TableCell)({
    fontSize: 18,
  });

  const StyledButtonBox = styled(Box)({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  });

  const PaginationHolder = styled(Box)({
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(1),
  });

  const StyledSelect = {
    cursor: "pointer",
    width: "100%",
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    border: "1px solid #C6BFBE",
    textTransform: "uppercase",
    fontSize: 14,
  };

  const CancelButton = styled(Cancel)({
    position: "absolute",
    right: 5,
    top: 22,
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

  return (
    <Box>
      <form>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={8}
            md={9}
            lg={9}
            sx={{ position: "relative" }}
          >
            <StyledSearchIcon />
            <input
              style={{position: "relative",
              width: "100%",
              border: "1px solid #C6BFBE",
              backgroundColor: "rgb(255,249,249)",
              padding: theme.spacing(0.65),
              paddingLeft: theme.spacing(5),
              borderRadius: theme.shape.borderRadius,}}
              onChange={onSearchProduct}
              defaultValue={searchTerm}
              ref={searchInputRef}
              placeholder="Search product by name or brand..."
            />
            <CancelButton onClick={clearSearchValues} />
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={3}>
            <select
              onChange={onSearchProduct}
              defaultValue={searchProductByCategoryId}
              style={StyledSelect}
              ref={categorySearchRef}
              name="category"
            >
              <option value="">{"--- ALL CATEGORIES ---"}</option>
              {categories?.map((cat) => (
                <option key={cat?.id} value={cat?.id}>
                  {cat?.name}
                </option>
              ))}
            </select>
          </Grid>
        </Grid>
      </form>
      {searchTerm || searchProductByCategoryId ? (
        <Alert severity="info" variant="filled" sx={{ mt: 1 }}>
          <Typography>
          <b>{totalProductsCount} results</b> for <b>"{searchTerm ? searchTerm : <></> }"</b>
            {searchProductByCategoryId ? (
              <Fragment>
                {" "} in category {" "}
                <b>
                  {
                    categories?.find((x) => x.id === searchProductByCategoryId)
                      .name
                  }
                </b>
              </Fragment>
            ) : (
              <></>
            )}
            {" "} - <b>Page {page}</b> 
          </Typography>
        </Alert>
      ) : (
        <></>
      )}
      {isLoading ? (
        <Box sx={{ padding: theme.spacing(3) }}>
          <Loader />
        </Box>
      ) : (
        <TableContainer component={Box}>
        <Table>
          <TableHead>
            <TableRow>
              <MainCategoryTableCell></MainCategoryTableCell>
              <MainCategoryTableCell align="center"></MainCategoryTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((product) => {
              return (
                <AdminProductRow
                  key={product.id}
                  categories={categories}
                  product={product}
                />
              );
            })}
          </TableBody>
        </Table>
        <StyledButtonBox>
          {showCreateProduct ? (
            <Button
              onClick={handleShowCreateProduct}
              variant="contained"
              size="big"
              color="secondary"
              startIcon={<RemoveCircle />}
            >
              HIDE CREATION FORM
            </Button>
          ) : (
            <Button
              onClick={handleShowCreateProduct}
              variant="contained"
              size="big"
              color="secondary"
              startIcon={<AddCircle />}
            >
              ADD NEW PRODUCT
            </Button>
          )}
        </StyledButtonBox>
      </TableContainer>
      )}
      <Collapse in={showCreateProduct} timeout="auto" unmountOnExit>
        <CreateProduct
          productListChanged={productListChanged}
          categories={categories}
        />
      </Collapse>
      <PaginationHolder>
        <AppPagination
          setPage={setPage}
          page={page}
          numberOfPages={numberOfPages}
          scroll={true}
        />
      </PaginationHolder>
    </Box>
  );
}
