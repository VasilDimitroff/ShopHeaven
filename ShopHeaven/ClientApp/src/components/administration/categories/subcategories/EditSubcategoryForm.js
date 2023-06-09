import { React, useState, useRef } from "react";
import {
  Box,
  Button,
  InputAdornment,
  Typography,
  TextField,
  Paper,
  Zoom,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../../../theme";
import { CompleteActionButton, InputBox, UniversalInput } from "../../../../styles/styles";
import { Edit, AddPhotoAlternate } from "@mui/icons-material";
import { ApiEndpoints } from "../../../../api/endpoints";
import useAxiosPrivateForm from "../../../../hooks/useAxiosPrivateForm";
import useAuth from "../../../../hooks/useAuth";
import { allowedFileFormats, noPermissionsForOperationMessage } from "../../../../constants";

export default function EditSubcategoryForm(props) {
  let { auth } = useAuth();
  let axiosPrivateForm = useAxiosPrivateForm();

  let subcategoryNameRef = useRef();
  let subcategoryDescriptionRef = useRef();

  const [subcategory, setSubcategory] = useState(props.subcategory);

  const [editSubcategoryResponseMessage, setEditSubcategoryResponseMessage] =
    useState("");
  const [editSubcategoryErrorMessage, setEditSubcategoryErrorMessage] =
    useState("");

  function onEditSubcategory(e) {
    e.preventDefault();

    const formSubcategoryName = subcategoryNameRef.current.value;
    const formSubcategoryDescription = subcategoryDescriptionRef.current.value;
    const formSubcategoryImage = document.getElementById(
      "edit-subcategory-image"
    ).files[0];

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
      const controller = new AbortController();
      const response = await axiosPrivateForm.post(
        ApiEndpoints.subcategories.editSubcategory,
        formData,
        {
          signal: controller.signal,
        }
      );

      controller.abort();

      setEditSubcategoryErrorMessage("");
      setEditSubcategoryResponseMessage(
        "Subcategory now has name " + formData.get("name")
      );
      setSubcategory(response?.data);
      
      window.scroll(0, 0);

      props.subcategoryUpdated(response?.data);
    } catch (error) {
      setEditSubcategoryResponseMessage("");
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        setEditSubcategoryErrorMessage(
          noPermissionsForOperationMessage
        );
      } else {
        setEditSubcategoryErrorMessage(error?.response?.data);
      }
      console.log(error.message);
    }
  }

  const ImageHolder = styled(Box)({
    position: "relative",
    marginLeft: theme.spacing(4),
    marginTop: theme.spacing(3),
  });

  return (
    <Paper
      sx={{ paddingTop: 2, paddingBottom: 2, marginTop: theme.spacing(2) }}
    >
      <Typography
        sx={{ marginLeft: theme.spacing(4), marginTop: theme.spacing(3) }}
        id="transition-modal-title"
        variant="h6"
        component="h2"
      >
        Edit Subcategory {subcategory.name.toUpperCase()}
      </Typography>

      <form onSubmit={onEditSubcategory}>
        <InputBox>
          <UniversalInput
            sx={{mb: 0, mt: 3}}
            required
            inputRef={subcategoryNameRef}
            label="Subcategory name"
            variant="outlined"
            defaultValue={subcategory.name}
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
            src={subcategory.image}
            alt={subcategory.name}
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
            sx={{ p: theme.spacing(3, 0, 7, 0) }}
            accept={allowedFileFormats}
            type="file"
            variant="outlined"
            id="edit-subcategory-image"
          />
        </InputBox>
        <InputBox>
          <UniversalInput
            sx={{mb: 0, mt:3}}
            inputRef={subcategoryDescriptionRef}
            label="Subcategory Description"
            multiline
            rows={5}
            variant="outlined"
            defaultValue={subcategory.description}
          />
        </InputBox>
        <InputBox>
          <CompleteActionButton
            color="secondary"
            startIcon={<Edit />}
            type="submit"
            size="large"
            variant="contained"
          >
            Edit subcategory
          </CompleteActionButton>
        </InputBox>
      </form>
      {editSubcategoryResponseMessage ? (
        <Zoom in={editSubcategoryResponseMessage.length > 0 ? true : false}>
          <Alert sx={{ marginTop: theme.spacing(1) }} severity="success">
            {editSubcategoryResponseMessage}
          </Alert>
        </Zoom>
      ) : (
        ""
      )}
      {editSubcategoryErrorMessage ? (
        <Zoom in={editSubcategoryErrorMessage.length > 0 ? true : false}>
          <Alert sx={{ marginTop: theme.spacing(1) }} severity="error">
            {editSubcategoryErrorMessage}
          </Alert>
        </Zoom>
      ) : (
        ""
      )}
    </Paper>
  );
}
