import { React, useState, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { MainWrapper } from "../../../styles/styles";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { ApiEndpoints } from "../../../api/endpoints";
import { myReviewsPath } from "../../../constants";
import BreadcrumbsBar from "../../common/BreadcrumbsBar";
import CircleLoader from "../../common/CircleLoader";
const breadcrumbs = [
	{
		name: "Home",
		uri: "/",
	},
	{
		name: `My Reviews`,
		uri: `${myReviewsPath}`,
	},
];

export default function MyReviews() {
	const [myReviews, setMyReviews] = useState([]);

	const [reviewUpdated, setReviewUpdated] = useState(false);

	const { auth } = useAuth();
	const axiosPrivate = useAxiosPrivate();

	const effectRun = useRef(false);

	useEffect(() => {
		window.scroll(0, 0);
	}, []);

	useEffect(() => {
		const controller = new AbortController();

		const getReviews = async () => {
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

				//setMyReviews(response?.data);
				setReviewUpdated(false);
				console.log("My Reviews RESPONSE: ", response?.data);
			} catch (error) {
				console.log(error);
			}
		};

		if (effectRun.current) {
			getReviews();
		}

		return () => {
			effectRun.current = true;
			controller.abort();
		};
	}, [reviewUpdated]);

	function updatedReview() { setReviewUpdated(true); }
	
	return (
		<Box>
			<BreadcrumbsBar breadcrumbsItems={breadcrumbs} />
			<MainWrapper>
				{myReviews ? 
					<Box>{
						myReviews?.map(review => {
							return review.content
						})
					}</Box>
				 : (
					<CircleLoader />
				)}
			</MainWrapper>
		</Box>
	);
}
