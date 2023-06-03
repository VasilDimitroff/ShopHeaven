import { React, useState, useRef, Fragment, useEffect } from "react";
import {
  Box,
  Typography,
  Stack,
  Paper,
  Rating,
  Button,
  InputBase,
  TextField,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { theme } from "../../../theme";
import { styled } from "@mui/material/styles";

export default function ProductReviews(props) {
  const [reviews, setReviews] = useState(props.reviews);
  const [isReviewCreated, setIsReviewCreated] = useState(false);

  const [newReview, setNewReview] = useState({
    productId: props.productId,
    name: "",
    email: "",
    comment: "",
    ratingValue: null
  });

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
      productId: newReview.productId,
      username: newReview.name,
      email: newReview.email,
      comment: newReview.comment,
      ratingValue: newReview.ratingValue
    };

    createReview(review);
  }

  async function createReview(newReview) {
    console.log("V ZAQVKATA ", newReview)
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

  const ProductInfoInput = styled(TextField)({
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
          <ProductInfoInput inputRef={nameRef} defaultValue={newReview.name} label="Your name" variant="outlined" />
          <ProductInfoInput inputRef={emailRef} defaultValue={newReview.email} label="Your E-mail" variant="outlined" />
          <Typography>Your rating:</Typography>
          <Rating
            onChange={(event, newValue) => handleChangeRating(event, newValue)}
            name="size-small"
            variant="outlined"
            size="medium"
            sx={{ display: "inline", border: "1px solid black" }}
            value={newReview.ratingValue}
          /> {newReview.ratingValue ? `${newReview.ratingValue} stars` : <></> }
          <ProductInfoInput
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
