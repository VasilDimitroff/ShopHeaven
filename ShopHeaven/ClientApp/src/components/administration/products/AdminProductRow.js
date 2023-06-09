import { React, useState, Fragment } from "react";
import {
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Chip,
  Box,
  Grid,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { ActionIconButton } from "../../../styles/styles";
import { theme } from "../../../theme";
import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  Star,
  RateReview,
  Person,
  Edit,
  Delete,
  Check,
  Close,
  Percent,
  OpenInNew
} from "@mui/icons-material";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";
import useAppSettings from "../../../hooks/useAppSettings";
import { Link } from "react-router-dom";

export default function AdminProductRow(props) {
  const { appSettings } = useAppSettings();

  const [product, setProduct] = useState(props.product);
  const [isDeleted, setIsDeleted] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [openDeleteForm, setOpenDeleteForm] = useState(false);

  function handleSetOpenEditForm() {
    if (isDeleted) {
      return;
    }
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

  function updateProduct(updatedProduct) {
    console.log("UPDATED PRODUCT", updatedProduct);
    setProduct(updatedProduct);
  }

  function productDeleted() {
    setIsDeleted(true);
  }

  function productUndeleted() {
    setIsDeleted(false);
  }

  const ProductNameTableCell = styled(TableCell)({
    fontWeight: 500,
    fontSize: 18,
  });

  const ProductInfoText = styled(Box)({
    fontSize: 13,
    fontWeight: 400,
    [theme.breakpoints.down("lg")]: {
      //marginTop: theme.spacing(0.4),
    },
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
        <ProductNameTableCell
          onClick={handleSetOpenEditForm}
          component="th"
          scope="row"
        >
          <IconButton size="small">
            {openEditForm ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
          {!isDeleted ? (
            <>
              {product?.name}
              <Link to={`/products/${product?.id}`}>
              <Chip
                sx={{fontSize: 10, pl: 1, mb: 0.5, marginLeft: theme.spacing(1) }}
                icon={<OpenInNew/>}
                color="primary"
                clickable={true}
                variant="contained"
                label={``}
                size="small"
              />
              </Link>
            </>
          ) : (
            "PRODUCT DELETED"
          )}
          {!isDeleted ? (
            <Fragment>
              <Grid container spacing={1} columns={8}>
                <Grid item xs={8} sm={4} md={2} lg={1}>
                  <Tooltip
                    placement="bottom-start"
                    title={`Price: ${appSettings.appCurrency.code} ${(
                      product?.price -
                      (product.discount / 100) * product?.price
                    ).toFixed(2)}`}
                    arrow
                  >
                    <ProductInfoText>
                      <Chip
                        sx={{ padding: 0.5 }}
                        variant="outlined"
                        icon={product?.discount > 0 ? <Percent /> : <></>}
                        color="primary"
                        label={`${appSettings.appCurrency.code} ${(
                          product?.price -
                          (product.discount / 100) * product?.price
                        ).toFixed(2)}`}
                        size="small"
                      />
                    </ProductInfoText>
                  </Tooltip>
                </Grid>
                <Grid item xs={8} sm={4} md={2} lg={1}>
                  <Tooltip
                    placement="bottom-start"
                    title={
                      product?.isAvailable
                        ? "Product is In Stock"
                        : "Product is Out of Stock"
                    }
                    arrow
                  >
                    <ProductInfoText>
                      <Chip
                        sx={{ padding: 0.5 }}
                        icon={product?.isAvailable ? <Check /> : <Close />}
                        variant="outlined"
                        color="primary"
                        label={
                          product?.isAvailable ? "In Stock" : "Out of Stock"
                        }
                        size="small"
                      />
                    </ProductInfoText>
                  </Tooltip>
                </Grid>
                <Grid item xs={8} sm={4} md={2} lg={1}>
                  <Tooltip
                    placement="bottom-start"
                    title={
                      product?.hasGuarantee
                        ? "Product has warranty"
                        : "Product hasn't warranty"
                    }
                    arrow
                  >
                    <ProductInfoText>
                      <Chip
                        sx={{ padding: 0.5 }}
                        icon={product?.hasGuarantee ? <Check /> : <Close />}
                        variant="outlined"
                        color="primary"
                        label={
                          product?.hasGuarantee ? "Warranty" : "No warranty"
                        }
                        size="small"
                      />
                    </ProductInfoText>
                  </Tooltip>
                </Grid>
                <Grid item xs={8} sm={4} md={2} lg={1}>
                  <Tooltip
                    placement="bottom-start"
                    title={`Product's rating is ${product?.rating}`}
                    arrow
                  >
                    <ProductInfoText>
                      <Chip
                        sx={{ padding: 0.5 }}
                        icon={<Star />}
                        variant="outlined"
                        color="primary"
                        label={`Rating: ${product?.rating}`}
                        size="small"
                      />
                    </ProductInfoText>
                  </Tooltip>
                </Grid>
                <Grid item xs={8} sm={4} md={2} lg={1}>
                  <Tooltip
                    placement="bottom-start"
                    title={`Product has ${product?.reviewsCount} reviews`}
                    arrow
                  >
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
                  </Tooltip>
                </Grid>
                <Grid item xs={8} sm={4} md={2} lg={1}>
                  <Tooltip
                    placement="bottom-start"
                    title={`Product is created by ${product?.createdBy}`}
                    arrow
                  >
                    <ProductInfoText>
                      <Chip
                        sx={{ padding: 0.5 }}
                        icon={<Person />}
                        variant="outlined"
                        color="primary"
                        label={`By: ${product?.createdBy}`}
                        size="small"
                      />
                    </ProductInfoText>
                  </Tooltip>
                </Grid>
                <Grid item xs={8} sm={4} md={2} lg={1}>
                  <Tooltip
                    placement="bottom-start"
                    title={`Product's main category is ${product?.categoryName}`}
                    arrow
                  >
                    <ProductInfoText>
                      <Chip
                        sx={{ padding: 0.5 }}
                        color="primary"
                        variant="outlined"
                        label={`${product?.categoryName}`}
                        size="small"
                      />
                    </ProductInfoText>
                  </Tooltip>
                </Grid>
                <Grid item xs={8} sm={4} md={2} lg={1}>
                  <Tooltip
                    placement="bottom-start"
                    title={`Product's subcategory is ${product?.subcategoryName}`}
                    arrow
                  >
                    <ProductInfoText>
                      <Chip
                        sx={{ padding: 0.5 }}
                        color="primary"
                        variant="outlined"
                        label={`${product?.subcategoryName}`}
                        size="small"
                      />
                    </ProductInfoText>
                  </Tooltip>
                </Grid>
              </Grid>
            </Fragment>
          ) : (
            <></>
          )}
        </ProductNameTableCell>
        <TableCell align="center">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <ActionIconButton
                onClick={handleSetOpenEditForm}
                color="warning"
                size="small"
              >
                <Edit />
              </ActionIconButton>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <ActionIconButton
                onClick={handleSetOpenDeleteForm}
                color="error"
                size="small"
              >
                <Delete />
              </ActionIconButton>
            </Grid>
          </Grid>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={openEditForm} timeout="auto" unmountOnExit>
            <EditProduct
              product={product}
              categories={props.categories}
              updateProduct={updateProduct}
            />
          </Collapse>
          <Collapse in={openDeleteForm} timeout="auto" unmountOnExit>
            <DeleteProduct
              product={product}
              productDeleted={productDeleted}
              productUndeleted={productUndeleted}
              onCancelButtonClicked={onCancelButtonClicked}
            />
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}
