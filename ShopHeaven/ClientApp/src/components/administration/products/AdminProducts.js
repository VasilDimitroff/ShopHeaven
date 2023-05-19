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

  function onCreateProduct(e) {
    e.preventDefault();

    const productName = "productNameRef.current.value";
    const productDescription = "productDescriptionRef.current.value";
    const productImage = document.getElementById("create-product-image")
      .files[0];

    console.log("PRODUCT NAME " + productName);
    console.log("PRODUCT DESCR " + productDescription);
    console.log("PRODUCT IMAGE " + productImage);

    const formData = new FormData();

    formData.append("name", productName);
    formData.append("description", productDescription);
    formData.append("image", productImage);
    formData.append("createdBy", "6d011520-f43e-468e-bf45-466ab65d9ca6");

    createProduct(formData);
  }

  async function createProduct(formData) {
    try {
      const response = await axiosPrivate.post(
        ApiEndpoints.products.createProduct,
        formData
      );
      //setCreateProductResponseMessage(response.data);
    } catch (error) {
      console.log("Server returns erorr during product creating: " + error);
      //setCreateProductErrorMessage(true);
    }
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
            {props.products.map((product, index) => {
              return <ProductRow key={index} categories={categories} product={product} />;
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
        <CreateProduct categories={categories} currencies={currencies} />
      </Collapse>
      <PaginationHolder>
        <StyledPagination count={10} size="medium" color="secondary" />
      </PaginationHolder>
    </Box>
  );
}