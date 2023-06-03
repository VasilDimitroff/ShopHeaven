import { React, useState, useRef, Fragment, useEffect } from "react";
import {
  Box,
  Typography,
  Stack,
  Paper,
  Rating,
  Button,
  Alert,
  TextField,
  Zoom,
  Avatar,
  Chip
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { theme } from "../../../theme";
import { styled } from "@mui/material/styles";
import { ApiEndpoints } from "../../../api/endpoints";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { noPermissionsForOperationMessage } from "../../../constants";
import useAuth from "../../../hooks/useAuth";

export default function ProductReviews(props) {
  let { auth } = useAuth();
  let axiosPrivate = useAxiosPrivate()

  const [reviews, setReviews] = useState(props.reviews);
  const [isReviewCreated, setIsReviewCreated] = useState(false);

  const [newReview, setNewReview] = useState({
    productId: props.productId,
    comment: "",
    ratingValue: null
  });

  const [messages, setMessages] = useState({
    createReviewResponseMessage: "",
    createReviewErrorMessage: ""
  })

  const commentRef = useRef();

  function handleChangeRating(event, newValue) {
    setInputFieldsValues()

    setNewReview(prev => {
      return {
        ...prev,
        ratingValue: parseInt(newValue)
      }
    });
  }

  function onCreateReview (e){
    e.preventDefault();

    setInputFieldsValues()

    const review = {
      createdBy: auth.userId,
      productId: newReview.productId,
      comment: commentRef.current.value,
      ratingValue: newReview.ratingValue
    };

    createReview(review);
  }

  async function createReview(review) {
    try {
      console.log("DANNITE", review)
      const controller = new AbortController();

      const response = await axiosPrivate.post(
        ApiEndpoints.reviews.createReview,
        review,
        {
          signal: controller.signal,
        }
      );

      controller.abort();

      setMessages(prev => {
        return {
          ...prev,
          createReviewErrorMessage: "",
          createReviewResponseMessage:  `Review successfully created!`
        }
      })
      setIsReviewCreated(true);
      console.log("RESPONSE REVIEW ", response?.data);
      //props.categoriesListChanged(response?.data);
    } catch (error) {

      if (error?.response?.status === 401 || error?.response?.status === 403) {
        setMessages(prev => {
          return {
            ...prev,
            createReviewErrorMessage: noPermissionsForOperationMessage,
            createReviewResponseMessage:  ``
          }
        })
      } else {
        setMessages(prev => {
          return {
            ...prev,
            createReviewErrorMessage: "Error! Check if all fields are filled",
            createReviewResponseMessage:  ``
          }
        })
      }
      console.log(error.message);
    }
  }

  function setInputFieldsValues() {
    const comment = commentRef.current.value;

    setNewReview(prev => {
      return {
        ...prev,
        comment: comment,
      }
    });
  }

  const CustomInput = styled(TextField)({
    background: "rgb(255,249,249)",
    width: "100%",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
  });

  const StyledPaper = styled(Paper)({
    padding: theme.spacing(3),
  });

  const InfoHolder = styled(Box)({
    display: "flex",
    gap: 10,
    alignItems: "center",
    marginBottom: theme.spacing(1),
  });

  const ContentHolder = styled(Box)({
    marginTop: theme.spacing(2),
  });

  const Author = styled(Typography)({
    fontWeight: 500,
    fontSize: 17,
  });

  const Date = styled(Typography)({
    color: "gray",
    fontSize: 13,
  });

  return (
    <Fragment>
      <Box>
        <Chip variant="outlined" label="LEAVE REVIEW:"/>
        <form onSubmit={onCreateReview}>
          <Box sx={{mt:4}}>
              <InfoHolder>
                <Avatar size="small" sx={{ bgcolor: theme.palette.secondary.main, width: 30, height: 30 }}>{auth.email[0].toUpperCase()}</Avatar>
                <Author>{auth.email}</Author>
              </InfoHolder>
            </Box>
            <Box sx={{display: "flex", gap: 1}}>
          <Typography>Rate:</Typography>
          <Rating
            onChange={(event, newValue) => handleChangeRating(event, newValue)}
            name="size-small"
            variant="outlined"
            size="medium"
            sx={{ display: "inline"}}
            value={newReview.ratingValue}
          /> <Typography>{newReview.ratingValue ? `(${newReview.ratingValue} stars)` : <></> }</Typography>
          </Box>
          <CustomInput
            inputRef={commentRef}
            multiline
            label="Type your comment..."
            variant="outlined"
            defaultValue={newReview.comment}
            minRows={4}
          />
          <Button
            type="submit"
            size="medium"
            variant="contained"
            sx={{ mt: theme.spacing(2) }}
          >
            SEND REVIEW
          </Button>
        </form>
        {messages.createReviewResponseMessage ? (
        <Zoom in={messages.createReviewResponseMessage.length > 0 ? true : false}>
          <Alert sx={{ marginTop: theme.spacing(1) }} severity="success">
            {messages.createReviewResponseMessage}
          </Alert>
        </Zoom>
      ) : (
        ""
      )}
      {messages.createReviewErrorMessage ? (
        <Zoom in={messages.createReviewErrorMessage.length > 0 ? true : false}>
          <Alert sx={{ marginTop: theme.spacing(1) }} variant="filled" severity="error">
            {messages.createReviewErrorMessage}
          </Alert>
        </Zoom>
      ) : (
        ""
      )}
      </Box>
      <Stack spacing={2} sx={{ mt: theme.spacing(4) }}>
        {reviews?.map((review) => {
          return (
            <StyledPaper key={review.id} variant="elevation" elevation={1}>
              <InfoHolder>
                <AccountCircle />
                <Author>{review.author}</Author>
                <Date>on: {review.createdOn}</Date>
              </InfoHolder>
              <InfoHolder>
                <Rating
                  name="read-only"
                  size="small"
                  value={review.ratingValue}
                  max={5}
                  readOnly
                />
                <Typography>({review.ratingValue})</Typography>
              </InfoHolder>
              <ContentHolder>
                <Typography>{review.content}</Typography>
              </ContentHolder>
            </StyledPaper>
          );
        })}
      </Stack>
    </Fragment>
  );
}
