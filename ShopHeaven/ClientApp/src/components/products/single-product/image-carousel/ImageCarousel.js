import { React, useState } from "react";
import Carousel from "react-material-ui-carousel";
import {
  Box,
  Card,
  CardActionArea,
  Modal,
  CardMedia,
  IconButton,
  Chip,
} from "@mui/material";
import ImageCarouselSlide from "./ImageCarouselSlide";
import { Close } from "@mui/icons-material";
import { theme } from "../../../../theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled } from "@mui/material/styles";

function ImageCarousel(props) {
  const [product, setProduct] = useState(props.product);
  const [images, setImages] = useState(props.product.images.map((x) => x.url));

  const indexOfThumbnail = props.product.images.findIndex(
    (x) => x.isThumbnail === true
  );
  const [bigImageIndex, setBigImageIndex] = useState(indexOfThumbnail);

  const [slideIndex, setSlideIndex] = useState(0);

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal((prev) => !prev);

  function SetCardsNumber() {
    let cardsPerSlide;

    const isBiggerOrXs = useMediaQuery(theme.breakpoints.up("xs"));
    const isBiggerOrSm = useMediaQuery(theme.breakpoints.up("sm"));
    const isBiggerOrMd = useMediaQuery(theme.breakpoints.up("md"));
    const isBiggerOrLg = useMediaQuery(theme.breakpoints.up("lg"));
    const isBiggerOrXl = useMediaQuery(theme.breakpoints.up("xl"));

    if (isBiggerOrXs === true) {
      cardsPerSlide = 4;
    }
    if (isBiggerOrSm === true) {
      cardsPerSlide = 5;
    }
    if (isBiggerOrMd === true) {
      cardsPerSlide = 5;
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
    let slidesCount = Math.ceil(images.length / cardsCountPerSlide);

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

  const setIndex = (imageIndex, slideIndex) => {
    setBigImageIndex(imageIndex);
    setSlideIndex(slideIndex);
  };

  let finalIndex = bigImageIndex + slideIndex * SetCardsNumber();

  const ProductCardMedia = styled(CardMedia)({
    height: 350,
    position: "relative",
    [theme.breakpoints.down("md")]: {
      height: 350,
    },
  });

  const ModalCardMedia = styled(Box)({
    height: 800,

    transform: "translate(-50%, -50%)",
    [theme.breakpoints.down("lg")]: {
      height: 550,
    },
    [theme.breakpoints.down("md")]: {
      height: 450,
    },
    [theme.breakpoints.down("sm")]: {
      height: 330,
    },
    [theme.breakpoints.down("xs")]: {
      height: 350,
    },
  });

  const ModalHolder = styled(Box)({
    boxShadow: 24,
    width: "100%",
    height: " 100%",
    //border: "10px solid red",
    position: "relative",
  });

  const PositioningContainer = styled(Box)({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    [theme.breakpoints.down("md")]: {
      top: "2%",
      left: "2%",
      right: "2%",
      bottom: "2%",
      transform: "translate(0%, 0%)",
    },
    [theme.breakpoints.down("sm")]: {
      top: "2%",
      left: "2%",
      right: "2%",
      bottom: "2%",
      transform: "translate(0%, 0%)",
    },
  });

  const ImageHolder = styled(Box)({  
    //border: "5px solid green", 
    width: "100%",
    height: " 100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    positon: "relative"
  });

  const StyledCard = styled(Card)({
    marginLeft: theme.spacing(0.7),
    marginRight: theme.spacing(0.7),
    "&:hover": {
      outlineColor: theme.palette.primary.main,
      outlineStyle: "solid",
      outlineWidth: "3px",
      boxShadow: theme.palette.dropdown.boxShadow.main,
    },
  });

  const CloseButtonHolder = styled(Box)({
    position: "absolute",
    top: "2%",
    right: "3%",
  });

  const StyledModal = styled(Modal)({
    display: "block",
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
  });

  const LabelsHolder = styled(Box)({
    display: "flex",
    gap: 7,
    position: "absolute",
    zIndex: 1,
    bottom: 150,
    left: 15,
  });

  return (
    <Box sx={{ position: "relative" }}>
      <Box>
        <StyledModal
          keepMounted
          open={openModal}
          onClose={handleOpenModal}
          sx={{}}
        >
          <ModalHolder>
            <PositioningContainer>
              <ImageHolder>
                <img
                  src={images[finalIndex]}
                  style={{
                    objectFit: "contain",
                    width: "95%",
                  }}
                />
              <CloseButtonHolder onClick={handleOpenModal}>
                  <IconButton sx={{ color: theme.palette.error.main }}>
                    <Close sx={{ fontSize: 50 }} />
                  </IconButton>
              </CloseButtonHolder>
              </ImageHolder>
            </PositioningContainer>
          </ModalHolder>
        </StyledModal>
        <StyledCard onClick={handleOpenModal}>
          <LabelsHolder>
            {product?.labels?.map((label) => {
              return (
                <Chip
                  key={label}
                  size="small"
                  variant="filled"
                  color="primary"
                  label={label}
                ></Chip>
              );
            })}
          </LabelsHolder>
          <CardActionArea>
            <ProductCardMedia image={images[finalIndex]} />
          </CardActionArea>
        </StyledCard>
      </Box>
      <Carousel
        animation="slide"
        swipe={false}
        navButtonsAlwaysVisible={true}
        indicators={true}
        interval={12000}
        cycleNavigation={false}
        indicatorIconButtonProps={{
          style: {
            marginTop: theme.spacing(3),
          },
        }}
        activeIndicatorIconButtonProps={{
          style: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
          },
        }}
        navButtonsProps={{
          style: {
            opacity: "0.8",
            backgroundColor: theme.palette.primary.main,
          },
        }}
      >
        {ReturnSlidesInfo().map((rowInfo, index) => {
          return (
            <ImageCarouselSlide
              slideIndex={index}
              setIndex={setIndex}
              key={index}
              images={images.slice(
                rowInfo.startIndex,
                rowInfo.startIndex + rowInfo.cardsPerSlide
              )}
            />
          );
        })}
      </Carousel>
    </Box>
  );
}

export default ImageCarousel;
