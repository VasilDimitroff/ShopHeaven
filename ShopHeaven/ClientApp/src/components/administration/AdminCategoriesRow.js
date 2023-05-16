import { React, useState, Fragment } from "react";
import {
  Box,
  Button,
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Typography,
  Table,
  TableBody,
  TableHead,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";
import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  Edit,
  Delete,
  AddCircle,
  RemoveCircle,
} from "@mui/icons-material";
import EditCategoryForm from "./EditCategoryForm";
import CreateSubcategory from "./CreateSubcategory";
import CategorySubcategories from "./CategorySubcategories";

export default function AdminCategoriesRow(props) {
  const [category, setCategory] = useState(props.category);
  const [subcategories, setSubcategories] = useState(props.subcategories);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [showSubcategories, setShowSubcategories] = useState(false);
  const [openSubcategoryForm, setOpenSubcategoryForm] = useState(false);
  

  function updateCategoryName(newName, newDescription) {
    setCategory((prev) => {
      return {
        ...prev,
        name: newName,
        description: newDescription,
      };
    });
  }

  function subcategoriesUpdated(newSubcategory) {
    setSubcategories((prev) => {
      return [...prev, newSubcategory];
    });
    console.log(newSubcategory);
  }

  function handleShowEditForm() {
    setShowSubcategories(false);
    setOpenEditForm((prev) => !prev);
  }

  function handleShowSubcategories() {
    setOpenEditForm(false);
    setShowSubcategories((prev) => !prev);
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

  const StyledButton = styled(Button)({
    boxShadow: "none",
  });

  function renderCategoryProductsCount() {
    return subcategories?.reduce((a, b) => a + b?.productsCount, 0);
  }

  return (
    <Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => handleShowSubcategories()}
          >
            {showSubcategories && !openEditForm ? (
              <KeyboardArrowUp />
            ) : (
              <KeyboardArrowDown />
            )}
          </IconButton>
        </TableCell>
        <CategoryNameTableCell component="th" scope="row">
          {category?.name}
        </CategoryNameTableCell>
        <TableCell align="center">{renderCategoryProductsCount()}</TableCell>
        <TableCell align="center">{subcategories?.length}</TableCell>
        <TableCell align="center">{category?.createdBy}</TableCell>
        <TableCell align="center">
          <StyledButton
            onClick={() => handleShowEditForm()}
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
          <Collapse
            in={openEditForm || showSubcategories}
            timeout="auto"
            unmountOnExit
          >
            <Box sx={{ display: openEditForm ? "block" : "none" }}>
              <EditCategoryForm
                category={category}
                updateCategoryName={updateCategoryName}
              />
            </Box>
            <Paper
              sx={{
                margin: 2,
                padding: theme.spacing(3),
                display: showSubcategories && !openEditForm ? "block" : "none",
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                component="div"
                sx={{ fontWeight: 500 }}
              >
                {`Subcategories of ${category?.name}`}
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">NAME</TableCell>
                    <TableCell align="center">PRODUCTS</TableCell>
                    <TableCell align="center">CREATOR</TableCell>
                    <TableCell align="center">EDIT</TableCell>
                    <TableCell align="center">DELETE</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                   <CategorySubcategories subcategories={subcategories}/>                 
                </TableBody>
              </Table>
              <StyledButtonBox>
                {openSubcategoryForm ? (
                  <Button
                    onClick={handleOpenSubcategoryForm}
                    variant="contained"
                    size="small"
                    startIcon={<RemoveCircle />}
                  >
                    Hide creation form
                  </Button>
                ) : (
                  <Button
                    onClick={handleOpenSubcategoryForm}
                    variant="contained"
                    size="small"
                    startIcon={<AddCircle />}
                  >
                    Add new subcategory to {category.name}
                  </Button>
                )}
                <Collapse in={openSubcategoryForm} timeout="auto" unmountOnExit>
                  <Paper
                    sx={{
                      padding: theme.spacing(2),
                      marginTop: theme.spacing(2),
                      border: "1px solid gray",
                    }}
                  >
                    <CreateSubcategory
                      subcategoriesUpdated={subcategoriesUpdated}
                      categoryId={category?.id}
                    />
                  </Paper>
                </Collapse>
              </StyledButtonBox>
            </Paper>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}