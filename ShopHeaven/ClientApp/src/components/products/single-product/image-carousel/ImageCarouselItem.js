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
    paddingTop: theme.spacing(10),
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

  const ImageHolder = styled(Box)({
    width: "85%",
    position: "absolute",
    top: "45%",
    bottom: "50%",
    left: "50%",
    right: "50%",
  });

  const CloseButtonHolder = styled(Box)({
    position: "absolute",
    top: "9%",
    bottom: "90%",
    right: "9%",
    zIndex: 1,
    [theme.breakpoints.down("lg")]: {
      top: "20%",
    },
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
          <CloseButtonHolder onClick={handleOpenModal}>
            <IconButton sx={{ color: theme.palette.white.main }}>
              <Close sx={{ fontSize: 50 }} />
            </IconButton>
          </CloseButtonHolder>
          <ImageHolder>
            <ModalCardMedia image={image} />
          </ImageHolder>
        </ModalHolder>
      </StyledModal>

      <CardActionArea>
        <ProductCardMedia image={image} onClick={handleOpenModal} />
      </CardActionArea>
    </StyledCard>
  );
}
