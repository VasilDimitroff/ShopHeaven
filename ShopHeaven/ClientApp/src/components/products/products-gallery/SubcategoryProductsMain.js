import { React, useState, Fragment } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../../theme";

export default function SubcategoryProductsMain() {
  const ContentWrapper = styled(Box)({
    width: "80%",
    margin: "auto",
    marginTop: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      width: "95%",
    },
  });

  return (
    <Fragment>
      <Paper>
        <ContentWrapper>
          <Typography variant="h5">Products</Typography>
        </ContentWrapper>
      </Paper>
    </Fragment>
  );
}
