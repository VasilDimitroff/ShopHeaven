import { React, useState, useEffect, useRef } from "react";
import { Box, Grid, Typography, Paper, Chip, Zoom, Alert } from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import { theme } from "../../theme";
import { MainWrapper, UniversalInput, InputBox, CompleteActionButton, StyledSelect } from "../../styles/styles";
import useAuth from "../../hooks/useAuth";
import useUser from "../../hooks/useUser";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { ApiEndpoints } from "../../api/endpoints";
import { cartPath, checkoutPath, noPermissionsForOperationMessage } from "../../constants";
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

  const [messages, setMessages] = useState({
    recipientError: "",
    phoneError: "",
    countryError: "",
    cityError: "",
    addressError: "",
    shippingError: "",
    paymentError: "",
  });
  
  const [createOrderResponseMessage, setCreateOrderResponseMessage] = useState("");
  const [createOrderErrorMessage, setCreateOrderErrorMessage] = useState("");

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
      city: city,
      address: address,
      details: details,
      shippingMethod: shippingMethod,
      paymentMethod: paymentMethod,
      cartId: auth.cartId,
      couponId: couponId,
      userId: auth.userId
    }

    handleSetOrderInfo(order);

    const isValid = validateOrder();

    if(!isValid) {
      return;
    }

    createOrder(order)
  }

  async function createOrder(order) {

    try {
      const controller = new AbortController();

      const response = await axiosPrivate.post(
        ApiEndpoints.payments.createSession,
        order,
        {
          signal: controller.signal,
        }
      );

      controller.abort();

      setCreateOrderErrorMessage("");
      setCreateOrderResponseMessage(
        `Order successfully created`
      );

      //TODO: Clear global cart products count
    } catch (error) {
      setCreateOrderResponseMessage("");

      if (error?.response?.status === 401 || error?.response?.status === 403) {
        setCreateOrderErrorMessage(noPermissionsForOperationMessage);
      } else {
        setCreateOrderErrorMessage(error?.response?.data);
      }
      console.log(error?.message);
    }
  }

  function handleSetOrderInfo(order) {
    setOrderInfo(prev => {
      return {
        ...prev,
        recipient: order.recipient,
        phone: order.phone,
        country: order.country,
        city: order.city,
        address: order.address,
        details: order.details,
        shippingMethod: order.shippingMethod,
        paymentMethod: order.paymentMethod
      }
    })
  }

  function validateOrder() {
    let isValid = true;
    let errors = [];

    if (!recipientRef.current.value) {
      let msg = "Please enter a recipient fo the products";
      errors.push(msg);

      setMessages((prev) => {
        return {
          ...prev,
          recipientError: msg,
        };
      });

      isValid = false;
    } else {
      setMessages((prev) => {
        return {
          ...prev,
          recipientError: "",
        };
      });
    }

    if (!phoneRef.current.value) {
      let msg = "Please enter a valid phone";
      errors.push(msg);

      setMessages((prev) => {
        return {
          ...prev,
          phoneError: msg,
        };
      });

      isValid = false;
    } else {
      setMessages((prev) => {
        return {
          ...prev,
          phoneError: "",
        };
      });
    }

    if (!countryRef.current.value) {
      let msg = "Please select your country";
      errors.push(msg);

      setMessages((prev) => {
        return {
          ...prev,
          countryError: msg,
        };
      });

      isValid = false;
    } else {
      setMessages((prev) => {
        return {
          ...prev,
          countryError: "",
        };
      });
    }

    if (!cityRef.current.value) {
      let msg = "Please select a city";
      errors.push(msg);

      setMessages((prev) => {
        return {
          ...prev,
          cityError: msg,
        };
      });

      isValid = false;
    } else {
      setMessages((prev) => {
        return {
          ...prev,
          cityError: "",
        };
      });
    }

    if (!addressRef.current.value) {
      let msg = "Please select an address";
      errors.push(msg);

      setMessages((prev) => {
        return {
          ...prev,
          addressError: msg,
        };
      });

      isValid = false;
    } else {
      setMessages((prev) => {
        return {
          ...prev,
          addressError: "",
        };
      });
    }

    if (!shippingMethodRef.current.value) {
      let msg = "Please select a shipping method";
      errors.push(msg);

      setMessages((prev) => {
        return {
          ...prev,
          shippingError: msg,
        };
      });

      isValid = false;
    } else {
      setMessages((prev) => {
        return {
          ...prev,
          shippingError: "",
        };
      });
    }

    if (!paymentMethodRef.current.value) {
      let msg = "Please select a payment method";
      errors.push(msg);
      setMessages((prev) => {
        return {
          ...prev,
          paymentError: msg,
        };
      });

      isValid = false;
    } else {
      setMessages((prev) => {
        return {
          ...prev,
          paymentError: "",
        };
      });
    }

    if (!isValid) {
      let final =
        "The next validation errors occurs. Please resolve them and try again: \r\n";
      for (let i = 0; i < errors.length; i++) {
        final += ` (${i + 1}). ${errors[i]} \r\n`;
      }
      setCreateOrderResponseMessage("");
      setCreateOrderErrorMessage(final);
    }

    else {
      setCreateOrderResponseMessage("");
      setCreateOrderErrorMessage("");
    }

    return isValid;
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

  const CreateOrderAlert = styled(Alert)({
    margin: theme.spacing(1, 2)
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
              {messages.recipientError ? (
                  <CreateOrderAlert variant="filled" severity="error">
                    {messages.recipientError}
                  </CreateOrderAlert>
                ) : (
                  <></>
               )}
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
              {messages.phoneError ? (
                  <CreateOrderAlert variant="filled" severity="error">
                    {messages.phoneError}
                  </CreateOrderAlert>
                ) : (
                  <></>
               )}
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
              {messages.shippingError ? (
                  <CreateOrderAlert variant="filled" severity="error">
                    {messages.shippingError}
                  </CreateOrderAlert>
                ) : (
                  <></>
               )}
              <InputBox>
                <UniversalInput
                  inputRef={countryRef}
                  label="Country"
                  defaultValue={orderInfo.country}
                  variant="outlined"
                  placeholder="e.g., Bulgaria"
                />
              </InputBox>
              {messages.countryError ? (
                  <CreateOrderAlert variant="filled" severity="error">
                    {messages.countryError}
                  </CreateOrderAlert>
                ) : (
                  <></>
               )}
              <InputBox>
                <UniversalInput
                  inputRef={cityRef}
                  label="City"
                  defaultValue={orderInfo.city}
                  variant="outlined"
                  placeholder="e.g., Sofia"
                />
              </InputBox>
              {messages.cityError ? (
                  <CreateOrderAlert variant="filled" severity="error">
                    {messages.cityError}
                  </CreateOrderAlert>
                ) : (
                  <></>
               )}
              <InputBox>
                <UniversalInput
                  inputRef={addressRef}
                  label="Address"
                  defaultValue={orderInfo.address}
                  variant="outlined"
                  placeholder="e.g., Garibaldi Sq. 1"
                />
              </InputBox>
              {messages.addressError ? (
                  <CreateOrderAlert variant="filled" severity="error">
                    {messages.addressError}
                  </CreateOrderAlert>
                ) : (
                  <></>
               )}
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
              {messages.paymentError ? (
                  <CreateOrderAlert variant="filled" severity="error">
                    {messages.paymentError}
                  </CreateOrderAlert>
                ) : (
                  <></>
               )}
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
              <Box>
        {createOrderResponseMessage ? (
          <Zoom in={createOrderResponseMessage.length > 0 ? true : false}>
            <Alert sx={{ marginTop: theme.spacing(1) }} severity="success">
              {createOrderResponseMessage}
            </Alert>
          </Zoom>
        ) : (
          ""
        )}
        {createOrderErrorMessage ? (
          <Zoom in={createOrderErrorMessage.length > 0 ? true : false}>
            <Alert
              variant="filled"
              sx={{ marginTop: theme.spacing(1) }}
              severity="error"
            >
              {createOrderErrorMessage}
            </Alert>
          </Zoom>
        ) : (
          ""
        )}
      </Box>
            </Paper>
          </form>
        </Paper>
      </MainWrapper>
    </Box>
  );
}
