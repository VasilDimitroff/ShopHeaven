import { React, Fragment } from "react";
import { theme } from "../../theme";
import HomeSliderAndCategories from "./HomeSliderAndCategories";
import ProductsCarouselLine from "../products/ProductsCarouselLine";
import FullWidthBanner from "../banners/FullWidthBanner";
import FullWidthBannerWithOverlay from "../banners/FullWidthBannerWithOverlay";
import SubscribeForm from "../forms/SubscribeForm";

let products = [
  {
    name: "iPhone compatible with your desktop computer",
    isAvailable: true,
    description: "Probably the most random thing you have ever seen!#1",
    id: 1,
    currency: "$",
    quantity: 12,
    rating: 2.3,
    price: 20.50,
    discount: 0,
    brand: "Apple Inc",
    hasGuarantee: true,
    tags: [
      "auto",
      "home",
      "pets"
    ],
    image:
      "https://levvvel.com/wp-content/uploads/2560-x-1440-vs-1920-x-1080-resolution.jpg",
  },
  
  {
    name: "Where the Nature helps you to sleep",
    isAvailable: true,
    id: 2,
    currency: "$",
    quantity: 143,
    rating: 3.4,
    price: 120.00,
    discount: 0,
    brand: "Dream Sleep",
    hasGuarantee: false,
    tags: [
      "PC",
      "gaming",
      "CD"
    ],
    description:
      "Probably the most random thing you have ever seen!#2 Probably the most random thing you have ever seen!#2 Probably the most random thing you have ever seen!#2 Probably the most random thing you have ever seen!#2Probably the most random thing you have ever seen!#2 Probably the most random thing you have ever seen!#2",
    image:
      "https://images.hdqwalls.com/download/winter-snow-trees-mountains-landscape-hdr-4k-aj-1920x1080.jpg",
  },
  {
    name: "Intel 9900 Processor The new way of working",
    isAvailable: true,
    description: "Probably the most random thing you have ever seen!#3",
    id: 3,
    currency: "$",
    quantity: 312,
    rating: 4.9,
    price: 10.30,
    discount: 0,
    brand: "Intel Inc",
    hasGuarantee: true,
    tags: [
      "Food",
      "Bread",
      "Baked",
      "Grocery"
    ],
    image:
      " https://static.timesofisrael.com/www/uploads/2021/10/%D7%9E%D7%A2%D7%91%D7%93-%D7%90%D7%9C%D7%93%D7%A8-%D7%9C%D7%99%D7%99%D7%A7-%D7%A7%D7%A8%D7%93%D7%99%D7%98-%D7%90%D7%95%D7%94%D7%93-%D7%A4%D7%90%D7%9C%D7%99%D7%A7.jpg",
  },
  {
    name: "Fender Stratocaster Electric Guitar",
    isAvailable: false,
    description: "Probably the most random thing you have ever seen!#4",
    id: 4,
    currency: "$",
    quantity: 172,
    rating: 3.8,
    price: 420.50,
    discount: 20,
    brand: "Fender Inc",
    hasGuarantee: true,
    tags: [
      "Music",
      "Guitar",
      "Electrical",
      "Fender"
    ],
    image:
      "https://www.ibanez.com/common/product_artist_file/file/pc_main_electric_guitars_na.jpg",
  },
  {
    name: "Baby Pillows for your beautiful dreams",
    isAvailable: false,
    description: "Probably the most random thing you have ever seen!#5",
    id: 5,
    currency: "$",
    quantity: 6,
    rating: 4.8,
    price: 64.99,
    discount: 5,
    brand: "Dream Night",
    hasGuarantee: false,
    tags: [
      "Baby",
      "Pillow",
      "Sleep",
      "Home"
    ],
    image:
      "https://www.hansetextil.com/media/catalog/category/HANSE_pillows.jpg",
  },
  {
    name: "DJs are the new saviors of the world",
    isAvailable: true,
    description: "Probably the most random thing you have ever seen!#6",
    id: 6,
    currency: "$",
    quantity: 212,
    rating: 4.2,
    price: 120.50,
    discount: 10,
    brand: "DJ Mania",
    hasGuarantee: false,
    tags: [
      "Music",
      "DJ",
      "Party",
    ],
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWN8ZW58MHx8MHx8&w=1000&q=80",
  },
  {
    name: "Best metal albums in your live",
    isAvailable: false,
    description: "Probably the most random thing you have ever seen!#7",
    id: 7,
    currency: "$",
    quantity: 153,
    rating: 3.4,
    price: 90.50,
    discount: 15,
    brand: "Napalm Records",
    hasGuarantee: false,
    tags: [
      "Metal",
      "Music",
      "Albums",
    ],
    image: "https://cdn.mos.cms.futurecdn.net/xjGinGFYRvmcog5cX92WYk.jpg",
  },
  {
    name: "Spoons for your Christmas table",
    isAvailable: false,
    description: "Probably the most random thing you have ever seen!#8",
    id: 8,
    currency: "$",
    quantity: 812,
    rating: 3.5,
    price: 70.50,
    discount: 0,
    brand: "JYSK",
    hasGuarantee: false,
    tags: [
      "Spoon",
      "Home",
      "Eat",
      "Christmas"
    ],
    image:
      "https://assets.epicurious.com/photos/5e38ae1259e5e50008b35cc6/16:9/w_2560%2Cc_limit/DemitasseSpoons_HERO_012920_082_VOG_final.jpg",
  },
  {
    name: "Do you have already Air Fryer?",
    isAvailable: true,
    description: "Probably the most random thing you have ever seen!#9",
    id: 9,
    currency: "$",
    quantity: 22,
    rating: 3.6,
    price: 370.00,
    discount: 13,
    brand: "Tefal",
    hasGuarantee: true,
    tags: [
      "Air Fryer",
      "Cooking",
      "Eat",
      "Food"
    ],
    image:
      "https://www.philips.com/c-dam/b2c/master/experience/consistency-campaign/airfryer/EU7/philips-airfryer-uk-thumbnail.jpg",
  },
  {
    name: "You dream about this game console XBox",
    isAvailable: true,
    description: "Probably the most random thing you have ever seen!#10",
    id: 10,
    currency: "$",
    quantity: 83,
    rating: 4.3,
    price: 520.00,
    discount: 10,
    brand: "Microsoft Inc",
    hasGuarantee: true,
    tags: [
      "Gaming",
      "XBox",
      "Console",
    ],
    image:
      "https://cdn.thewirecutter.com/wp-content/media/2022/01/nintendo-switch-2048px-1011437-3x2-1.jpg?auto=webp&quality=60&crop=1.91:1&width=1200",
  },
  {
    name: "Best TV you ever seen in your life",
    isAvailable: true,
    id: 11,
    currency: "$",
    quantity: 87,
    rating: 3.4,
    price: 710.00,
    discount: 0,
    brand: "Samsung",
    hasGuarantee: true,
    tags: [
      "TV",
      "Monitor",
      "Television",
      "Smart"
    ],
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
    <Fragment>
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
        paddingBottom={theme.spacing(3)}
        infoText="Subscribe to our newsletter for better life"
      />
    </Fragment>
  );
}