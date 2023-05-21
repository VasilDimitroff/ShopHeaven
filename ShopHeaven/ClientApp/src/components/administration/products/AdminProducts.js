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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../../theme";
import { RemoveCircle, AddCircle } from "@mui/icons-material";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { ApiEndpoints } from "../../../api/endpoints";
import CreateProduct from "./CreateProduct";
import ProductRow from "./ProductRow";
import { useNavigate, useLocation } from "react-router-dom";

export default function AdminProducts(props) {
  const [showCreateProduct, setShowCreateProduct] = useState(false);
  const [products, setProducts] = useState(props.products)
  const [categories, setCategories] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  
  const categoriesEffectRun = useRef(false);
  const currenciesEffectRun = useRef(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const controller = new AbortController();

    const getCategories = async () => {
      try {
        const response = await axiosPrivate.get(
          ApiEndpoints.categories.getCategoryNames,
          {
            signal: controller.signal,
          }
        );
        console.log(response?.data);

        setCategories(response?.data);
      } catch (error) {
        console.log(error);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    if (categoriesEffectRun.current) {
      getCategories();
    }

    return () => {
      categoriesEffectRun.current = true; // update the value of effectRun to true
      controller.abort();
    };
  }, []);


  useEffect(() => {
    const controller = new AbortController();

    const getCurrencies = async () => {
      try {
        const response = await axiosPrivate.get(
          ApiEndpoints.currencies.getAll,
          {
            signal: controller.signal,
          }
        );
        console.log(response?.data);
        setCurrencies(response?.data);
      } catch (error) {
        console.log(error);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    if (currenciesEffectRun.current) {
      getCurrencies();
    }

    return () => {
      currenciesEffectRun.current = true; // update the value of effectRun to true
      controller.abort();
    };
  }, []);

  function handleShowCreateProduct() {
    setShowCreateProduct((prev) => !prev);
  }

  function productListChanged(newProduct){
      setProducts(prev => [...prev, newProduct ]);
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

  return (
    <Box>
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
              <MainCategoryTableCell>PRODUCT</MainCategoryTableCell>
              <MainCategoryTableCell align="center">
              </MainCategoryTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((product, index) => {
              return <ProductRow key={index} categories={categories} currencies={currencies} product={product} />;
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
        <CreateProduct productListChanged={productListChanged} categories={categories} currencies={currencies} />
      </Collapse>
      <PaginationHolder>
        <StyledPagination count={10} size="medium" color="secondary" />
      </PaginationHolder>
    </Box>
  );
}