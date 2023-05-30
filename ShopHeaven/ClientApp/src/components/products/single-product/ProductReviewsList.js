import { React, useState, Fragment } from "react";
import { Box, Typography, Stack, Paper, Rating } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { theme } from "../../../theme";
import { styled } from "@mui/material/styles";

export default function ProductReviewsList(props) {

    const StyledPaper = styled(Paper)({
        padding: theme.spacing(3)
    });

    const InfoHolder = styled(Box)({
        display: "flex",
        gap: 5,
        alignItems: "center",
        marginBottom: theme.spacing(1)
    });

    const ContentHolder = styled(Box)({
        marginTop: theme.spacing(2)
    });

    const Author = styled(Typography)({
        fontWeight: 500,
        fontSize: 17
    });

    const Date = styled(Typography)({
        color: "gray",
        fontSize: 13
    });

  return (
    <Fragment>
      <Stack spacing={2} sx={{mt: theme.spacing(4)}}>
        {props.reviews.map((review) => {
          return (
            <StyledPaper key={review.id} variant="elevation" elevation={1}>
              <InfoHolder>
                <AccountCircle />
                <Author>{review.author}</Author>
                <Date>on: {review.createdOn}</Date>
              </InfoHolder>
              <InfoHolder>
                <Rating name="read-only" size="small" value={review.ratingValue} max={5} readOnly />
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
