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
import { ApiEndpoints } from "../../endpoints";

export default function CreateCategory() {
  let categoryNameRef = useRef();
  let categoryDescriptionRef = useRef();
  let categoryImageRef = useRef();

  const [createCategoryResponseMessage, setCreateCategoryResponseMessage] = useState("");
  const [createCategoryErrorMessage, setCreateCategoryErrorMessage] = useState(false);

  function clearFormValues() {
    categoryNameRef.current.value = "";
    categoryDescriptionRef.current.value = "";
    document.getElementById("category-image").value = "";
  }

  function onCreateCategory(e) {
    e.preventDefault();

    console.log("CATEGORY NAME " + categoryNameRef.current.value);
    console.log("CATEGORY DESCR " + categoryDescriptionRef.current.value);
    console.log("IMAGE " + document.getElementById("category-image").files[0]);

    const categoryName = categoryNameRef.current.value;
    const categoryDescription = categoryDescriptionRef.current.value;
    const categoryImage = document.getElementById("category-image").files[0];

    const formData = new FormData();

    formData.append("name", categoryName);
    formData.append("description", categoryDescription);
    formData.append("image", categoryImage);
    formData.append("createdBy", ApiEndpoints.exampleUserId);

    createCategory(formData);
  }

  async function createCategory(formData) {
    try {
      const response = await axios.post(
        ApiEndpoints.categories.createCategory,
        formData
      );
      setCreateCategoryResponseMessage(response.data);
      clearFormValues();
    } catch (error) {
      console.log("Server returns erorr during category creating: " + error);
      setCreateCategoryErrorMessage(true);
    }
  }

  const ProductInfoInput = styled(TextField)({
    background: "rgb(255,249,249)",
    width: "60%",
    marginTop: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
  });

  const InputBox = styled(Box)({
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4)
  });

  const CreateCategoryButton = styled(Button)({
   width: "60%",
   marginTop: theme.spacing(3),
   marginBottom: theme.spacing(1)
  })

  const ResponseMessage = styled(Typography)({
    textAlign: "center",
    color: theme.palette.success.main
  });

  const ErrorResponseMessage = styled(Typography)({
    textAlign: "center",
    color: theme.palette.error.main
  })

  return (
    <Fragment>
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
            variant="standard"
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
            id="category-image"
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
          />
        </InputBox>
        <InputBox>
          <CreateCategoryButton type="submit" size="large" variant="contained">
            Create category
          </CreateCategoryButton>
        </InputBox>
      </form>
      <ResponseMessage>{createCategoryResponseMessage}</ResponseMessage>
      {createCategoryErrorMessage ? (
        <ErrorResponseMessage>
          An error during category creation!
        </ErrorResponseMessage>
      ) : (
        ""
      )}
    </Fragment>
  );
}
