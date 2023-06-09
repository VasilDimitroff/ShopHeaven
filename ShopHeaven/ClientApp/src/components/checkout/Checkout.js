import { React, useState, useEffect, useRef } from "react";
import { Box, Grid, Stack, Typography, Button, Paper, Chip } from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";
import { MainWrapper, UniversalInput, InputBox, CompleteActionButton, StyledSelect } from "../../styles/styles";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { ApiEndpoints } from "../../api/endpoints";
import { cartPath, checkoutPath } from "../../constants";
import BreadcrumbsBar from "../common/BreadcrumbsBar";

const breadcrumbs = [
  {
    name: "Home",
    uri: "/",
  },
  {
    name: `Cart`,
    uri: `${cartPath}`,
  },
  {
    name: `Checkout`,
    uri: `${checkoutPath}`,
  },
];

export default function Checkout() {
  const [productsInCart, setProductsInCart] = useState([]);
  const [cartSummary, setCartSummary] = useState();
  const [deleteProductDOMelement, setDeleteProductDOMelement] = useState(false);

  const [orderInfo, setOrderInfo] = useState({
    recipient: "",
    phone: "",
    country: "",
    city: "",
    address: "",
    details: "",
    shippingMethod: "",
    paymentMethod: "",
  });

  const { auth } = useAuth();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const recipientRef = useRef();
  const phoneRef = useRef();
  const countryRef = useRef();
  const cityRef = useRef();
  const addressRef = useRef();
  const detailsRef = useRef();
  const shippingMethodRef = useRef();
  const paymentMethodRef = useRef();

  const effectRun = useRef(false);

  useEffect(() => {
    window.scroll(0, 0);
  }, [])

  useEffect(() => {

    const controller = new AbortController();

    const getCheckountInfo = async () => {
      try {
        const response = await axiosPrivate.post(
          ApiEndpoints.carts.checkout,
          {
            cartId: auth.cartId,
            userId: auth.userId,
          },
          {
            signal: controller.signal,
          }
        );

        setProductsInCart(response?.data?.products);
        setCartSummary(response?.data?.summary);

        setDeleteProductDOMelement(false);

        console.log("CART RESPONSE: ", response?.data);

      } catch (error) {
        console.log(error);
      }
    };

    if (effectRun.current) {
      getCheckountInfo();
    }

    return () => {
      effectRun.current = true;
      controller.abort();
    };
  }, []);

  function onCreateOrder(e) {
    e.preventDefault();
  }

  const SectionNumberChip = styled(Chip)({
    background: theme.palette.secondary.main,
    color: theme.palette.common.white,
    fontWeight: 500,
    fontSize: 18,
  });

  const InputBoxFlex = styled(InputBox)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  })

  return (
    <Box>
      <BreadcrumbsBar breadcrumbsItems={breadcrumbs} />
      <MainWrapper>
        <Paper>
          <form onSubmit={onCreateOrder}>
            <InputBoxFlex>
              <SectionNumberChip label={1} />
              <Typography variant="h6">RECIPIENT</Typography>
            </InputBoxFlex>
            <InputBox>
              <UniversalInput
                inputRef={recipientRef}
                label="Recipient"
                defaultValue={orderInfo.recipient}
                variant="outlined"
                placeholder="e.g., Till Lindemann"
              />
            </InputBox>
            <InputBox>
              <UniversalInput
                inputRef={phoneRef}
                label="Phone"
                defaultValue={orderInfo.phone}
                variant="outlined"
                type="tel"
                placeholder={"e.g., +359854847248"}
                inputProps={{
                  step: "0.01",
                  min: "0.00",
                }}
              />
            </InputBox>
            <InputBoxFlex>
              <SectionNumberChip label={2} />
              <Typography variant="h6">SHIPPING</Typography>
            </InputBoxFlex>
            <InputBox sx={{ mb: 1.5 }}>
              <select
                style={StyledSelect}
                ref={shippingMethodRef}
                name="shippingMethod"
                defaultValue={orderInfo.shippingMethod}
              >
                <option value={""}>
                  {`${'--- SHIPPING METHOD ---'}`}
                </option>
                <option value={"MethodValue"}>
                  {`${'COURIER'}`}
                </option>
              </select>
            </InputBox> 
            <InputBox>
              <UniversalInput
                inputRef={countryRef}
                label="Country"
                defaultValue={orderInfo.country}
                variant="outlined"
                placeholder="e.g., Bulgaria"
              />
            </InputBox>
            <InputBox>
              <UniversalInput
                inputRef={cityRef}
                label="City"
                defaultValue={orderInfo.city}
                variant="outlined"
                placeholder="e.g., Sofia"
              />
            </InputBox>
            <InputBox>
              <UniversalInput
                inputRef={addressRef}
                label="Address"
                defaultValue={orderInfo.address}
                variant="outlined"
                placeholder="e.g., Garibaldi Sq. 1"
              />
            </InputBox>
            <InputBox>
              <UniversalInput
                multiline
                rows={4}
                inputRef={detailsRef}
                label="Details"
                defaultValue={orderInfo.details}
                variant="outlined"
                placeholder="Additional notes (optional)"
              />
            </InputBox>
            <InputBoxFlex>
              <SectionNumberChip label={3} />
              <Typography variant="h6">PAYMENT</Typography>
            </InputBoxFlex>
            <InputBox sx={{ mb: 1.5 }}>
              <select
                style={StyledSelect}
                ref={paymentMethodRef}
                name="paymnetMethod"
                defaultValue={orderInfo.paymentMethod}
              >
                <option value={""}>
                  {`${'--- PAYMENT METHOD ---'}`}
                </option>
                <option value={"PMethodValue"}>
                  {`${'CARD'}`}
                </option>
              </select>
            </InputBox>
            <InputBox>
              <CompleteActionButton
                color="secondary"
                startIcon={<AddCircle />}
                type="submit"
                size="large"
                variant="contained"
              >
                Send Order
              </CompleteActionButton>
            </InputBox>
          </form>
        </Paper>
      </MainWrapper>
    </Box>
  );
}
