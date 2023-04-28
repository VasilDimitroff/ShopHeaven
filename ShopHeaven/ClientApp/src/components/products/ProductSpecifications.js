import { React} from "react";
import { TableRow, TableCell } from "@mui/material";
import { styled } from "@mui/material/styles";

export default function ProductSpecifications(props) {
  
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
  
  return props.specifications.map((spec, index) => {
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