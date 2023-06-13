import { React, useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  Paper,
  Grid,
  Divider,
  Stack,
  Alert,
  Zoom,
  Typography,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { ContactMail, Edit, AddCircle, RemoveCircle, Phone, LocalShipping, Flag, LocationCity, LocationOn, Info } from "@mui/icons-material";
import { theme } from "../../../theme";
import { HeadingChip, SubheadingChip, InputBox, StyledSelect, UniversalInput, CompleteActionButton, AdminMainWrapper } from "../../../styles/styles";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { ApiEndpoints } from "../../../api/endpoints";
import {
  applicationUserRole,
  noPermissionsForOperationMessage,
  singleProductBasePath,
  usernameRequiredLength
} from "../../../constants";
import useAppSettings from "../../../hooks/useAppSettings";
import { Link } from "react-router-dom";

export default function EditOrder(props) {
  // api requests
  const axiosPrivate = useAxiosPrivate();

  //app settings
  const { appSettings } = useAppSettings();

  const [order, setOrder] = useState(props.order);

  //dropdown with all order statuses
  const [orderStatuses, setOrderStatuses] = useState(
    props.orderStatuses
  );

  //product editing refs
  const userNameRef = useRef();
  const userEmailRef = useRef();
  const addToRoleRef = useRef();
  const removeFromRoleRef = useRef();

  //errors
  const [messages, setMessages] = useState({
    userNameError: "",
    userEmailError: "",
  });

  const [editUserResponseMessage, setEditUserResponseMessage] = useState("");
  const [editUserErrorMessage, setEditUserErrorMessage] = useState("");

  const [addUserToRoleResponse, setAddUserToRoleResponse] = useState("");
  const [addUserToRoleErrorMessage, setAddUserToRoleErrorMessage] =
    useState("");

  const [
    removeUserFromRoleResponseMessage,
    setRemoveUserFromRoleResponseMessage,
  ] = useState("");
  const [removeUserFromRoleErrorMessage, setRemoveUserFromRoleErrorMessage] =
    useState("");

  useEffect(() => { }, [messages]);

  const InfoHolder = styled(Box)({
    display: "flex",
    gap: 10,
  });

  const InfoText = styled(Typography)({
    fontWeight: 500
  });

  const Section = styled(Stack)({
    // borderBottom:"1px solid gray",
    // borderColor: alpha(theme.palette.common.black, 0.15)
  })

  return (
    <AdminMainWrapper sx={{mt:4}}>
      <InputBox>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Divider textAlign="left" sx={{mb:2}}>
              <SubheadingChip
                label="RECIPIENT INFO"
                variant="filled"
                color="primary"
              />
            </Divider>
            <Section flexWrap={"wrap"} spacing={1}>
              <InfoHolder>
                <ContactMail sx={{ color: theme.palette.secondary.main }} />
                <InfoText display={"inline"}>
                  Recipient:
                </InfoText>
                <Typography display={"inline"}>
                  {order?.recipient}
                </Typography>
              </InfoHolder>
              <InfoHolder>
                <Phone sx={{ color: theme.palette.secondary.main }} />
                <InfoText display={"inline"}>
                  Phone:
                </InfoText>
                <Typography display={"inline"}>
                  {order?.phone}
                </Typography>
              </InfoHolder>
            </Section>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Divider textAlign="left" sx={{mb:2}}>
              <SubheadingChip
                label="SHIPPING INFO"
                variant="filled"
                color="primary"
              />
            </Divider>
            <Section flexWrap={"wrap"} spacing={1}>
              <InfoHolder>
                <LocalShipping sx={{ color: theme.palette.secondary.main }} />
                <InfoText display={"inline"}>
                  Shipping Method:
                </InfoText>
                <Typography display={"inline"}>
                  {order?.shippingMethod.name}
                </Typography>
              </InfoHolder>
              <InfoHolder>
                <LocalShipping sx={{ color: theme.palette.secondary.main }} />
                <InfoText display={"inline"}>
                  Shipping Amount:
                </InfoText>
                <Typography display={"inline"}>
                 {appSettings.appCurrency.code} {order?.shippingMethod.amount.toFixed(2)}
                </Typography>
              </InfoHolder>
              <InfoHolder>
                <Flag sx={{ color: theme.palette.secondary.main }} />
                <InfoText display={"inline"}>
                  Country:
                </InfoText>
                <Typography display={"inline"}>
                  {order?.country}
                </Typography>
              </InfoHolder>
              <InfoHolder>
                <LocationCity sx={{ color: theme.palette.secondary.main }} />
                <InfoText display={"inline"}>
                  City:
                </InfoText>
                <Typography display={"inline"}>
                  {order?.city}
                </Typography>
              </InfoHolder>
              <InfoHolder>
                <LocationOn sx={{ color: theme.palette.secondary.main }} />
                <InfoText display={"inline"}>
                  Address:
                </InfoText>
                <Typography display={"inline"}>
                  {order?.address}
                </Typography>
              </InfoHolder>
              <InfoHolder>
                <Info sx={{ color: theme.palette.secondary.main }} />
                <InfoText display={"inline"}>
                  Details:
                </InfoText>
                <Typography display={"inline"}>
                  {order?.details}
                </Typography>
              </InfoHolder>
            </Section>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Divider textAlign="left" sx={{mb:2}}>
              <SubheadingChip
                label="PAYMENT INFO"
                variant="filled"
                color="primary"
              />
            </Divider>
            <Section flexWrap={"wrap"} spacing={1}>
              <InfoHolder>
                <ContactMail sx={{ color: theme.palette.secondary.main }} />
                <InfoText display={"inline"}>
                  Total Amount Paid:
                </InfoText>
                <Typography display={"inline"}>
                {appSettings.appCurrency.code} {order?.payment?.amount.toFixed(2)}
                </Typography>
              </InfoHolder>
              <InfoHolder>
                <Phone sx={{ color: theme.palette.secondary.main }} />
                <InfoText display={"inline"}>
                Payment Method:
                </InfoText>
                <Typography display={"inline"}>
                  {order?.payment.paymentMethod}
                </Typography>
              </InfoHolder>
              <InfoHolder>
                <Phone sx={{ color: theme.palette.secondary.main }} />
                <InfoText display={"inline"}>
                 Is Payment Successfull:
                </InfoText>
                <Typography display={"inline"}>
                  {order?.payment.isCompleted ? "Yes" : "No"}
                </Typography>
              </InfoHolder>
              <InfoHolder>
                <Phone sx={{ color: theme.palette.secondary.main }} />
                <InfoText display={"inline"}>
                 Payment Id:
                </InfoText>
                <Typography display={"inline"}>
                  {order?.payment.id}
                </Typography>
              </InfoHolder>
            </Section>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Divider textAlign="left" sx={{mb:2}}>
              <SubheadingChip
                label="PRICING INFO"
                variant="filled"
                color="primary"
              />
            </Divider>
            <Section flexWrap={"wrap"} spacing={1}>
              <InfoHolder>
                <ContactMail sx={{ color: theme.palette.secondary.main }} />
                <InfoText display={"inline"}>
                  Total price with no discount:
                </InfoText>
                <Typography display={"inline"}>
                {appSettings.appCurrency.code} {order?.totalPriceWithNoDiscount.toFixed(2)}
                </Typography>
              </InfoHolder>
              <InfoHolder>
                <Phone sx={{ color: theme.palette.secondary.main }} />
                <InfoText display={"inline"}>
                Total price with product discounts:
                </InfoText>
                <Typography display={"inline"}>
                {appSettings.appCurrency.code} {order?.totalPriceWithDiscount.toFixed(2)}
                </Typography>
              </InfoHolder>
              <InfoHolder>
                <Phone sx={{ color: theme.palette.secondary.main }} />
                <InfoText display={"inline"}>
                 Total price with product discounts and coupon (if there is):
                </InfoText>
                <Typography display={"inline"}>
                {appSettings.appCurrency.code} {order?.totalPriceWithDiscountAndCoupon.toFixed(2)}
                </Typography>
              </InfoHolder>
              <InfoHolder>
                <Phone sx={{ color: theme.palette.secondary.main }} />
                <InfoText display={"inline"}>
                Total price with product discounts, coupon discount and shipping tax:
                </InfoText>
                <Typography display={"inline"}>
                {appSettings.appCurrency.code} {order?.totalPriceWithDiscountCouponAndShippingTax.toFixed(2)}
                </Typography>
              </InfoHolder>
            </Section>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Divider textAlign="left" sx={{mb:2}}>
              <SubheadingChip
                label="COUPON INFO"
                variant="filled"
                color="primary"
              />
            </Divider>
            {
              order?.coupon
              ? (<Section flexWrap={"wrap"} spacing={1}>
              <InfoHolder>
                <ContactMail sx={{ color: theme.palette.secondary.main }} />
                <InfoText display={"inline"}>
                  Coupon Code:
                </InfoText>
                <Typography display={"inline"}>
                 {order?.coupon?.code}
                </Typography>
              </InfoHolder>
              <InfoHolder>
                <Phone sx={{ color: theme.palette.secondary.main }} />
                <InfoText display={"inline"}>
                 Coupon Amount:
                </InfoText>
                <Typography display={"inline"}>
                {appSettings.appCurrency.code} -{order?.coupon?.amount}%
                </Typography>
              </InfoHolder>
            </Section>)
         
            : <>NO COUPON APPLIED</>
          }
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Divider textAlign="left" sx={{mb:2}}>
              <SubheadingChip
                label="SYSTEM INFO"
                variant="filled"
                color="primary"
              />
            </Divider>
            <Section flexWrap={"wrap"} spacing={1}>
              <InfoHolder>
                <ContactMail sx={{ color: theme.palette.secondary.main }} />
                <InfoText display={"inline"}>
                  Order ID:
                </InfoText>
                <Typography display={"inline"}>
                {appSettings.appCurrency.code} {order?.totalPriceWithNoDiscount.toFixed(2)}
                </Typography>
              </InfoHolder>
              <InfoHolder>
                <Phone sx={{ color: theme.palette.secondary.main }} />
                <InfoText display={"inline"}>
                Created By:
                </InfoText>
                <Typography display={"inline"}>
                {appSettings.appCurrency.code} {order?.totalPriceWithDiscount.toFixed(2)}
                </Typography>
              </InfoHolder>
              <InfoHolder>
                <Phone sx={{ color: theme.palette.secondary.main }} />
                <InfoText display={"inline"}>
                 Created On:
                </InfoText>
                <Typography display={"inline"}>
                {appSettings.appCurrency.code} {order?.totalPriceWithDiscountAndCoupon.toFixed(2)}
                </Typography>
              </InfoHolder>
              <InfoHolder>
                <Phone sx={{ color: theme.palette.secondary.main }} />
                <InfoText display={"inline"}>
                Status
                </InfoText>
                <Typography display={"inline"}>
                {appSettings.appCurrency.code} {order?.totalPriceWithDiscountCouponAndShippingTax.toFixed(2)}
                </Typography>
              </InfoHolder>
            </Section>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Divider textAlign="left" sx={{mb:2}}>
              <SubheadingChip
                label="PRODUCTS ORDERED"
                variant="filled"
                color="primary"
              />
            </Divider>
            <Section flexWrap={"wrap"} spacing={1}>

              {
                order?.products?.map((product, index) => {
                  return (
                  <Box key={product?.id} sx={{mb: 3}}>
                     <InfoHolder>
                      <ContactMail sx={{ color: theme.palette.secondary.main }} />
                      <InfoText display={"inline"}>
                        Name:
                      </InfoText>
                      <Link to={`${singleProductBasePath}${product?.id}`}>
                      <Typography display={"inline"}>
                       {product?.name}
                      </Typography>
                      </Link>
                    </InfoHolder>
                    <InfoHolder>
                      <ContactMail sx={{ color: theme.palette.secondary.main }} />
                      <InfoText display={"inline"}>
                        Quantity purchased:
                      </InfoText>
                      <Typography display={"inline"}>
                       {product?.quantity}
                      </Typography>
                    </InfoHolder> 
                  </Box>
                  )
                })
              }
            
            </Section>
          </Grid>
        </Grid>
      </InputBox>
    </AdminMainWrapper>
  );
}