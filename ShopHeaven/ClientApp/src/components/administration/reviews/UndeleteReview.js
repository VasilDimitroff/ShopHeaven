import { React, useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Alert,
  Zoom,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { RestoreFromTrash, Cancel } from "@mui/icons-material";
import { theme } from "../../../theme";
import { ApiEndpoints } from "../../../api/endpoints";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { noPermissionsForOperationMessage } from "../../../constants";

export default function UndeleteReview(props) {
  let axiosPrivate = useAxiosPrivate();

  const [review, setReview] = useState(props.review);
  const [undeleteReviewResponseMessage, setUndeleteReviewResponseMessage] =
    useState("");
  const [undeleteReviewErrorMessage, setUndeleteReviewErrorMessage] = useState("");
  const [isUndeleted, setIsUndeleted] = useState(false);

  function onUndeleteReview() {
    undeleteReview(review?.id);
  }

  async function undeleteReview(reviewId) {
    try {
      const controller = new AbortController();
      const response = await axiosPrivate.post(
        ApiEndpoints.reviews.undeleteReview,
        JSON.stringify({ id: reviewId }),
        {
          signal: controller.signal,
        }
      );

      controller.abort();

      setUndeleteReviewErrorMessage("");
      setUndeleteReviewResponseMessage("Review " + review.id + " undeleted!");

      setIsUndeleted(true);
      props.updateReview(response?.data);
    } catch (error) {
      setUndeleteReviewResponseMessage("");
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        setUndeleteReviewErrorMessage(noPermissionsForOperationMessage);
      } else {
        setUndeleteReviewErrorMessage(error?.response?.data);
      }
      console.log(error.message);
    }
  }

  const UndeleteReviewButton = styled(Button)({
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
      <Box
        sx={{
          textAlign: "center",
          marginLeft: theme.spacing(4),
          marginTop: theme.spacing(3),
        }}
      >
        <Typography variant="h6">
          Do you want to reveal review of {review?.email}!
        </Typography>
      </Box>
      <ButtonsHolder>
        <UndeleteReviewButton
          onClick={onUndeleteReview}
          startIcon={<RestoreFromTrash />}
          type="submit"
          size="large"
          variant="contained"
          color="primary"
          disabled={isUndeleted ? true : false}
        >
          UNDELETE REVIEW
        </UndeleteReviewButton>
        <UndeleteReviewButton
          startIcon={<Cancel />}
          onClick={props.onUndeleteCancelButtonClicked}
          type="submit"
          size="large"
          variant="outlined"
          color="primary"
        >
          CANCEL
        </UndeleteReviewButton>
      </ButtonsHolder>
      {undeleteReviewResponseMessage ? (
        <Zoom in={undeleteReviewResponseMessage.length > 0 ? true : false}>
          <Alert sx={{ marginTop: theme.spacing(1) }} severity="success">
            {undeleteReviewResponseMessage}
          </Alert>
        </Zoom>
      ) : (
        <></>
      )}
      {undeleteReviewErrorMessage ? (
        <Zoom in={undeleteReviewErrorMessage.length > 0 ? true : false}>
          <Alert variant="filled" sx={{ marginTop: theme.spacing(1) }} severity="error">
            {undeleteReviewErrorMessage}
          </Alert>
        </Zoom>
      ) : (
        ""
      )}
    </Paper>
  );
}