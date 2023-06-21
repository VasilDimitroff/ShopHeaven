import { React, useState, useEffect } from "react";
import {
	Box,
	Paper,
	Typography,
	Stack,
	Avatar,
	Grid,
	Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../../theme";

export default function ProfileSection(props) {
	const [myUser, setMyUser] = useState(props.myUser);

	useEffect(() => {
		setMyUser(props.myUser);
	}, [props.myUser, myUser]);

	function renderDate() {
		const date = new Date(myUser?.createdOn).toLocaleDateString(undefined, {
			day: "2-digit",
			month: "short",
			year: "numeric",
		});
		return date;
	}

	const UserAvatar = styled(Avatar)({
		background: theme.palette.secondary.main,
		fontSize: 100,
		padding: theme.spacing(10),
	});

	const StackItem = styled(Box)({
		display: "flex",
		justifyContent: "center",
	});

	return (
		<Paper sx={{ p: 2 }}>
			<Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
				<Grid item xs={12} sm={6} md={12} lg={12}>
					<Stack spacing={3}>
						<StackItem>
							<UserAvatar>{myUser?.email[0].toUpperCase()}</UserAvatar>
						</StackItem>
						<StackItem>
							<Typography variant="h6">{myUser?.email}</Typography>
						</StackItem>
					</Stack>
				</Grid>
				<Grid item sx={{ margin: "auto" }} xs={12} sm={6} md={12} lg={12}>
					<Stack spacing={3}>
						<StackItem>
							<Box>
								Username: <Chip label={`${myUser?.username}`} color="primary" />
							</Box>
						</StackItem>
						<StackItem>
							<Box>
								Registered on: <Chip label={renderDate()} color="primary" />
							</Box>
						</StackItem>
						<StackItem>
							<Stack spacing={1} flexWrap={"wrap"} direction={"row"}>
								<Typography>Roles: </Typography>
								{myUser?.roles.map((role) => {
									return (
										<Chip
											key={role.name}
											label={`${role.name.toUpperCase()}`}
											color="primary"
										/>
									);
								})}
							</Stack>
						</StackItem>
					</Stack>
				</Grid>
			</Grid>
		</Paper>
	);
}
