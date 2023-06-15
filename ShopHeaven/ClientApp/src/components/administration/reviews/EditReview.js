import { React, useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  Rating,
  Avatar,
  Zoom,
  Alert,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { ContactMail, Phone, LocalShipping, } from "@mui/icons-material";
import { theme } from "../../../theme";
import { InputBox, AdminMainWrapper, UniversalInput } from "../../../styles/styles";
import { noPermissionsForOperationMessage } from "../../../constants";
import { ApiEndpoints } from "../../../api/endpoints";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export default function EditReview(props) {
  const axiosPrivate = useAxiosPrivate();

  const [review, setReview] = useState(props.review);

  const [editReviewResponseMessage, setEditReviewResponseMessage] = useState("");
  const [editReviewErrorMessage, setEditReviewErrorMessage] = useState("");

  const contentRef = useRef();


  useEffect(() => {
    console.log("START DATE IS", review.createdOn)
  }, [])

  function onEditReview(e) {
    e.preventDefault();

    setReview(prev => {
      return {
        ...prev,
        content: contentRef.current.value
      }
    })

    let isFormValid = validateForm();

    if (!isFormValid) {
      return;
    }

    const editedReview = {
      id: review?.id,
      content: contentRef.current.value.trim(),
    };

    editReview(editedReview);
  }

  async function editReview(editedReview) {
    try {
      const controller = new AbortController();

      const response = await axiosPrivate.post(
        ApiEndpoints.reviews.editReview,
        editedReview,
        {
          signal: controller.signal,
        }
      );

      controller.abort();

      setEditReviewErrorMessage("");
      setEditReviewResponseMessage(`Review of ${review?.email} successfully updated`);

      setReview(response?.data)
      props.updateReview(response?.data);
    } catch (error) {
      setEditReviewResponseMessage("");

      if (error?.response?.status === 401 || error?.response?.status === 403) {
        setEditReviewErrorMessage(noPermissionsForOperationMessage);
      } else {
        setEditReviewErrorMessage(error?.response?.data);
      }
      console.log(error?.message);
    }
  }

  function validateForm() {
    let isValid = true;

    if (!contentRef.current.value || contentRef.current.value.length < 2) {
      setEditReviewErrorMessage("Rating comment must be at least 2 characters")
      isValid = false;
    } else {
      setEditReviewErrorMessage("")
      setEditReviewResponseMessage("");
    }

    return isValid;
  }

  const Author = styled(Typography)({
    fontWeight: 500,
    fontSize: 16,
  });

  function formatDate(date) {
    console.log("DATE IS", date)
    const minutes = date.substring(14, 16);
    const hour = date.substring(11, 13);
    const day = date.substring(8, 10);
    const month = date.substring(5, 7);
    const year = date.substring(0, 4);

    const formattedDate = `${day}/${month}/${year}, ${hour}:${minutes}`;
    return formattedDate;
  }

  const InfoHolder = styled(Box)({
    display: "flex",
    gap: 10,
    alignItems: "center"
  });

  const Section = styled(Stack)({})

  return (
    <AdminMainWrapper sx={{ p: 4 }}>
      <InputBox>
        <form onSubmit={onEditReview}>
          <Stack spacing={2}>
          <Box>
            <InfoHolder>
              <Avatar
                sx={{
                  bgcolor: theme.palette.secondary.main,
                }}
              >
                {review?.email[0].toUpperCase()}
              </Avatar>
              <Author>{review?.email}</Author>
              <Typography sx={{color: "gray", fontSize: 12}}>on {formatDate(review?.createdOn)}</Typography>
            </InfoHolder>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography>Rating:</Typography>
            <Rating             
              readOnly
              name="size-small"
              variant="outlined"
              size="medium"
              value={review?.ratingValue}
            />{" "}
            <Typography>
              {review?.ratingValue ? (
                `(${review?.ratingValue} stars)`
              ) : (
                <></>
              )}
            </Typography>
          </Box>
          <UniversalInput
            inputRef={contentRef}
            multiline
            label="Edit review comment..."
            variant="outlined"
            defaultValue={review?.content}
            minRows={4}
          />
          <Button
            type="submit"
            size="medium"
            variant="contained"
            color="secondary"
          >
            EDIT REVIEW
          </Button>
          </Stack>
        </form>
        {editReviewResponseMessage ? (
          <Zoom
            in={
              editReviewResponseMessage.length > 0 ? true : false
            }
          >
            <Alert sx={{ marginTop: theme.spacing(2) }} severity="success">
              {editReviewResponseMessage}
            </Alert>
          </Zoom>
        ) : (
          ""
        )}
        {editReviewErrorMessage ? (
          <Zoom
            in={editReviewErrorMessage.length > 0 ? true : false}
          >
            <Alert
              sx={{ marginTop: theme.spacing(2) }}
              variant="filled"
              severity="error"
            >
              {editReviewErrorMessage}
            </Alert>
          </Zoom>
        ) : (
          <></>
        )}
      </InputBox>
    </AdminMainWrapper>
  );
}