import { React, Fragment } from "react";
import { theme } from "../../theme";
import HomeCarouselAndMainMenu from "./HomeCarouselAndMainMenu";
import ProductsCarousel from "../products/products-carousel/ProductsCarousel";
import FullWidthBanner from "../banners/FullWidthBanner";
import FullWidthBannerWithOverlay from "../banners/FullWidthBannerWithOverlay";
import SubscribeForm from "../common/SubscribeForm";

export default function Home() {
  return (
    <Fragment>
      <HomeCarouselAndMainMenu/>
      <ProductsCarousel headingName="Promotions" />
      <ProductsCarousel
        headingName="Similar to {subcategoryName} (You may also like)"
      />
      <ProductsCarousel
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
  );
}