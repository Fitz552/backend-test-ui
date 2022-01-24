import { useEffect, useState } from "react";
import {CircularProgress, Grid, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";
import { Link } from "react-router-dom";


function Ranking() {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [rows, setRows] = useState([]);
    const [cols, setCols] = useState([]);

    useEffect(()=> {
        axios.get("http://localhost:8000")
        .then (response => {
            console.log(response);
            setUsers(response.data.sort((a,b) => {
                return b.referrals - a.referrals;
            }))
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        let aux = []
        console.log(users)
        users.map((value, index) => {
            if (index<10) {
                aux.push({name: value.name, referrals: value.referrals, id: value._id})
            }
        })
        console.log(aux)
        setRows(aux)
        setCols([{field: "name", headerName: "Name", width:100},
        {field: "referrals", headerName: "Points", width:100}]
        )
    }, [users])
    

    return(
        <Grid className="home-section" container direction= "column" alignItems={"center"} justifyContent={"center"} spacing={2}>
            <Typography variant = "h3">
                Check out the current Top10!
            </Typography>
            {
            loading?
                <CircularProgress/>
            :            
                users.length > 0 ?
                    <TableContainer component = {Paper} sx={{width: "60vw", m:2}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Position
                                    </TableCell>
                                    <TableCell>
                                        Name
                                    </TableCell>
                                    <TableCell>
                                        Points
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {
                                users.map((user, index) => {
                                    if (index < 10) {
                                    return (
                                        <TableRow key={user._id}>
                                            <TableCell>
                                                {index+1}
                                            </TableCell>
                                            <TableCell>
                                                {user.name}
                                            </TableCell>
                                            <TableCell>
                                                {user.referrals}
                                            </TableCell>
                                        </TableRow>
                                    )
                                    }
                                    else {
                                    return null
                                    }
                                })
                            }
                            </TableBody>
                        </Table>
                    </TableContainer>
                :
                    <Typography>
                        No participants yet
                    </Typography>
                
            }
            <Link to = "/" className="button-link" >
                Back to Homepage
            </Link>
        </Grid> 
    )
}

export default Ranking