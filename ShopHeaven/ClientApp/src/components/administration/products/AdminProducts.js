import { React, useState, Fragment, useRef, useEffect } from "react";
import {
  Box,
  Button,
  Paper,
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Typography,
  Table,
  TableBody,
  TableHead,
  TableContainer,
  Chip,
  InputBase,
  FormControlLabel,
  Switch,
  ImageList,
  ImageListItem,
  ListItemIcon,
  Pagination,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../../theme";
import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  Close,
  AddCircle,
} from "@mui/icons-material";
import axios from "axios";
import { ApiEndpoints } from "../../../api/endpoints";
import CreateProduct from "./CreateProduct";
import ProductRow from "./ProductRow";

export default function AdminProducts(props) {
  let productNameRef = useRef();
  let productDescriptionRef = useRef();
  let productImageRef = useRef();

  const [showCreateProduct, setShowCreateProduct] = useState(false);

  function handleShowCreateProduct(){
    setShowCreateProduct(!showCreateProduct)
  }

  function clearFormValues() {
    productNameRef.current.value = "";
    productDescriptionRef.current.value = "";
    document.getElementById("create-product-image").value = "";
  }

  function onCreateProduct(e) {
    e.preventDefault();

    const productName = productNameRef.current.value;
    const productDescription = productDescriptionRef.current.value;
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
      const response = await axios.post(
        ApiEndpoints.products.createProduct,
        formData
      );
      //setCreateProductResponseMessage(response.data);
      clearFormValues();
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

  const StyledPagination = styled(Pagination)({
  })

  const PaginationHolder = styled(Box)({
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  })

  return (
    <Box>
      <TableContainer component={Box}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <MainCategoryTableCell>PRODUCT</MainCategoryTableCell>
              <MainCategoryTableCell align="center">
                CREATOR
              </MainCategoryTableCell>
              <MainCategoryTableCell align="center">
                REVIEWS
              </MainCategoryTableCell>
              <MainCategoryTableCell align="center">
                RATING
              </MainCategoryTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.products.map((product, index) => {
              return <ProductRow key={index} product={product} />;
            })}
          </TableBody>
        </Table>
        <StyledButtonBox>
          <Button
            onClick={handleShowCreateProduct}
            variant="contained"
            size="small"
            startIcon={<AddCircle />}
          >
            Add new product
          </Button>
        </StyledButtonBox>
      </TableContainer>
      <Collapse in={showCreateProduct} timeout="auto" unmountOnExit>
          <CreateProduct/>
       </Collapse>
        <PaginationHolder> 
           <StyledPagination count={10} size="medium" color="secondary"  />
        </PaginationHolder>
      <Box>
      </Box>
    </Box>
  );
}