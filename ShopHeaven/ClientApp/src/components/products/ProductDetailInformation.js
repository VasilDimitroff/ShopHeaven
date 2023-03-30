import { React, useState } from 'react'
import {  Box, Typography, Tabs, Tab, Paper, } from "@mui/material";
import PropTypes from 'prop-types';
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";

 
export default function ProductDetailInformation(props) {

    function TabPanel(props) {
        const { children, value, index,} = props;
        
        return (
          <div hidden={value !== index}>
            {value === index && (
              <StyledTabContent>
                <Typography>{children}</Typography>
              </StyledTabContent>
            )}
          </div>
        );
    }
  
    const [value, setValue] = useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const StyledTabContent = styled(Box)({
        padding: theme.spacing(3)
    });

    const StyledTab = styled(Tab)({
   
    })

    const MainWrapper = styled(Box)({
        width: "80%",
        margin: "auto",
        marginTop: theme.spacing(2),
        [theme.breakpoints.down("md")]: {
          width: "95%",
        },
      });

  return (
    <MainWrapper>
    <Paper >
    <Box>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="inherit"
        variant="fullWidth"
        aria-label="full width tabs example">
        <StyledTab label="Description"  />
        <StyledTab label="Specifications"/>
        <StyledTab label="Reviews"/>
      </Tabs>
    </Box>
    <Box>
      <TabPanel value={value} index={0}>
        {props.product.description}
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  </Paper>
  </MainWrapper>
  )
};