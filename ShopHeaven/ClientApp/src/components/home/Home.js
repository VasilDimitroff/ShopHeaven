import React from "react";
import { Button, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";
import HomeSliderAndCategories from "./HomeSliderAndCategories";
import NavMenu from "../NavMenu";
import FirstLineProducts from "./FirstLineProducts";

let products = [
  {
    name: "iPhone compatible with your desktop computer",
    description: "Probably the most random thing you have ever seen!#1",
    image:
      "https://levvvel.com/wp-content/uploads/2560-x-1440-vs-1920-x-1080-resolution.jpg",
  },
  {
    name: "Where the Nature helps you to sleep",
    description:
      "Probably the most random thing you have ever seen!#2 Probably the most random thing you have ever seen!#2 Probably the most random thing you have ever seen!#2 Probably the most random thing you have ever seen!#2Probably the most random thing you have ever seen!#2 Probably the most random thing you have ever seen!#2",
    image:
      "https://images.hdqwalls.com/download/winter-snow-trees-mountains-landscape-hdr-4k-aj-1920x1080.jpg",
  },
  {
    name: "Intel 9900 Processor The new way of working",
    description: "Probably the most random thing you have ever seen!#3",
    image:
      " https://static.timesofisrael.com/www/uploads/2021/10/%D7%9E%D7%A2%D7%91%D7%93-%D7%90%D7%9C%D7%93%D7%A8-%D7%9C%D7%99%D7%99%D7%A7-%D7%A7%D7%A8%D7%93%D7%99%D7%98-%D7%90%D7%95%D7%94%D7%93-%D7%A4%D7%90%D7%9C%D7%99%D7%A7.jpg",
  },
  {
    name: "Fender Stratocaster Electric Guitar",
    description: "Probably the most random thing you have ever seen!#4",
    image:
      "https://www.ibanez.com/common/product_artist_file/file/pc_main_electric_guitars_na.jpg",
  },
  {
    name: "Baby Pillows for your beautiful dreams",
    description: "Probably the most random thing you have ever seen!#5",
    image:
      "https://www.hansetextil.com/media/catalog/category/HANSE_pillows.jpg",
  },
  {
    name: "DJs are the new saviors of the world",
    description: "Probably the most random thing you have ever seen!#6",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWN8ZW58MHx8MHx8&w=1000&q=80",
  },
  {
    name: "Best metal albums in your live",
    description: "Probably the most random thing you have ever seen!#7",
    image: "https://cdn.mos.cms.futurecdn.net/xjGinGFYRvmcog5cX92WYk.jpg",
  },
  {
    name: "Spoons for your Christmas table",
    description: "Probably the most random thing you have ever seen!#8",
    image:
      "https://assets.epicurious.com/photos/5e38ae1259e5e50008b35cc6/16:9/w_2560%2Cc_limit/DemitasseSpoons_HERO_012920_082_VOG_final.jpg",
  },
  {
    name: "Do you have already Air Fryer?",
    description: "Probably the most random thing you have ever seen!#9",
    image:
      "https://www.philips.com/c-dam/b2c/master/experience/consistency-campaign/airfryer/EU7/philips-airfryer-uk-thumbnail.jpg",
  },
  {
    name: "You dream about this game console XBox",
    description: "Probably the most random thing you have ever seen!#10",
    image:
      "https://cdn.thewirecutter.com/wp-content/media/2022/01/nintendo-switch-2048px-1011437-3x2-1.jpg?auto=webp&quality=60&crop=1.91:1&width=1200",
  },
  {
    name: "11 prod You dream about this game console XBox",
    description: "Probably the most random thing you have ever seen!#11",
    image:
      "https://cdn.thewirecutter.com/wp-content/media/2022/01/nintendo-switch-2048px-1011437-3x2-1.jpg?auto=webp&quality=60&crop=1.91:1&width=1200",
  },
];

export default function Home() {
  return (
    <div>
      <NavMenu />
      <HomeSliderAndCategories items={products} />
      <FirstLineProducts products={products}/>
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
