import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
	Box,
	Grid,
	Paper,
	Typography,
	Stack,
	Chip,
	Divider,
	Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../../theme";

export default function ProfileSection(props) {
	const [myUser, setMyUser] = useState(props.myUser);

	useEffect(() => {
		setMyUser(props.myUser);
	}, [props.myUser, myUser]);

	const UserAvatar = styled(Avatar)({
		background: theme.palette.secondary.main,
		fontSize: 100,
		padding: theme.spacing(10),
	});

	const StackItem = styled(Box)({
		display: "flex",
		justifyContent: "center",
	});

	const Username = styled(Typography)({
		fontWeight: 500,
	});

	function renderDate() {
		const date = new Date(myUser?.createdOn).toLocaleDateString(undefined, {
			day: "2-digit",
			month: "short",
			year: "numeric",
		});
		return `Registered on: ${date}`;
	}

	return (
		<Paper sx={{ p: 2 }}>
			<Stack spacing={2} sx={{mt:2, mb:2}}>
				<StackItem>
					<UserAvatar>{myUser?.email[0].toUpperCase()}</UserAvatar>
				</StackItem>
				<StackItem>
					<Username variant="h5">{myUser?.email}</Username>
				</StackItem>
				<StackItem>
					<Typography>Username: <b>{myUser?.username}</b></Typography>
				</StackItem>
				<StackItem>
					<Typography>{renderDate()}</Typography>
				</StackItem>
			</Stack>
		</Paper>
	);
}
