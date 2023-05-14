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
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";
import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  Edit,
  Delete,
  AddCircle,
} from "@mui/icons-material";
import CreateCategory from "./CreateCategory";
import EditCategory from "./EditCategory";
import CreateSubcategory from "./CreateSubcategory";

function Row(props) {
  const [open, setOpen] = useState(false);
  const [openSubcategoryForm, setOpenSubcategoryForm] = useState(false)

 function handleShowEditModal(id) {
    setOpen(!open);
  } 

  function handleOpenSubcategoryForm() {
    setOpenSubcategoryForm( prev => !prev);
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
            <EditCategory category={props.category}/>
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
                  onClick={handleOpenSubcategoryForm}
                  variant="contained"
                  size="small"
                  startIcon={<AddCircle />}
                >
                  Add new subcategory
                </Button>
                <Collapse in={openSubcategoryForm} timeout="auto" unmountOnExit>
                    <CreateSubcategory categoryId={props.category.id}/>
                </Collapse>
              </StyledButtonBox>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

export default function AdminCategories(props) {

  const [openCreateCategoryModal, setOpenCreateCategoryModal] = useState(false);

  function handleOpen() {
    setOpenCreateCategoryModal(!openCreateCategoryModal);
  } 

  const MainCategoryTableCell = styled(TableCell)({
    fontSize: 18,
  });

  const StyledButtonBox = styled(Box)({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  });

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
            ADD NEW CATEGORY
          </Button>
        </StyledButtonBox>
      </TableContainer>  
       <Collapse in={openCreateCategoryModal} timeout="auto" unmountOnExit>
          <CreateCategory/>
       </Collapse>
    </Box>
  );
}