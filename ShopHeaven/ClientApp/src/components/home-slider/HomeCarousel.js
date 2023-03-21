import React from "react";
import Carousel from 'react-material-ui-carousel'
import CarouselItem from './CarouselItem'

export default function HomeCarousel(props)
{
    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!",
            image: "https://parkers-images.bauersecure.com/wp-images/17053/renault_austral.jpg",
        },
        {
            name: "Random Name #2",
            description: "Hello World!",
            image: "https://content-images.carmax.com/qeontfmijmzv/MY19MKj0XutK084z874jt/9632621fd8464b5c0e54a9dee64ad4e5/tesla.jpg",
        }
    ]

    return (
        <Carousel>
            {
                items.map( (item) => <CarouselItem item={item} /> )
            }
        </Carousel>
    )
}