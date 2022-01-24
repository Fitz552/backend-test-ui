import { Typography } from "@mui/material"
import { useParams } from "react-router-dom"

function Success() {
    const {id} = useParams()

    return (
        <>
        <Typography> Hi </Typography>
        <Typography>This is a success page for {id}</Typography>
        </>
    )
}

export default Success