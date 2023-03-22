import { Paper, Button, Box, Container } from '@mui/material';
import { styled } from "@mui/material/styles";
import { theme } from './../../theme';

function CarouselItem(props)
{
    const SliderImage = styled('img')({
        width: "100%",
        objectFit: "cover",
        [theme.breakpoints.up("md")]: {
            height: "62vh",
        },
        [theme.breakpoints.down("md")]: {
            height: "30vh",
        },
    });
    return (
            <Paper>
            <SliderImage src={props.item.image} />
            <Container className="wrapper" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
           
            <h2>{props.item.name}</h2>
            <Button variant="contained">
                Check it out!
            </Button>
            </Container>
        </Paper>
    )
}
//<div sx={{position: "absolute", zIndex:"100", top: "0px", backgroundColor: "black", height: "300px", marginTop: "400px"}}>{props.item.description}</div>
export default CarouselItem;