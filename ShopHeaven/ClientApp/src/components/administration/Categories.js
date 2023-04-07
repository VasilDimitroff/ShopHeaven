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
import { style } from "@mui/system";
import axios from "axios";
import { ApiEndpoints } from "../../endpoints";

function Row(props) {
  const [open, setOpen] = useState(false);

  const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);

  let categoryNameRef = useRef();
  let categoryDescriptionRef = useRef();
  let categoryImageRef = useRef();

  const [editCategoryResponseMessage, setEditCategoryResponseMessage] = useState("");
  const [editCategoryErrorMessage, setEditCategoryErrorMessage] = useState(false);

  const [getCategoryResult, setGetCategoryResult] = useState({});



  async function handleShowEditModal(id) {
    setOpenEditCategoryModal(true);
   await getCategory(id);
  } 
  function handleCloseEditModal(){
    setOpenEditCategoryModal(false);
    setEditCategoryResponseMessage("");
    setEditCategoryErrorMessage(false);
  }

  function clearFormValues() {
    categoryNameRef.current.value = "";
    categoryDescriptionRef.current.value = "";
    document.getElementById('edit-category-image').value = "";
  }

  function onEditCategory(e){
    e.preventDefault();

    console.log("CATEGORY NAME " + categoryNameRef.current.value)
    console.log("CATEGORY DESCR " + categoryDescriptionRef.current.value)
    console.log("IMAGE " + document.getElementById('category-image').files[0]);

    const categoryName = categoryNameRef.current.value;
    const categoryDescription = categoryDescriptionRef.current.value;
    const categoryImage = document.getElementById('edit-category-image').files[0];

    const formData = new FormData();

    formData.append("name", categoryName);
    formData.append("description", categoryDescription);
    formData.append("image", categoryImage);
    formData.append("createdBy", "6d011520-f43e-468e-bf45-466ab65d9ca6");

    editCategory(formData);
  }

  async function getCategory(id) {
    try {
      const response = await axios.get(ApiEndpoints.categories.getCategory + id);
      setGetCategoryResult(response.data);

    } catch (error) {
      console.log("server returns erorr during category getting: " + error);
      setEditCategoryErrorMessage(true);
    }
  }

  async function editCategory(formData) {
    try {
      const response = await axios.post(ApiEndpoints.categories.editCategory, formData);
      setEditCategoryResponseMessage(response.data);
      clearFormValues();
    } catch (error) {
      console.log("server returns erorr during category editing: " + error);
      setEditCategoryErrorMessage(true);
    } 
  }

  const StyledButtonBox = styled(Box)({
    marginTop: theme.spacing(2),
  });

  const CategoryNameTableCell = styled(TableCell)({
    fontWeight: 500,
    fontSize: 18,
  });

  const StyledTableCell = styled(TableCell)(({ theme }) => ({}));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const StyledButton = styled(Button)({
    boxShadow: "none",
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
    marginRight: theme.spacing(4)
  });

  const CreateCategoryButton = styled(Button)({
   width: "100%",
   marginTop: theme.spacing(3),
   marginBottom: theme.spacing(1)
  })

  const ResponseMessage = styled(Typography)({
    textAlign: "center",
    color: theme.palette.success.main
  });

  const ErrorResponseMessage = styled(Typography)({
    textAlign: "center",
    color: theme.palette.error.main
  })

  const EditCategoryModalHolder = styled(Box)({

  })

  function renderCategoryProductsCount() {
    return props.subcategories.reduce(function (a, b) {
      return a + b.productsCount;
    }, 0);
  }

  function renderSubcategories() {
    return props.subcategories.map((subcategory) => (
      <StyledTableRow key={subcategory.id}>
        <StyledTableCell align="center">{subcategory.id}</StyledTableCell>
        <StyledTableCell component="th" scope="row">
          {subcategory.name}
        </StyledTableCell>
        <StyledTableCell align="center">
          {subcategory.productsCount}
        </StyledTableCell>
        <StyledTableCell align="center">
          {subcategory.createdBy}
        </StyledTableCell>
        <StyledTableCell align="center">
          {" "}
          <StyledButton
            color="warning"
            variant="contained"
            size="small"
            startIcon={<Edit />}
          >
            EDIT
          </StyledButton>
        </StyledTableCell>
        <StyledTableCell align="center">
          {" "}
          <StyledButton
            color="error"
            variant="contained"
            size="small"
            startIcon={<Delete />}
          >
            DELETE
          </StyledButton>{" "}
        </StyledTableCell>
      </StyledTableRow>
    ));
  }

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
        <TableCell align="center">{props.category.id}</TableCell>
        <CategoryNameTableCell component="th" scope="row">
          {props.category.name}
        </CategoryNameTableCell>
        <TableCell align="center">{renderCategoryProductsCount()}</TableCell>
        <TableCell align="center">{props.subcategories.length}</TableCell>
        <TableCell align="center">{props.category.createdBy}</TableCell>
        <TableCell align="center">
          <StyledButton
          onClick={() => handleShowEditModal("1da3ebe5-55b3-4a7b-bda4-04315cd85f6f")}
            color="warning"
            variant="contained"
            size="small"
            startIcon={<Edit />}
          >
            EDIT
          </StyledButton>
        </TableCell>
        <TableCell align="center">
          <StyledButton
            color="error"
            variant="contained"
            size="small"
            startIcon={<Delete />}
          >
            DELETE
          </StyledButton>
        </TableCell>
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
                Subcategories of {props.category.name}
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">ID</TableCell>
                    <TableCell align="left">NAME</TableCell>
                    <TableCell align="center">PRODUCTS</TableCell>
                    <TableCell align="center">CREATOR</TableCell>
                    <TableCell align="center">EDIT</TableCell>
                    <TableCell align="center">DELETE</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{renderSubcategories()}</TableBody>
              </Table>
              <StyledButtonBox>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<AddCircle />}
                >
                  Add new subcategory
                </Button>
              </StyledButtonBox>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      
      <EditCategoryModalHolder>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openEditCategoryModal}
          onClose={handleCloseEditModal}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Zoom in={openEditCategoryModal}>
            <ModalBox>
              <form onSubmit={onEditCategory}>
              <Typography
              sx={{marginLeft: theme.spacing(4),}}
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Edit category { getCategoryResult.name }
              </Typography>
              <InputBox>
                <StyledInput
                 inputRef={categoryNameRef}
                  label="Category name"
                  variant="filled"
                  defaultValue={getCategoryResult.name}
                />
              </InputBox>
              <InputBox>
                <StyledInput
                inputRef={categoryImageRef}
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
                  id="edit-category-image"
                />
              </InputBox>
              <InputBox>
                <StyledInput
                  inputRef={categoryDescriptionRef}
                  id="123"
                  label="Category Description"
                  multiline
                  rows={5}
                  variant="filled"
                  defaultValue={getCategoryResult.description}
                />
              </InputBox>
              <InputBox>
              <CreateCategoryButton type="submit" size="large" variant="contained">Edit category</CreateCategoryButton>
              </InputBox>
              </form>
                <ResponseMessage>{editCategoryResponseMessage}</ResponseMessage>
                { editCategoryErrorMessage ? <ErrorResponseMessage>An error during category editing!</ErrorResponseMessage> : ""}
            </ModalBox>
          </Zoom>
        </Modal>
      </EditCategoryModalHolder>
    </Fragment>
  );
}

export default function Categories(props) {
  let categoryNameRef = useRef();
  let categoryDescriptionRef = useRef();
  let categoryImageRef = useRef();

  const [createCategoryResponseMessage, setCreateCategoryResponseMessage] = useState("");
  const [createCategoryErrorMessage, setCreateCategoryErrorMessage] = useState(false);

  const [openCreateCategoryModal, setOpenCreateCategoryModal] = useState(false);


  function handleOpen() {
    setOpenCreateCategoryModal(true);
  } 
  function handleClose(){
    setOpenCreateCategoryModal(false);
    setCreateCategoryResponseMessage("");
    setCreateCategoryErrorMessage(false);
  }

  function clearFormValues() {
    categoryNameRef.current.value = "";
    categoryDescriptionRef.current.value = "";
    document.getElementById('category-image').value = "";
  }

  function onCreateCategory(e){
    e.preventDefault();

    console.log("CATEGORY NAME " + categoryNameRef.current.value)
    console.log("CATEGORY DESCR " + categoryDescriptionRef.current.value)
    console.log("IMAGE " + document.getElementById('category-image').files[0]);

    const categoryName = categoryNameRef.current.value;
    const categoryDescription = categoryDescriptionRef.current.value;
    const categoryImage = document.getElementById('category-image').files[0];

    const formData = new FormData();

    formData.append("name", categoryName);
    formData.append("description", categoryDescription);
    formData.append("image", categoryImage);
    formData.append("createdBy", "3f2d0e68-950b-44fc-85b5-66a4e5d849e2");

    createCategory(formData);
  }

  async function createCategory(formData) {
    try {
      const response = await axios.post(ApiEndpoints.categories.createCategory, formData);
      setCreateCategoryResponseMessage(response.data);
      clearFormValues();
    } catch (error) {
      console.log("server returns erorr during category creating: " + error);
      setCreateCategoryErrorMessage(true);
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
    marginRight: theme.spacing(4)
  });

  const CreateCategoryButton = styled(Button)({
   width: "100%",
   marginTop: theme.spacing(3),
   marginBottom: theme.spacing(1)
  })

  const ResponseMessage = styled(Typography)({
    textAlign: "center",
    color: theme.palette.success.main
  });

  const ErrorResponseMessage = styled(Typography)({
    textAlign: "center",
    color: theme.palette.error.main
  })

  const EditCategoryModalHolder = styled(Box)({

  })

  return (
    <Box>
      <TableContainer component={Box}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <MainCategoryTableCell align="center">ID</MainCategoryTableCell>
              <MainCategoryTableCell>CATEGORY</MainCategoryTableCell>
              <MainCategoryTableCell align="center">
                PRODUCTS
              </MainCategoryTableCell>
              <MainCategoryTableCell align="center">
                SUBCATEGORIES
              </MainCategoryTableCell>
              <MainCategoryTableCell align="center">
                CREATOR
              </MainCategoryTableCell>
              <MainCategoryTableCell align="center">EDIT</MainCategoryTableCell>
              <MainCategoryTableCell align="center">
                DELETE
              </MainCategoryTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.categories.map((category, index) => {
              return (
                <Row
                  key={index}
                  category={category}
                  subcategories={category.subcategories}
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
            Add new category
          </Button>
        </StyledButtonBox>
      </TableContainer>
      <Box>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openCreateCategoryModal}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Zoom in={openCreateCategoryModal}>
            <ModalBox>
              <form onSubmit={onCreateCategory}>
              <Typography
              sx={{marginLeft: theme.spacing(4),}}
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Create a new category
              </Typography>
              <InputBox>
                <StyledInput
                 inputRef={categoryNameRef}
                  label="Category name"
                  variant="filled"
                />
              </InputBox>
              <InputBox>
                <StyledInput
                inputRef={categoryImageRef}
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
                  id="category-image"
                />
              </InputBox>
              <InputBox>
                <StyledInput
                  inputRef={categoryDescriptionRef}
                  id="123"
                  label="Category Description"
                  multiline
                  rows={5}
                  variant="filled"
                />
              </InputBox>
              <InputBox>
              <CreateCategoryButton type="submit" size="large" variant="contained">Create category</CreateCategoryButton>
              </InputBox>
              </form>
                <ResponseMessage>{createCategoryResponseMessage}</ResponseMessage>
                { createCategoryErrorMessage ? <ErrorResponseMessage>An error during category creation!</ErrorResponseMessage> : ""}
            </ModalBox>
          </Zoom>
        </Modal>
      </Box>
    </Box>
  );
}