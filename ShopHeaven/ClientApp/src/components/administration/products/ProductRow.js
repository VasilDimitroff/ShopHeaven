import { React, useState, Fragment } from "react";
import {
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Chip,
  Box,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../../theme";
import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  Star,
  RateReview,
  Person,
  Edit,
  Delete,
} from "@mui/icons-material";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";

export default function ProductRow(props) {
  const [product, setProduct] = useState(props.product);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [openDeleteForm, setOpenDeleteForm] = useState(false);

  function handleSetOpenEditForm() {
    setOpenDeleteForm(false);
    setOpenEditForm((prev) => !prev);
  }

  function handleSetOpenDeleteForm() {
    setOpenEditForm(false);
    setOpenDeleteForm((prev) => !prev);
  }

  function onCancelButtonClicked() {
    setOpenDeleteForm((prev) => !prev);
  }

  function updateProduct(product) {
    setProduct(product);
  }

  const ProductNameTableCell = styled(TableCell)({
    fontWeight: 500,
    fontSize: 18,
  });

  const ProductInfoHolder = styled(Box)({
    marginTop: theme.spacing(1),
    [theme.breakpoints.up("lg")]: {
      display: "flex",
      alignItems: "center",
      gap: 15,
    },
  });

  const ProductInfoText = styled(Box)({
    fontSize: 13,
    fontWeight: 400,
    [theme.breakpoints.down("lg")]: {
      marginTop: theme.spacing(0.4),
    },
  });

  const StyledIconButton = styled(IconButton)({
    borderWidth: "1.5px",
    borderStyle: "solid",
  });

  return (
    <Fragment>
      <TableRow
        sx={{
          "&:hover": {
            cursor: "pointer",
            background: "#EAEAF7",
          },
        }}
      >
        <TableCell sx={{ width: "20px", padding: 0, paddingLeft: 1 }}>
          <IconButton size="small" onClick={handleSetOpenEditForm}>
            {openEditForm ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <ProductNameTableCell
          onClick={handleSetOpenEditForm}
          component="th"
          scope="row"
        >
          {product?.name}
          <ProductInfoHolder>
            <ProductInfoText>
              <Chip
                sx={{ padding: 0.5 }}
                icon={<Star />}
                variant="outlined"
                color="warning"
                label={`Rating: ${product?.rating}`}
                size="small"
              />
            </ProductInfoText>
            <ProductInfoText>
              <Chip
                sx={{ padding: 0.5 }}
                icon={<RateReview />}
                variant="outlined"
                color="primary"
                label={`${product?.reviewsCount} reviews`}
                size="small"
              />
            </ProductInfoText>
            <ProductInfoText>
              <Chip
                sx={{ padding: 0.5 }}
                icon={<Person />}
                variant="outlined"
                label={`By: ${product?.createdBy}`}
                size="small"
              />
            </ProductInfoText>
          </ProductInfoHolder>
        </ProductNameTableCell>
        <TableCell align="center">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <StyledIconButton
                onClick={handleSetOpenEditForm}
                color="warning"
                size="small"
              >
                <Edit />
              </StyledIconButton>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <StyledIconButton onClick={handleSetOpenDeleteForm} color="error" size="small">
                <Delete />
              </StyledIconButton>
            </Grid>
          </Grid>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={openEditForm} timeout="auto" unmountOnExit>
            <EditProduct
              currencies={props.currencies}
              product={product}
              categories={props.categories}
              updateProduct={updateProduct}
            />
          </Collapse>
          <Collapse in={openDeleteForm} timeout="auto" unmountOnExit>
            <DeleteProduct
              product={product}
              onCancelButtonClicked={onCancelButtonClicked}
            />
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}