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
import { theme } from "../../../theme";
import { ApiEndpoints } from "../../../api/endpoints";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export default function DeleteCategoryForm(props) {
  let axiosPrivate = useAxiosPrivate();

  const [category, setCategory] = useState(props.category);
  const [response, setResponse] = useState(undefined);
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
      setResponse(response?.data);
      setUndoDeleteButtonClicked(false);
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
      setResponse(response?.data);
      setUndoDeleteButtonClicked(true)
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

  const ButtonsHolder = styled(Box)({
    display: "flex",
    width: "100%",
    margin: "auto",
    gap: 60,
    justifyContent: "center",
  });

  return (
    <Paper sx={{ padding: theme.spacing(2), marginTop: theme.spacing(2) }}>
      {response ? (
        <Alert severity="info">
          <AlertTitle>
            Category {category.name} state successfuly updated!
          </AlertTitle>
          <ul>
            <li>1 category affected</li>
            <li>{response?.deletedSubcategories} subcategories affected</li>
            <li>{response?.deletedProducts} products affected</li>
            <li>{response?.deletedReviews} reviews affected</li>
            <li>{response?.deletedTags} tags affected</li>
            <li>{response?.deletedCarts} cart products affected</li>
            <li>{response?.deletedWishlists} wishlist products affected</li>
            <li>{response?.deletedOrders} order products affected</li>
            <li>{response?.deletedLabels} labels of products affected</li>
            <li>{response?.deletedImages} product images affected</li>
            <li>
              {response?.deletedSpecifications} product specifications affected
            </li>
          </ul>
          <Box sx={{ display: "flex", gap: 2 }}>
            {
              !undoDeleteButtonClicked
              ?
              (<Button
              size="small"
              variant="contained"
              color="error"
              onClick={onUndeleteCategory}>UNDO DELETE
              </Button>)
              :
              ""
            }
            <Button size="small" variant="contained" onClick={refreshPage}>
              REFRESH
            </Button>
          </Box>
        </Alert>
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
          <ButtonsHolder>
            <DeleteCategoryButton
              onClick={onDeleteCategory}
              type="submit"
              size="large"
              variant="outlined"
              color="error"
            >
              DELETE CATEGORY
            </DeleteCategoryButton>
            <DeleteCategoryButton
              onClick={props.onCancelButtonClicked}
              type="submit"
              size="large"
              variant="contained"
              color="error"
            >
              CANCEL
            </DeleteCategoryButton>
          </ButtonsHolder>
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
