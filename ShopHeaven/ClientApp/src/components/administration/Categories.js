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
    </Fragment>
  );
}

export default function Categories(props) {
  let categoryNameRef = useRef();
  let categoryDescriptionRef = useRef();
  let categoryImageRef = useRef();

  const [createCategoryResponseMessage, setCreateCategoryResponseMessage] = useState("");
  const [createCategoryErrorMessage, setCreateCategoryErrorMessage] = useState(false);

  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true);
  } 
  function handleClose(){
    setOpen(false);
    setCreateCategoryResponseMessage("");
    setCreateCategoryErrorMessage(false);
  }

  function onCreateCategory(e){
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
    formData.append("createdBy", "6d011520-f43e-468e-bf45-466ab65d9ca6");

    e.preventDefault();

    createCategory(formData);
  }

  async function createCategory(formData) {
    try {
      const response = await axios.post(ApiEndpoints.categories.createCategory, formData);
      setCreateCategoryResponseMessage(response.data);
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
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Zoom in={open}>
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