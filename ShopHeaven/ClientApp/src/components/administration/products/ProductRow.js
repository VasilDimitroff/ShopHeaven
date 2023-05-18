import { React, useState, Fragment, useRef, useEffect } from "react";
import {
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Chip,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../../theme";
import { KeyboardArrowUp, KeyboardArrowDown, Star, RateReview, Person } from "@mui/icons-material";
import EditProduct from "./EditProduct";

export default function ProductRow(props) {
  const [product, setProduct] = useState(props.product);
  const [openEditForm, setOpenEditForm] = useState(false);

  function handleSetOpenEditForm() {
    setOpenEditForm(prev => !prev);
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
      marginTop: theme.spacing(0.4)
    },
  })

  return (
    <Fragment>
      <TableRow>
        <TableCell sx={{width: "20px", padding: 0, paddingLeft: 1}}>
          <IconButton
            size="small"
            onClick={() => handleSetOpenEditForm()}
          >
            {openEditForm ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <ProductNameTableCell component="th" scope="row">
          {product?.name}
          <ProductInfoHolder>
            <ProductInfoText><Chip sx={{padding: 0.5}} icon={<Star/>} variant="outlined" color="warning" label={`Rating: ${product?.rating}`} size="small"/></ProductInfoText>
            <ProductInfoText><Chip sx={{padding: 0.5}} icon={<RateReview/>}variant="outlined" color="primary" label={`${product?.reviewsCount} reviews`} size="small"/></ProductInfoText>
            <ProductInfoText><Chip sx={{padding: 0.5}} icon={<Person/>} variant="outlined" label={`By: ${product?.createdBy}`} size="small"/></ProductInfoText>
          </ProductInfoHolder>
        </ProductNameTableCell>
        <TableCell align="center">{product?.rating}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={openEditForm} timeout="auto" unmountOnExit>
            <EditProduct product={product} categories={props.categories} />
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}
