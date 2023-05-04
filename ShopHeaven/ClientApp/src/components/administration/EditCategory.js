import { React, useState, Fragment, useRef } from "react";
import {
  Box,
  Button,
  InputAdornment,
  Typography,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";
import { PhotoCamera } from "@mui/icons-material";
import axios from "axios";
import { ApiEndpoints } from "../../api/endpoints";

export default function EditCategory(props) {
  let categoryNameRef = useRef();
  let categoryDescriptionRef = useRef();
  let categoryImageRef = useRef();

  const [editCategoryResponseMessage, setEditCategoryResponseMessage] =
    useState("");
  const [editCategoryErrorMessage, setEditCategoryErrorMessage] =
    useState(false);

  const [getCategoryResult, setGetCategoryResult] = useState({});

  function onEditCategory(e) {
    e.preventDefault();

    console.log("CATEGORY NAME " + categoryNameRef.current.value);
    console.log("CATEGORY DESCR " + categoryDescriptionRef.current.value);
    console.log("IMAGE " + document.getElementById("category-image").files[0]);

    const categoryName = categoryNameRef.current.value;
    const categoryDescription = categoryDescriptionRef.current.value;
    const categoryImage = document.getElementById("edit-category-image")
      .files[0];

    const formData = new FormData();

    formData.append("name", categoryName);
    formData.append("description", categoryDescription);
    formData.append("image", categoryImage);
    formData.append("createdBy", "6d011520-f43e-468e-bf45-466ab65d9ca6");

    editCategory(formData);
  }

  async function editCategory(formData) {
    try {
      const response = await axios.post(
        ApiEndpoints.categories.editCategory,
        formData
      );
      setEditCategoryResponseMessage(response.data);
      clearFormValues();
    } catch (error) {
      console.log("server returns erorr during category editing: " + error);
      setEditCategoryErrorMessage(true);
    }
  }

  async function getCategory(id) {
    try {
      const response = await axios.get(
        ApiEndpoints.categories.getCategory + id
      );
      setGetCategoryResult(response.data);
    } catch (error) {
      console.log("server returns erorr during category getting: " + error);
      setEditCategoryErrorMessage(true);
    }
  }

  function clearFormValues() {
    categoryNameRef.current.value = "";
    categoryDescriptionRef.current.value = "";
    document.getElementById("edit-category-image").value = "";
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

  const ResponseMessage = styled(Typography)({
    textAlign: "center",
    color: theme.palette.success.main,
  });

  const ErrorResponseMessage = styled(Typography)({
    textAlign: "center",
    color: theme.palette.error.main,
  });

  return (
    <Fragment>
      <Typography
        sx={{ marginLeft: theme.spacing(4), marginTop: theme.spacing(3) }}
        id="transition-modal-title"
        variant="h6"
        component="h2"
      >
        EDIT CATEGORY {getCategoryResult.name}
      </Typography>

      <form onSubmit={onEditCategory}>
        <InputBox>
          <ProductInfoInput
            inputRef={categoryNameRef}
            label="Category name"
            variant="standard"
            defaultValue={props.category.name}
          />
        </InputBox>
        <InputBox>
          <ProductInfoInput
            inputRef={categoryImageRef}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <PhotoCamera />
                </InputAdornment>
              ),
            }}
            accept=".jpg, .png"
            type="file"
            variant="standard"
            id="edit-category-image"
          />
        </InputBox>
        <InputBox>
          <ProductInfoInput
            inputRef={categoryDescriptionRef}
            id="123"
            label="Category Description"
            multiline
            rows={5}
            variant="standard"
            defaultValue={props.category.description}
          />
        </InputBox>
        <InputBox>
          <CreateCategoryButton type="submit" size="large" variant="contained">
            Edit category
          </CreateCategoryButton>
        </InputBox>
      </form>
      <ResponseMessage>{editCategoryResponseMessage}</ResponseMessage>
      {editCategoryErrorMessage ? (
        <ErrorResponseMessage>
          An error during category editing!
        </ErrorResponseMessage>
      ) : (
        ""
      )}
    </Fragment>
  );
}
