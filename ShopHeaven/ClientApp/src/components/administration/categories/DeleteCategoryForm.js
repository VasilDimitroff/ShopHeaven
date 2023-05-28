import { React, useState, Fragment } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Alert,
  AlertTitle,
  Zoom,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Delete, Cancel, Refresh, Undo } from "@mui/icons-material";
import { theme } from "../../../theme";
import { ApiEndpoints } from "../../../api/endpoints";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export default function DeleteCategoryForm(props) {
  let axiosPrivate = useAxiosPrivate();

  const [category, setCategory] = useState(props.category);
  const [deleteResponse, setDeleteResponse] = useState(undefined);
  const [undeleteResponse, setUndeleteResponse] = useState(undefined);
  const [undoDeleteButtonClicked, setUndoDeleteButtonClicked] = useState(false);
  const [deleteCategoryResponseMessage, setDeleteCategoryResponseMessage] =
    useState("");
  const [deleteCategoryErrorMessage, setDeleteCategoryErrorMessage] =
    useState("");

  function refreshPage() {
    window.location.reload(false);
  }

  function onDeleteCategory() {
    deleteCategory(category.id);
  }

  async function deleteCategory(categoryId) {
    try {
      const controller = new AbortController();

      const response = await axiosPrivate.post(
        ApiEndpoints.categories.deleteCategory,
        JSON.stringify({ categoryId: categoryId }),
        {
          signal: controller.signal,
        }
      );

      controller.abort();

      setDeleteCategoryErrorMessage("");
      setDeleteCategoryResponseMessage(
        "Category " + category.name + " deleted!"
      );
      setUndeleteResponse(undefined);
      setDeleteResponse(response?.data);
      setUndoDeleteButtonClicked(false);
      props.categoryDeleted();
      console.log(response?.data);
    } catch (error) {
      setDeleteCategoryResponseMessage("");
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        setDeleteCategoryErrorMessage(
          "You have no permissions to perform the operation"
        );
      } else {
        setDeleteCategoryErrorMessage("Error!");
      }
      console.log(error.message);
    }
  }

  function onUndeleteCategory() {
    undeleteCategory(category.id);
  }

  async function undeleteCategory(categoryId) {
    try {
      const controller = new AbortController();
      const response = await axiosPrivate.post(
        ApiEndpoints.categories.undeleteCategory,
        JSON.stringify({ categoryId: categoryId }),
        {
          signal: controller.signal,
        }
      );

      controller.abort();

      setDeleteCategoryErrorMessage("");
      setDeleteCategoryResponseMessage(
        "Category " + category.name + " undeleted!"
      );
      setDeleteResponse(undefined);
      setUndeleteResponse(response?.data);
      setUndoDeleteButtonClicked(true);

      props.categoryUndeleted();
      console.log(response?.data);
    } catch (error) {
      setDeleteCategoryResponseMessage("");
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        setDeleteCategoryErrorMessage(
          "You have no permissions to perform the operation"
        );
      } else {
        setDeleteCategoryErrorMessage("Error!");
      }
      console.log(error.message);
    }
  }

  const DeleteCategoryButton = styled(Button)({
    width: "100%",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
  });

  return (
    <Paper sx={{ padding: theme.spacing(2), marginTop: theme.spacing(2) }}>
      {deleteResponse || undeleteResponse ? (
        deleteResponse ? (
          <Alert severity="warning">
            <AlertTitle>
              Category {category.name} successfully deleted!
            </AlertTitle>
            <ul>
              <li>1 category deleted</li>
              <li>
                {deleteResponse?.deletedSubcategories} subcategories deleted
              </li>
              <li>{deleteResponse?.deletedProducts} products deleted</li>
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


            <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
            {!undoDeleteButtonClicked ? (
                <Button
                  startIcon={<Undo />}
                  size="small"
                  variant="contained"
                  color="error"
                  onClick={onUndeleteCategory}
                >
                  UNDO DELETE
                </Button>
              ) : (
                ""
              )}
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={6}
              sx={{ position: "relative" }}
            >
                   <Button
                startIcon={<Refresh />}
                size="small"
                variant="contained"
                onClick={refreshPage}
              >
                REFRESH
              </Button>
            </Grid>
          </Grid>

          </Alert>
        ) : (
          <Alert severity="success">
            <AlertTitle>
              Category {category.name} successfully revealed!
            </AlertTitle>
            <ul>
              <li>1 category revealed</li>
              <li>
                {undeleteResponse?.revealedSubcategories} subcategories revealed
              </li>
              <li>{undeleteResponse?.revealedProducts} products revealed</li>
              <li>{undeleteResponse?.revealedReviews} reviews revealed</li>
              <li>{undeleteResponse?.revealedTags} tags revealed</li>
              <li>{undeleteResponse?.revealedCarts} cart products revealed</li>
              <li>
                {undeleteResponse?.revealedWishlists} wishlist products revealed
              </li>
              <li>
                {undeleteResponse?.revealedOrders} order products revealed
              </li>
              <li>
                {undeleteResponse?.revealedLabels} labels of products revealed
              </li>
              <li>
                {undeleteResponse?.revealedImages} product images revealed
              </li>
              <li>
                {undeleteResponse?.revealedSpecifications} product
                specifications revealed
              </li>
            </ul>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                startIcon={<Refresh />}
                size="small"
                variant="contained"
                onClick={refreshPage}
              >
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
              You are on the way to delete category
              {category.name.toUpperCase()}!
            </Typography>
            <Typography variant="p" color="error">
              If you do that, you will delete all related subcategories and
              products in it!
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <DeleteCategoryButton
                onClick={onDeleteCategory}
                type="submit"
                size="large"
                variant="outlined"
                color="error"
                startIcon={<Delete />}
              >
                DELETE
              </DeleteCategoryButton>
            </Grid>
            <Grid
              item
              xs={6}
              sm={6}
              md={6}
              lg={6}
              sx={{ position: "relative" }}
            >
              <DeleteCategoryButton
                onClick={props.onCancelButtonClicked}
                type="submit"
                size="large"
                variant="contained"
                color="error"
                startIcon={<Cancel />}
              >
                CANCEL
              </DeleteCategoryButton>
            </Grid>
          </Grid>

          {deleteCategoryResponseMessage ? (
            <Zoom in={deleteCategoryResponseMessage.length > 0 ? true : false}>
              <Alert sx={{ marginTop: theme.spacing(1) }} severity="success">
                {deleteCategoryResponseMessage}
              </Alert>
            </Zoom>
          ) : (
            ""
          )}
          {deleteCategoryErrorMessage ? (
            <Zoom in={deleteCategoryErrorMessage.length > 0 ? true : false}>
              <Alert sx={{ marginTop: theme.spacing(1) }} severity="error">
                {deleteCategoryErrorMessage}
              </Alert>
            </Zoom>
          ) : (
            ""
          )}
        </Fragment>
      )}
    </Paper>
  );
}
