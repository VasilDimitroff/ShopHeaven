import { React, Fragment, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Close } from "@mui/icons-material";
import {
  useMediaQuery,
  Box,
  Grid,
  Paper,
  Typography,
  Stack,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";
import { cartPath } from "../../constants";

export default function CartProduct() {
    const [productQuantity, setProductQuantity] = useState(1);

    const quantityRef = useRef();

  useEffect(() => {}, []);

  const isSmallOrDown = useMediaQuery(theme.breakpoints.down("sm"));

  const ImageHolder = styled(Box)({
    width: isSmallOrDown ? "30%" : "55%",
    maxWidth: "200px",
    height: 0,
    paddingBottom: isSmallOrDown ? "30%" : "55%",
    position: "relative",
    overflow: "hidden",
  });

  const InfoHolder = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  })

  const RegularPriceHolder = styled(InfoHolder)({
    textDecoration: "line-through",
    color: "gray",
    fontWeight: 500,
    fontSize: 20,
  });

  const FinalPriceHolder = styled(InfoHolder)({
    fontWeight: 500,
    color: theme.palette.error.main,
  });

  const StyledChip = styled(Chip)({
    color: theme.palette.white.main,
    fontWeight: 500,
    backgroundColor: theme.palette.secondary.main,
    borderRadius: theme.shape.borderRadius,
  });

  const ProductInfo = styled(Box)({});

  return (
    <Paper sx={{ p: 2 }}>
      <Grid container spacing={1} sx={{ border: "1px solid red" }}>
        <Grid
          item
          xs={12}
          sm={3}
          md={3}
          lg={3}
          display="flex"
          alignContent="center"
          justifyContent="center"
          //sx={{ border: "1px solid black" }}
        >
          <ImageHolder>
            <img
              style={{
                cursor: "pointer",
                borderRadius: "15%",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                top: 0,
                left: 0,
                padding: theme.spacing(1),
              }}
              src="https://img.freepik.com/premium-psd/bottle-product-mockup-psd-beauty-packaging_53876-130082.jpg"
            />
          </ImageHolder>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          lg={6}
          //sx={{ border: "1px solid black" }}
        >
          <Stack spacing={1.2}>
            <Typography sx={{ lineHeight: 1, fontSize: 18, fontWeight: 500 }}>
              Here will be the great name of the best product in the world!
            </Typography>
            <ProductInfo>
              <Stack spacing={2} flexWrap="wrap" direction="row">
                <Chip
                  variant="outlined"
                  color="success"
                  size="small"
                  label={"Warranty"}
                />
                <Chip
                  variant="outlined"
                  color="success"
                  size="small"
                  label={"Available"}
                />
                <Chip
                  color="primary"
                  size="small"
                  variant="outlined"
                  label={"Brand: Johnnie Walker"}
                />
              </Stack>
            </ProductInfo>
            <Typography>Description Description Description Description Description Description </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={3} md={3} lg={3} sx={{ margin: "auto" }}>
          <Box>
            <InfoHolder>
              <StyledChip size="small" variant="filled" label={`Save ${5}%`} />
            </InfoHolder>
            <RegularPriceHolder>
              <Typography>$40.50</Typography>
            </RegularPriceHolder>
          </Box>

          <FinalPriceHolder>
            <Typography variant="h6">$40.50</Typography>
          </FinalPriceHolder>

          <InfoHolder>
            QUANTITY
          </InfoHolder>
        </Grid>
      </Grid>
    </Paper>
  );
}
