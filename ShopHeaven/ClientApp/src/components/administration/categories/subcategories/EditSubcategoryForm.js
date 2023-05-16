import { React, useState, useRef } from "react";
import {
  Box,
  Button,
  InputAdornment,
  Typography,
  TextField,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../../../theme";
import { PhotoCamera } from "@mui/icons-material";
import { editSubcategory } from "../../../../services/categoriesService";
import useAuth from "../../../../hooks/useAuth";

export default function EditSubcategoryForm(props) {
  let { auth } = useAuth();

  let subcategoryNameRef = useRef();
  let subcategoryDescriptionRef = useRef();
  let subcategoryImageRef = useRef();

  const [subcategory, setSubcategory] = useState(props.subcategory)

  const [editSubcategoryResponseMessage, setEditSubcategoryResponseMessage] =
    useState("");
  const [editSubcategoryErrorMessage, setEditSubcategoryErrorMessage] =
    useState(false);

 function onEditSubcategory(e) {
    e.preventDefault();

    const formSubcategoryName = subcategoryNameRef.current.value;
    const formSubcategoryDescription = subcategoryDescriptionRef.current.value;
    const formSubcategoryImage = document.getElementById("edit-subcategory-image")
      .files[0];

    if (formSubcategoryName.trim().length < 1) {
      setEditSubcategoryResponseMessage("");
      setEditSubcategoryErrorMessage(
        "Subcategory name must contain at least 1 character"
      );
      return;
    }

    const formData = new FormData();

    console.log("NAME: " + formSubcategoryName);
    console.log("DESC: " + formSubcategoryDescription);
    console.log("IMG: " + formSubcategoryImage);
    console.log("AUTH IS: " + auth.userId);
    console.log("AUTH JWT: " + auth.jwtToken);
    console.log("SUBCAT ID: " + subcategory.id);

    formData.append("id", subcategory.id);
    formData.append("name", formSubcategoryName);
    formData.append("description", formSubcategoryDescription);
    formData.append("image", formSubcategoryImage);
    formData.append("createdBy", auth.userId);

    editCurrentSubcategory(formData);
  }

  async function editCurrentSubcategory(formData) {
    try {
      const response = await editSubcategory(formData, auth.jwtToken);
      setEditSubcategoryErrorMessage("")
      setEditSubcategoryResponseMessage("Subcategory now has name " + formData.get("name"));
      setSubcategory(response?.data);
      props.subcategoryUpdated(response?.data);
    } catch (error) {
      setEditSubcategoryResponseMessage("");
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        setEditSubcategoryErrorMessage(
          "You have no permissions to perform the operation"
        );
      } else {
        setEditSubcategoryErrorMessage("Error! Check if all fields are filled");
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
    <Paper sx={{ padding: theme.spacing(2), marginTop: theme.spacing(2)}}>
      <Typography
        sx={{ marginLeft: theme.spacing(4), marginTop: theme.spacing(3) }}
        id="transition-modal-title"
        variant="h6"
        component="h2"
      >
        EDIT SUBCATEGORY {subcategory.name}
      </Typography>

      <form onSubmit={onEditSubcategory}>
        <InputBox>
          <StyledInput
            inputRef={subcategoryNameRef}
            label="Subcategory name"
            variant="standard"
            defaultValue={subcategory.name}
          />
        </InputBox>
        <ImageHolder>
          <img style={{objectFit: "cover"}} width="250px" height="150px" src={subcategory.image} />
        </ImageHolder>
        <InputBox>
          <StyledInput
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
            id="edit-subcategory-image"
          />
          <ul style={{color: theme.palette.warning.main, marginTop: theme.spacing(2)}}>
            <li>Warning! If you submit a new image, the old one will be deleted</li>
            <li>.jpg, .jpeg and .png file formats are allowed</li>
          </ul>
        </InputBox>
        <InputBox>
          <StyledInput
            inputRef={subcategoryDescriptionRef}
            label="Subcategory Description"
            multiline
            rows={5}
            variant="standard"
            defaultValue={subcategory.description}
          />
        </InputBox>
        <InputBox>
          <CreateCategoryButton type="submit" size="large" variant="contained">
            Edit subcategory
          </CreateCategoryButton>
        </InputBox>
      </form>
      <ResponseMessage>{editSubcategoryResponseMessage}</ResponseMessage>
      <ErrorResponseMessage>{editSubcategoryErrorMessage}</ErrorResponseMessage>
    </Paper>
  );
}
