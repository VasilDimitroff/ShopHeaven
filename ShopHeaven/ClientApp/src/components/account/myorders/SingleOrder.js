import { React, useState, Fragment } from "react";
import {
	TableRow,
	TableCell,
	IconButton,
	Collapse,
	Chip,
	Box,
	Grid,
	Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../../theme";
import { ActionIconButton } from "../../../styles/styles";
import OrderInfo from "../../administration/orders/OrderInfo";
import {
	KeyboardArrowUp,
	KeyboardArrowDown,
	Event,
	AccountCircle,
	Delete,
	MoreHoriz,
	Paid,
	Person,
	RuleFolder,
} from "@mui/icons-material";
import useAppSettings from "../../../hooks/useAppSettings";
import { Stack } from "@mui/system";

export default function SingleOrder(props) {
	const { appSettings } = useAppSettings();

	const [order, setOrder] = useState(props.order);

	const [openEditForm, setOpenEditForm] = useState(false);

	function handleSetOpenEditForm() {
		setOpenEditForm((prev) => !prev);
	}

	function formatDate(date) {
		const minutes = date.substring(14, 16);
		const hour = date.substring(11, 13);
		const day = date.substring(8, 10);
		const month = date.substring(5, 7);
		const year = date.substring(0, 4);

		const formattedDate = `${day}/${month}/${year}, ${hour}:${minutes}`;
		return formattedDate;
	}

	const OrderTableCell = styled(TableCell)({
		fontWeight: 500,
		fontSize: 18,
	});

	const OrderInfoText = styled(Box)({
		fontSize: 13,
		fontWeight: 400,
		[theme.breakpoints.down("lg")]: {
			marginTop: theme.spacing(0.4),
		},
	});

	return (
		<Fragment>
			<TableRow
				sx={{
					"&:hover": {
						cursor: "pointer",
						background: "#EAEAF7",
					},
				}}
			>
				<OrderTableCell
					onClick={handleSetOpenEditForm}
					component="th"
					scope="row"
				>
					<IconButton size="small">
						{openEditForm ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
					</IconButton>
					{order?.id}
					<Grid container spacing={1} columns={6}>
						<Grid item xs={4} sm={2} md={1} lg={1}>
							<Tooltip
								title={`By: ${order?.createdBy}`}
								placement="bottom-start"
								arrow
							>
								<OrderInfoText>
									<Chip
										sx={{ padding: 0.5 }}
										icon={<AccountCircle />}
										variant="outlined"
										color="primary"
										label={`By: ${order?.createdBy}`}
										size="small"
									/>
								</OrderInfoText>
							</Tooltip>
						</Grid>
						<Grid item xs={4} sm={2} md={1} lg={1}>
							<Tooltip
								placement="bottom-start"
								title={`Created on: ${formatDate(order?.createdOn)}`}
								arrow
							>
								<OrderInfoText>
									<Chip
										sx={{ padding: 0.5 }}
										icon={<Event />}
										variant="outlined"
										color="primary"
										label={`Created: ${formatDate(order?.createdOn)}`}
										size="small"
									/>
								</OrderInfoText>
							</Tooltip>
						</Grid>
						<Grid item xs={4} sm={2} md={1} lg={1}>
							<Tooltip
								placement="bottom-start"
								title={`Recipient of the order is: ${order?.recipient}`}
								arrow
							>
								<OrderInfoText>
									<Chip
										sx={{ padding: 0.5 }}
										icon={<Person />}
										variant="outlined"
										label={`For: ${order?.recipient}`}
										size="small"
										color="primary"
									/>
								</OrderInfoText>
							</Tooltip>
						</Grid>
						<Grid item xs={4} sm={2} md={1} lg={1}>
							<Tooltip
								placement="bottom-start"
								title={`Total amount paid for this order: ${appSettings.appCurrency.code} ${order?.payment?.amount}`}
								arrow
							>
								<OrderInfoText>
									<Chip
										sx={{ padding: 0.5 }}
										icon={<Paid />}
										variant="outlined"
										label={`Paid: ${appSettings.appCurrency.code} ${order?.payment?.amount}`}
										size="small"
										color="primary"
									/>
								</OrderInfoText>
							</Tooltip>
						</Grid>
						<Grid item xs={4} sm={2} md={1} lg={1}>
							<Tooltip
								placement="bottom-start"
								title={`Is order deleted: ${order?.isDeleted ? "Yes" : "No"}`}
								arrow
							>
								<OrderInfoText>
									<Chip
										sx={{ padding: 0.5 }}
										icon={<Delete />}
										variant="outlined"
										label={`Deleted: ${order?.isDeleted ? "Yes" : "No"}`}
										size="small"
										color={order?.isDeleted ? "error" : "success"}
									/>
								</OrderInfoText>
							</Tooltip>
						</Grid>
						<Grid item xs={4} sm={2} md={1} lg={1}>
							<Tooltip
								placement="bottom-start"
								title={`Orders status: ${order?.status}`}
								arrow
							>
								<OrderInfoText>
									<Chip
										sx={{ padding: 0.5 }}
										icon={<RuleFolder />}
										variant="outlined"
										label={`Status: ${order?.status}`}
										size="small"
										color="primary"
									/>
								</OrderInfoText>
							</Tooltip>
						</Grid>
					</Grid>
				</OrderTableCell>
				<TableCell align="center">
					<Stack sx={{ display: "flex", alignItems: "center" }}>
						<ActionIconButton
							onClick={handleSetOpenEditForm}
							color="info"
							size="small"
						>
							<MoreHoriz />
						</ActionIconButton>
					</Stack>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
					{
						<Collapse in={openEditForm} timeout="auto" unmountOnExit>
							<OrderInfo order={order} />
						</Collapse>
					}
				</TableCell>
			</TableRow>
		</Fragment>
	);
}
