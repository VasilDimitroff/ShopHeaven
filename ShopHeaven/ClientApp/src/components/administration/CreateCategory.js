import { React, useState, Fragment, useRef, useEffect } from "react";
import {
  Box,
  Button,
  InputAdornment,
  Typography,
  TextField,
  InputBase,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";
import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  Close,
  Delete,
  AddCircle,
  PhotoCamera,
} from "@mui/icons-material";
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
    formData.append("createdBy", "3f2d0e68-950b-44fc-85b5-66a4e5d849e2");

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
      console.log("server returns erorr during category creating: " + error);
      setCreateCategoryErrorMessage(true);
    }
  }

  const StyledInput = styled(TextField)({
    marginTop: theme.spacing(3),
    width: "100%",
  });

  const InputBox = styled(Box)({
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4)
  });

  const CreateCategoryButton = styled(Button)({
   width: "100%",
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
          sx={{ marginLeft: theme.spacing(4) }}
          id="transition-modal-title"
          variant="h6"
          component="h2"
        >
           ADD NEW CATEGORY
        </Typography>
      <form onSubmit={onCreateCategory}>
        <InputBox>
          <StyledInput
            inputRef={categoryNameRef}
            label="Category name"
            variant="filled"
          />
        </InputBox>
        <InputBox>
          <StyledInput
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
            variant="filled"
            id="category-image"
          />
        </InputBox>
        <InputBox>
          <StyledInput
            inputRef={categoryDescriptionRef}
            id="123"
            label="Category Description"
            multiline
            rows={5}
            variant="filled"
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
