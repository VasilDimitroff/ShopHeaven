import { React, useState, Fragment, useRef } from "react";
import {
  Box,
  Button,
  InputAdornment,
  Typography,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../../../theme";
import { PhotoCamera } from "@mui/icons-material";
import useAuth from "../../../../hooks/useAuth";
import { createSubcategory } from "../../../../services/categoriesService";

export default function CreateSubcategory(props) {
  let  { auth } = useAuth();

  let subcategoryNameRef = useRef();
  let subcategoryDescriptionRef = useRef();
  let subcategoryImageRef = useRef();

  const [subcategoryName, setSubcategoryName] = useState("");
  const [subcategoryDescription, setSubcategoryDescription] = useState("");

  const [createSubcategoryResponseMessage, setCreateSubcategoryResponseMessage] = useState("");
  const [createSubcategoryErrorMessage, setCreateSubcategoryErrorMessage] = useState("");

 function onCreateSubcategory(e) {
    e.preventDefault();

    const formSubCategoryName = subcategoryNameRef.current.value;
    const formSubCategoryDescription = subcategoryDescriptionRef.current.value;
    const formSubCategoryImage = document.getElementById("subcategory-image").files[0];

    if(formSubCategoryName.trim().length < 1) {
      setCreateSubcategoryResponseMessage("");
      setCreateSubcategoryErrorMessage("Subcategory name must contain almost 1 character");
      return;
    }

    setSubcategoryName(formSubCategoryName);
    setSubcategoryDescription(formSubCategoryDescription);

    const formData = new FormData();

    formData.append("name", formSubCategoryName);
    formData.append("description", formSubCategoryDescription);
    formData.append("image", formSubCategoryImage);
    formData.append("categoryId", props.categoryId);
    formData.append("createdBy", auth.userId);

    createNewSubCategory(formData);
  }

  async function createNewSubCategory(formData) {
    try {
       const response = await createSubcategory(formData, auth.jwtToken);

       setCreateSubcategoryResponseMessage("Subcategory" + formData.get["name"] + "successfully created!");
       refreshState();
       props.subcategoriesUpdated(response?.data)
    } catch (error) {
      setCreateSubcategoryResponseMessage("");

        if(error?.response?.status === 401 || error?.response?.status === 403) {
          setCreateSubcategoryErrorMessage("You have no permissions to perform the operation");
        } else {
          setCreateSubcategoryErrorMessage("Error! Check if all fields are filled");
      }
      console.log(error.message);
    }
  }

  function refreshState() {
    setCreateSubcategoryErrorMessage("");
    setSubcategoryName("");
    setSubcategoryDescription("");
  }

  const StyledInput = styled(TextField)({
    background: "rgb(255,249,249)",
    width: "100%",
    marginTop: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
  });

  const InputBox = styled(Box)({
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4)
  });

  const CreateSubCategoryButton = styled(Button)({
   width: "100%",
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
           ADD NEW SUBCATEGORY
        </Typography>
      <form onSubmit={onCreateSubcategory}>
        <InputBox>
          <StyledInput
            required
            inputRef={subcategoryNameRef}
            label="Subcategory name"
            defaultValue={subcategoryName}
            variant="standard"
          />
        </InputBox>
        <InputBox>
          <StyledInput
            required
            inputRef={subcategoryImageRef}
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
            id="subcategory-image"
          />
        </InputBox>
        <InputBox>
          <StyledInput
            inputRef={subcategoryDescriptionRef}
            id="123"
            label="Subcategory Description"
            defaultValue={subcategoryDescription}
            multiline
            rows={5}
            variant="standard"
          />
        </InputBox>
        <InputBox>
          <CreateSubCategoryButton type="submit" size="large" variant="contained">
            Create subcategory
          </CreateSubCategoryButton>
        </InputBox>
      </form>
      <ResponseMessage>{createSubcategoryResponseMessage}</ResponseMessage>
        <ErrorResponseMessage>
          {createSubcategoryErrorMessage}
        </ErrorResponseMessage>
    </Fragment>
  );
}
