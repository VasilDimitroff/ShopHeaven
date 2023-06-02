import { React, useState, useRef } from "react";
import {
  Box,
  Button,
  InputAdornment,
  Typography,
  TextField,
  Paper,
  Alert,
  Zoom,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../../theme";
import { AddPhotoAlternate, AddCircle } from "@mui/icons-material";
import useAuth from "../../../hooks/useAuth";
import { ApiEndpoints } from "../../../api/endpoints";
import useAxiosPrivateForm from "../../../hooks/useAxiosPrivateForm";

export default function CreateCategory(props) {
  let { auth } = useAuth();
  let axiosPrivateForm = useAxiosPrivateForm();

  let categoryNameRef = useRef();
  let categoryDescriptionRef = useRef();

  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");

  const [createCategoryResponseMessage, setCreateCategoryResponseMessage] =
    useState("");
  const [createCategoryErrorMessage, setCreateCategoryErrorMessage] =
    useState("");

  function onCreateCategory(e) {
    e.preventDefault();

    const formCategoryName = categoryNameRef.current.value;
    const formCategoryDescription = categoryDescriptionRef.current.value;
    const formCategoryImage =
      document.getElementById("category-image").files[0];

    if (formCategoryName.trim().length < 1) {
      setCreateCategoryResponseMessage("");
      setCreateCategoryErrorMessage(
        "Category name must contain almost 1 character"
      );
      return;
    }

    if (!formCategoryImage) {
      setCreateCategoryResponseMessage("");
      setCreateCategoryErrorMessage("Category must contain almost 1 image");
      return;
    }

    const formData = new FormData();

    formData.append("name", formCategoryName);
    formData.append("description", formCategoryDescription);
    formData.append("image", formCategoryImage);
    formData.append("createdBy", auth.userId);

    createCategory(formData);
  }

  async function createCategory(formData) {
    try {
      const controller = new AbortController();

      const response = await axiosPrivateForm.post(
        ApiEndpoints.categories.createCategory,
        formData,
        {
          signal: controller.signal,
        }
      );

      controller.abort();
      setCreateCategoryErrorMessage("");
      setCreateCategoryResponseMessage(
        `Category ${formData.get("name")} successfully created`
      );
      props.categoriesListChanged(response?.data);
    } catch (error) {
      setCreateCategoryResponseMessage("");
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        setCreateCategoryErrorMessage(
          "You have no permissions to perform the operation"
        );
      } else {
        setCreateCategoryErrorMessage("Error! Check if all fields are filled");
      }
      console.log(error.message);
    }
  }

  const ProductInfoInput = styled(TextField)({
    background: "rgb(255,249,249)",
    width: "100%",
    marginTop: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
  });

  const InputBox = styled(Box)({
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
  });

  const CreateCategoryButton = styled(Button)({
    width: "100%",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
  });

  return (
    <Paper sx={{ padding: theme.spacing(2) }}>
      <Typography
        sx={{ marginLeft: theme.spacing(4), marginTop: theme.spacing(2) }}
        id="transition-modal-title"
        variant="h6"
        component="h2"
      >
        ADD NEW CATEGORY
      </Typography>
      <form onSubmit={onCreateCategory}>
        <InputBox>
          <ProductInfoInput
            inputRef={categoryNameRef}
            label="Category name"
            defaultValue={categoryName}
            variant="outlined"
          />
        </InputBox>
        <InputBox
          sx={{
            borderStyle: "dashed",
            borderColor: theme.palette.primary.main,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: theme.shape.borderRadius.main,
            marginTop: theme.spacing(2),
          }}
        >
          <Typography
            variant="h6"
            sx={{ pt: 4, color: theme.palette.primary.main }}
          >
            <AddPhotoAlternate sx={{ mr: 1, fontSize: 35 }} />
            UPLOAD IMAGE
          </Typography>
          <Typography
            sx={{ pt: 2, color: theme.palette.warning.main }}
          >
           .jpg, .jpeg, .png and .webp file formats are allowed
          </Typography>
          <TextField
            sx={{ p: theme.spacing(3, 0, 7, 0), color: "blue" }}
            accept=".jpg, .png, .jpeg, .webp"
            type="file"
            variant="outlined"
            id="category-image"
          />

          {/* 
          <ProductInfoInput
            accept=".jpg, .png, .jpeg, .webp"
            type="file"
            variant="standard"
            id="category-image"
          />
*/}
        </InputBox>
        <InputBox>
          <ProductInfoInput
            inputRef={categoryDescriptionRef}
            label="Category Description"
            defaultValue={categoryDescription}
            multiline
            rows={5}
            variant="outlined"
          />
        </InputBox>
        <InputBox>
          <CreateCategoryButton
            color="secondary"
            startIcon={<AddCircle />}
            type="submit"
            size="large"
            variant="contained"
          >
            Create category
          </CreateCategoryButton>
        </InputBox>
      </form>
      {createCategoryResponseMessage ? (
        <Zoom in={createCategoryResponseMessage.length > 0 ? true : false}>
          <Alert sx={{ marginTop: theme.spacing(1) }} severity="success">
            {createCategoryResponseMessage}
          </Alert>
        </Zoom>
      ) : (
        ""
      )}
      {createCategoryErrorMessage ? (
        <Zoom in={createCategoryErrorMessage.length > 0 ? true : false}>
          <Alert sx={{ marginTop: theme.spacing(1) }} severity="error">
            {createCategoryErrorMessage}
          </Alert>
        </Zoom>
      ) : (
        ""
      )}
    </Paper>
  );
}
