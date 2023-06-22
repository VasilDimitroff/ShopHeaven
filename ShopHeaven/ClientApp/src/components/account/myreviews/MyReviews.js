import { React, useState, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { MainWrapper } from "../../../styles/styles";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { ApiEndpoints } from "../../../api/endpoints";
import { myReviewsPath, requestTimerMilliseconds, reviewsPerPageInMyReviewsPage } from "../../../constants";
import BreadcrumbsBar from "../../common/BreadcrumbsBar";
import CircleLoader from "../../common/CircleLoader";
import SingleReview from "./SingleReview";
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

  //is data loading
  const [isLoading, setIsLoading] = useState(false);

  // order statuses
  const [reviewStatuses, setReviewStatuses] = useState([]);

  //timer for delay request
  const [timer, setTimer] = useState(0);

  //current page with records
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(10);
  const [totalReviewsCount, setTotalReviewsCount] = useState(0);

  //searching values
  const [searchTerm, setSearchTerm] = useState("");
  const [searchReviewProperty, setSearchOrderProperty] = useState("");
  const [statusSearch, setStatusSearch] = useState("");

  //error message
  const [errorMessage, setErrorMessage] = useState("");

  // searchTerm and filter criteria refs for input
  const searchInputRef = useRef();

  // by what to searc => username, product name,  ..???
  const propertySearchRef = useRef();

  // by what status to search => processing, delivered,  ..???
  const statusSearchRef = useRef();

  useEffect(() => {
    let timeoutId;

    const controller = new AbortController();

    const getReviews = async () => {
      try {
        setIsLoading(true);

        let pagingModel = {
		  userId: auth.userId,
          recordsPerPage: reviewsPerPageInMyReviewsPage,
          page: page,
          status: statusSearch.trim(),
          searchTerm: searchTerm.trim(),
          criteria: searchReviewProperty.trim(),
        };

        console.log("review REQUEST ", pagingModel);

        const response = await axiosPrivate.post(
          ApiEndpoints.reviews.getAll,
          pagingModel,
          {
            signal: controller.signal,
          }
        );

        console.log(response.data);
        setMyReviews(response?.data?.reviews);
        setReviewStatuses(response?.data?.reviewStatuses);
        setNumberOfPages(response?.data?.pagesCount);
        setTotalReviewsCount(response?.data?.reviewsCount);

        if (page > response?.data?.pagesCount) {
          setPage(1);
        }

        setIsLoading(false);
      } catch (error) {
        console.log("ERROR: " + error);
      }
    };

    const delayGetReviewsRequest = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (effectRun.current) {
          getReviews();
        }
      }, timer);
    };

    delayGetReviewsRequest();

    return () => {
      controller.abort();
      effectRun.current = true;
      clearTimeout(timeoutId);
      setTimer(0);
    };
  }, [page, searchTerm, searchReviewProperty, statusSearch, reviewUpdated]);


  useEffect(() => {
    setPage(1);
  }, [searchTerm, searchReviewProperty, statusSearch, reviewUpdated])

  function onSearchReview(e) {
    e.preventDefault();

    setErrorMessage("");

    let searchValue = searchInputRef.current.value;
    let propertyToSearch = propertySearchRef.current.value;
    let statusToSearch = statusSearchRef.current.value;

    if (!searchValue.trim()) {
      searchValue = "";
    }

    if (!statusToSearch.trim()) {
      statusToSearch = "";
    }

    if (!propertyToSearch.trim() && searchValue.trim() && !statusToSearch) {
      propertyToSearch = "";
      searchValue = "";
      searchInputRef.current.value = "";
      setErrorMessage("Please select filter criteria");
    }

    setSearchTerm(searchValue);
    setSearchOrderProperty(propertyToSearch);
    setStatusSearch(statusToSearch);
    setTimer(requestTimerMilliseconds);
  }
	function updatedReview() { setReviewUpdated(true); }
	
	return (
		<Box>
			<BreadcrumbsBar breadcrumbsItems={breadcrumbs} />
			<MainWrapper>
				{!isLoading ? 
					<Box>{
						myReviews?.map(review => {
							return <SingleReview key={review.id} review={review}/>
						})
					}</Box>
				 : (
					<CircleLoader />
				)}
			</MainWrapper>
		</Box>
	);
}
