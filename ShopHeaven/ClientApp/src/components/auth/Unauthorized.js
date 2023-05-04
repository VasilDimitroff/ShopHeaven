import { useNavigate } from "react-router-dom";
import { theme } from "../../theme";
import { styled } from "@mui/material/styles";
import { Typography, Button, Paper } from "@mui/material";

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    const ComponentWrapper = styled(Paper)({
        width: "80%",
        display: "block",
        margin: "auto",
        paddingTop: theme.spacing(15),
        paddingBottom: theme.spacing(3),
        textAlign: "center"
      });

      const GoBackButton = styled(Button)({
          display: "block",
          margin: "auto",
          marginTop: theme.spacing(3),
      })

    return (
        <ComponentWrapper>
            <Typography variant="h4">Unauthorized</Typography>
            <Typography variant="p">You do not have permissions to access this page!</Typography>
            <GoBackButton onClick={goBack} variant="contained">Go Back</GoBackButton>
        </ComponentWrapper>
    )
}

export default Unauthorized