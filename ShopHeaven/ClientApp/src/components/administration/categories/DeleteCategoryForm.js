import { React, useState, Fragment, useRef, useEffect } from "react";
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
import { ApiEndpoints } from "../../../api/endpoints";
import {
  deleteCategory,
  undeleteCategory,
} from "../../../services/categoriesService";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export default function DeleteCategoryForm(props) {
  let { auth } = useAuth();

  const axiosPrivate = useAxiosPrivate();
  const effectRun = useRef(false);
  const [category, setCategory] = useState(props.category);
  const [response, setResponse] = useState(undefined);
  const [deleteButtonClicked, setDeleteButtonClicked] = useState(false);
  const [deleteCategoryResponseMessage, setDeleteCategoryResponseMessage] =
    useState("");
  const [deleteCategoryErrorMessage, setDeleteCategoryErrorMessage] =
    useState(false);

    useEffect(() => {
      
      const controller = new AbortController();
  
      const deleteCategory = async () => {
        try {
          console.log(category.id)
          const response = await axiosPrivate.post(
            ApiEndpoints.categories.deleteCategory,
            JSON.stringify({ categoryId: category.id }),
            {
              signal: controller.signal,
            }
          );
  
          setDeleteCategoryErrorMessage("");
          setDeleteCategoryResponseMessage(
            "Category " + category.name + " deleted!"
          );
          setResponse(response?.data);
          console.log(response?.data);
  
        } catch (error) {
          setDeleteCategoryResponseMessage("");
          if (
            error?.response?.status === 401 ||
            error?.response?.status === 403
          ) {
            setDeleteCategoryErrorMessage(
              "You have no permissions to perform the operation"
            );
          } else {
            setDeleteCategoryErrorMessage("Error!");
          }
          console.log(error.message);
          //navigate("/login", { state: { from: location }, replace: true })
        }
  
        return response;
      };
      if (effectRun.current) {
        deleteCategory();
      }
  
      return () => {
        controller.abort();
        effectRun.current = true; // update the value of effectRun to true
      };
    }, []);


  function refreshPage() {
    window.location.reload(false);
  }

  function onDeleteCategory() {
    console.log("AUTH IS: " + auth.userId);
    console.log("AUTH JWT: " + auth.jwtToken);
    console.log("CAT ID: " + category.id);

    setDeleteButtonClicked(prev => !prev);
    //deleteCurrentCategory(category.id);
  }

  async function deleteCurrentCategoryOLD(categoryId) {
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

  function onUndeleteCategory() {
    console.log("AUTH IS: " + auth.userId);
    console.log("AUTH JWT: " + auth.jwtToken);
    console.log("CAT ID: " + category.id);

    undeleteCurrentCategory(category.id);
  }

  async function undeleteCurrentCategory(categoryId) {
    try {
      const response = await undeleteCategory(categoryId, auth.jwtToken);
      setDeleteCategoryErrorMessage("");
      setDeleteCategoryResponseMessage(
        "Category " + category.name + " undeleted!"
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
            <Button
              size="small"
              variant="contained"
              color="error"
              onClick={onUndeleteCategory}
            >
              UNDO
            </Button>
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
              onClick={props.onCancelButtonClicked}
              type="submit"
              size="large"
              variant="contained"
              color="error"
            >
              CANCEL
            </DeleteCategoryButton>
            <DeleteCategoryButton
              onClick={onDeleteCategory}
              type="submit"
              size="large"
              variant="outlined"
              color="error"
            >
              DELETE CATEGORY
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
