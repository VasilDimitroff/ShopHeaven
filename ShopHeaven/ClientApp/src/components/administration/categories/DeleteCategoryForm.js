import { React, useState, Fragment } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Alert,
  AlertTitle,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../../theme";
import { deleteCategory } from "../../../services/categoriesService";
import useAuth from "../../../hooks/useAuth";

export default function DeleteCategoryForm(props) {
  let { auth } = useAuth();

  const [category, setCategory] = useState(props.category);
  const [response, setResponse] = useState(undefined);
  const [deleteCategoryResponseMessage, setDeleteCategoryResponseMessage] =
    useState("");
  const [deleteCategoryErrorMessage, setDeleteCategoryErrorMessage] =
    useState(false);

  function refreshPage() {
    window.location.reload(false);
  }

  function onDeleteCategory() {
    console.log("AUTH IS: " + auth.userId);
    console.log("AUTH JWT: " + auth.jwtToken);
    console.log("CAT ID: " + category.id);

    deleteCurrentCategory(category.id);
  }

  async function deleteCurrentCategory(categoryId) {
    try {
      const response = await deleteCategory(categoryId, auth.jwtToken);
      setDeleteCategoryErrorMessage("");
      setDeleteCategoryResponseMessage(
        "Category " + category.name + " deleted!"
      );
      setResponse(response?.data);
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

  const ResponseMessage = styled(Typography)({
    textAlign: "center",
    color: theme.palette.success.main,
  });

  const ErrorResponseMessage = styled(Typography)({
    textAlign: "center",
    color: theme.palette.error.main,
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
          <AlertTitle>Category {category.name} successfuly deleted!</AlertTitle>
          <ul>
            <li>1 category deleted</li>
            <li>{response?.deletedSubcategories} subcategories deleted</li>
            <li>{response?.deletedProducts} products deleted</li>
            <li>{response?.deletedReviews} reviews deleted</li>
            <li>{response?.deletedTags} tags deleted</li>
            <li>{response?.deletedCarts} cart products deleted</li>
            <li>{response?.deletedWishlists} wishlist products deleted</li>
            <li>{response?.deletedOrders} order products deleted</li>
            <li>{response?.deletedLabels} labels of products deleted</li>
            <li>{response?.deletedImages} product images deleted</li>
            <li>
              {response?.deletedSpecifications} product specifications deleted
            </li>
          </ul>
          <Box sx={{display: "flex", gap: 2}}>
            <Button size="small" variant="contained" color="error" onClick={refreshPage}>UNDO</Button>
            <Button size="small" variant="contained" onClick={refreshPage}>REFRESH</Button>
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
              You are on the way to delete category{" "}
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
              type="submit"
              size="large"
              variant="contained"
              color="error"
            >
              CANCEL
            </DeleteCategoryButton>
          </ButtonsHolder>
          <ResponseMessage>{deleteCategoryResponseMessage}</ResponseMessage>
          <ErrorResponseMessage>
            {deleteCategoryErrorMessage}
          </ErrorResponseMessage>
        </Fragment>
      )}
    </Paper>
  );
}
