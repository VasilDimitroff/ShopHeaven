import { React, useState} from "react";
import { TableRow, TableCell } from "@mui/material";
import { styled } from "@mui/material/styles";

export default function ProductSpecifications(props) {

  const [specifications, setSpecifications] = useState(props.specifications)
  
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

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  
  return specifications?.map((spec) => {
    return (
      <StyledTableRow key={spec.id}>
        <KeyTableCell component="th" scope="row">{spec.key}</KeyTableCell>
        <ValueTableCell align="left">{spec.value}</ValueTableCell>
      </StyledTableRow>
    );
  });
}