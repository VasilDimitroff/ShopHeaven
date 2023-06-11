import { React, useState, useEffect, useRef } from "react";
import { Box, Grid, Typography, Paper, Chip } from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import { theme } from "../../theme";
import { MainWrapper, UniversalInput, InputBox, CompleteActionButton, StyledSelect } from "../../styles/styles";
import useAuth from "../../hooks/useAuth";
import useUser from "../../hooks/useUser";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { ApiEndpoints } from "../../api/endpoints";
import { cartPath, checkoutPath } from "../../constants";
import useAppSettings from "../../hooks/useAppSettings";
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
  const { auth } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();
  const { appSettings } = useAppSettings();
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);


  const couponId = queryParams.get("couponId");

  const [shippingMethods, setShippingMethods] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [orderSummary, setOrderSummary] = useState();

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

    if(user.cartProductsCount < 1) {
      navigate(cartPath)
    } 

    const getCheckoutRequestData = {
      cartId: auth.cartId,
      userId: auth.userId,
      couponId: couponId
    }

    console.log('GET CHECKOUT REQUEST:', getCheckoutRequestData);

    const controller = new AbortController();

    const getCheckountInfo = async () => {
      try {
        const response = await axiosPrivate.post(
          ApiEndpoints.orders.checkout,
          getCheckoutRequestData,
          {
            signal: controller.signal,
          }
        );

        setOrderInfo(prev => {
          return {
            ...prev,
            recipient: response?.data?.recipient,
            phone: response?.data?.phone,
            country: response?.data?.country,
            city: response?.data?.city,
            address: response?.data?.city
          }
        });

        setOrderSummary(response?.data?.orderSummary);
        setPaymentMethods(response?.data?.paymentMethods);
        setShippingMethods(response?.data?.shippingMethods)

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

    const recipient = recipientRef.current.value;
    const phone = phoneRef.current.value;
    const country = countryRef.current.value;
    const shippingMethod = shippingMethodRef.current.value;
    const city = cityRef.current.value;
    const address = addressRef.current.value;
    const details = detailsRef.current.value;
    const paymentMethod = paymentMethodRef.current.value;


    const order = {
      recipient: recipient,
      phone: phone,
      country: country,
      shippingMethod: shippingMethod,
      city: city,
      address: address,
      details: details,
      paymentMethod: paymentMethod,
    }

    handleSetOrderInfo(order);

    console.log("ORDER: ", order)
  }

  function handleSetOrderInfo(order) {
    setOrderInfo(prev => {
      return {
        ...prev,
        recipient: order.recipient,
        phone: order.phone,
        country: order.country,
        shippingMethod: order.shippingMethod,
        city: order.city,
        address: order.address,
        details: order.details,
        paymentMethod: order.paymentMethod
      }
    })
  }

  const RegularPriceHolder = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "gray",
    fontWeight: 500,
    fontSize: 20,
    textAlign: "right",
    marginTop: theme.spacing(2),
  });

  const DiscountHolder = styled(Box)({
    display: "flex",
    color: "gray",
    alignItems: "center",
    justifyContent: "space-between",
  });

  const PriceHolder = styled(Box)({
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    gap: 20
  });

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

  const SectionWrapper = styled(Paper)({
    padding: theme.spacing(1, 0),
    margin: theme.spacing(4, 0)
  })

  const Divider = styled(Box)({
    width: "1px",
    borderLeft: "2px outset  #C8C8C8",
    height: "100%"
  })

  return (
    <Box>
      <BreadcrumbsBar breadcrumbsItems={breadcrumbs} />
      <MainWrapper>
        <Paper sx={{ p: 2, backgroundColor: alpha(theme.palette.primary.main, 0.1) }}>
          <Typography textAlign={"center"} variant="h4" fontWeight={500}>ORDER INFO</Typography>
          <form onSubmit={onCreateOrder}>
            <SectionWrapper elevation={0}>
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
            </SectionWrapper>
            <SectionWrapper elevation={0}>
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
                  {
                    shippingMethods?.map(shipMethod => {
                      return <option key={shipMethod.id} value={shipMethod.name}>
                        {`${shipMethod.name}`}
                      </option>
                    })
                  }
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
            </SectionWrapper>
            <SectionWrapper elevation={0}>
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
                  {
                    paymentMethods?.map(payMethod => {
                      return <option key={payMethod} value={payMethod}>
                        {`${payMethod}`}
                      </option>
                    })
                  }
                </select>
              </InputBox>
            </SectionWrapper>
            <Paper sx={{ p: 2 }}>
              <Typography
                align="center"
                variant="h5"
                fontWeight={500}
                sx={{ mb: 3 }}
              >
                ORDER SUMMARY:
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={5.6}>
                  <RegularPriceHolder>
                    <Typography>Regular price:</Typography>
                    <Typography sx={{ textDecoration: orderSummary?.discount > 0 ? "line-through" : "none" }}>
                      {appSettings.appCurrency.code}{" "}
                      {orderSummary?.totalPriceWithNoDiscount.toFixed(2)}
                    </Typography>
                  </RegularPriceHolder>
                  {
                    orderSummary?.discount > 0
                      ? <DiscountHolder>
                          <Typography>Discount:</Typography>
                          <Typography>
                            {appSettings.appCurrency.code} -
                            {orderSummary?.discount.toFixed(2)}
                          </Typography>
                       </DiscountHolder>
                      : <></>
                  }
                  {
                    orderSummary?.couponDiscount > 0
                      ? (<DiscountHolder>
                        <Typography>Coupon discount:</Typography>
                        <Typography>
                          {`${appSettings.appCurrency.code} -${orderSummary?.couponDiscount.toFixed(2)} (-${orderSummary?.couponAmount}%)`}
                        </Typography>
                      </DiscountHolder>)
                      : <></>
                  }
                </Grid>
                <Grid item xs={0} sm={0} md={0} lg={0.8} sx={{ display: "flex", justifyContent: "center" }}>
                  <Divider></Divider>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={5.6}>
                  <PriceHolder>
                    <Typography sx={{ fontWeight: 600, fontSize: 22, }}>
                      TOTAL PRICE:
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 500, color: theme.palette.error.main }}
                    >
                      {appSettings.appCurrency.code} {orderSummary?.totalPriceWithAllDiscounts.toFixed(2)}
                    </Typography>
                  </PriceHolder>
                  <InputBox>
                    <CompleteActionButton
                      color="secondary"
                      startIcon={<ArrowForwardIos />}
                      endIcon={<ArrowForwardIos />}
                      type="submit"
                      size="large"
                      variant="contained"
                    >
                      Continue
                    </CompleteActionButton>
                  </InputBox>
                </Grid>
              </Grid>
            </Paper>
          </form>
        </Paper>
      </MainWrapper>
    </Box>
  );
}
