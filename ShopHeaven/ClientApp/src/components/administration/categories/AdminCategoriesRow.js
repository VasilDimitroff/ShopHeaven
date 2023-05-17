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
  Chip
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../../theme";
import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  Edit,
  Delete,
  AddCircle,
  RemoveCircle,
} from "@mui/icons-material";
import EditCategoryForm from "./EditCategoryForm";
import CreateSubcategory from "./subcategories/CreateSubcategory";
import CategorySubcategories from "./subcategories/CategorySubcategories";
import DeleteCategoryForm from "./DeleteCategoryForm";

export default function AdminCategoriesRow(props) {
  const [category, setCategory] = useState(props.category);
  const [subcategories, setSubcategories] = useState(props.subcategories);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [showSubcategories, setShowSubcategories] = useState(false);
  const [openSubcategoryForm, setOpenSubcategoryForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);

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

  function onCancelButtonClicked() {
    setShowDeleteForm(prev => !prev);
  }

  function handleShowEditForm() {
    setShowSubcategories(false);
    setShowDeleteForm(false);
    setOpenEditForm((prev) => !prev);
  }

  function handleShowDeleteForm() {
    setShowSubcategories(false);
    setOpenEditForm(false);
    setShowDeleteForm(prev => !prev);
  }

  function handleShowSubcategories() {
    setOpenEditForm(false);
    setShowDeleteForm(false);
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
    '&:hover': {
      cursor: "pointer",
      background: "#EAEAF7",
   },
  });

  const StyledIconButton = styled(IconButton)({
    borderWidth: "1.5px",
    borderStyle: "solid",
  });

  const CategoryInfoText = styled(Box)({
    fontSize: 13,
    fontWeight: 400,
    [theme.breakpoints.down("lg")]: {
      marginTop: theme.spacing(0.4)
    },
  })

  const CategoryInfoHolder = styled(Box)({
    marginTop: theme.spacing(1),
    [theme.breakpoints.up("lg")]: {
      display: "flex",
      alignItems: "center",
      gap: 15,
    },
  });

  const DeleteIconButton = styled(StyledIconButton)({
    borderColor: theme.palette.error.main,
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(2),
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(2)
    },
  })

  function renderCategoryProductsCount() {
    return subcategories?.reduce((a, b) => a + b?.productsCount, 0);
  }

  return (
    <Fragment>
      <TableRow  sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell sx={{width: "20px", padding: 0, paddingLeft: theme.spacing(1)}}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => handleShowSubcategories()}
          >
            {showSubcategories ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <CategoryNameTableCell onClick={handleShowSubcategories} component="th" scope="row">
          {category?.name}
          <CategoryInfoHolder>
            <CategoryInfoText><Chip variant="outlined" color="secondary" label={`${subcategories?.length} subcategories`} size="small"/></CategoryInfoText>
            <CategoryInfoText><Chip variant="outlined" color="primary" label={`${renderCategoryProductsCount()} products`} size="small"/></CategoryInfoText>
            <CategoryInfoText><Chip variant="outlined" label={`By: ${category?.createdBy}`}size="small"/></CategoryInfoText>
          </CategoryInfoHolder>
        </CategoryNameTableCell>
        <TableCell align="center">
          <StyledIconButton onClick={() => handleShowEditForm()} sx={{borderColor: theme.palette.warning.main}} size="small">
            <Edit sx={{ color: theme.palette.warning.main }} />
          </StyledIconButton>
          <DeleteIconButton onClick={() => handleShowDeleteForm()} size="small">
            <Delete sx={{ color: theme.palette.error.main }} />
          </DeleteIconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}> 
          <Collapse in={showDeleteForm} timeout="auto" unmountOnExit>
            <Box>
              <DeleteCategoryForm onCancelButtonClicked={onCancelButtonClicked} category={category}/>
            </Box>
          </Collapse>
          <Collapse in={openEditForm} timeout="auto" unmountOnExit>
            <Box>
              <EditCategoryForm
                category={category}
                updateCategoryName={updateCategoryName}
              />
            </Box>
          </Collapse>
          <Collapse in={showSubcategories} timeout="auto" unmountOnExit>
            <Paper
              sx={{
                margin: 2,
                padding: theme.spacing(3),
                display: "block",
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                component="div"
                sx={{ fontWeight: 500 }}
              >
                {`Subcategories of ${category?.name?.toUpperCase()}`}
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">NAME</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <CategorySubcategories subcategories={subcategories} />
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
