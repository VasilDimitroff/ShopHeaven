import { React, useState, Fragment, useRef } from "react";
import {
  Box,
  Button,
  InputAdornment,
  Typography,
  TextField,
  Alert,
  Zoom,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../../../theme";
import { AddCircle, AddPhotoAlternate } from "@mui/icons-material";
import useAuth from "../../../../hooks/useAuth";
import { ApiEndpoints } from "../../../../api/endpoints";
import useAxiosPrivateForm from "../../../../hooks/useAxiosPrivateForm";
import { allowedFileFormats, noPermissionsForOperationMessage } from "../../../../constants";

export default function CreateSubcategory(props) {
  let { auth } = useAuth();
  let axiosPrivateForm = useAxiosPrivateForm();

  let subcategoryNameRef = useRef();
  let subcategoryDescriptionRef = useRef();

  const [subcategoryName, setSubcategoryName] = useState("");
  const [subcategoryDescription, setSubcategoryDescription] = useState("");

  const [
    createSubcategoryResponseMessage,
    setCreateSubcategoryResponseMessage,
  ] = useState("");
  const [createSubcategoryErrorMessage, setCreateSubcategoryErrorMessage] =
    useState("");

  function onCreateSubcategory(e) {
    e.preventDefault();

    const formSubCategoryName = subcategoryNameRef.current.value;
    const formSubCategoryDescription = subcategoryDescriptionRef.current.value;
    const formSubCategoryImage =
      document.getElementById("subcategory-image").files[0];

    if (formSubCategoryName.trim().length < 1) {
      setCreateSubcategoryResponseMessage("");
      setCreateSubcategoryErrorMessage(
        "Subcategory name must contain almost 1 character"
      );
      return;
    }
 
    if (!formSubCategoryImage) {
      setCreateSubcategoryResponseMessage("");
      setCreateSubcategoryErrorMessage("Subcategory must contain almost 1 image");
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

    createSubcategory(formData);
  }

  async function createSubcategory(formData) {
    try {
      const controller = new AbortController();

      const response = await axiosPrivateForm.post(
        ApiEndpoints.subcategories.createSubcategory,
        formData,
        {
          signal: controller.signal,
        }
      );

      controller.abort();

      setCreateSubcategoryResponseMessage(
        "Subcategory" + formData.get["name"] + "successfully created!"
      );
      props.subcategoriesUpdated(response?.data);
      console.log("CREATE SUBCATEGORY RESPONSE: " + response?.data);
    } catch (error) {
      setCreateSubcategoryResponseMessage("");

      if (error?.response?.status === 401 || error?.response?.status === 403) {
        setCreateSubcategoryErrorMessage(
          noPermissionsForOperationMessage
        );
      } else {
        setCreateSubcategoryErrorMessage(
          "Error! Check if all fields are filled"
        );
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

  const CreateSubCategoryButton = styled(Button)({
    width: "100%",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
  });

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
            inputRef={subcategoryNameRef}
            label="Subcategory name"
            defaultValue={subcategoryName}
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
          <Typography sx={{ pt: 2, color: theme.palette.warning.main }}>
            {allowedFileFormats} file formats are allowed
          </Typography>
          <TextField
            sx={{ p: theme.spacing(3, 0, 7, 0) }}
            accept={allowedFileFormats}
            type="file"
            variant="outlined"
            id="subcategory-image"
          />
        </InputBox>
        <InputBox>
          <StyledInput
            inputRef={subcategoryDescriptionRef}
            label="Subcategory Description"
            defaultValue={subcategoryDescription}
            multiline
            rows={5}
            variant="outlined"
          />
        </InputBox>
        <InputBox>
          <CreateSubCategoryButton
            type="submit"
            size="large"
            color="secondary"
            variant="contained"
            startIcon={<AddCircle />}
          >
            Create subcategory
          </CreateSubCategoryButton>
        </InputBox>
      </form>
      {createSubcategoryResponseMessage ? (
        <Zoom in={createSubcategoryResponseMessage.length > 0 ? true : false}>
          <Alert sx={{ marginTop: theme.spacing(1) }} severity="success">
            {createSubcategoryResponseMessage}
          </Alert>
        </Zoom>
      ) : (
        ""
      )}
      {createSubcategoryErrorMessage ? (
        <Zoom in={createSubcategoryErrorMessage.length > 0 ? true : false}>
          <Alert
            sx={{ marginTop: theme.spacing(1) }}
            variant="filled"
            severity="error"
          >
            {createSubcategoryErrorMessage}
          </Alert>
        </Zoom>
      ) : (
        ""
      )}
    </Fragment>
  );
}
