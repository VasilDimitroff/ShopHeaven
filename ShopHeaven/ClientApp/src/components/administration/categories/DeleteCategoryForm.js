import { React, useState, useRef } from "react";
import {
  Box,
  Button,
  InputAdornment,
  Typography,
  TextField,
  Paper
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../../theme";
import { PhotoCamera } from "@mui/icons-material";
import { editCategory } from "../../../services/categoriesService";
import useAuth from "../../../hooks/useAuth";

export default function DeleteCategoryForm(props) {
  let { auth } = useAuth();

  const [category, setCategory] = useState(props.category)

  const [deleteCategoryResponseMessage, setDeleteCategoryResponseMessage] =
    useState("");
  const [deleteCategoryErrorMessage, setDeleteCategoryErrorMessage] =
    useState(false);

 function onDeleteCategory(e) {
    e.preventDefault();

    const formData = new FormData();

    console.log("AUTH IS: " + auth.userId);
    console.log("AUTH JWT: " + auth.jwtToken);
    console.log("CAT ID: " + category.id);

    formData.append("id", category.id);
    deleteCurrentCategory(formData);
  }

  async function deleteCurrentCategory(formData) {
    try {
      const response = await editCategory(formData, auth.jwtToken);
      setDeleteCategoryErrorMessage("")
      setDeleteCategoryErrorMessage(response?.data);
      
      props.updateCategoryName(formData.get("name"), formData.get("description"));
    } catch (error) {
      setDeleteCategoryResponseMessage("");
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        setDeleteCategoryErrorMessage(
          "You have no permissions to perform the operation"
        );
      } else {
        setDeleteCategoryErrorMessage("Error! Check if all fields are filled");
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
    justifyContent: "center"
  })

  return (
    <Paper sx={{padding: theme.spacing(2), marginTop: theme.spacing(2)}}>
      <Box sx={{textAlign: "center", marginLeft: theme.spacing(4), marginTop: theme.spacing(3) }}>
      <Typography variant="h6">
        You are on the way to delete category {(category.name).toUpperCase()}!
      </Typography>
      <Typography variant="p" color="error">If you do that, you will delete all related subcategories and products in it!</Typography>
      </Box>
      <ButtonsHolder>
          <DeleteCategoryButton type="submit" size="large" variant="outlined" color="error">
            DELETE CATEGORY
          </DeleteCategoryButton>
          <DeleteCategoryButton type="submit" size="large" variant="contained" color="error">
            CANCEL
          </DeleteCategoryButton>
        </ButtonsHolder>
      <ResponseMessage>{deleteCategoryResponseMessage}</ResponseMessage>
      <ErrorResponseMessage>{deleteCategoryErrorMessage}</ErrorResponseMessage>
    </Paper>
  );
}
