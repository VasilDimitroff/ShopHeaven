import React from 'react';
import Carousel from 'react-material-ui-carousel'
import CarouselItem from './CarouselItem'
import {
    Label,
    RadioButtonChecked,
    KeyboardArrowRight,
    ArrowBackIos
  } from "@mui/icons-material";

function HomeCarousel(props)
{
    var items = [
        {
            name: "iPhone compatible with your desktop computer",
            description: "Probably the most random thing you have ever seen!#1",
            image: "https://levvvel.com/wp-content/uploads/2560-x-1440-vs-1920-x-1080-resolution.jpg"
        },
        {
            name: "Where the Nature helps you to sleep",
            description: "Probably the most random thing you have ever seen!#2 Probably the most random thing you have ever seen!#2 Probably the most random thing you have ever seen!#2 Probably the most random thing you have ever seen!#2Probably the most random thing you have ever seen!#2 Probably the most random thing you have ever seen!#2",
            image: "https://images.hdqwalls.com/download/winter-snow-trees-mountains-landscape-hdr-4k-aj-1920x1080.jpg"
        },
        {
            name: "Intel 9900 Processor The new way of working",
            description: "Probably the most random thing you have ever seen!#3",
            image: " https://static.timesofisrael.com/www/uploads/2021/10/%D7%9E%D7%A2%D7%91%D7%93-%D7%90%D7%9C%D7%93%D7%A8-%D7%9C%D7%99%D7%99%D7%A7-%D7%A7%D7%A8%D7%93%D7%99%D7%98-%D7%90%D7%95%D7%94%D7%93-%D7%A4%D7%90%D7%9C%D7%99%D7%A7.jpg"
        }
    ]
   
    //https://www.memoryc.com/images/products/bb/image_4175761.jpg
//
    return (
        <Carousel animation="slide" navButtonsAlwaysVisible={true} indicators={false}>
            {
                items.map( (item) => <CarouselItem item={item} /> )
            }
        </Carousel>
    )
}

export default HomeCarousel;