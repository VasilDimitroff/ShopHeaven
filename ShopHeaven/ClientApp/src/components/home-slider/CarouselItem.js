
import { Paper, Button } from '@mui/material'

export default function CarouselItem(props)
{
    return (
        <Paper>
            <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>
            <img src={props.item.image} />

            <Button className="CheckButton">
                Check it out!
            </Button>
        </Paper>
    )
}