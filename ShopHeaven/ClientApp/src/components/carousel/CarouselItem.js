import React from "react";
import { Paper, Button, Box } from "@mui/material";
import {theme} from './../../theme';

function CarouselItem(item) {
  //https://www.jbl.com/dw/image/v2/BFND_PRD/on/demandware.static/-/Sites-siteCatalog_JB_US_Imported/default/dw0c3ec204/categoryimage/Charge5.jpg
  //https://www.popsci.com/uploads/2021/11/12/fluance-ai41-best-speakers.jpg
  //https://parkers-images.bauersecure.com/wp-images/17053/renault_austral.jpg
  //https://www.volvocars.com/images/v/-/media/project/contentplatform/data/media/my23/car-images/c40-bev-my23.jpg?iar=0
  return (

    <Paper sx={{height: 832, overflow: "hidden", marginTop: theme.spacing(12), borderRadius: theme.shape.borderRadius}}>
        <img
           sx={{objectFit: "cover"}}
           src={`${item.image}`}
          />
          <h1>{item.name}</h1>
          <h1>{item.description}</h1>
    </Paper>
  );
}

export default CarouselItem;
