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
  Chip,
  InputBase,
  FormControlLabel,
  Switch,
  ImageList,
  ImageListItem,
  ListItemIcon
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";
import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  Close,
  Delete,
  AddCircle,
  PhotoCamera,
} from "@mui/icons-material";
import axios from "axios";
import { ApiEndpoints } from "../../endpoints";

function Row(props) {
  const [open, setOpen] = useState(false);

  const [tagsInput, setTagsInput] = useState(false);

  const [productAvailable, setProductAvailable] = useState(
    props.product.isAvailable
  );

  const [openEditProductModal, setOpenEditProductModal] = useState(false);

  let productNameRef = useRef();
  let productDescriptionRef = useRef();
  let productImageRef = useRef();
  let productAvailabilityRef = useRef();

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

  function handleTagsInput(show) {
    setTagsInput(show);
  }

  function onChangeAvailability(e) {
    console.log(productAvailabilityRef.current.checked);
    setProductAvailable(!productAvailable);
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

  const InputBox = styled(Box)({
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  });

  const EditProductButton = styled(Button)({
    width: "20%",
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

  const TagsWrapper = styled(Box)({
    display: "flex",
    justifyContent: "flex-start",
    gap: 8,
    fontWeight: 500,
    alignItems: "center",
    [theme.breakpoints.down("lg")]: {
      position: "relative",
    },
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(4),
  });

  const StyledChip = styled(Chip)({
    cursor: "pointer",
    textAlign: "left",
    borderRadius: theme.shape.borderRadius,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  });

  const ProductInfoInput = styled(InputBase)({
    background: "rgb(255,249,249)",
    width: "100%",
    marginTop: theme.spacing(2),
    paddingTop: theme.spacing(0.3),
    paddingBottom: theme.spacing(0.3),
    paddingLeft: theme.spacing(1),
    paddingRigth: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
  });

  const StyledFormControlLabel = styled(FormControlLabel)({
    color: productAvailable
      ? theme.palette.success.main
      : theme.palette.error.main,
    marginTop: theme.spacing(2),
  });

  const TagsInputBox = styled(InputBox)({
    display: tagsInput ? "flex" : "none",
  });

  const AddSpecificationButton = styled(Button)({
    width: "30%",
    display: "block",
    margin: "auto",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
  });

  const StyledButtonBox = styled(Box)({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  });

  const StyledImageList = styled(ImageList)({
    padding: theme.spacing(0.5),
  });

  const StyledImageListItem = styled(ImageListItem)({
    position: "relative",
    cursor: "pointer",
    "&:hover": {
      outlineColor: theme.palette.primary.main,
      outlineStyle: "solid",
      outlineWidth: "3px",
      boxShadow: theme.palette.dropdown.boxShadow.main,
    },
  });

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
              <Typography variant="h6" gutterBottom component="div">
                MAIN INFO
              </Typography>
              <form component="form">
                <InputBox>
                  <ProductInfoInput
                    sx={{ fontSize: 24 }}
                    inputRef={productNameRef}
                    defaultValue={props.product.name}
                  />
                </InputBox>
                <InputBox>
                  <ProductInfoInput
                    inputRef={productNameRef}
                    defaultValue={props.product.brand}
                  />
                </InputBox>
                <InputBox>
                  <ProductInfoInput
                    multiline
                    minRows={4}
                    inputRef={productDescriptionRef}
                    placeholder={props.product.description}
                    defaultValue={props.product.description}
                  />
                </InputBox>
                <InputBox></InputBox>
                <Box sx={{ display: "flex", marginTop: theme.spacing(5) }}>
                  <InputBox>
                    <Typography variant="h6">Availability:</Typography>
                    <StyledFormControlLabel
                      sx={{
                        width: "100%",
                        display: "block",
                        marginLeft: "auto",
                      }}
                      inputRef={productAvailabilityRef}
                      onChange={() => onChangeAvailability()}
                      control={
                        productAvailable === true ? (
                          <Switch defaultChecked />
                        ) : (
                          <Switch />
                        )
                      }
                      label={productAvailable === true ? "Yes" : "No"}
                    />
                  </InputBox>
                  <InputBox>
                    <Typography variant="h6">Guarantee:</Typography>
                    <StyledFormControlLabel
                      sx={{
                        width: "100%",
                        display: "block",
                        marginLeft: "auto",
                      }}
                      inputRef={productAvailabilityRef}
                      control={<Switch defaultChecked />}
                      label={"Yes"}
                    />
                  </InputBox>
                  <InputBox>
                    <Typography variant="h6">Quantity:</Typography>
                    <ProductInfoInput
                      inputRef={productNameRef}
                      defaultValue={props.product.quantity}
                    />
                  </InputBox>
                  <InputBox>
                    <Typography variant="h6">Currency:</Typography>
                    <ProductInfoInput
                      inputRef={productNameRef}
                      defaultValue={props.product.currency}
                    />
                  </InputBox>
                  <InputBox>
                    <Typography variant="h6">Price:</Typography>
                    <ProductInfoInput
                      inputRef={productNameRef}
                      defaultValue={props.product.price}
                    />
                  </InputBox>
                  <InputBox>
                    <Typography variant="h6">Discount:</Typography>
                    <ProductInfoInput
                      inputRef={productNameRef}
                      defaultValue={`${props.product.discount}%`}
                    />
                  </InputBox>
                  <InputBox>
                    <Typography variant="h6" color="error">
                      Final Price:
                    </Typography>
                    <ProductInfoInput
                      disabled
                      inputRef={productNameRef}
                      defaultValue={
                        props.product.price -
                        props.product.price * (props.product.discount / 100)
                      }
                    />
                  </InputBox>
                </Box>

                <Box>
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="div"
                    sx={{ marginTop: theme.spacing(6) }}
                  >
                    SPECIFICATIONS
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">
                            Specification key
                          </TableCell>
                          <TableCell align="center">
                            Specification value
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {props.product.specifications.map((spec, index) => (
                          <TableRow
                            key={index}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              align="center"
                            >
                              <InputBox>
                                <ProductInfoInput
                                  inputRef={productNameRef}
                                  defaultValue={spec.key}
                                />
                              </InputBox>
                            </TableCell>
                            <TableCell align="center">
                              <InputBox>
                                <ProductInfoInput
                                  inputRef={productNameRef}
                                  defaultValue={spec.value}
                                />
                              </InputBox>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <AddSpecificationButton size="small" variant="contained">
                      Add Specification
                    </AddSpecificationButton>
                  </TableContainer>
                </Box>
                <TagsWrapper>
                  Tags:
                  {props.product.tags.map((tag, index) => (
                    <StyledChip
                      key={index}
                      label={tag}
                      color="secondary"
                    ></StyledChip>
                  ))}
                  <IconButton onClick={() => handleTagsInput(!tagsInput)}>
                    <AddCircle />
                  </IconButton>
                  <TagsInputBox>
                    <ProductInfoInput
                      sx={{
                        marginTop: theme.spacing(0),
                        marginLeft: theme.spacing(-2),
                      }}
                      inputRef={productNameRef}
                      multiline
                      defaultValue={`${props.product.tags.map((tag, index) => {
                        return tag;
                      })}`}
                    />
                    <Typography
                      sx={{ fontWeight: 500, marginLeft: theme.spacing(1) }}
                    >
                      (Add tags separated with comma)
                    </Typography>
                  </TagsInputBox>
                </TagsWrapper>
                <EditProductButton
                  type="submit"
                  size="medium"
                  variant="contained"
                >
                  SAVE PRODUCT INFO
                </EditProductButton>
              </form>
              <Box>
                <Typography
                  variant="h6"
                  gutterBottom
                  component="div"
                  sx={{ marginTop: theme.spacing(6) }}
                >
                  PRODUCT IMAGES
                </Typography>
                <form>
                <StyledImageList cols={5}>
                  {props.product.images.map((item, index) => (
                    <StyledImageListItem key={index}  sx={{width: "90%"}}>
                          <ListItemIcon sx={{position: "absolute", zIndex: 1, right: -15}}>
                            <IconButton><Close sx={{ color: theme.palette.error.main}} /></IconButton>
                       </ListItemIcon>
                      <img
                        src={`${item}?w=248&fit=crop&auto=format`}
                        srcSet={`${item}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt={props.product.name}
                        loading="lazy"
                      />
                  
                    </StyledImageListItem>
                  ))}
                </StyledImageList>
                <InputBox>
                  <ProductInfoInput
                    inputRef={productImageRef}
                    accept=".jpg, .png"
                    type="file"
                    variant="outlined"
                    id="upload-product-photos-image"
                    inputProps={{
                      multiple: true
                    }}
                  />
                </InputBox>

                <EditProductButton
                  type="submit"
                  size="medium"
                  variant="contained"
                >
                  SAVE IMAGES
                </EditProductButton>
                </form>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <ResponseMessage>{editProductResponseMessage}</ResponseMessage>
      {editProductErrorMessage ? (
        <ErrorResponseMessage>
          An error during product editing!
        </ErrorResponseMessage>
      ) : (
        ""
      )}
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
              return <Row key={index} product={product} />;
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
