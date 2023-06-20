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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../../theme";

export default function EditSection(props) {
	const [myUser, setMyUser] = useState(props.myUser);

	useEffect(() => {
		setMyUser(props.myUser);
	}, [props.myUser, myUser]);

	return (
		<Paper sx={{ p: 2 }}>
			<Stack spacing={2} flexWrap="wrap" direction="row">
				lorem	ipsum
			</Stack>
		</Paper>
	);
}
