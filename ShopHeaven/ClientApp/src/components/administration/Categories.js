import { React, useState, Fragment } from "react";
import {
  Box,
  Grid,
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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";
import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  Favorite,
  FavoriteBorder,
  AddShoppingCart,
  RemoveShoppingCart,
  AddCircle,
  RemoveCircle,
  Close,
} from "@mui/icons-material";

function Row(props) {
  const [open, setOpen] = useState(false);

  function renderCategoryProductsCount() {
    return props.subcategories.reduce(function (a, b) {
      return a + b.productsCount;
    }, 0);
  }

  function renderSubcategories(){
    return props.subcategories.map((subcategory) => (
        <TableRow key={subcategory.id}>
          <TableCell align="center">
            {subcategory.id}
          </TableCell>
          <TableCell component="th" scope="row">
            {subcategory.name}
          </TableCell>
          <TableCell align="center">
            <img src={subcategory.name} />
          </TableCell>
          <TableCell align="center">{subcategory.productsCount}</TableCell>
          <TableCell align="center">{subcategory.createdBy}</TableCell>
          <TableCell align="center">EDIT</TableCell>
          <TableCell align="center"> DELETE </TableCell>
        </TableRow>
      ))
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
        <TableCell component="th" scope="row">
          {props.category.name}
        </TableCell>
        <TableCell>
          <img src={props.category.name} />
        </TableCell>
        <TableCell align="center">{renderCategoryProductsCount()}</TableCell>
        <TableCell align="center">{props.subcategories.length}</TableCell>
        <TableCell align="center">{props.category.createdBy}</TableCell>
        <TableCell align="center">Edit</TableCell>
        <TableCell align="center">Delete</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              <Typography variant="h6" gutterBottom component="div">
                Subcategories of {props.category.name}
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Id</TableCell>
                    <TableCell align="left">Name</TableCell>
                    <TableCell align="center">Image</TableCell>
                    <TableCell align="center">Products</TableCell>
                    <TableCell align="center">CreatedBy</TableCell>
                    <TableCell align="center">EDIT</TableCell>
                    <TableCell align="center">DELETE</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                 {renderSubcategories()}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

export default function Categories(props) {
  return (
    <TableContainer component={Box}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell/>
            <TableCell align="center">Id</TableCell>
            <TableCell>CATEGORY</TableCell>
            <TableCell align="center">IMAGE</TableCell>
            <TableCell align="center">PRODUCTS</TableCell>
            <TableCell align="center">SUBCATEGORIES</TableCell>
            <TableCell align="center">CREATED BY</TableCell>
            <TableCell align="center">EDIT</TableCell>
            <TableCell align="center">DELETE</TableCell>
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
    </TableContainer>
  );
}
