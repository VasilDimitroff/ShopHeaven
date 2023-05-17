import { React, useState, Fragment } from "react";
import { TableRow, TableCell, Chip, Collapse, Typography, Box, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Delete, Edit } from "@mui/icons-material";
import EditSubcategoryForm from "./EditSubcategoryForm";
import { theme } from "../../../../theme";

export default function CategorySubcategoriesRow(props) {
  const [subcategory, setSubcategory] = useState(props.subcategory);
  const [openEditSubcategoryForm, setOpenEditSubcategoryForm] = useState(false);

  function subcategoryUpdated(newCategory) {
      setSubcategory(newCategory)
  }

  function handleOpenEditSubcategoryForm() {
    setOpenEditSubcategoryForm((prev) => !prev);
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
      marginTop: theme.spacing(0.4)
    },
  });

  const StyledIconButton = styled(IconButton)({
    borderWidth: "1.5px",
    borderStyle: "solid",
    margin: theme.spacing(1),
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(1)
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
      <StyledTableRow>
        <TableCell component="th" scope="row">
          <Typography sx={{fontSize: 17, fontWeight: 500}}>{subcategory?.name}</Typography>
          <CategoryInfoHolder>
           <SubcategoryInfoText><Chip color="primary" variant="outlined" label={`${subcategory?.productsCount} products`} size="small"/></SubcategoryInfoText>
           <SubcategoryInfoText><Chip variant="outlined" label={`By: ${subcategory?.createdBy}`} size="small"/></SubcategoryInfoText>
          </CategoryInfoHolder>
        </TableCell>
        <TableCell align="center">
           <StyledIconButton onClick={() => handleOpenEditSubcategoryForm()} sx={{borderColor: theme.palette.warning.main}} size="small">
            <Edit sx={{ color: theme.palette.warning.main }} />
          </StyledIconButton>
          <StyledIconButton onClick={() => handleOpenEditSubcategoryForm()} sx={{borderColor: theme.palette.error.main}} size="small">
            <Delete sx={{ color: theme.palette.error.main }} />
          </StyledIconButton>
        </TableCell>
      </StyledTableRow>
      <TableRow>
        <TableCell colSpan={9}>
          <Collapse in={openEditSubcategoryForm} timeout="auto" unmountOnExit>      
              <EditSubcategoryForm subcategoryUpdated={subcategoryUpdated} subcategory={subcategory} />
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}
