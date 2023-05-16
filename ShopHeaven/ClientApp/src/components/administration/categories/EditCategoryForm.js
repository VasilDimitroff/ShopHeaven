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

export default function EditCategoryForm(props) {
  let { auth } = useAuth();

  let categoryNameRef = useRef();
  let categoryDescriptionRef = useRef();

  const [category, setCategory] = useState(props.category)

  const [editCategoryResponseMessage, setEditCategoryResponseMessage] =
    useState("");
  const [editCategoryErrorMessage, setEditCategoryErrorMessage] =
    useState(false);

 function onEditCategory(e) {
    e.preventDefault();

    const formCategoryName = categoryNameRef.current.value;
    const formCategoryDescription = categoryDescriptionRef.current.value;
    const formCategoryImage = document.getElementById("edit-category-image")
      .files[0];

    if (formCategoryName.trim().length < 1) {
      setEditCategoryResponseMessage("");
      setEditCategoryErrorMessage(
        "Category name must contain at least 1 character"
      );
      return;
    }
    

    const formData = new FormData();

    console.log("NAME: " + formCategoryName);
    console.log("DESC: " + formCategoryDescription);
    console.log("IMG: " + formCategoryImage);
    console.log("AUTH IS: " + auth.userId);
    console.log("AUTH JWT: " + auth.jwtToken);
    console.log("CAT ID: " + category.id);

    formData.append("id", category.id);
    formData.append("name", formCategoryName);
    formData.append("description", formCategoryDescription);
    formData.append("image", formCategoryImage);
    formData.append("createdBy", auth.userId);

    editCurrentCategory(formData);
  }

  async function editCurrentCategory(formData) {
    try {
      const response = await editCategory(formData, auth.jwtToken);

      setCategory(prev => {
        return  {
           ...prev, 
           name: response?.data?.name, 
           description: response?.data?.description,
           image: response?.data?.image,
           id: response?.data?.id,
           createdBy: response?.data?.createdBy
        }
      });

      setEditCategoryErrorMessage("")
      setEditCategoryResponseMessage("The new name of the category is " + response?.data?.name);
      
      props.updateCategoryName(formData.get("name"), formData.get("description"));
    } catch (error) {
      setEditCategoryResponseMessage("");
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        setEditCategoryErrorMessage(
          "You have no permissions to perform the operation"
        );
      } else {
        setEditCategoryErrorMessage("Error! Check if all fields are filled");
      }
      console.log(error.message);
    }
  }

  const StyledInput = styled(TextField)({
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

  const ImageHolder = styled(Box)({
    position: "relative",
    marginLeft: theme.spacing(4),
    marginTop: theme.spacing(3),
  })

  return (
    <Paper sx={{padding: theme.spacing(2), marginTop: theme.spacing(2)}}>
      <Typography
        sx={{ marginLeft: theme.spacing(4), marginTop: theme.spacing(3) }}
        id="transition-modal-title"
        variant="h6"
        component="h2"
      >
        Edit Category {(category.name).toUpperCase()}
      </Typography>

      <form onSubmit={onEditCategory}>
        <InputBox>
          <StyledInput
            required
            inputRef={categoryNameRef}
            label="Category name"
            variant="standard"
            defaultValue={category.name}
          />
        </InputBox>
        <ImageHolder>
          <img style={{objectFit: "cover"}} width="250px" height="150px" src={category.image} />
        </ImageHolder>
        <InputBox>
          <StyledInput
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
            id="edit-category-image"
          />
          <ul style={{color: theme.palette.warning.main, marginTop: theme.spacing(2)}}>
            <li>Warning! If you submit a new image, the old one will be deleted</li>
            <li>.jpg, .jpeg and .png file formats are allowed</li>
          </ul>
        </InputBox>
        <InputBox>
          <StyledInput
            inputRef={categoryDescriptionRef}
            label="Category Description"
            multiline
            rows={5}
            variant="standard"
            defaultValue={category.description}
          />
        </InputBox>
        <InputBox>
          <CreateCategoryButton type="submit" size="large" variant="contained">
            Edit category
          </CreateCategoryButton>
        </InputBox>
      </form>
      <ResponseMessage>{editCategoryResponseMessage}</ResponseMessage>
      <ErrorResponseMessage>{editCategoryErrorMessage}</ErrorResponseMessage>
    </Paper>
  );
}
