import { React, Fragment, useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableContainer,
  TableBody,
  Rating,
  Button,
  InputBase,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";

export default function ProductDetailInformation(props) {
  function TabPanel(props) {
    const { children, value, index } = props;

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

  function RenderTableBody() {
    return props.product.specifications.map((spec, index) => {
      return (
        <StyledTableRow key={index}>
          <KeyTableCell component="th" scope="row">
            {spec.key}
          </KeyTableCell>
          <ValueTableCell align="left">{spec.value}</ValueTableCell>
        </StyledTableRow>
      );
    });
  }

  function RenderReviewBox() {
    return (
      <Fragment>
      <Typography variant="h6">LEAVE REVIEW</Typography>
      <ProductInfoInput
        placeholder="Your name"
      />
      <ProductInfoInput
        placeholder="Your e-mail (optional)"
      />
      <Typography>Your rating:</Typography>
      <Rating name="size-small" defaultValue={2} size="medium" sx={{display: "block"}}/>
      <ProductInfoInput
        multiline
        placeholder="Type comment here…"
        minRows={4}
      />
      <Button size="medium" variant="contained" sx={{mt: theme.spacing(2)}}>
        SEND REVIEW
      </Button>
      </Fragment>
    )
  }

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const StyledTabContent = styled(Box)({
    padding: theme.spacing(3),
  });

  const MainWrapper = styled(Box)({
    width: "80%",
    margin: "auto",
    marginTop: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      width: "95%",
    },
  });

  const KeyTableCell = styled(TableCell)({
    minWidth: "10%",
    textTransform: "uppercase",
    fontWeight: 500,
    fontSize: 15,
  });

  const ValueTableCell = styled(TableCell)({
    textTransform: "uppercase",
    fontWeight: 400,
    fontSize: 15,
    width: "50%",
  });

  const HeadingTableCell = styled(TableCell)({
    textTransform: "uppercase",
    fontWeight: 600,
    fontSize: 24,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  });

  const HeadingDescription = styled(Typography)({
    textTransform: "uppercase",
    fontWeight: 600,
    fontSize: 24,
    paddingTop: theme.spacing(1.9),
    paddingBottom: theme.spacing(3),
  });

  const ProductInfoInput = styled(InputBase)({
    background: "rgb(255,249,249)",
    width: "100%",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
  });

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <MainWrapper>
      <Paper>
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Description" />
            <Tab label="Specifications" />
            <Tab label="Reviews" />
          </Tabs>
        </Box>
        <Box>
          <TabPanel value={value} index={0}>
            <HeadingDescription>PRODUCT DESCRIPTION</HeadingDescription>
            {props.product.description}
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TableContainer>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <HeadingTableCell>SPECIFICATIONS</HeadingTableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{RenderTableBody()}</TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel value={value} index={2}>
            {RenderReviewBox()}
          </TabPanel>
        </Box>
      </Paper>
    </MainWrapper>
  );
}
