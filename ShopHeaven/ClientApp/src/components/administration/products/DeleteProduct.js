import { React, useState, Fragment } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Alert,
  AlertTitle,
  Zoom,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Delete, Cancel, Undo, Refresh } from "@mui/icons-material";
import { theme } from "../../../theme";
import { ApiEndpoints } from "../../../api/endpoints";
import { noPermissionsForOperationMessage } from "../../../constants";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export default function DeleteProduct(props) {
  let axiosPrivate = useAxiosPrivate();

  const [product, setProduct] = useState(props.product);
  const [deleteResponse, setDeleteResponse] = useState(undefined);
  const [undeleteResponse, setUndeleteResponse] = useState(undefined);
  const [undoDeleteButtonClicked, setUndoDeleteButtonClicked] = useState(false);
  const [deleteProductResponseMessage, setDeleteProductResponseMessage] =
    useState("");
  const [deleteProductErrorMessage, setDeleteProductErrorMessage] =
    useState("");
  const [isDeleted, setIsDeleted] = useState(false);

  function refreshPage() {
    window.location.reload(false);
  }

  function onDeleteProduct() {
    deleteProduct(product.id);
  }

  async function deleteProduct(productId) {
    try {
      const controller = new AbortController();

      const response = await axiosPrivate.post(
        ApiEndpoints.products.deleteProduct,
        JSON.stringify({ id: productId }),
        {
          signal: controller.signal,
        }
      );

      controller.abort();

      setDeleteProductErrorMessage("");
      setDeleteProductResponseMessage(
        "Product " + product.name + " deleted!"
      );
      setUndeleteResponse(undefined);
      setDeleteResponse(response?.data);
      setUndoDeleteButtonClicked(false);
      
      setIsDeleted(true);
      props.productDeleted();
      console.log(response?.data);
    } catch (error) {
      setDeleteProductResponseMessage("");
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        setDeleteProductErrorMessage(
          noPermissionsForOperationMessage
        );
      } else {
        setDeleteProductErrorMessage(error?.response?.data);
      }
      console.log(error.message);
    }
  } 

  function onUndeleteProduct() {
    undeleteProduct(product.id);
  }

  const ErrorAlert = styled(Alert)({
    fontWeight: 500,
    color: theme.palette.error.main,
  });

  async function undeleteProduct(productId) {
    try {
      const controller = new AbortController();
      const response = await axiosPrivate.post(
        ApiEndpoints.products.undeleteProduct,
        JSON.stringify({ id: productId }),
        {
          signal: controller.signal,
        }
      );

      controller.abort();

      setDeleteProductErrorMessage("");
      setDeleteProductResponseMessage(
        "Product " + product.name + " undeleted!"
      );
      setDeleteResponse(undefined);
      setUndeleteResponse(response?.data);
      setUndoDeleteButtonClicked(true);

      setIsDeleted(false);
      props.productUndeleted();
      console.log(response?.data);
    } catch (error) {
      setDeleteProductResponseMessage("");
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        setDeleteProductErrorMessage(
          noPermissionsForOperationMessage
        );
      } else {
        setDeleteProductErrorMessage("Error!");
      }
      console.log(error.message);
    }
  }

  const DeleteProductButton = styled(Button)({
    width: "100%",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
  });

  const ButtonsHolder = styled(Box)({
    display: "flex",
    width: "100%",
    margin: "auto",
    gap: 60,
    justifyContent: "center",
  });

  return (
    <Paper sx={{ padding: theme.spacing(2), marginTop: theme.spacing(2) }}>
      {deleteResponse || undeleteResponse ? (
        deleteResponse ? (
          <Alert severity="warning">
            <AlertTitle>
              Product {product.name} successfully deleted!
            </AlertTitle>
            <ul>
              <li>1 product deleted</li>
              <li>{deleteResponse?.deletedReviews} reviews deleted</li>
              <li>{deleteResponse?.deletedTags} tags deleted</li>
              <li>{deleteResponse?.deletedCarts} cart products deleted</li>
              <li>
                {deleteResponse?.deletedWishlists} wishlist products deleted
              </li>
              <li>{deleteResponse?.deletedOrders} order products deleted</li>
              <li>
                {deleteResponse?.deletedLabels} labels of products deleted
              </li>
              <li>{deleteResponse?.deletedImages} product images deleted</li>
              <li>
                {deleteResponse?.deletedSpecifications} product specifications
                deleted
              </li>
            </ul>
            <Box sx={{ display: "flex", gap: 2 }}>
              {!undoDeleteButtonClicked ? (
                <Button
                  startIcon={<Undo />}
                  size="small"
                  variant="contained"
                  color="error"
                  onClick={onUndeleteProduct}
                >
                  UNDO DELETE
                </Button>
              ) : (
                ""
              )}
              <Button startIcon={<Refresh />} size="small" variant="contained" onClick={refreshPage}>
                REFRESH
              </Button>
            </Box>
          </Alert>
        ) : (
          <Alert severity="success">
            <AlertTitle>
              Product {product.name} successfully revealed!
            </AlertTitle>
            <ul>
              <li>1 product revealed</li>
              <li>{undeleteResponse?.revealedReviews} reviews revealed</li>
              <li>{undeleteResponse?.revealedTags} tags revealed</li>
              <li>{undeleteResponse?.revealedCarts} cart products revealed</li>
              <li>
                {undeleteResponse?.revealedWishlists} wishlist products revealed
              </li>
              <li>{undeleteResponse?.revealedOrders} order products revealed</li>
              <li>
                {undeleteResponse?.revealedLabels} labels of products revealed
              </li>
              <li>{undeleteResponse?.revealedImages} product images revealed</li>
              <li>
                {undeleteResponse?.revealedSpecifications} product specifications
                revealed
              </li>
            </ul>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button startIcon={<Refresh />} size="small" variant="contained" onClick={refreshPage}>
                REFRESH
              </Button>
            </Box>
          </Alert>
        )
      ) : (
        <Fragment>
          <Box
            sx={{
              textAlign: "center",
              marginLeft: theme.spacing(4),
              marginTop: theme.spacing(3),
            }}
          >
            <Typography variant="h6">
              You are on the way to delete product {product.name.toUpperCase()}!
            </Typography>
            <Typography variant="p" color="error">
              If you do that, you will delete all related tags, images, labels, specifications and reviews!
            </Typography>
          </Box>
          <ButtonsHolder>
            <DeleteProductButton
              startIcon={<Delete />}
              onClick={onDeleteProduct}
              type="submit"
              size="large"
              variant="outlined"
              color="error"
              disabled={isDeleted ? true : false}
            >
              DELETE PRODUCT
            </DeleteProductButton>
            <DeleteProductButton
              startIcon={<Cancel />}
              onClick={props.onCancelButtonClicked}
              type="submit"
              size="large"
              variant="contained"
              color="error"
            >
              CANCEL
            </DeleteProductButton>
          </ButtonsHolder>
          {deleteProductResponseMessage ? (
            <Zoom in={deleteProductResponseMessage.length > 0 ? true : false}>
              <Alert sx={{ marginTop: theme.spacing(1) }} severity="success">
                {deleteProductResponseMessage}
              </Alert>
            </Zoom>
          ) : (
            ""
          )}
          {deleteProductErrorMessage ? (
            <Zoom in={deleteProductErrorMessage.length > 0 ? true : false}>
              <ErrorAlert sx={{ marginTop: theme.spacing(1) }} severity="error">
                {deleteProductErrorMessage}
              </ErrorAlert>
            </Zoom>
          ) : (
            ""
          )}
        </Fragment>
      )}
    </Paper>
  );
}
