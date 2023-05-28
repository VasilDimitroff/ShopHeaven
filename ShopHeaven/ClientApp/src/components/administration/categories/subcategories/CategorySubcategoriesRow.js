import { React, useState, Fragment } from "react";
import {
  TableRow,
  TableCell,
  Chip,
  Collapse,
  Typography,
  Box,
  IconButton,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Delete, Edit, Person, ShoppingBag } from "@mui/icons-material";
import EditSubcategoryForm from "./EditSubcategoryForm";
import { theme } from "../../../../theme";
import DeleteSubcategoryForm from "./DeleteSubcategoryForm";

export default function CategorySubcategoriesRow(props) {
  const [subcategory, setSubcategory] = useState(props.subcategory);
  const [isDeleted, setIsDeleted] = useState(false);
  const [openEditSubcategoryForm, setOpenEditSubcategoryForm] = useState(false);
  const [openDeleteSubcategoryForm, setOpenDeleteSubcategoryForm] =
    useState(false);

  function subcategoryDeleted() {
    setIsDeleted(true);
  }

  function subcategoryUndeleted() {
    setIsDeleted(false);
  }

  function subcategoryUpdated(newCategory) {
    setSubcategory(newCategory);
  }

  function onCancelButtonClicked() {
    setOpenDeleteSubcategoryForm((prev) => !prev);
  }

  function handleOpenEditSubcategoryForm() {
    if (isDeleted) {
      return;
    }
    setOpenDeleteSubcategoryForm(false);
    setOpenEditSubcategoryForm((prev) => !prev);
  }

  function handleOpenDeleteSubcategoryForm() {
    setOpenEditSubcategoryForm(false);
    setOpenDeleteSubcategoryForm((prev) => !prev);
  }

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const SubcategoryInfoText = styled(Box)({
    fontSize: 13,
    fontWeight: 400,
    [theme.breakpoints.down("lg")]: {
      marginTop: theme.spacing(0.4),
    },
  });

  const StyledIconButton = styled(IconButton)({
    borderWidth: "1.5px",
    borderStyle: "solid",
    margin: theme.spacing(1),
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(1),
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

  return (
    <Fragment>
      <StyledTableRow
        sx={{
          "&:hover": {
            cursor: "pointer",
            background: "#EAEAF7",
          },
        }}
      >
        <TableCell 
          component="th"
          scope="row"
        >
          <Typography sx={{ fontSize: 17, fontWeight: 500 }}>
            {!isDeleted ? subcategory?.name : "SUBCATEGORY DELETED"}
          </Typography>
          {!isDeleted ? (
            <Grid container spacing={1}>
              <Grid item xs={8} sm={8} md={10} lg={10} onClick={handleOpenEditSubcategoryForm}>
                <CategoryInfoHolder>
                  <SubcategoryInfoText>
                    <Chip
                      sx={{ padding: 0.5 }}
                      icon={<ShoppingBag />}
                      color="primary"
                      variant="outlined"
                      label={`${subcategory?.productsCount} products`}
                      size="small"
                    />
                  </SubcategoryInfoText>
                  <SubcategoryInfoText>
                    <Chip
                      sx={{ padding: 0.5 }}
                      icon={<Person />}
                      variant="outlined"
                      label={`By: ${subcategory?.createdBy}`}
                      size="small"
                    />
                  </SubcategoryInfoText>
                </CategoryInfoHolder>
              </Grid>
              <Grid item xs={2} sm={2} md={1} lg={1}>
                <StyledIconButton
                  onClick={handleOpenEditSubcategoryForm}
                  color="warning"
                  size="small"
                >
                  <Edit />
                </StyledIconButton>
              </Grid>
              <Grid item xs={2} sm={2} md={1} lg={1}>
                <StyledIconButton
                  onClick={handleOpenDeleteSubcategoryForm}
                  color="error"
                  size="small"
                >
                  <Delete />
                </StyledIconButton>
              </Grid>
            </Grid>
          ) : (
            <></>
          )}
        </TableCell>
      </StyledTableRow>
      <TableRow>
        <TableCell colSpan={9}>
          <Collapse in={openEditSubcategoryForm} timeout="auto" unmountOnExit>
            <EditSubcategoryForm
              subcategoryUpdated={subcategoryUpdated}
              subcategory={subcategory}
            />
          </Collapse>
          <Collapse in={openDeleteSubcategoryForm} timeout="auto" unmountOnExit>
            <DeleteSubcategoryForm
              subcategoryDeleted={subcategoryDeleted}
              subcategoryUndeleted={subcategoryUndeleted}
              onCancelButtonClicked={onCancelButtonClicked}
              subcategory={subcategory}
            />
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}