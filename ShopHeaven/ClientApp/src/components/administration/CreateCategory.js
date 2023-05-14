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
import useAuth from "./../../hooks/useAuth"
import { createCategory } from "../../services/categoriesService";

export default function CreateCategory() {
  let  { auth } = useAuth();

  let categoryNameRef = useRef();
  let categoryDescriptionRef = useRef();
  let categoryImageRef = useRef();

  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");

  const [createCategoryResponseMessage, setCreateCategoryResponseMessage] = useState("");
  const [createCategoryErrorMessage, setCreateCategoryErrorMessage] = useState("");

 function onCreateCategory(e) {
    e.preventDefault();

    const formCategoryName = categoryNameRef.current.value;
    const formCategoryDescription = categoryDescriptionRef.current.value;
    const formCategoryImage = document.getElementById("category-image").files[0];

    if(formCategoryName.trim().length < 1) {
      setCreateCategoryResponseMessage("");
      setCreateCategoryErrorMessage("Category name must contain almost 1 character");
      return;
    }

    setCategoryName(formCategoryName);
    setCategoryDescription(formCategoryDescription);

    const formData = new FormData();

    formData.append("name", formCategoryName);
    formData.append("description", formCategoryDescription);
    formData.append("image", formCategoryImage);
    formData.append("createdBy", auth.userId);

    createNewCategory(formData);
  }

  async function createNewCategory(formData) {
    try {
       const response = await createCategory(formData, auth.jwtToken);

       setCreateCategoryResponseMessage(response?.data);
       refreshState();
    } catch (error) {
       setCreateCategoryResponseMessage("");
        if(error?.response?.status === 401 || error?.response?.status === 403) {
          setCreateCategoryErrorMessage("You have no permissions to perform the operation");
        } else {
          setCreateCategoryErrorMessage("Error! Check if all fields are filled");
      }
      console.log(error.message);
    }
  }

  function refreshState() {
    setCreateCategoryErrorMessage("");
    setCategoryName("");
    setCategoryDescription("");
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
    color: theme.palette.success.main
  });

  const ErrorResponseMessage = styled(Typography)({
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
            defaultValue={categoryName}
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
            accept=".jpg, .png, .jpeg"
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
            defaultValue={categoryDescription}
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
        <ErrorResponseMessage>
          {createCategoryErrorMessage}
        </ErrorResponseMessage>
    </Fragment>
  );
}
