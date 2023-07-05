import { React, Fragment, useEffect, useState, useRef } from "react";
import { Box } from "@mui/material";
import { theme } from "../../theme";
import HomeCarouselAndMainMenu from "./HomeCarouselAndMainMenu";
import ProductsCarousel from "../products/products-carousel/ProductsCarousel";
import FullWidthBanner from "../banners/FullWidthBanner";
import FullWidthBannerWithOverlay from "../banners/FullWidthBannerWithOverlay";
import SubscribeForm from "../common/SubscribeForm";
import CircleLoader from "../common/CircleLoader";
import { ApiEndpoints } from "../../api/endpoints";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import {
	productsPerSliderInHomePage,
	firstProductCarouselSortingCriteria,
	secondProductCarouselSortingCriteria,
	thirdProductCarouselSortingCriteria,
} from "../../constants.js";

export default function Home() {
	const { auth } = useAuth();

	const effectRun = useRef(false);

	const [firstLineProducts, setFirstLineProducts] = useState();
	const [secondLineProducts, setSecondLineProducts] = useState();
	const [thirdLineProducts, setThirdLineProducts] = useState();

	//is request loading
	const [isLoading, setIsLoading] = useState(false);

	//first line
	useEffect(() => {
		window.scroll(0, 0);

		const controller = new AbortController();

		const getProductsByFilter = async () => {
			try {
				setIsLoading(true);

				let pagingModel = {
					userId: auth.userId,
					recordsPerPage: productsPerSliderInHomePage,
					page: 1,
					searchTerm: "", //no filter by search term
					categoryId: "", //all categories
					sortingCriteria: firstProductCarouselSortingCriteria,
				};

				const response = await axios.post(
					ApiEndpoints.products.getFilteredProducts,
					pagingModel,
					{
						signal: controller.signal,
					}
				);

				console.log(response?.data);

				setFirstLineProducts(response?.data);

				setIsLoading(false);
			} catch (error) {
				console.log(error);
			}
		};

		if (effectRun.current) {
			getProductsByFilter();
		}

		return () => {
			effectRun.current = true;
			controller.abort();
		};
	}, []);

	//second line
	useEffect(() => {
		const controller = new AbortController();

		const getProductsByFilter = async () => {
			try {
				setIsLoading(true);

				let pagingModel = {
					userId: auth.userId,
					recordsPerPage: productsPerSliderInHomePage,
					page: 1,
					searchTerm: "", //no filter by search term
					categoryId: "", //all categories
					sortingCriteria: secondProductCarouselSortingCriteria, // no sorting criteria, order by newest
				};

				const response = await axios.post(
					ApiEndpoints.products.getFilteredProducts,
					pagingModel,
					{
						signal: controller.signal,
					}
				);

				console.log(response?.data);

				setSecondLineProducts(response?.data);

				setIsLoading(false);
			} catch (error) {
				console.log(error);
			}
		};

		if (effectRun.current) {
			getProductsByFilter();
		}

		return () => {
			effectRun.current = true;
			controller.abort();
		};
	}, []);

	//third line
	useEffect(() => {
		const controller = new AbortController();

		const getProductsByFilter = async () => {
			try {
				setIsLoading(true);

				let pagingModel = {
					userId: auth.userId,
					recordsPerPage: productsPerSliderInHomePage,
					page: 1,
					searchTerm: "", //no filter by search term
					categoryId: "", //all categories
					sortingCriteria: thirdProductCarouselSortingCriteria,
				};

				const response = await axios.post(
					ApiEndpoints.products.getFilteredProducts,
					pagingModel,
					{
						signal: controller.signal,
					}
				);

				console.log(response?.data);

				setThirdLineProducts(response?.data);

				setIsLoading(false);
			} catch (error) {
				console.log(error);
			}
		};

		if (effectRun.current) {
			getProductsByFilter();
		}

		return () => {
			effectRun.current = true;
			controller.abort();
		};
	}, []);

	return firstLineProducts && secondLineProducts && thirdLineProducts ? (
		<Fragment>
			<HomeCarouselAndMainMenu />
			<ProductsCarousel
				products={firstLineProducts}
				headingName="Best Offers"
			/>
			<ProductsCarousel
				products={secondLineProducts}
				headingName="Newest products"
			/>
			<ProductsCarousel
				products={thirdLineProducts}
				headingName="Highest rated products"
			/>

			{/*
        <FullWidthBannerWithOverlay
          infoText="You haven't account yet? Create a new one now or login"
          hoverOverlay={false}
          buttonsTexts={["Login", "Register"]}
          height={150}
          paddingTop={theme.spacing(3.5)}
        />
        <FullWidthBanner
          paddingTop={theme.spacing(3.5)}
          height={250}
          heightSm={180}
          image="https://img.freepik.com/free-psd/online-shopping-banner-template_23-2148644052.jpg?w=2000"
        />
      */}
			<SubscribeForm
				ContentPaddingTop={theme.spacing(8)}
				height={250}
				heightSm={320}
				paddingBottom={theme.spacing(3)}
				infoText="Subscribe to our newsletter"
			/>
		</Fragment>
	) : (
		<Box sx={{ pt: 15 }}>
			<CircleLoader />
		</Box>
	);
}
