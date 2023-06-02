import { React, useState, useRef } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Paper,
  Alert,
  Zoom,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../../theme";
import { AddPhotoAlternate, Edit } from "@mui/icons-material";
import { ApiEndpoints } from "../../../api/endpoints";
import { allowedFileFormats, noPermissionsForOperationMessage } from "../../../constants";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivateForm from "../../../hooks/useAxiosPrivateForm";

export default function EditCategoryForm(props) {
  let { auth } = useAuth();
  const axiosPrivateForm = useAxiosPrivateForm();

  let categoryNameRef = useRef();
  let categoryDescriptionRef = useRef();

  const [category, setCategory] = useState(props.category);

  const [editCategoryResponseMessage, setEditCategoryResponseMessage] =
    useState("");
  const [editCategoryErrorMessage, setEditCategoryErrorMessage] = useState("");

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

    formData.append("id", category.id);
    formData.append("name", formCategoryName);
    formData.append("description", formCategoryDescription);
    formData.append("image", formCategoryImage);
    formData.append("createdBy", auth.userId);

    editCategory(formData);
  }

  async function editCategory(formData) {
    try {
      const controller = new AbortController();

      const response = await axiosPrivateForm.post(
        ApiEndpoints.categories.editCategory,
        formData,
        {
          signal: controller.signal,
        }
      );

      controller.abort();

      setCategory((prev) => {
        return {
          ...prev,
          name: response?.data?.name,
          description: response?.data?.description,
          image: response?.data?.image,
          id: response?.data?.id,
          createdBy: response?.data?.createdBy,
        };
      });

      setEditCategoryErrorMessage("");
      setEditCategoryResponseMessage(
        "The new name of the category is " + response?.data?.name
      );

      props.updateCategoryName(
        formData.get("name"),
        formData.get("description")
      );
    } catch (error) {
      setEditCategoryResponseMessage("");
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        setEditCategoryErrorMessage(noPermissionsForOperationMessage);
      } else {
        setEditCategoryErrorMessage("Error!");
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

  const ImageHolder = styled(Box)({
    position: "relative",
    marginLeft: theme.spacing(4),
    marginTop: theme.spacing(3),
  });

  return (
    <Paper sx={{ padding: theme.spacing(2), marginTop: theme.spacing(2) }}>
      <Typography
        sx={{ marginLeft: theme.spacing(4), marginTop: theme.spacing(3) }}
        id="transition-modal-title"
        variant="h6"
        component="h2"
      >
        Edit Category {category.name.toUpperCase()}
      </Typography>
      <form onSubmit={onEditCategory}>
        <InputBox>
          <StyledInput
            inputRef={categoryNameRef}
            label="Category name"
            variant="outlined"
            defaultValue={category.name}
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
          <ImageHolder>
            <img
              style={{ objectFit: "cover" }}
              width="200px"
              height="140px"
              src={category.image}
              alt={category.name}
            />
          </ImageHolder>
          <Typography
            variant="h6"
            sx={{ pt: 4, color: theme.palette.primary.main }}
          >
            <AddPhotoAlternate sx={{ mr: 1, fontSize: 35 }} />
            CHANGE IMAGE
          </Typography>
          <Typography sx={{ pt: 2, color: theme.palette.warning.main }}>
            {allowedFileFormats} file formats are allowed
          </Typography>
          <TextField
            sx={{ m: theme.spacing(3, 0, 7, 0) }}
            accept={allowedFileFormats}
            type="file"
            variant="outlined"
            id="edit-category-image"
          />
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
          <CreateCategoryButton
            color="secondary"
            startIcon={<Edit />}
            type="submit"
            size="large"
            variant="contained"
          >
            Edit category
          </CreateCategoryButton>
        </InputBox>
      </form>
      {editCategoryResponseMessage ? (
        <Zoom in={editCategoryResponseMessage.length > 0 ? true : false}>
          <Alert sx={{ marginTop: theme.spacing(1) }} severity="success">
            {editCategoryResponseMessage}
          </Alert>
        </Zoom>
      ) : (
        ""
      )}
      {editCategoryErrorMessage ? (
        <Zoom in={editCategoryErrorMessage.length > 0 ? true : false}>
          <Alert sx={{ marginTop: theme.spacing(1) }} severity="error">
            {editCategoryErrorMessage}
          </Alert>
        </Zoom>
      ) : (
        ""
      )}
    </Paper>
  );
}
