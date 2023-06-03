import {
  Box,
  Card,
  CardActionArea,
  IconButton,
  CardMedia,
  Modal,
} from "@mui/material";
import { React, useState } from "react";
import { Close } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { theme } from "../../../../theme";

export default function ImageCarouselItem(props) {
  const [image, setImage] = useState(props.image);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal((prev) => !prev);

  const ProductCardMedia = styled(CardMedia)({
    height: 80,
  });

  const ModalCardMedia = styled(CardMedia)({
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
    positon: "relative",
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
      display: "none",
    },
  });

  return (
    <StyledCard>
      <StyledModal keepMounted open={openModal} onClose={handleOpenModal}>
        <ModalHolder>
          <PositioningContainer>
            <ImageHolder>
              <img
                src={image}
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
      <CardActionArea>
        <ProductCardMedia image={image} onClick={handleOpenModal} />
      </CardActionArea>
    </StyledCard>
  );
}
