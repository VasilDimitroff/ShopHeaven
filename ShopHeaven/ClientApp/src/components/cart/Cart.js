import { React, Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Close } from "@mui/icons-material";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";
import { cartPath } from "../../constants";
import BreadcrumbsBar from "../common/BreadcrumbsBar";
import CartSummary from "./CartSummary";
import CartProduct from "./CartProduct";

export default function Cart() {
  useEffect(() => {}, []);

  const breadcrumbs = [
    {
      name: "Home",
      uri: "/",
    },
    {
      name: `Cart`,
      uri: `${cartPath}`,
    },
  ];

  const MainWrapper = styled(Box)({
    width: "80%",
    margin: "auto",
    marginTop: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      width: "95%",
    },
  });

  return (
    <Box>
      <BreadcrumbsBar breadcrumbsItems={breadcrumbs} />
      <MainWrapper>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={9}>
            <Stack spacing={2}>
              <CartProduct />
              <CartProduct />
              <CartProduct />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={3}>
            <CartSummary />
          </Grid>
        </Grid>
      </MainWrapper>
    </Box>
  );
}
