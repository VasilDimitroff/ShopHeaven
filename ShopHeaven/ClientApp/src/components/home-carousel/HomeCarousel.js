import React from 'react';
import Carousel from 'react-material-ui-carousel'
import CarouselItem from './CarouselItem'

function HomeCarousel(props)
{
    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!",
            image: "https://levvvel.com/wp-content/uploads/2560-x-1440-vs-1920-x-1080-resolution.jpg"
        },
        {
            name: "Random Name #2",
            description: "Hello World!",
            image: "https://www.memoryc.com/images/products/bb/image_4175761.jpg"
        }
    ]
//https://images.hdqwalls.com/download/winter-snow-trees-mountains-landscape-hdr-4k-aj-1920x1080.jpg
    return (
        <Carousel>
            {
                items.map( (item) => <CarouselItem item={item} /> )
            }
        </Carousel>
    )
}

export default HomeCarousel;