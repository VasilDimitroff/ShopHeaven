import { React, Fragment } from "react";
import { Typography, InputBase, Rating, Button } from "@mui/material";
import { theme } from "../../theme";
import { styled } from "@mui/material/styles";

export default function AddReviewForm() {

  const ProductInfoInput = styled(InputBase)({
    background: "rgb(255,249,249)",
    width: "100%",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
  });

  return (
    <Fragment>
      <Typography variant="h6">LEAVE REVIEW</Typography>
      <form>
        <ProductInfoInput placeholder="Your name" />
        <ProductInfoInput placeholder="Your e-mail (optional)" />
        <Typography>Your rating:</Typography>
        <Rating
          name="size-small"
          defaultValue={2}
          size="medium"
          sx={{ display: "block" }}
        />
        <ProductInfoInput
          multiline
          placeholder="Type comment here…"
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
    </Fragment>
  );
}