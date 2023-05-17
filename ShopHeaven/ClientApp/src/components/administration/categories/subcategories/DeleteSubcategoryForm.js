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
import { theme } from "../../../../theme";
import { ApiEndpoints } from "../../../../api/endpoints";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

export default function DeleteSubcategoryForm(props) {
  let axiosPrivate = useAxiosPrivate();

  const [subcategory, setSubategory] = useState(props.subcategory);
  const [response, setResponse] = useState(undefined);
  const [deleteSubcategoryResponseMessage, setDeleteSubcategoryResponseMessage] =
    useState("");
  const [deleteSubcategoryErrorMessage, setDeleteSubcategoryErrorMessage] =
    useState("");

  function refreshPage() {
    window.location.reload(false);
  }

  function onDeleteSubcategory() {
    deleteSubcategory(subcategory.id);
  }

  async function deleteSubcategory(subcategoryId) {
    try {
      const controller = new AbortController();

      const response = await axiosPrivate.post(
        ApiEndpoints.subcategories.deleteSubcategory,
        JSON.stringify({ subcategoryId: subcategoryId }),
        {
          signal: controller.signal,
        }
      );

      controller.abort();

      setDeleteSubcategoryErrorMessage("");
      setDeleteSubcategoryResponseMessage(
        "Subcategory " + subcategory.name + " deleted!"
      );
      setResponse(response?.data);
    } catch (error) {
      setDeleteSubcategoryResponseMessage("");
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        setDeleteSubcategoryErrorMessage(
          "You have no permissions to perform the operation"
        );
      } else {
        setDeleteSubcategoryErrorMessage("Error!");
      }
      console.log(error.message);
    }
  }

  function onUndeleteSubcategory() {
    undeleteSubcategory(subcategory.id);
  }

  async function undeleteSubcategory(subcategoryId) {
    try {
      const controller = new AbortController();
      const response = await axiosPrivate.post(
        ApiEndpoints.subcategories.undeleteSubcategory,
        JSON.stringify({ subcategoryId: subcategoryId }),
        {
          signal: controller.signal,
        }
      );

      controller.abort();

      setDeleteSubcategoryErrorMessage("");
      setDeleteSubcategoryResponseMessage(
        "Subcategory " + subcategory.name + " undeleted!"
      );
      setResponse(response?.data);
      console.log(response?.data);
    } catch (error) {
      setDeleteSubcategoryResponseMessage("");
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        setDeleteSubcategoryErrorMessage(
          "You have no permissions to perform the operation"
        );
      } else {
        setDeleteSubcategoryErrorMessage("Error!");
      }
      console.log(error.message);
    }
  }

  const DeleteSubcategoryButton = styled(Button)({
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
            Subcategory {subcategory.name} state successfuly updated!
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
              onClick={onUndeleteSubcategory}
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
              You are on the way to delete category {subcategory.name.toUpperCase()}!
            </Typography>
            <Typography variant="p" color="error">
              If you do that, you will delete all related products in it!
            </Typography>
          </Box>
          <ButtonsHolder>
            <DeleteSubcategoryButton
              onClick={onDeleteSubcategory}
              type="submit"
              size="large"
              variant="outlined"
              color="error"
            >
              DELETE CATEGORY
            </DeleteSubcategoryButton>
            <DeleteSubcategoryButton
              onClick={props.onCancelButtonClicked}
              type="submit"
              size="large"
              variant="contained"
              color="error"
            >
              CANCEL
            </DeleteSubcategoryButton>
          </ButtonsHolder>
          {deleteSubcategoryResponseMessage ? (
            <Zoom in={deleteSubcategoryResponseMessage.length > 0 ? true : false}>
              <Alert sx={{ marginTop: theme.spacing(1) }} severity="success">
                {deleteSubcategoryResponseMessage}
              </Alert>
            </Zoom>
          ) : (
            ""
          )}
          {deleteSubcategoryErrorMessage ? (
            <Zoom in={deleteSubcategoryErrorMessage.length > 0 ? true : false}>
              <Alert sx={{ marginTop: theme.spacing(1) }} severity="error">
                {deleteSubcategoryErrorMessage}
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
