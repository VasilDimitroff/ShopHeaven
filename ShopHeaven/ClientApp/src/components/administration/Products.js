import { React, useState, Fragment, useRef } from "react";
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
  Modal,
  Zoom,
  Backdrop,
  TextField,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";
import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  Edit,
  Delete,
  AddCircle,
  PhotoCamera,
} from "@mui/icons-material";
import axios from "axios";
import { ApiEndpoints } from "../../endpoints";

function Row(props) {
  const [open, setOpen] = useState(false);

  const [openEditProductModal, setOpenEditProductModal] = useState(false);

  let productNameRef = useRef();
  let productDescriptionRef = useRef();
  let productImageRef = useRef();

  const [editProductResponseMessage, setEditProductResponseMessage] =
    useState("");
  const [editProductErrorMessage, setEditProductErrorMessage] = useState(false);

  const [getProductResult, setGetProductResult] = useState({});

  async function handleShowEditModal(id) {
    setOpenEditProductModal(true);
    await getProduct(id);
  }
  function handleCloseEditModal() {
    setOpenEditProductModal(false);
    setEditProductResponseMessage("");
    setEditProductErrorMessage(false);
  }

  function clearFormValues() {
    productNameRef.current.value = "";
    productDescriptionRef.current.value = "";
    document.getElementById("edit-product-image").value = "";
  }

  function onEditProduct(e) {
    e.preventDefault();

    const productName = productNameRef.current.value;
    const productDescription = productDescriptionRef.current.value;
    const productImage = document.getElementById("edit-product-image").files[0];

    console.log("Product NAME " + productName);
    console.log("Product DESCR " + productDescription);
    console.log("Product IMAGE " + productImage);

    const formData = new FormData();

    formData.append("name", productName);
    formData.append("description", productDescription);
    formData.append("image", productImage);
    formData.append("createdBy", "6d011520-f43e-468e-bf45-466ab65d9ca6");

    editProduct(formData);
  }

  async function getProduct(id) {
    try {
      const response = await axios.get(ApiEndpoints.products.getProduct + id);
      setGetProductResult(response.data);
    } catch (error) {
      console.log("Server returns erorr during product getting: " + error);
      setEditProductErrorMessage(true);
    }
  }

  async function editProduct(formData) {
    try {
      const response = await axios.post(
        ApiEndpoints.products.editProduct,
        formData
      );
      setEditProductResponseMessage(response.data);
      clearFormValues();
    } catch (error) {
      console.log("Server returns erorr during product editing: " + error);
      setEditProductErrorMessage(true);
    }
  }
  
  const ProductNameTableCell = styled(TableCell)({
    fontWeight: 500,
    fontSize: 18,
  });

  const ModalBox = styled(Paper)({
    position: "absolute",
    top: "20%",
    left: "25%",
    right: "25%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    boxShadow: 24,
    padding: theme.spacing(3),
    border: "1px solid gray",
    display: "block",
    margin: "auto",
    [theme.breakpoints.down("lg")]: {
      width: "80%",
      left: "10%",
      right: "10%",
    },
  });

  const StyledInput = styled(TextField)({
    marginTop: theme.spacing(3),
    width: "100%",
  });

  const InputBox = styled(Box)({
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
  });

  const CreateProductButton = styled(Button)({
    width: "100%",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
  });

  const ResponseMessage = styled(Typography)({
    textAlign: "center",
    color: theme.palette.success.main,
  });

  const ErrorResponseMessage = styled(Typography)({
    textAlign: "center",
    color: theme.palette.error.main,
  });

  const EditProductModalHolder = styled(Box)({});

  return (
    <Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell align="center">{props.product.id}</TableCell>
        <ProductNameTableCell component="th" scope="row">
          {props.product.name}
        </ProductNameTableCell>
        <TableCell align="center">{props.product.createdBy}</TableCell>
        <TableCell align="center">{props.product.reviewsCount}</TableCell>
        <TableCell align="center">{props.product.rating}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                sx={{ mt: theme.spacing(5) }}
              >
                Details about {props.product.name}
              </Typography>
             
            
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      <EditProductModalHolder>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openEditProductModal}
          onClose={handleCloseEditModal}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Zoom in={openEditProductModal}>
            <ModalBox>
              <form onSubmit={onEditProduct}>
                <Typography
                  sx={{ marginLeft: theme.spacing(4) }}
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Edit product {getProductResult.name}
                </Typography>
                <InputBox>
                  <StyledInput
                    inputRef={productNameRef}
                    label="Product name"
                    variant="filled"
                    defaultValue={getProductResult.name}
                  />
                </InputBox>
                <InputBox>
                  <StyledInput
                    inputRef={productImageRef}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <PhotoCamera />
                        </InputAdornment>
                      ),
                    }}
                    accept=".jpg, .png"
                    type="file"
                    variant="filled"
                    id="edit-product-image"
                  />
                </InputBox>
                <InputBox>
                  <StyledInput
                    inputRef={productDescriptionRef}
                    id="123"
                    label="Product Description"
                    multiline
                    rows={5}
                    variant="filled"
                    defaultValue={getProductResult.description}
                  />
                </InputBox>
                <InputBox>
                  <CreateProductButton
                    type="submit"
                    size="large"
                    variant="contained"
                  >
                    Edit product
                  </CreateProductButton>
                </InputBox>
              </form>
              <ResponseMessage>{editProductResponseMessage}</ResponseMessage>
              {editProductErrorMessage ? (
                <ErrorResponseMessage>
                  An error during product editing!
                </ErrorResponseMessage>
              ) : (
                ""
              )}
            </ModalBox>
          </Zoom>
        </Modal>
      </EditProductModalHolder>
    </Fragment>
  );
}

export default function Products(props) {
  let productNameRef = useRef();
  let productDescriptionRef = useRef();
  let productImageRef = useRef();

  const [createProductResponseMessage, setCreateProductResponseMessage] =
    useState("");
  const [createProductErrorMessage, setCreateProductErrorMessage] =
    useState(false);

  const [openCreateProductModal, setOpenCreateProductModal] = useState(false);

  function handleOpen() {
    setOpenCreateProductModal(true);
  }
  function handleClose() {
    setOpenCreateProductModal(false);
    setCreateProductResponseMessage("");
    setCreateProductErrorMessage(false);
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
      setCreateProductResponseMessage(response.data);
      clearFormValues();
    } catch (error) {
      console.log("Server returns erorr during product creating: " + error);
      setCreateProductErrorMessage(true);
    }
  }

  const MainCategoryTableCell = styled(TableCell)({
    fontSize: 18,
  });

  const StyledButtonBox = styled(Box)({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  });

  const ModalBox = styled(Paper)({
    position: "absolute",
    top: "20%",
    left: "25%",
    right: "25%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    boxShadow: 24,
    padding: theme.spacing(3),
    border: "1px solid gray",
    display: "block",
    margin: "auto",
    [theme.breakpoints.down("lg")]: {
      width: "80%",
      left: "10%",
      right: "10%",
    },
  });

  const StyledInput = styled(TextField)({
    marginTop: theme.spacing(3),
    width: "100%",
  });

  const InputBox = styled(Box)({
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
  });

  const CreateProductButton = styled(Button)({
    width: "100%",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
  });

  const ResponseMessage = styled(Typography)({
    textAlign: "center",
    color: theme.palette.success.main,
  });

  const ErrorResponseMessage = styled(Typography)({
    textAlign: "center",
    color: theme.palette.error.main,
  });

  return (
    <Box>
      <TableContainer component={Box}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <MainCategoryTableCell align="center">ID</MainCategoryTableCell>
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
              return (
                <Row
                  key={index}
                  product={product}
                />
              );
            })}
          </TableBody>
        </Table>
        <StyledButtonBox>
          <Button
            onClick={handleOpen}
            variant="contained"
            size="small"
            startIcon={<AddCircle />}
          >
            Add new product
          </Button>
        </StyledButtonBox>
      </TableContainer>
      <Box>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openCreateProductModal}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Zoom in={openCreateProductModal}>
            <ModalBox>
              <form onSubmit={onCreateProduct}>
                <Typography
                  sx={{ marginLeft: theme.spacing(4) }}
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Create a new product
                </Typography>
                <InputBox>
                  <StyledInput
                    inputRef={productNameRef}
                    label="Product name"
                    variant="filled"
                  />
                </InputBox>
                <InputBox>
                  <StyledInput
                    inputRef={productImageRef}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <PhotoCamera />
                        </InputAdornment>
                      ),
                    }}
                    accept=".jpg, .png"
                    type="file"
                    variant="filled"
                    id="create-product-image"
                  />
                </InputBox>
                <InputBox>
                  <StyledInput
                    inputRef={productDescriptionRef}
                    id="123"
                    label="Product Description"
                    multiline
                    rows={5}
                    variant="filled"
                  />
                </InputBox>
                <InputBox>
                  <CreateProductButton
                    type="submit"
                    size="large"
                    variant="contained"
                  >
                    Create Product
                  </CreateProductButton>
                </InputBox>
              </form>
              <ResponseMessage>{createProductResponseMessage}</ResponseMessage>
              {createProductErrorMessage ? (
                <ErrorResponseMessage>
                  An error during product creation!
                </ErrorResponseMessage>
              ) : (
                ""
              )}
            </ModalBox>
          </Zoom>
        </Modal>
      </Box>
    </Box>
  );
}