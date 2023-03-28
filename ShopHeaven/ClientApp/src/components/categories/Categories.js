import {
  Box,
  Grid,
  Typography,
  List,
  ListItem,
  Divider,
  Link,
} from "@mui/material";
import { LinkedIn, GitHub } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { theme } from "./../../theme";
import Header from "../Header";
import BreadcrumbsBar from "../BreadcrumbsBar";
import CategoriesWrapper from "./CategoriesWrapper";
import Footer from "../Footer";
import FullWidthBanner from "../banners/FullWidthBanner";

export default function Categories() {
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
  ];

  return (
    <div>
      <Header categories={categories} />
      <BreadcrumbsBar breadcrumbsItems={breadcrumbs} />
      <CategoriesWrapper categories={categories} heading="CATEGORIES" />
      <FullWidthBanner paddingTop={theme.spacing(3.5)}
        height={250}
        heightSm={180}
        image="https://img.freepik.com/free-psd/online-shopping-banner-template_23-2148644052.jpg?w=2000"/>
      <Footer />
    </div>
  );
}
