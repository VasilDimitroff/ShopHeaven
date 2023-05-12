import { React, useState, Fragment, useRef, useEffect } from "react";
import { Box, Paper, Typography, Switch, FormGroup, Rating, FormControlLabel, Checkbox, Button, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../../theme";

export default function SubcategoryProductsSidebar() {
  const [value, setValue] = useState(1);

  function applyFilters(){
    
  }

  const StyledPaper = styled(Paper)({
    padding: theme.spacing(2)
  })

  const RatingHolder = styled(Box)({
    display: "flex",
    alignItems: "center"
  })

  return (
    <Fragment>
        <Stack spacing={2}>
          <Typography variant="h5">FILTERS</Typography>
          <StyledPaper>
          <Typography variant="h6">In Stock</Typography>
            <Switch defaultChecked />
          </StyledPaper>
          <StyledPaper>
          <Typography variant="h6">Price Range</Typography>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="1-50" />
            <FormControlLabel control={<Checkbox />} label="51-100" />
            <FormControlLabel control={<Checkbox />} label="100-200" />
            <FormControlLabel control={<Checkbox />} label="200-500" />
            <FormControlLabel control={<Checkbox />} label="500-1000" />
            <FormControlLabel control={<Checkbox />} label="1000-1500" />
            <FormControlLabel control={<Checkbox />} label="1500-2000" />
            <FormControlLabel control={<Checkbox />} label="2000+" />
          </FormGroup>
        <Button onClick={applyFilters}>APPLY FILTERS</Button>
          </StyledPaper>
          <StyledPaper>
          <Typography variant="h6">Rating</Typography>
          <RatingHolder>
             <FormControlLabel label="5" control={<Checkbox />}/><Rating readOnly value={5} />
           </RatingHolder>
           <RatingHolder>
             <FormControlLabel label="4" control={<Checkbox />}/><Rating readOnly value={4} />
           </RatingHolder>
           <RatingHolder>
             <FormControlLabel label="3" control={<Checkbox />}/><Rating readOnly value={3} />
           </RatingHolder>
           <RatingHolder>
             <FormControlLabel label="2" control={<Checkbox />}/><Rating readOnly value={2} />
           </RatingHolder>
           <RatingHolder>
             <FormControlLabel label="1" control={<Checkbox />}/><Rating readOnly value={1} />
           </RatingHolder>
          </StyledPaper>
        </Stack>
    </Fragment>
  );
}
