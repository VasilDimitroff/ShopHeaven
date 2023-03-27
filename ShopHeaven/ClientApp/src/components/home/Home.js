import React from "react";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";
import HomeSliderAndCategories from "./HomeSliderAndCategories";
import Header from "../Header";
import Footer from "../Footer";
import ProductsCarouselLine from "../products/ProductsCarouselLine";
import FullWidthBanner from "../banners/FullWidthBanner";
import FullWidthBannerWithOverlay from "../banners/FullWidthBannerWithOverlay";
import SubscribeForm from "../forms/SubscribeForm";

let products = [
  {
    name: "iPhone compatible with your desktop computer",
    isAvailable: true,
    description: "Probably the most random thing you have ever seen!#1",
    image:
      "https://levvvel.com/wp-content/uploads/2560-x-1440-vs-1920-x-1080-resolution.jpg",
  },
  {
    name: "Where the Nature helps you to sleep",
    isAvailable: true,
    description:
      "Probably the most random thing you have ever seen!#2 Probably the most random thing you have ever seen!#2 Probably the most random thing you have ever seen!#2 Probably the most random thing you have ever seen!#2Probably the most random thing you have ever seen!#2 Probably the most random thing you have ever seen!#2",
    image:
      "https://images.hdqwalls.com/download/winter-snow-trees-mountains-landscape-hdr-4k-aj-1920x1080.jpg",
  },
  {
    name: "Intel 9900 Processor The new way of working",
    isAvailable: true,
    description: "Probably the most random thing you have ever seen!#3",
    image:
      " https://static.timesofisrael.com/www/uploads/2021/10/%D7%9E%D7%A2%D7%91%D7%93-%D7%90%D7%9C%D7%93%D7%A8-%D7%9C%D7%99%D7%99%D7%A7-%D7%A7%D7%A8%D7%93%D7%99%D7%98-%D7%90%D7%95%D7%94%D7%93-%D7%A4%D7%90%D7%9C%D7%99%D7%A7.jpg",
  },
  {
    name: "Fender Stratocaster Electric Guitar",
    isAvailable: false,
    description: "Probably the most random thing you have ever seen!#4",
    image:
      "https://www.ibanez.com/common/product_artist_file/file/pc_main_electric_guitars_na.jpg",
  },
  {
    name: "Baby Pillows for your beautiful dreams",
    isAvailable: false,
    description: "Probably the most random thing you have ever seen!#5",
    image:
      "https://www.hansetextil.com/media/catalog/category/HANSE_pillows.jpg",
  },
  {
    name: "DJs are the new saviors of the world",
    isAvailable: true,
    description: "Probably the most random thing you have ever seen!#6",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWN8ZW58MHx8MHx8&w=1000&q=80",
  },
  {
    name: "Best metal albums in your live",
    isAvailable: false,
    description: "Probably the most random thing you have ever seen!#7",
    image: "https://cdn.mos.cms.futurecdn.net/xjGinGFYRvmcog5cX92WYk.jpg",
  },
  {
    name: "Spoons for your Christmas table",
    isAvailable: false,
    description: "Probably the most random thing you have ever seen!#8",
    image:
      "https://assets.epicurious.com/photos/5e38ae1259e5e50008b35cc6/16:9/w_2560%2Cc_limit/DemitasseSpoons_HERO_012920_082_VOG_final.jpg",
  },
  {
    name: "Do you have already Air Fryer?",
    isAvailable: true,
    description: "Probably the most random thing you have ever seen!#9",
    image:
      "https://www.philips.com/c-dam/b2c/master/experience/consistency-campaign/airfryer/EU7/philips-airfryer-uk-thumbnail.jpg",
  },
  {
    name: "You dream about this game console XBox",
    isAvailable: true,
    description: "Probably the most random thing you have ever seen!#10",
    image:
      "https://cdn.thewirecutter.com/wp-content/media/2022/01/nintendo-switch-2048px-1011437-3x2-1.jpg?auto=webp&quality=60&crop=1.91:1&width=1200",
  },
  {
    name: "11 prod You dream about this game console XBox",
    isAvailable: true,
    description: "Probably the most random thing you have ever seen!#11",
    image:
      "https://cdn.thewirecutter.com/wp-content/media/2022/01/nintendo-switch-2048px-1011437-3x2-1.jpg?auto=webp&quality=60&crop=1.91:1&width=1200",
  },
];

const categories = [
  {
    name: "Phones, Laptops and Tablets",
    id: "1",
    subcategories: [
      "Category 1, Subcategory 1",
      "Category 1, Subcategory 2",
      "Category 1, Subcategory 3",
      "Category 1, Subcategory 4",
      "Category 1, Subcategory 5",
      "Category 1, Subcategory 6",
      "Category 1, Subcategory 7",
      "Category 1, Subcategory 8",
      "Category 1, Subcategory 9",
      "Category 1, Subcategory 10",
      "Category 1, Subcategory 11",
      "Category 1, Subcategory 12",
      "Category 1, Subcategory 13",
      "Category 1, Subcategory 14",
      "Category 1, Subcategory 15",
    ],
  },
  {
    name: "Computers and periphery",
    id: "2",
    subcategories: [
      "Category 2, Subcategory 1",
      "Category 2, Subcategory 2",
      "Category 2, Subcategory 3",
      "Category 2, Subcategory 4",
      "Category 2, Subcategory 5",
      "Category 2, Subcategory 6",
      "Category 2, Subcategory 7",
      "Category 2, Subcategory 8",
      "Category 2, Subcategory 9",
      "Category 2, Subcategory 10",
    ],
  },
  {
    name: "TV, Audio and Photo",
    id: "3",
    subcategories: [
      "Category 3, Subcategory 1",
      "Category 3, Subcategory 2",
      "Category 3, Subcategory 3",
      "Category 3, Subcategory 4",
      "Category 3, Subcategory 5",
      "Category 3, Subcategory 6",
      "Category 3, Subcategory 7",
      "Category 3, Subcategory 8",
      "Category 3, Subcategory 9",
      "Category 3, Subcategory 10",
    ],
  },
  {
    name: "Gaming",
    id: "4",
    subcategories: [
      "Category 4, Subcategory 1",
      "Category 4, Subcategory 2",
      "Category 4, Subcategory 3",
      "Category 4, Subcategory 4",
      "Category 4, Subcategory 5",
      "Category 4, Subcategory 6",
      "Category 4, Subcategory 7",
      "Category 4, Subcategory 8",
      "Category 4, Subcategory 9",
      "Category 4, Subcategory 10",
    ],
  },
  {
    name: "Big electrical tools",
    id: "5",
    subcategories: [
      "Category 5, Subcategory 1",
      "Category 5, Subcategory 2",
      "Category 5, Subcategory 3",
      "Category 5, Subcategory 4",
      "Category 5, Subcategory 5",
      "Category 5, Subcategory 6",
      "Category 5, Subcategory 7",
      "Category 5, Subcategory 8",
      "Category 5, Subcategory 9",
      "Category 5, Subcategory 10",
    ],
  },
  {
    name: "Small electrical tools",
    id: "6",
    subcategories: [
      "Category 6, Subcategory 1",
      "Category 6, Subcategory 2",
      "Category 6, Subcategory 3",
      "Category 6, Subcategory 4",
      "Category 6, Subcategory 5",
      "Category 6, Subcategory 6",
      "Category 6, Subcategory 7",
      "Category 6, Subcategory 8",
      "Category 6, Subcategory 9",
      "Category 6, Subcategory 10",
    ],
  },
  {
    name: "Fashion",
    id: "7",
    subcategories: [
      "Category 7, Subcategory 1",
      "Category 7, Subcategory 2",
      "Category 7, Subcategory 3",
      "Category 7, Subcategory 4",
      "Category 7, Subcategory 5",
      "Category 7, Subcategory 6",
      "Category 7, Subcategory 7",
      "Category 7, Subcategory 8",
      "Category 7, Subcategory 9",
      "Category 7, Subcategory 10",
    ],
  },
  {
    name: "Health and beauty",
    id: "8",
    subcategories: [
      "Category 8, Subcategory 1",
      "Category 8, Subcategory 2",
      "Category 8, Subcategory 3",
      "Category 8, Subcategory 4",
      "Category 8, Subcategory 5",
      "Category 8, Subcategory 6",
      "Category 8, Subcategory 7",
      "Category 8, Subcategory 8",
      "Category 8, Subcategory 9",
      "Category 8, Subcategory 10",
    ],
  },
  {
    name: "Home, garden and petshop",
    id: "9",
    subcategories: [
      "Category 9, Subcategory 1 is the best subcategory",
      "Category 9, Subcategory 2",
      "Category 9, Subcategory 3",
      "Category 9, Subcategory 4",
      "Category 9, Subcategory 5",
      "Category 9, Subcategory 6",
      "Category 9, Subcategory 7",
      "Category 9, Subcategory 8",
      "Category 9, Subcategory 9",
      "Category 9, Subcategory 10",
    ],
  },
  {
    name: "Toys and kids",
    id: "10",
    subcategories: [
      "Category 10, Subcategory 1",
      "Category 10, Subcategory 2",
      "Category 10, Subcategory 3",
      "Category 10, Subcategory 4",
      "Category 10, Subcategory 5",
      "Category 10, Subcategory 6",
      "Category 10, Subcategory 7",
      "Category 10, Subcategory 8",
      "Category 10, Subcategory 9",
      "Category 10, Subcategory 10",
    ],
  },
  {
    name: "Sport and free time",
    id: "11",
    subcategories: [
      "Category 11, Subcategory 1",
      "Category 11, Subcategory 2",
      "Category 11, Subcategory 3",
      "Category 11, Subcategory 4",
      "Category 11, Subcategory 5",
      "Category 11, Subcategory 6",
      "Category 11, Subcategory 7",
      "Category 11, Subcategory 8",
      "Category 11, Subcategory 9",
      "Category 11, Subcategory 10",
    ],
  },
  {
    name: "Auto",
    id: "12",
    subcategories: [
      "Category 12, Subcategory 1",
      "Category 12, Subcategory 2",
      "Category 12, Subcategory 3",
      "Category 12, Subcategory 4",
      "Category 12, Subcategory 5",
      "Category 12, Subcategory 6",
      "Category 12, Subcategory 7",
      "Category 12, Subcategory 8",
      "Category 12, Subcategory 9",
      "Category 12, Subcategory 10",
    ],
  },
  {
    name: "Books",
    id: "13",
    subcategories: [
      "Category 13, Subcategory 1",
      "Category 13, Subcategory 2",
      "Category 13, Subcategory 3",
      "Category 13, Subcategory 4",
      "Category 13, Subcategory 5",
      "Category 13, Subcategory 6",
      "Category 13, Subcategory 7",
      "Category 13, Subcategory 8",
      "Category 13, Subcategory 9",
      "Category 13, Subcategory 10",
    ],
  },
  {
    name: "Office",
    id: "14",
    subcategories: [
      "Category 14, Subcategory 1",
      "Category 14, Subcategory 2",
      "Category 14, Subcategory 3",
      "Category 14, Subcategory 4",
      "Category 14, Subcategory 5",
      "Category 14, Subcategory 6",
      "Category 14, Subcategory 7",
      "Category 14, Subcategory 8",
      "Category 14, Subcategory 9",
      "Category 14, Subcategory 10",
    ],
  },
  {
    name: "Foods",
    id: "15",
    subcategories: [
      "Category 15, Subcategory 1",
      "Category 15, Subcategory 2",
      "Category 15, Subcategory 3",
      "Category 15, Subcategory 4",
      "Category 15, Subcategory 5",
      "Category 15, Subcategory 6",
      "Category 15, Subcategory 7",
      "Category 15, Subcategory 8",
      "Category 15, Subcategory 9",
      "Category 15, Subcategory 10",
    ],
  },
];

export default function Home() {
  return (
    <div>
      <Header categories={categories} />
      <HomeSliderAndCategories items={products} categories={categories} />
      <ProductsCarouselLine products={products} headingName="Promotions" />
      <ProductsCarouselLine
        products={products}
        headingName="Similar to {subcategoryName} (You may also like)"
      />
      <ProductsCarouselLine
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
        paddingTop={theme.spacing(4)}
        paddingBottom={theme.spacing(3)}
        infoText="Subscribe to our newsletter for better life"
      />
      <Footer categories={categories} />
    </div>
  );
}

/*
import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <p>Welcome to your new single-page application, built with:</p>
        <ul>
          <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code</li>
          <li><a href='https://facebook.github.io/react/'>React</a> for client-side code</li>
          <li><a href='http://getbootstrap.com/'>Bootstrap</a> for layout and styling</li>
        </ul>
        <p>To help you get started, we have also set up:</p>
        <ul>
          <li><strong>Client-side navigation</strong>. For example, click <em>Counter</em> then <em>Back</em> to return here.</li>
          <li><strong>Development server integration</strong>. In development mode, the development server from <code>create-react-app</code> runs in the background automatically, so your client-side resources are dynamically built on demand and the page refreshes when you modify any file.</li>
          <li><strong>Efficient production builds</strong>. In production mode, development-time features are disabled, and your <code>dotnet publish</code> configuration produces minified, efficiently bundled JavaScript files.</li>
        </ul>
        <p>The <code>ClientApp</code> subdirectory is a standard React application based on the <code>create-react-app</code> template. If you open a command prompt in that directory, you can run <code>npm</code> commands such as <code>npm test</code> or <code>npm install</code>.</p>
      </div>
    );
  }
}
*/
