import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { Button, TextField, Typography } from '@mui/material';
import Masters from './Masters';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import EmailIcon from '@mui/icons-material/Email';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../Firebase/FirebaseUser";


function MasterProfilePage() {

    const [service, setService] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [serviceList, setServiceList] = useState([]);
    const [userList, setUserList] = useState('')
    const handleChange = (event) => {
        setService(event.target.value);
      };
    const phoneInput = (e) => {
    setPhoneNumber(e.target.value);
    };

    async function getData(db) {
        const servicesCol = collection(db, "services");
        const usersCol = collection(db, "users");
        const userSnapshot = await getDocs(usersCol);
        setUserList(userSnapshot.docs.map((doc) => doc.data()));

        const serviceSnapshot = await getDocs(servicesCol);
        setServiceList(serviceSnapshot.docs.map((doc) => doc.data()));
      }
      useEffect(() => {
        getData(db);
      }, []);

        // const masterList = userList.filter(i => i.type === "master")

    const emailInput = (e) => {
    setEmail(e.target.value);
    };
return (

    <div style={{display: 'flex', paddingTop: "100px"}}>
        <Avatar
        alt="Remy Sharp"    // masteri name
        src="https://thumbs.dreamstime.com/b/happy-smiling-geek-hipster-beard-man-cool-avatar-geek-man-avatar-104871313.jpg"    //mastery img
        sx={{ width: 250, height: 250 }}
        style={{
            margin: 70
        }}
        />
        <Typography variant="h3" component="h2" style={{margin: 70, marginTop: 100}}>
            Karen Sargsyan
            <Box sx={{ marginTop: 5, minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Service</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={service}
                label="Service"
                onChange={handleChange}
                >
                {serviceList.map((i) => <MenuItem key={i.name} value={i.name}>{i.name}</MenuItem>)}
                </Select>
            </FormControl>
            </Box>
            <div style={{display: 'flex', marginTop: 50}} >
            <PhoneIphoneIcon style={{paddingTop: 15}} fontSize="large">
            </PhoneIphoneIcon>
            <TextField
            id="phone-number"
            label="phone"
            variant="standard"
            className="phone-input"
            value={phoneNumber}
            onChange={phoneInput}
            style={{marginLeft: 5, width: 300}}
             />
            </div>
            <div style={{display: 'flex', marginTop: 30}}>
            <EmailIcon style={{paddingTop: 15}} fontSize="large">
            </EmailIcon>
            <TextField
            id="email-adress"
            label="email"
            variant="standard"
            className="email-input"
            value={email}
            onChange={emailInput}
            style={{marginLeft: 5, width: 300}}
             />
            </div>
            <Button style={{width: 350, marginTop: 70}} variant="contained" href="#contained-buttons">
            My Orders
            </Button>
        </Typography>
    </div>

)




}


export default MasterProfilePage