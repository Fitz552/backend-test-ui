import {TextField, Button, CircularProgress, Typography, Paper, Grid} from "@mui/material"
import {useState} from "react"
import {Link, Navigate, useParams} from "react-router-dom"
import axios from "axios"


function Home() {
    const [form, setForm] = useState({name: "", email:"", phone:""})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [createdUser, setCreatedUser] = useState({})

    const {id} = useParams()

    const handleChange = (e) => {
        setError(false)
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        axios.post("http://localhost:8000", id ? {...form, "referredBy": id} : form)
        .then(response => {
            setLoading(false)
            setCreatedUser(response.data)
            console.log(response)
        })
        .catch(error => {
            setLoading(false)  
            setError(true)
        })
    }

    return (
        <>
        {loading?
            <CircularProgress/>
        :   
            
            <div className="home-section">
                <Grid container direction= "column" alignItems={"center"} spacing={2}>
                    <Grid item>
                        <Typography textAlign={"center"} sx={{m: 2}} variant="h2">
                            Join the competition!
                        </Typography>
                        <Typography textAlign={"center"} sx={{m: 2}} variant="h3">
                            Spread the word about Carbon Compensation!
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Paper sx={{p:2, m:2}}>
                            <form onSubmit={handleSubmit}>
                                <Grid container direction={"column"} spacing={1}>
                                    <Typography textAlign={"center"} variant="h5" sx={{m:1}}>
                                        Get your first point by registering!
                                    </Typography>
                                    <TextField required name="name" label="name" variant="outlined" onChange={handleChange} sx={{my:1}}/>
                                    <TextField required name="email" label="email" variant="outlined" onChange={handleChange} sx={{my:1}}/>
                                    <TextField required name="phone" label="phone" variant="outlined" type="number" onChange={handleChange} sx={{my:1}}/>
                                    <Button type="submit">Enviar</Button>
                                </Grid>
                            </form>
                        </Paper>
                    </Grid>      
                    {
                        error?
                        <Grid item>
                            <Typography variant="h5" color="red"> Please input valid information    </Typography>
                        </Grid>
                        :
                        null
                    }
                    <Grid sx={{my: 2}}>
                        <Link to = "/ranking" className="button-link"> See the current Ranking</Link>
                    </Grid>              
                </Grid>
            </div>

        }

        {
            createdUser._id ? <Navigate to={`/success/${createdUser._id}`}/> : null

        }
        </>
    )
}

export default Home