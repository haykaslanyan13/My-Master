import React, { useContext, useEffect, useState } from 'react'
import allMastersData from '../data/AllMastersData'
import "../styles/Search.css"
import Grid from "@mui/material/Grid"
import { ButtonBase, Container, IconButton, Paper, styled, TextField, Typography } from "@mui/material"
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux'
import { setMasterFilter, setMasterRating } from '../Redux/UserSlice'
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom'
import { getStorage, ref, getDownloadURL} from "firebase/storage";
import { app } from '../Firebase/FirebaseUser'
import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../Firebase/FirebaseUser";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons'
import { dividerClasses } from '@mui/material'
import { display } from '@mui/system';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AlertDialogSlidePhone({item}) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton variant="outlined" onClick={handleClickOpen}>
        <PhoneIcon fontSize="large"/>
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`Do you want to call ${item.firstName}?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {item.firstName} {item.lastname}'s phone number is <a href={`tel:${item.phoneNumber}`}>{item.phoneNumber}</a>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>GOT IT</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function AlertDialogSlideEmail({item}) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton variant="outlined" onClick={handleClickOpen}>
        <EmailIcon fontSize="large"/>
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`Do you want to send message to ${item.firstName}?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {item.firstName} {item.lastname}'s email adress is <a href={`mailto:${item.email}`}>{item.email}</a>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>GOT IT</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function Masters() {

    let {itemTitle} = useParams()
    const storage = getStorage();
    const [url, setUrl] = useState('')
    const [userList, setUserList] = useState([]);
    getDownloadURL(ref(storage, 'Images/Home-Services-Pic1.jpg'))
      .then((url1) => {
        setUrl(url1)
      })
      .catch((error) => {
        // Handle any errors
      });
    const [value, setValue] = useState(3);
    const dispatch = useDispatch()

    async function getUsers(db) {
      const usersCol = collection(db, "users");
      const userSnapshot = await getDocs(usersCol);
      setUserList(userSnapshot.docs.map((doc) => doc.data()));
    }
   
    useEffect(() => {
      getUsers(db);
    }, []);
    //ratingy set anel
    const masterList = userList.filter(i => i.type === "master")
  
    let filteredMasters = masterList.filter((item) => item.service === itemTitle)

    const mastersDiscription = "Our masters will help you solve your all problems in the house and in the office. They will do their best to make your life more comfortable."

    
    return (
      <div style={{paddingTop: "100px"}}>
        <div className="search-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        >
        
        </div>
        <h1 style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>Masters of {itemTitle}</h1>
        <div>
        <img
        style={{ 
          marginLeft: "auto",
          marginRight: "auto",
          display: "block",
          paddingTop: "20px"
        }}
        width={650}
        src={url}
      />
      <Typography style={{
          textAlign: "center",
          marginTop: 40,
          fontSize: 22,
          fontStyle: "italic"
        }}>
          {mastersDiscription}
        </Typography>
        </div>
        
        <Grid container>
        {filteredMasters.map((item) => {   
          const itemRating = item.rating
          const average = itemRating => itemRating.reduce((a,b) => a + b, 0) / itemRating.length
          return (
            <Grid item xs={12} md={6} key={item.id}>
              <Paper
                sx={{
                  p: 2,
                  margin: "70px",
                  maxWidth: 500,
                  flexGrow: 1,
                  backgroundColor: "#b2bcc0",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item style={{display: "flex", alignItems: "center"}}>
                    <Avatar alt="Remy Sharp" sx={{ width: 64, height: 64 }} src={item.img} />
                  </Grid>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography style={{ color: "white", fontSize: 32, fontWeight: "bolder"}} gutterBottom variant="subtitle1" component="div">
                          {item.firstName} {" "} {item.lastname}
                        </Typography>
                        <Box
                          sx={{
                            '& > legend': { mt: 2 },
                          }}
                        >
                          <Typography component="legend"></Typography>
                          <Rating
                            name="simple-controlled"
                            value={average(itemRating)}
                            size="large"
                            onChange={(event, newValue) => {
                              setValue(newValue);
                              itemRating.push(newValue)
                              console.log(itemRating)
                              console.log(average(itemRating))
                            }}
                          />
                        </Box>
                        <Typography style={{ marginTop: 10, fontSize: 16, fontWeight: "bolder"}} variant="body2" gutterBottom>
                          {item.service}
                        </Typography>
                       <Box component="div" sx={{ display: 'flex', justifyContent: "space-between" }}>
                          <Box component="div" sx={{width: "40%", display: 'flex'}}>
                            <AlertDialogSlidePhone item={item}/>
                            <AlertDialogSlideEmail item={item}/>
                          </Box>
                          <Button style={{size: 10 , borderRadius: 10, width: 150, height: 50}} variant="contained">ORDER</Button>
                       </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          )
        })}
      </Grid>
      </div>
    )

}

export default Masters