import { React, useState, Fragment } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Alert,
  Zoom,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../../theme";
import { Delete, Cancel } from "@mui/icons-material";
import { ApiEndpoints } from "../../../api/endpoints";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { noPermissionsForOperationMessage } from "../../../constants";

export default function DeleteReview(props) {
  let axiosPrivate = useAxiosPrivate();

  const [review, setReview] = useState(props.review);
  const [deleteResponse, setDeleteResponse] = useState(undefined);
  const [undeleteResponse, setUndeleteResponse] = useState(undefined);
  const [undoDeleteButtonClicked, setUndoDeleteButtonClicked] = useState(false);
  const [deleteReviewResponseMessage, setDeleteReviewResponseMessage] =
    useState("");
  const [deleteReviewErrorMessage, setDeleteReviewErrorMessage] =
    useState("");
  const [isDeleted, setIsDeleted] = useState(false);

  function onDeleteReview() {
    deleteReview(review.id);
  }

  async function deleteReview(reviewId) {
    try {
      const controller = new AbortController();

      const response = await axiosPrivate.post(
        ApiEndpoints.reviews.deleteReview,
        JSON.stringify({ id: reviewId }),
        {
          signal: controller.signal,
        }
      );

      controller.abort();

      setDeleteReviewErrorMessage("");
      setDeleteReviewResponseMessage(
        "Review " + review?.id + " deleted!"
      );

      setDeleteResponse(response?.data);
      console.log("RESPONSE DELETED REVIEW", response?.data)
      setIsDeleted(true);
      props.updateReview(response?.data);
    } catch (error) {
      setDeleteReviewResponseMessage("");
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        setDeleteReviewErrorMessage(
          noPermissionsForOperationMessage
        );
      } else {
        setDeleteReviewErrorMessage(error?.response?.data);
      }
      console.log(error.message);
    }
  }

  const DeleteReviewButton = styled(Button)({
    width: "100%",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
  });

  const ButtonsHolder = styled(Box)({
    display: "flex",
    width: "100%",
    margin: "auto",
    gap: 60,
    justifyContent: "center",
  });

  return (
    <Paper sx={{ padding: theme.spacing(2), marginTop: theme.spacing(2) }}>
      <Fragment>
        <Box
          sx={{
            textAlign: "center",
            marginLeft: theme.spacing(4),
            marginTop: theme.spacing(3),
          }}
        >
          <Typography variant="h6">
            You are on the way to delete review of {review.email}!
          </Typography>
          <Typography variant="p" color="error">
            Be careful!
          </Typography>
        </Box>
        <ButtonsHolder>
          <DeleteReviewButton
            startIcon={<Delete />}
            onClick={onDeleteReview}
            type="submit"
            size="large"
            variant="outlined"
            color="error"
            disabled={isDeleted ? true : false}
          >
            DELETE REVIEW
          </DeleteReviewButton>
          <DeleteReviewButton
            startIcon={<Cancel />}
            onClick={props.onCancelButtonClicked}
            type="submit"
            size="large"
            variant="contained"
            color="error"
          >
            CANCEL
          </DeleteReviewButton>
        </ButtonsHolder>
        {deleteReviewResponseMessage ? (
          <Zoom in={deleteReviewResponseMessage.length > 0 ? true : false}>
            <Alert sx={{ marginTop: theme.spacing(1) }} severity="success">
              {deleteReviewResponseMessage}
            </Alert>
          </Zoom>
        ) : (
          ""
        )}
        {deleteReviewErrorMessage ? (
          <Zoom in={deleteReviewErrorMessage.length > 0 ? true : false}>
            <Alert variant="filled" sx={{ marginTop: theme.spacing(1) }} severity="error">
              {deleteReviewErrorMessage}
            </Alert>
          </Zoom>
        ) : (
          ""
        )}
      </Fragment>
    </Paper>
  );
}
