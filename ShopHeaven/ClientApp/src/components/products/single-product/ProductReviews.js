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
  Chip,
} from "@mui/material";
import AppPagination from "../../common/AppPagination";
import { theme } from "../../../theme";
import { styled } from "@mui/material/styles";
import { ApiEndpoints } from "../../../api/endpoints";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import axios from "../../../api/axios";
import { noPermissionsForOperationMessage, reviewsPerPageInProductPage } from "../../../constants";
import useAuth from "../../../hooks/useAuth";
import useUser from "../../../hooks/useUser";

export default function ProductReviews(props) {
  let { auth } = useAuth();
  let {user, setUser} = useUser();
  let axiosPrivate = useAxiosPrivate();

  const [productId, setProductId] = useState(props.productId)
  const [reviews, setReviews] = useState(props.reviews);





  //current page with reviews - pagination states
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(10);
  const [totalReviewsCount, setTotalReviewsCount] = useState(0);

  const effectRun = useRef(false);


  useEffect(() => {
    const controller = new AbortController();
    const getProduct = async () => {
      try {
        const response = await axios.post(
          ApiEndpoints.reviews.allByProductId,
          {
            productId: props.productId,
            status: "Approved",
            recordsPerPage: reviewsPerPageInProductPage,
            page: page,
            searchTerm: "",
          },
          {
            signal: controller.signal,
          }
        );

        console.log(response?.data);
        
        setReviews(response?.data?.reviews);
        setNumberOfPages(response?.data?.pagesCount);
        setTotalReviewsCount(response?.data?.reviewsCount);

        if (page > response?.data?.pagesCount) {
          setPage(1);
        }

      } catch (error) {
        console.log(error);
      }
    };

    if (effectRun.current) {
      getProduct();
    }

    return () => {
      effectRun.current = true; // update the value of effectRun to true
      controller.abort();
    };
  }, [page]);


  const [newReview, setNewReview] = useState({
    productId: productId,
    comment: "",
    ratingValue: null,
  });

  const [messages, setMessages] = useState({
    createReviewResponseMessage: "",
    createReviewErrorMessage: "",
  });

  const commentRef = useRef();


  useEffect(() => {
    console.log("USER ", user)
  }, [])
  
  function handleChangeRating(event, newValue) {
    setInputFieldsValues();

    setNewReview((prev) => {
      return {
        ...prev,
        ratingValue: parseInt(newValue),
      };
    });
  }

  function onCreateReview(e) {
    e.preventDefault();

    setInputFieldsValues();

    const isFormValid = validateForm();

    if (!isFormValid) {
      return;
    }

    const review = {
      userId: auth.userId,
      productId: newReview.productId,
      content: commentRef.current.value,
      ratingValue: newReview.ratingValue,
    };

    createReview(review);
  }

  async function createReview(review) {
    try {
      console.log("REVIEW REQUEST", review);
      const controller = new AbortController();

      const response = await axiosPrivate.post(
        ApiEndpoints.reviews.createReview,
        review,
        {
          signal: controller.signal,
        }
      );

      controller.abort();

      setMessages((prev) => {
        return {
          ...prev,
          createReviewErrorMessage: "",
          createReviewResponseMessage: `Review successfully created!`,
        };
      });

      setNewReview((prev) => {
        return {
          productId: productId,
          comment: "",
          ratingValue: null,
        };
      });

      setReviews(prev => [...prev, response?.data])
    } catch (error) {
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        setMessages((prev) => {
          return {
            ...prev,
            createReviewErrorMessage: noPermissionsForOperationMessage,
            createReviewResponseMessage: ``,
          };
        });
      } else {
        setMessages((prev) => {
          return {
            ...prev,
            createReviewErrorMessage: error?.response?.data,
            createReviewResponseMessage: ``,
          };
        });
      }
      console.log(error.message);
    }
  }

  function setInputFieldsValues() {
    const comment = commentRef.current.value;

    setNewReview((prev) => {
      return {
        ...prev,
        comment: comment,
      };
    });
  }

  function validateForm() {
    let isValid = true;

    if (!commentRef.current.value || newReview.comment.length < 2) {
      setMessages((prev) => {
        return {
          ...prev,
          createReviewErrorMessage: "Rating comment must be at least 2 characters",
        };
      });

      isValid = false;

      return isValid;
    }

    if (!newReview.ratingValue || newReview.ratingValue < 1) {
      setMessages((prev) => {
        return {
          ...prev,
          createReviewErrorMessage: "Rating star value must be at least 1",
        };
      });

      isValid = false;
    } else {
      setMessages((prev) => {
        return {
          ...prev,
          createReviewErrorMessage: "",
        };
      });
    }

    return isValid;
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
    fontSize: 18,
  });

  const Date = styled(Typography)({
    color: "gray",
    fontSize: 13,
  });

  const PaginationHolder = styled(Box)({
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(1),
  });

  return (
    <Fragment>
      <Box>
        <Chip variant="outlined" label="LEAVE REVIEW:" />
        <form onSubmit={onCreateReview}>
          <Box sx={{ mt: 4 }}>
            <InfoHolder>
              <Avatar
                sx={{
                  bgcolor: theme.palette.secondary.main,
                }}
              >
                {auth?.email ? auth?.email[0].toUpperCase() : "?"}
              </Avatar>
              <Author>{auth.email}</Author>
            </InfoHolder>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography>Rate:</Typography>
            <Rating
              onChange={(event, newValue) =>
                handleChangeRating(event, newValue)
              }
              name="size-small"
              variant="outlined"
              size="medium"
              sx={{ display: "inline" }}
              value={newReview.ratingValue}
            />{" "}
            <Typography>
              {newReview.ratingValue ? (
                `(${newReview.ratingValue} stars)`
              ) : (
                <></>
              )}
            </Typography>
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
          <Zoom
            in={messages.createReviewResponseMessage.length > 0 ? true : false}
          >
            <Alert sx={{ marginTop: theme.spacing(2) }} severity="success">
              {messages.createReviewResponseMessage}
            </Alert>
          </Zoom>
        ) : (
          ""
        )}
        {messages.createReviewErrorMessage ? (
          <Zoom
            in={messages.createReviewErrorMessage.length > 0 ? true : false}
          >
            <Alert
              sx={{ marginTop: theme.spacing(2) }}
              variant="filled"
              severity="error"
            >
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
                <Avatar
                  sx={{
                    bgcolor: theme.palette.primary.main,
                    width: 30,
                    height: 30,
                  }}
                >
                  {review.email[0].toUpperCase()}
                </Avatar>
                <Author>{review.email}</Author>
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
                <Typography>({review.ratingValue} stars)</Typography>
              </InfoHolder>
              <ContentHolder>
                <Typography>{review.content}</Typography>
              </ContentHolder>
            </StyledPaper>
          );
        })}
      </Stack>
      <PaginationHolder>
        <AppPagination
          setPage={setPage}
          page={page}
          numberOfPages={numberOfPages}
          isReview={true}
        />
      </PaginationHolder>
    </Fragment>
  );
}
