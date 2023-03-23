import { React } from "react";
import Carousel from "react-material-ui-carousel";
import { Box } from "@mui/material";
import ProductCarouselSlide from "./ProductCarouseSlide";
import { theme } from "../../theme";
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function ProductsCarousel(props) {
  let items = [
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

  function SetCardsNumber() {
    let cardsPerSlide;

    const isBiggerOrXs = useMediaQuery(theme.breakpoints.up("xs"));
    const isBiggerOrSm = useMediaQuery(theme.breakpoints.up("sm"));
    const isBiggerOrMd = useMediaQuery(theme.breakpoints.up("md"));
    const isBiggerOrLg = useMediaQuery(theme.breakpoints.up("lg"));
    const isBiggerOrXl = useMediaQuery(theme.breakpoints.up("xl"));

    if (isBiggerOrXs === true) {
      cardsPerSlide = 1;
    }
    if (isBiggerOrSm === true) {
      cardsPerSlide = 2;
    }
    if (isBiggerOrMd === true) {
      cardsPerSlide = 3;
    }
    if (isBiggerOrLg === true) {
      cardsPerSlide = 5;
    }
    if (isBiggerOrXl === true) {
      cardsPerSlide = 6;
    }

    return cardsPerSlide;
  }

  function ReturnSlidesInfo() {
    let cardsCountPerSlide = SetCardsNumber();
    let slidesCount = Math.ceil(items.length / cardsCountPerSlide);

    let slidesInfo = [];

    for (
      let i = 0;
      i < slidesCount * cardsCountPerSlide;
      i = i + cardsCountPerSlide
    ) {
      slidesInfo.push({
        startIndex: i,
        cardsPerSlide: cardsCountPerSlide,
      });
    }

    return slidesInfo;
  }
  
  return (
    <Box>
      <Carousel
        animation="slide"
        swipe={false}
        navButtonsAlwaysVisible={true}
        indicators={true}
      >
        {ReturnSlidesInfo().map((rowInfo) => {
          return (
            <ProductCarouselSlide
              items={items.slice(
                rowInfo.startIndex,
                rowInfo.startIndex + rowInfo.cardsPerSlide
              )}
              cardsPerSlide={rowInfo.cardsPerSlide}
              slideHeading={`Category ${rowInfo.startIndex}`}
            />
          );
        })}
      </Carousel>
    </Box>
  );
}

export default ProductsCarousel;
