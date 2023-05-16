import { React, useState, Fragment } from "react";
import { TableRow, TableCell, Button, Collapse, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Delete, Edit } from "@mui/icons-material";
import EditSubcategoryForm from "./EditSubcategoryForm";
import { theme } from "../../theme";

export default function CategorySubcategoriesRow(props) {
  const [subcategory, setSubcategory] = useState(props.subcategory);
  const [openEditSubcategoryForm, setOpenEditSubcategoryForm] = useState(false);

  function handleOpenEditSubcategoryForm() {
    setOpenEditSubcategoryForm((prev) => !prev);
  }

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
      //backgroundColor: "#Cdf3d0",
      //color: theme.palette.white.main,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const StyledButton = styled(Button)({
    boxShadow: "none",
  });

  return (
    <Fragment>
      <StyledTableRow>
        <TableCell component="th" scope="row">
          {subcategory?.name}
        </TableCell>
        <TableCell align="center">{subcategory?.productsCount}</TableCell>
        <TableCell align="center">{subcategory?.createdBy}</TableCell>
        <TableCell align="center">
          <StyledButton
            onClick={handleOpenEditSubcategoryForm}
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
      <TableRow>
        <TableCell colSpan={9}>
          <Collapse in={openEditSubcategoryForm} timeout="auto" unmountOnExit>      
              <EditSubcategoryForm subcategory={subcategory} />
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}
