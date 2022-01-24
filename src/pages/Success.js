import { Grid, TextField, Typography, Box, CircularProgress } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, Link} from "react-router-dom"
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

function Success() {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState([])
    const [copied, setCopied] = useState(false)

    const {id} = useParams()

    useEffect(() => {
        axios.get(`http://localhost:8000/${id}`)
        .then(response => {
            console.log(response.data)
            setUser(response.data)
            setLoading(false)
        })
    }, [])

    const handleClick = (e) => {
        navigator.clipboard.writeText(`http://localhost:3000/${id}`);
        setCopied(true)
    }


    return (
        loading?
            <Grid className="home-section" container direction= "column" alignItems={"center"} justifyContent={"center"}>
                <CircularProgress/>
            </Grid>
        :
        <Grid className="home-section" container direction= "column" alignItems={"center"} justifyContent={"center"} spacing={2}>
                <Typography variant="h4"> Hello there, {user.name}! </Typography>
                <Typography variant="h5"> You currently have, <span className="red"> {user.referrals} </span> {user.referrals>1 ? "points" : "point"}! </Typography>
            <Grid item>
                <Typography variant = "h6">Share the link and get more points:</Typography>
            </Grid>
            <Grid item container justifyContent={"center"}>
                <TextField disabled value={`http://localhost:3000/${id}`}/>
                <Box onClick = {handleClick} className="flex grey-box" sx={{mx: 2, width: "40px"}}>
                    <ContentCopyIcon/>
                </Box>
            </Grid>
            {copied?
                <Typography>Copied to clipboard</Typography>
            :
                null
            }
            <Grid item sx={{my: 2}}>
                <Link to= "/ranking"  className="button-link">
                    See the current Ranking
                </Link>
            </Grid>
        </Grid>
    )
}

export default Success