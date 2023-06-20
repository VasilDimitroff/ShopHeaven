import { React, useState, useEffect, useRef } from "react";
import { Box, Grid } from "@mui/material";
import { MainWrapper } from "../../../styles/styles";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { ApiEndpoints } from "../../../api/endpoints";
import { myAccountPath } from "../../../constants";
import BreadcrumbsBar from "../../common/BreadcrumbsBar";
import CircleLoader from "../../common/CircleLoader";
import ProfileSection from "./ProfileSection";
import EditSection from "./EditSection";

const breadcrumbs = [
	{
		name: "Home",
		uri: "/",
	},
	{
		name: `My account`,
		uri: `${myAccountPath}`,
	},
];

export default function MyAccount() {
	const [myUser, setMyUser] = useState();

	const [userUpdated, setUserUpdated] = useState(false);

	const { auth } = useAuth();
	const axiosPrivate = useAxiosPrivate();

	const effectRun = useRef(false);

	useEffect(() => {
		window.scroll(0, 0);
	}, []);

	useEffect(() => {
		const controller = new AbortController();

		const getUser = async () => {
			try {
				const response = await axiosPrivate.post(
					ApiEndpoints.users.getById,
					{
						id: auth.userId,
					},
					{
						signal: controller.signal,
					}
				);

				setMyUser(response?.data);

				console.log("USER RESPONSE: ", response?.data);
			} catch (error) {
				console.log(error);
			}
		};

		if (effectRun.current) {
			getUser();
		}

		return () => {
			effectRun.current = true;
			controller.abort();
		};
	}, [userUpdated]);

	function updatedUser() {
		setUserUpdated(true);
	}

	return (
		<Box>
			<BreadcrumbsBar breadcrumbsItems={breadcrumbs} />
			<MainWrapper>
				{myUser ? (
					<Grid container spacing={2}>
						<Grid item xs={12} sm={12} md={3} lg={3}>
							<ProfileSection myUser={myUser} />
						</Grid>
						<Grid item xs={12} sm={12} md={9} lg={9}>
							<EditSection myUser={myUser} updatedUser={updatedUser} />
						</Grid>
					</Grid>
				) : (
					<CircleLoader />
				)}
			</MainWrapper>
		</Box>
	);
}
