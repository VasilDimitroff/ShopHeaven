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
import { Delete, Cancel, Undo, Refresh } from "@mui/icons-material";
import { theme } from "../../../../theme";
import { ApiEndpoints } from "../../../../api/endpoints";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

export default function DeleteSubcategoryForm(props) {
  let axiosPrivate = useAxiosPrivate();

  const [subcategory, setSubategory] = useState(props.subcategory);
  const [deleteResponse, setDeleteResponse] = useState(undefined);
  const [undeleteResponse, setUndeleteResponse] = useState(undefined);
  const [undoDeleteButtonClicked, setUndoDeleteButtonClicked] = useState(false);
  const [
    deleteSubcategoryResponseMessage,
    setDeleteSubcategoryResponseMessage,
  ] = useState("");
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

      setUndeleteResponse(undefined);
      setDeleteResponse(response?.data);
      setUndoDeleteButtonClicked(false);

      props.subcategoryDeleted();

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

      setDeleteResponse(undefined);
      setUndeleteResponse(response?.data);
      setUndoDeleteButtonClicked(true);

      props.subcategoryUndeleted();
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

  return (
    <Paper sx={{ padding: theme.spacing(2), marginTop: theme.spacing(2) }}>
      {deleteResponse || undeleteResponse ? (
        deleteResponse ? (
          <Alert severity="warning">
            <AlertTitle>
              Subcategory {subcategory.name} successfully deleted!
            </AlertTitle>
            <ul>
              <li>1 subcategory deleted</li>
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

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                {!undoDeleteButtonClicked ? (
                  <Button
                    startIcon={<Undo />}
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={onUndeleteSubcategory}
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
              Subcategory {subcategory.name} successfully revealed!
            </AlertTitle>
            <ul>
              <li>1 subcategory revealed</li>
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
              You are on the way to delete category{" "}
              {subcategory.name.toUpperCase()}!
            </Typography>
            <Typography variant="p" color="error">
              If you do that, you will delete all related products in it!
            </Typography>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <DeleteSubcategoryButton
                onClick={onDeleteSubcategory}
                type="submit"
                size="large"
                variant="outlined"
                color="error"
                startIcon={<Delete />}
              >
                DELETE
              </DeleteSubcategoryButton>
            </Grid>
            <Grid
              item
              xs={6}
              sm={6}
              md={6}
              lg={6}
              sx={{ position: "relative" }}
            >
              <DeleteSubcategoryButton
                onClick={props.onCancelButtonClicked}
                type="submit"
                size="large"
                variant="contained"
                color="error"
                startIcon={<Cancel />}
              >
                CANCEL
              </DeleteSubcategoryButton>
            </Grid>
          </Grid>
          {deleteSubcategoryResponseMessage ? (
            <Zoom
              in={deleteSubcategoryResponseMessage.length > 0 ? true : false}
            >
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
