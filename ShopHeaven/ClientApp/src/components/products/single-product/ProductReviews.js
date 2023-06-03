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
  Zoom
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
    name: "",
    email: "",
    comment: "",
    ratingValue: null
  });

  const [messages, setMessages] = useState({
    createReviewResponseMessage: "",
    createReviewErrorMessage: ""
  })

  const nameRef = useRef();
  const emailRef = useRef();
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
      userId: auth.userId,
      productId: newReview.productId,
      author: newReview.name,
      email: newReview.email,
      comment: newReview.comment,
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
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const comment = commentRef.current.value;

    setNewReview(prev => {
      return {
        ...prev,
        name: name,
        email: email,
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
    gap: 5,
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
        <Typography variant="h6">LEAVE REVIEW</Typography>
        <form onSubmit={onCreateReview}>
          <CustomInput inputRef={nameRef} defaultValue={newReview.name} label="Your name" variant="outlined" />
          <CustomInput inputRef={emailRef} defaultValue={newReview.email} label="Your E-mail" variant="outlined" />
          <Typography>Your rating:</Typography>
          <Rating
            onChange={(event, newValue) => handleChangeRating(event, newValue)}
            name="size-small"
            variant="outlined"
            size="medium"
            sx={{ display: "inline"}}
            value={newReview.ratingValue}
          /> {newReview.ratingValue ? `${newReview.ratingValue} stars` : <></> }
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
