import { React, useState, useEffect, useRef, Fragment } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import BreadcrumbsBar from "../../common/BreadcrumbsBar";
import ProductInfoWrapper from "./ProductInfoWrapper";
import ProductsCarousel from "../products-carousel/ProductsCarousel";
import ProductDetailInformation from "./ProductDetailInformation";
import { ApiEndpoints } from "../../../api/endpoints";
import axios from "../../../api/axios";
import { singleProductBasePath, allCategoriesUrl, subcategoryProductsBaseUrl, subcategoriesOfMainCategoryBaseUrl } from "../../../constants";


export default function Product() {
  const params  = useParams();
  const effectRun = useRef(false);
  const {auth} = useAuth();
  const [singleProduct, setSingleProduct] = useState({id: params.productId})
  

  useEffect(() => {
    const controller = new AbortController();

    const getProduct = async () => {
      try {
        const response = await axios.post(
          ApiEndpoints.products.getById,
          { id: params.productId, userId: auth.userId },
          {
            signal: controller.signal,
          }
        );
        console.log(response?.data);

        setSingleProduct(response?.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (effectRun.current) {
      getProduct();
    }

    return () => {
      effectRun.current = true; // update the value of effectRun to true
      controller.abort();
    };
  }, []);

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

  const breadcrumbs = [
    {
      name: "Home",
      uri: "/",
    },
    {
      name: "Category Name",
      uri: `${allCategoriesUrl}`,
    },
    {
      name: "Subcategory Name",
      uri: `"/subcategories"`,
    },
    {
      name: "Product",
      uri: `${singleProductBasePath}${params}`,
    },
  ];

  const product = {
    name: "iPhone compatible with your desktop computer",
    isAvailable: true,
    description:
      "Probably the most random thing you have ever seen! It is very possible to get married if you buy some products from this category. If you don't do it, you will have no sex within next 5 years. If you don't believe, you can ask some other users. Probably the most random thing you have ever seen! It is very possible to get married if you buy some products from this category. If you don't do it, you will have no sex within next 5 years. If you don't believe, you can ask some other users. Probably the most random thing you have ever seen! It is very possible to get married if you buy some products from this category. If you don't do it, you will have no sex within next 5 years. If you don't believe, you can ask some other users. Probably the most random thing you have ever seen! It is very possible to get married if you buy some products from this category. If you don't do it, you will have no sex within next 5 years. If you don't believe, you can ask some other users. Probably the most random thing you have ever seen! It is very possible to get married if you buy some products from this category. If you don't do it, you will have no sex within next 5 years. If you don't believe, you can ask some other users. Probably the most random thing you have ever seen! It is very possible to get married if you buy some products from this category. If you don't do it, you will have no sex within next 5 years. If you don't believe, you can ask some other users.",
    id: 1,
    currency: "$",
    rating: 2.3,
    price: 20.50,
    discount: 10,
    quantity: 12,
    brand: "Apple Inc",
    hasGuarantee: true,
    tags: ["auto", "home", "pets"],
    specifications: [
      {
        key: "Material",
        value: "Rubber",
      },
      {
        key: "Year",
        value: "1991",
      },
      {
        key: "Age",
        value: "18+",
      },
    ],
    images: [
      "https://levvvel.com/wp-content/uploads/2560-x-1440-vs-1920-x-1080-resolution.jpg",
      "https://images.hdqwalls.com/download/winter-snow-trees-mountains-landscape-hdr-4k-aj-1920x1080.jpg",
      "https://static.timesofisrael.com/www/uploads/2021/10/%D7%9E%D7%A2%D7%91%D7%93-%D7%90%D7%9C%D7%93%D7%A8-%D7%9C%D7%99%D7%99%D7%A7-%D7%A7%D7%A8%D7%93%D7%99%D7%98-%D7%90%D7%95%D7%94%D7%93-%D7%A4%D7%90%D7%9C%D7%99%D7%A7.jpg",
      "https://www.ibanez.com/common/product_artist_file/file/pc_main_electric_guitars_na.jpg",
      "https://www.hansetextil.com/media/catalog/category/HANSE_pillows.jpg",
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWN8ZW58MHx8MHx8&w=1000&q=80",
      "https://cdn.mos.cms.futurecdn.net/xjGinGFYRvmcog5cX92WYk.jpg",
      "https://assets.epicurious.com/photos/5e38ae1259e5e50008b35cc6/16:9/w_2560%2Cc_limit/DemitasseSpoons_HERO_012920_082_VOG_final.jpg",
      "https://www.philips.com/c-dam/b2c/master/experience/consistency-campaign/airfryer/EU7/philips-airfryer-uk-thumbnail.jpg",
      "https://cdn.thewirecutter.com/wp-content/media/2022/01/nintendo-switch-2048px-1011437-3x2-1.jpg?auto=webp&quality=60&crop=1.91:1&width=1200",
    ],
    reviews: [
      {
        id: 1,
        author: "Vasko",
        email: "vasko@abv.bg",
        content: "This product is awesome! Recommend it!",
        ratingValue: 5,
        createdBy: 10,
        createdOn: "25-03-2023"
      },
      {
        id: 2,
        author: "Pecata",
        email: "pecata@abv.bg",
        content: "This product is bad! It is shit!",
        ratingValue: 1,
        createdBy: 20,
        createdOn: "20-10-2021"
      },
      {
        id: 3,
        author: "Tombata",
        email: "tombata@abv.bg",
        content: "This product is not bad for the price but it can be better.",
        ratingValue: 3,
        createdBy: 30,
        createdOn: "30-01-2022"
      }
    ]
  };

  return (
    <Fragment>
      <BreadcrumbsBar breadcrumbsItems={breadcrumbs} />
      <ProductInfoWrapper product={product}/>
      <ProductsCarousel products={products} headingName="Similar Products" />
      <ProductDetailInformation product={product}/>
    </Fragment>
  );
}
