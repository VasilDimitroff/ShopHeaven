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
  productsPerPageInSubCategoryPage,
  maxProductPriceRangeGroup,
  productsPerSliderInHomePage,
  firstProductCarouselSortingCriteria
} from "../../constants.js";

export default function Home() {
  const { auth } = useAuth();

  const effectRun = useRef(false);

  const [firstLineProducts, setFirstLineProducts] = useState();
  const [secondLineProducts, setSecondLineProducts] = useState();

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
          sortingCriteria: firstProductCarouselSortingCriteria
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

  
  //second line
  useEffect(() => {

    window.scroll(0, 0);
    
    const controller = new AbortController();

    const getProductsBySubcategory = async () => {
      try {
        setIsLoading(true);

        let pricesArray = maxProductPriceRangeGroup.split(" - ");
        let lowestPrice = parseFloat(pricesArray[0].trim());
        let highestPrice = parseFloat(pricesArray[1].trim());

        let pagingModel = {
          recordsPerPage: productsPerPageInSubCategoryPage,
          page: 1,
          searchTerm: "",
          sortingCriteria: "",
          subcategoryId: "8d059c11-43c9-4983-926e-77e5e9191032",
          inStock: false,
          rating: 0,
          lowestPrice: lowestPrice,
          highestPrice: highestPrice,
        };

        console.log("REQUIEST ", pagingModel);

        const response = await axios.post(
          ApiEndpoints.products.getBySubcategoryId,
          pagingModel,
          {
            signal: controller.signal,
          }
        );

        console.log(response?.data);

        setFirstLineProducts(response?.data?.products);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    if (effectRun.current) {
      getProductsBySubcategory();
    }

    return () => {
      effectRun.current = true; // update the value of effectRun to true
      controller.abort();
    };
  }, []);

  return firstLineProducts && secondLineProducts ? (
    <Fragment>
      <HomeCarouselAndMainMenu />
      <ProductsCarousel products={secondLineProducts} headingName="Best Offers" />
      <ProductsCarousel
        products={secondLineProducts}
        headingName="Similar to {subcategoryName} (You may also like)"
      />
      <ProductsCarousel
        products={secondLineProducts}
        headingName="Frequently Purchased"
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
        infoText="Subscribe to our newsletter for better life"
      />
    </Fragment>
  ) : (
    <Box sx={{pt: 15}}><CircleLoader /></Box>
  );
}
