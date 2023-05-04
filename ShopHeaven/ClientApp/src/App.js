import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import { theme } from "./theme"
import Register from './components/auth/Register';
import Categories from './components/categories/Categories';
import Login from './components/auth/Login';
import Admin from './components/administration/Admin';
import Layout from './components/Layout';
import Home from './components/home/Home';
import Product from './components/products/Product';
import Products from './components/administration/Products';

export default function App() {

  let products = [
    {
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
      image:
        "https://levvvel.com/wp-content/uploads/2560-x-1440-vs-1920-x-1080-resolution.jpg",
    },
    {
      name: "Where the Nature helps you to sleep",
      isAvailable: true,
      id: 2,
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

  return (  
   <div style={{backgroundColor: theme.palette.appBackground.main}}>
      <Routes>
        <Route path="/" element={<Layout/>}>
           <Route path="/" element={<Home/>}/>
           <Route path="categories" element={<Categories/>}/>
           <Route path="products/:productId" element={<Product/>}/>
           <Route path="login" element={<Login/>}/>
           <Route path="register" element={<Register/>}/>
           <Route path="admin" element={<Admin/>}/>
            
        </Route>
      </Routes>  
   </div>
  );
};


/*
     {AppRoutes.map((route, index) => {
            const { element, requireAuth, ...rest } = route;
            return <Route categories={categories} products={products} key={index} {...rest} element={requireAuth ? <AuthorizeRoute {...rest} element={element} /> : element} />;
          }) }




import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import { Layout } from './components/Layout';
import './custom.css';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Routes>
          {AppRoutes.map((route, index) => {
            const { element, requireAuth, ...rest } = route;
            return <Route key={index} {...rest} element={requireAuth ? <AuthorizeRoute {...rest} element={element} /> : element} />;
          })}
        </Routes>
      </Layout>
    );
  }
} */
