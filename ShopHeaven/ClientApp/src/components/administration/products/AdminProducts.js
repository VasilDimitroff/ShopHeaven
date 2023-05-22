import { React, useState, Fragment, useEffect, useRef } from "react";
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
  Pagination,
  InputBase,
  IconButton,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { theme } from "../../../theme";
import { RemoveCircle, AddCircle, Search, Cancel } from "@mui/icons-material";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { ApiEndpoints } from "../../../api/endpoints";
import CreateProduct from "./CreateProduct";
import ProductRow from "./ProductRow";
import { useNavigate, useLocation } from "react-router-dom";

export default function AdminProducts() {
  const [showCreateProduct, setShowCreateProduct] = useState(false);

  const [products, setProducts] = useState();
  const [categories, setCategories] = useState([]);
  const [currencies, setCurrencies] = useState([]);

  const axiosPrivate = useAxiosPrivate();

  const effectRun = useRef(false);

  const searchInputRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const controller = new AbortController();

    const getProducts = async () => {
      try {
        const response = await axiosPrivate.get(
          ApiEndpoints.products.getAllWithCreationInfo,
          {
            signal: controller.signal,
          }
        );
        console.log(response?.data);

        setCategories(response?.data?.categories);
        setProducts(response?.data?.products);
        setCurrencies(response?.data?.currencies);
      } catch (error) {
        console.log(error);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    if (effectRun.current) {
      getProducts();
    }

    return () => {
      effectRun.current = true; // update the value of effectRun to true
      controller.abort();
    };
  }, []);

  function handleSetSearchValue() {
    const value = searchInputRef.current.value;
  }

  function clearSearchValue() {
    searchInputRef.current.value = "";
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

  const StyledPagination = styled(Pagination)({});

  const PaginationHolder = styled(Box)({
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(1),
  });

  const CustomSearchField = styled("div")({
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(0.5),
    marginLeft: theme.spacing(0.5),
    backgroundColor: alpha(theme.palette.common.white, 1),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.7),
    },
    borderRadius: theme.shape.borderRadius,
    width: "100%",
    position: "relative",
    padding: theme.spacing(0.3),
  });

  const CancelIconButton = styled(IconButton)({
    paddingRight: theme.spacing(1),
    position: "absolute",
    right: 0,
    fontSize: "30px",
  });

  return (
    <Box>
      
      <CustomSearchField>
        <Search
          sx={{
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
            fontSize: "40px",
          }}
        />
        <InputBase
          sx={{ width: "100%" }}
          onChange={handleSetSearchValue}
          inputRef={searchInputRef}
          placeholder="Search product..."
        />
        <CancelIconButton onClick={clearSearchValue}>
          <Cancel />
        </CancelIconButton>
      </CustomSearchField>
      <TableContainer component={Box}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  width: "20px",
                  padding: 0,
                  paddingLeft: theme.spacing(1),
                }}
              />
              <MainCategoryTableCell></MainCategoryTableCell>
              <MainCategoryTableCell align="center"></MainCategoryTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((product, index) => {
              return (
                <ProductRow
                  key={index}
                  categories={categories}
                  currencies={currencies}
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
              size="small"
              startIcon={<RemoveCircle />}
            >
              HIDE CREATION FORM
            </Button>
          ) : (
            <Button
              onClick={handleShowCreateProduct}
              variant="contained"
              size="small"
              startIcon={<AddCircle />}
            >
              ADD NEW PRODUCT
            </Button>
          )}
        </StyledButtonBox>
      </TableContainer>
      <Collapse in={showCreateProduct} timeout="auto" unmountOnExit>
        <CreateProduct
          productListChanged={productListChanged}
          categories={categories}
          currencies={currencies}
        />
      </Collapse>
      <PaginationHolder>
        <StyledPagination count={10} size="medium" color="secondary" />
      </PaginationHolder>
    </Box>
  );
}
