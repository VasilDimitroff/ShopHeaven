import {  Box, Grid, Typography,  List,  ListItem,  Divider,  Link, } from "@mui/material";
  import { LinkedIn, GitHub, } from "@mui/icons-material";
  import { styled } from "@mui/material/styles";
  import { theme } from "./../../theme";
  import Header from "../Header";
  import BreadcrumbsBar from "../BreadcrumbsBar";
  import  SidebarWithProducts from "./SidebarWithProducts";

  
  export default function Categories(props) {

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
      
    const StyledLink = styled(Link)({
      marginLeft: theme.spacing(1.5),
    });

    const breadcrumbs = [{
        name: "Home",
        uri: "/"
    }, 
    {
        name: "Categories",
        uri: "/categories"
    },]
  
    return (
        <div style={{backgroundColor: theme.palette.appBackground.main}}>
            <Header categories={categories} />
            <BreadcrumbsBar breadcrumbsItems={breadcrumbs}/>
            <SidebarWithProducts/>
        </div>
    );
  }
  