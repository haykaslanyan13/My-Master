import React from "react";
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from "@mui/material";
// import SignUp from "./SignUp";
import allMastersData from '../data/AllMastersData'
import "../styles/Search.css"
import Grid from "@mui/material/Grid"
import { ButtonBase, IconButton, Paper, styled, TextField, Typography } from "@mui/material"
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux'
import { setMasterFilter, setMasterRating } from '../Redux/UserSlice'
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom'


function UserAccount() {
    return (
        <div>
            <h1>Account</h1>
            <h2>Personal information:</h2>
            <img style={{ float: "left", marginBottom: 10, marginRight: 10 }} src="https://ssl.gstatic.com/images/branding/product/1x/avatar_square_blue_512dp.png" width={200} />
            <h2> Natalie
                <p>Kalantaryan</p></h2>
            <h3>Email: nataliekalantaryan7@gmail.com
                <p><Link to="" style={{ color: "black" }}>Change Password</Link></p>
            </h3>
            <div style={{clear:"both"}}></div> 
            <div> <h3><p> Masters you ordered:</p>
                <p>Ashot Manukyan</p>
                <p>Date:23/12/2021</p>     </h3> </div>
          

        </div>
    )
}

export default UserAccount