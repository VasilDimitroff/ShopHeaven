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
  Chip,
  Grid,
  Tooltip,
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
  Person,
  ShoppingBag,
  Category,
  Label,
} from "@mui/icons-material";
import EditCategoryForm from "./EditCategoryForm";
import CreateSubcategory from "./subcategories/CreateSubcategory";
import CategorySubcategoriesRow from "./subcategories/CategorySubcategoriesRow";
import DeleteCategoryForm from "./DeleteCategoryForm";

export default function AdminCategoriesRow(props) {
  const [category, setCategory] = useState(props.category);
  const [isDeleted, setIsDeleted] = useState(false);
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

  function categoryDeleted() {
    setIsDeleted(true);
  }

  function categoryUndeleted() {
    setIsDeleted(false);
  }

  function subcategoriesUpdated(newSubcategory) {
    setSubcategories((prev) => {
      return [...prev, newSubcategory];
    });
    console.log(newSubcategory);
  }

  function onCancelButtonClicked() {
    setShowDeleteForm((prev) => !prev);
  }

  function handleShowEditForm() {
    if (isDeleted) {
      return;
    }
    setShowSubcategories(false);
    setShowDeleteForm(false);
    setOpenEditForm((prev) => !prev);
  }

  function handleShowDeleteForm() {
    setShowSubcategories(false);
    setOpenEditForm(false);
    setShowDeleteForm((prev) => !prev);
  }

  function handleShowSubcategories() {
    if (isDeleted) {
      return;
    }
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
    "&:hover": {
      cursor: "pointer",
      background: "#EAEAF7",
    },
  });

  const StyledIconButton = styled(IconButton)({
    borderWidth: "1.5px",
    borderStyle: "solid",
  });

  const CategoryInfoText = styled(Box)({
    fontSize: 11,
    fontWeight: 400,
    [theme.breakpoints.down("lg")]: {
      marginTop: theme.spacing(0.4),
    },
  });

  const CategoryInfoHolder = styled(Box)({
    marginTop: theme.spacing(1),
    [theme.breakpoints.up("lg")]: {
      display: "flex",
      alignItems: "center",
      gap: 15,
    },
  });

  function renderCategoryProductsCount() {
    return subcategories?.reduce((a, b) => a + b?.productsCount, 0);
  }

  return (
    <Fragment>
      <TableRow
        sx={{
          "&:hover": {
            cursor: "pointer",
            background: "#EAEAF7",
          },
          "& > *": { borderBottom: "unset" },
        }}
      >
        <CategoryNameTableCell
          onClick={handleShowSubcategories}
          component="th"
          scope="row"
        >
          <IconButton aria-label="expand row" size="small">
            {showSubcategories ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
          {!isDeleted ? <>{category?.name}</> : "CATEGORY DELETED"}
          {!isDeleted ? (
            <Grid container spacing={1} columns={3}>
              <Grid item xs={3} sm={1} md={1} lg={1}>
                <Tooltip
                  title={`${subcategories?.length} subcategories`}
                  placement="bottom-start"
                  arrow
                >
                  <CategoryInfoText>
                    <Chip
                      sx={{ padding: 0.5 }}
                      icon={<Category />}
                      variant="outlined"
                      color="primary"
                      label={`${subcategories?.length} subcategories`}
                      size="small"
                    />
                  </CategoryInfoText>
                </Tooltip>
              </Grid>
              <Grid item xs={3} sm={1} md={1} lg={1}>
                <Tooltip
                  placement="bottom-start"
                  title={`${renderCategoryProductsCount()} products`}
                  arrow
                >
                  <CategoryInfoText>
                    <Chip
                      sx={{ padding: 0.5 }}
                      icon={<ShoppingBag />}
                      variant="outlined"
                      color="primary"
                      label={`${renderCategoryProductsCount()} products`}
                      size="small"
                    />
                  </CategoryInfoText>
                </Tooltip>
              </Grid>
              <Grid item xs={3} sm={1} md={1} lg={1}>
                <Tooltip
                  placement="bottom-start"
                  title={`Created by: ${category?.createdBy}`}
                  arrow
                >
                  <CategoryInfoText>
                    <Chip
                      sx={{ padding: 0.5 }}
                      icon={<Person />}
                      variant="outlined"
                      label={`By: ${category?.createdBy}`}
                      size="small"
                      color="primary"
                    />
                  </CategoryInfoText>
                </Tooltip>
              </Grid>
            </Grid>
          ) : (
            <></>
          )}
        </CategoryNameTableCell>
        <TableCell>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <StyledIconButton
                onClick={() => handleShowEditForm()}
                color="warning"
                size="small"
              >
                <Edit />
              </StyledIconButton>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <StyledIconButton
                onClick={handleShowDeleteForm}
                color="error"
                size="small"
              >
                <Delete />
              </StyledIconButton>
            </Grid>
          </Grid>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={showDeleteForm} timeout="auto" unmountOnExit>
            <Box>
              <DeleteCategoryForm
                categoryDeleted={categoryDeleted}
                categoryUndeleted={categoryUndeleted}
                onCancelButtonClicked={onCancelButtonClicked}
                category={category}
              />
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
                marginTop: 2,
                padding: theme.spacing(2),
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
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subcategories?.map((subcategory) => (
                    <CategorySubcategoriesRow
                      key={subcategory?.id}
                      subcategory={subcategory}
                    />
                  ))}
                </TableBody>
              </Table>
              <StyledButtonBox>
                {openSubcategoryForm ? (
                  <Button
                    onClick={handleOpenSubcategoryForm}
                    variant="contained"
                    color="secondary"
                    size="medium"
                    startIcon={<RemoveCircle />}
                  >
                    Hide creation form
                  </Button>
                ) : (
                  <Button
                    color="secondary"
                    onClick={handleOpenSubcategoryForm}
                    variant="contained"
                    size="medium"
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
