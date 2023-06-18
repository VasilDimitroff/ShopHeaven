import { React, useState } from "react";
import { Box, Grid, Divider, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
	ContactMail,
	Phone,
	LocalShipping,
	Flag,
	LocationCity,
	LocationOn,
	Info,
	Paid,
	Payment,
	PriceCheck,
	Money,
	ReceiptLong,
	LocalOffer,
	Subtitles,
	LocalAtm,
	Style,
	Receipt,
	Person,
	CalendarMonth,
	RuleFolder,
	ShoppingBag,
	AddShoppingCart,
} from "@mui/icons-material";
import { theme } from "../../../theme";
import {
	SubheadingChip,
	InputBox,
	AdminMainWrapper,
} from "../../../styles/styles";
import { singleProductBasePath } from "../../../constants";
import useAppSettings from "../../../hooks/useAppSettings";
import { Link } from "react-router-dom";

export default function OrderInfo(props) {
	const { appSettings } = useAppSettings();

	const [order, setOrder] = useState(props.order);

	function formatDate(date) {
		const minutes = date.substring(14, 16);
		const hour = date.substring(11, 13);
		const day = date.substring(8, 10);
		const month = date.substring(5, 7);
		const year = date.substring(0, 4);

		const formattedDate = `${day}/${month}/${year}, ${hour}:${minutes}`;
		return formattedDate;
	}

	const InfoHolder = styled(Box)({
		display: "flex",
		gap: 10,
	});

	const InfoText = styled(Typography)({
		fontWeight: 500,
	});

	const Section = styled(Stack)({});

	return (
		<AdminMainWrapper sx={{ mt: 4, pb: 5 }}>
			<InputBox>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={12} md={12} lg={12}>
						<Divider textAlign="left" sx={{ mb: 2 }}>
							<SubheadingChip
								label="RECIPIENT INFO"
								variant="filled"
								color="primary"
							/>
						</Divider>
						<Section flexWrap={"wrap"} spacing={1}>
							<InfoHolder>
								<ContactMail sx={{ color: theme.palette.secondary.main }} />
								<InfoText display={"inline"}>Recipient:</InfoText>
								<Typography display={"inline"}>{order?.recipient}</Typography>
							</InfoHolder>
							<InfoHolder>
								<Phone sx={{ color: theme.palette.secondary.main }} />
								<InfoText display={"inline"}>Phone:</InfoText>
								<Typography display={"inline"}>{order?.phone}</Typography>
							</InfoHolder>
						</Section>
					</Grid>
					<Grid item xs={12} sm={12} md={12} lg={12}>
						<Divider textAlign="left" sx={{ mb: 2 }}>
							<SubheadingChip
								label="SHIPPING INFO"
								variant="filled"
								color="primary"
							/>
						</Divider>
						<Section flexWrap={"wrap"} spacing={1}>
							<InfoHolder>
								<LocalShipping sx={{ color: theme.palette.secondary.main }} />
								<InfoText display={"inline"}>Shipping Method:</InfoText>
								<Typography display={"inline"}>
									{order?.shippingMethod.name}
								</Typography>
							</InfoHolder>
							<InfoHolder>
								<Paid sx={{ color: theme.palette.secondary.main }} />
								<InfoText display={"inline"}>Shipping Amount:</InfoText>
								<Typography display={"inline"}>
									{appSettings.appCurrency.code}{" "}
									{order?.shippingMethod.amount.toFixed(2)}
								</Typography>
							</InfoHolder>
							<InfoHolder>
								<Flag sx={{ color: theme.palette.secondary.main }} />
								<InfoText display={"inline"}>Country:</InfoText>
								<Typography display={"inline"}>{order?.country}</Typography>
							</InfoHolder>
							<InfoHolder>
								<LocationCity sx={{ color: theme.palette.secondary.main }} />
								<InfoText display={"inline"}>City:</InfoText>
								<Typography display={"inline"}>{order?.city}</Typography>
							</InfoHolder>
							<InfoHolder>
								<LocationOn sx={{ color: theme.palette.secondary.main }} />
								<InfoText display={"inline"}>Address:</InfoText>
								<Typography display={"inline"}>{order?.address}</Typography>
							</InfoHolder>
							<InfoHolder>
								<Info sx={{ color: theme.palette.secondary.main }} />
								<InfoText display={"inline"}>Details:</InfoText>
								<Typography display={"inline"}>{order?.details}</Typography>
							</InfoHolder>
						</Section>
					</Grid>
					<Grid item xs={12} sm={12} md={12} lg={12}>
						<Divider textAlign="left" sx={{ mb: 2 }}>
							<SubheadingChip
								label="PRODUCTS ORDERED"
								variant="filled"
								color="primary"
							/>
						</Divider>
						<Section flexWrap={"wrap"} spacing={4}>
							{order?.products?.map((product, index) => {
								return (
									<Stack spacing={1} key={product?.id}>
										<InfoHolder>
											<ShoppingBag
												sx={{ color: theme.palette.secondary.main }}
											/>
											<InfoText display={"inline"}>Name:</InfoText>
											<Link to={`${singleProductBasePath}${product?.id}`}>
												<Typography display={"inline"}>
													{product?.name}
												</Typography>
											</Link>
										</InfoHolder>
										<InfoHolder>
											<AddShoppingCart
												sx={{ color: theme.palette.secondary.main }}
											/>
											<InfoText display={"inline"}>
												Quantity purchased:
											</InfoText>
											<Typography display={"inline"}>
												{product?.quantity}
											</Typography>
										</InfoHolder>
									</Stack>
								);
							})}
						</Section>
					</Grid>
					<Grid item xs={12} sm={12} md={12} lg={12}>
						<Divider textAlign="left" sx={{ mb: 2 }}>
							<SubheadingChip
								label="PAYMENT INFO"
								variant="filled"
								color="primary"
							/>
						</Divider>
						<Section flexWrap={"wrap"} spacing={1}>
							<InfoHolder>
								<Paid sx={{ color: theme.palette.secondary.main }} />
								<InfoText display={"inline"}>Total Amount Paid:</InfoText>
								<Typography display={"inline"}>
									{appSettings.appCurrency.code}{" "}
									{order?.payment?.amount.toFixed(2)}
								</Typography>
							</InfoHolder>
							<InfoHolder>
								<Payment sx={{ color: theme.palette.secondary.main }} />
								<InfoText display={"inline"}>Payment Method:</InfoText>
								<Typography display={"inline"}>
									{order?.payment.paymentMethod}
								</Typography>
							</InfoHolder>
							<InfoHolder>
								<PriceCheck sx={{ color: theme.palette.secondary.main }} />
								<InfoText display={"inline"}>Is Payment Successfull:</InfoText>
								<Typography display={"inline"}>
									{order?.payment.isCompleted ? "Yes" : "No"}
								</Typography>
							</InfoHolder>
							<InfoHolder>
								<Receipt sx={{ color: theme.palette.secondary.main }} />
								<InfoText display={"inline"}>Payment ID:</InfoText>
								<Typography display={"inline"}>{order?.payment.id}</Typography>
							</InfoHolder>
						</Section>
					</Grid>
					<Grid item xs={12} sm={12} md={12} lg={12}>
						<Divider textAlign="left" sx={{ mb: 2 }}>
							<SubheadingChip
								label="PRICING INFO"
								variant="filled"
								color="primary"
							/>
						</Divider>
						<Section flexWrap={"wrap"} spacing={1}>
							<InfoHolder>
								<Money sx={{ color: theme.palette.secondary.main }} />
								<InfoText display={"inline"}>
									Total price with no discount:
								</InfoText>
								<Typography display={"inline"}>
									{appSettings.appCurrency.code}{" "}
									{order?.totalPriceWithNoDiscount.toFixed(2)}
								</Typography>
							</InfoHolder>
							<InfoHolder>
								<Style sx={{ color: theme.palette.secondary.main }} />
								<InfoText display={"inline"}>
									Total price with product discounts:
								</InfoText>
								<Typography display={"inline"}>
									{appSettings.appCurrency.code}{" "}
									{order?.totalPriceWithDiscount.toFixed(2)}
								</Typography>
							</InfoHolder>
							<InfoHolder>
								<LocalOffer sx={{ color: theme.palette.secondary.main }} />
								<InfoText display={"inline"}>
									Total price with product discounts and coupon (if there is):
								</InfoText>
								<Typography display={"inline"}>
									{appSettings.appCurrency.code}{" "}
									{order?.totalPriceWithDiscountAndCoupon.toFixed(2)}
								</Typography>
							</InfoHolder>
							<InfoHolder>
								<Paid sx={{ color: theme.palette.secondary.main }} />
								<InfoText display={"inline"}>
									Total price with product discounts, coupon discount and
									shipping tax:
								</InfoText>
								<Typography display={"inline"}>
									{appSettings.appCurrency.code}{" "}
									{order?.totalPriceWithDiscountCouponAndShippingTax.toFixed(2)}
								</Typography>
							</InfoHolder>
						</Section>
					</Grid>
					<Grid item xs={12} sm={12} md={12} lg={12}>
						<Divider textAlign="left" sx={{ mb: 2 }}>
							<SubheadingChip
								label="COUPON INFO"
								variant="filled"
								color="primary"
							/>
						</Divider>
						{order?.coupon ? (
							<Section flexWrap={"wrap"} spacing={1}>
								<InfoHolder>
									<Subtitles sx={{ color: theme.palette.secondary.main }} />
									<InfoText display={"inline"}>Coupon Code:</InfoText>
									<Typography display={"inline"}>
										{order?.coupon?.code}
									</Typography>
								</InfoHolder>
								<InfoHolder>
									<LocalAtm sx={{ color: theme.palette.secondary.main }} />
									<InfoText display={"inline"}>Coupon Amount:</InfoText>
									<Typography display={"inline"}>
										{appSettings.appCurrency.code} -{order?.coupon?.amount}%
									</Typography>
								</InfoHolder>
							</Section>
						) : (
							<>NO COUPON APPLIED</>
						)}
					</Grid>
					<Grid item xs={12} sm={12} md={12} lg={12}>
						<Divider textAlign="left" sx={{ mb: 2 }}>
							<SubheadingChip
								label="SYSTEM INFO"
								variant="filled"
								color="primary"
							/>
						</Divider>
						<Section flexWrap={"wrap"} spacing={1}>
							<InfoHolder>
								<RuleFolder sx={{ color: theme.palette.secondary.main }} />
								<InfoText display={"inline"}>Status:</InfoText>
								<Typography display={"inline"}>
									{order?.status.toUpperCase()}
								</Typography>
							</InfoHolder>
							<InfoHolder>
								<ReceiptLong sx={{ color: theme.palette.secondary.main }} />
								<InfoText display={"inline"}>Order ID:</InfoText>
								<Typography display={"inline"}>{order?.id}</Typography>
							</InfoHolder>
							<InfoHolder>
								<Person sx={{ color: theme.palette.secondary.main }} />
								<InfoText display={"inline"}>Created By:</InfoText>
								<Typography display={"inline"}>{order?.createdBy}</Typography>
							</InfoHolder>
							<InfoHolder>
								<CalendarMonth sx={{ color: theme.palette.secondary.main }} />
								<InfoText display={"inline"}>Created On:</InfoText>
								<Typography display={"inline"}>
									{formatDate(order?.createdOn)}
								</Typography>
							</InfoHolder>
						</Section>
					</Grid>
				</Grid>
			</InputBox>
		</AdminMainWrapper>
	);
}
