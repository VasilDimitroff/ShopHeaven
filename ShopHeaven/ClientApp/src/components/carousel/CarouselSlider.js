import React from 'react';
import Carousel from 'react-material-ui-carousel'
import  CarouselItem  from './CarouselItem'


function CarouselSlider()
{
    var items = [
        {
            name: "Random Name #1",
            image: "https://www.popsci.com/uploads/2021/11/12/fluance-ai41-best-speakers.jpg",
            description: "Probably the most random thing you have ever seen!"
        },
        {
            name: "Random Name #2",
            image: "https://www.jbl.com/dw/image/v2/BFND_PRD/on/demandware.static/-/Sites-siteCatalog_JB_US_Imported/default/dw0c3ec204/categoryimage/Charge5.jpg",
            description: "Hello World!"
        },
        {
            name: "Random Name #3",
            image: "https://parkers-images.bauersecure.com/wp-images/17053/renault_austral.jpg",
            description: "Probably the most random thing you have ever seen!"
        },
        {
            name: "Random Name #4",
            image: "https://www.volvocars.com/images/v/-/media/project/contentplatform/data/media/my23/car-images/c40-bev-my23.jpg?iar=0",
            description: "Probably the most random thing you have ever seen!"
        },
    ]

    return (
        <Carousel sx={{ height: 832}}>
            {
                items.map((item) => {
                    return (<CarouselItem image={item.image} name={item.name} description={item.description} />);
                })
            };
        </Carousel>

    )
}

export default CarouselSlider;