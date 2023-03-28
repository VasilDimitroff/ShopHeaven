import { React } from 'react';
import { Box, } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link, useParams  } from "react-router-dom";
import { Info } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";
import Sidebar from './Sidebar';
import Header from '../Header';
import Footer from '../Footer';
import BreadcrumbsBar from '../BreadcrumbsBar';
import ProductInfoWrapper from './ProductInfoWrapper';


export default function Product(props) {
    const { productId } = useParams();

    const categories = [
        {
          name: "Phones, Laptops and Tablets",
          id: "1",
          description: "This category provides you the best description in the whole world. Try it and enjoy it!",
          img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
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
          img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
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
          img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
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
          img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
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
          img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
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
          img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
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
          img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
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
          img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
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
          img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
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
          img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
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
          img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
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
          img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
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
          img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
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
          img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
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
          img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
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
    
      const breadcrumbs = [
        {
          name: "Home",
          uri: "/",
        },
        {
          name: "Categories",
          uri: "/categories",
        },
        {
            name: "Subcategory",
            uri: "/subcategories",
        },
        {
            name: "Product",
            uri: "/product",
         },
      ];
    
    const product = {
      name: "iPhone compatible with your desktop computer",
      isAvailable: true,
      description: "Probably the most random thing you have ever seen!#1",
      id: 1,
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
      images:[
        "https://levvvel.com/wp-content/uploads/2560-x-1440-vs-1920-x-1080-resolution.jpg",
        "https://images.hdqwalls.com/download/winter-snow-trees-mountains-landscape-hdr-4k-aj-1920x1080.jpg",
        "https://static.timesofisrael.com/www/uploads/2021/10/%D7%9E%D7%A2%D7%91%D7%93-%D7%90%D7%9C%D7%93%D7%A8-%D7%9C%D7%99%D7%99%D7%A7-%D7%A7%D7%A8%D7%93%D7%99%D7%98-%D7%90%D7%95%D7%94%D7%93-%D7%A4%D7%90%D7%9C%D7%99%D7%A7.jpg",
        "https://www.ibanez.com/common/product_artist_file/file/pc_main_electric_guitars_na.jpg",
        "https://www.hansetextil.com/media/catalog/category/HANSE_pillows.jpg",
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWN8ZW58MHx8MHx8&w=1000&q=80",
        "https://cdn.mos.cms.futurecdn.net/xjGinGFYRvmcog5cX92WYk.jpg",
        "https://assets.epicurious.com/photos/5e38ae1259e5e50008b35cc6/16:9/w_2560%2Cc_limit/DemitasseSpoons_HERO_012920_082_VOG_final.jpg",
        "https://www.philips.com/c-dam/b2c/master/experience/consistency-campaign/airfryer/EU7/philips-airfryer-uk-thumbnail.jpg",
        "https://cdn.thewirecutter.com/wp-content/media/2022/01/nintendo-switch-2048px-1011437-3x2-1.jpg?auto=webp&quality=60&crop=1.91:1&width=1200"
      ]
    }

  return (
    <div>
        <Header categories={categories}/>
        <BreadcrumbsBar breadcrumbsItems={breadcrumbs}/>
        <ProductInfoWrapper product={product}/>
        <Footer/>
    </div>
  )
}
