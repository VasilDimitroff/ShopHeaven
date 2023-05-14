import { React, useState, Fragment } from "react";
import { Box, Button, TableRow, TableCell, IconButton, Collapse, Typography, Table, TableBody, TableHead } from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";
import { KeyboardArrowUp, KeyboardArrowDown, Edit, Delete, AddCircle } from "@mui/icons-material";
import EditCategory from "./EditCategory";
import CreateSubcategory from "./CreateSubcategory";

export default function AdminCategoriesRow(props) {
  const [open, setOpen] = useState(false);
  const [openSubcategoryForm, setOpenSubcategoryForm] = useState(false);

  function handleShowEditModal() {
    setOpen(prev => !prev);
  }

  function handleOpenSubcategoryForm() {
    setOpenSubcategoryForm((prev) => !prev);
  }

  const StyledButtonBox = styled(Box)({
    marginTop: theme.spacing(2),
  });

  const CategoryNameTableCell = styled(TableCell)({
    fontWeight: 500,
    fontSize: 18,
  });

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
      <StyledTableRow key={subcategory?.id}>
        <TableCell align="center">{subcategory?.id}</TableCell>
        <TableCell component="th" scope="row">
          {subcategory?.name}
        </TableCell>
        <TableCell align="center">
          {subcategory?.productsCount}
        </TableCell>
        <TableCell align="center">
          {subcategory?.createdBy}
        </TableCell>
        <TableCell align="center">
          {" "}
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
        <CategoryNameTableCell component="th" scope="row">
          {props.category?.name}
        </CategoryNameTableCell>
        <TableCell align="center">{renderCategoryProductsCount()}</TableCell>
        <TableCell align="center">{props.subcategories?.length}</TableCell>
        <TableCell align="center">{props.category?.createdBy}</TableCell>
        <TableCell align="center">
          <StyledButton
            onClick={() => handleShowEditModal()}
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
            <EditCategory category={props.category} />
            <Box sx={{ margin: 2 }}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                sx={{ mt: theme.spacing(5) }}
              >
                Subcategories of {props.category?.name}
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
                  <CreateSubcategory categoryId={props.category?.id} />
                </Collapse>
              </StyledButtonBox>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}