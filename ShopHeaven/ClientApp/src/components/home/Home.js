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
import {
  productsPerPageInSubCategoryPage,
  maxProductPriceRangeGroup,
} from "../../constants.js";

export default function Home() {
  const effectRun = useRef(false);

  const [products, setProducts] = useState();

  //is request loading
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    window.scroll(0, 0);
    
    const controller = new AbortController();

    const getProducts = async () => {
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

        setProducts(response?.data?.products);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    if (effectRun.current) {
      getProducts();
    }

    return () => {
      effectRun.current = true; // update the value of effectRun to true
      controller.abort();
    };
  }, []);

  return products ? (
    <Fragment>
      <HomeCarouselAndMainMenu />
      <ProductsCarousel products={products} headingName="Promotions" />
      <ProductsCarousel
        products={products}
        headingName="Similar to {subcategoryName} (You may also like)"
      />
      <ProductsCarousel
        products={products}
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
    <Box sx={{mt: 10}}><CircleLoader /></Box>
  );
}
