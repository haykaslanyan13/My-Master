import React, { useCallback, useEffect, useState } from "react";
import "../styles/Search.css";
import Grid from "@mui/material/Grid";
import {
  IconButton,
  Paper,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import {
  collection,
  getDocs,
  query,
  where,
  setDoc,
  doc,
  updateDoc,
} from "firebase/firestore/lite";
import { db } from "../Firebase/FirebaseUser";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import DateTimePicker from "@mui/lab/DateTimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { v4 as uuidv4 } from "uuid";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AlertDialogSlidePhone({ item }) {
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
        <PhoneIcon fontSize="large" />
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle>{`Do you want to call to ${item.firstName}?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {item.firstName} {item.lastName}'s phone number is{" "}
            <a href={`tel:${item.phoneNumber}`}>{item.phoneNumber}</a>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>GOT IT</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function AlertDialogSlideEmail({ item }) {
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
        <EmailIcon fontSize="large" />
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle>{`Do you want to send message to ${item.firstName}?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {item.firstName} {item.lastName}'s email adress is{" "}
            <a href={`mailto:${item.email}`}>{item.email}</a>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>GOT IT</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

function Order({ master, serviceName }) {
  const id = uuidv4();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(new Date());
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const [adress, date] = [data.get("adress"), data.get("date")];
    getRef(adress, value);
    handleClose();
  };

  const getRef = async (adress, value) => {
    const usersRef = collection(db, "users");
    const servicesRef = collection(db, "services");
    const qqq = query(servicesRef, where("name", "==", serviceName));
    const qq = query(usersRef, where("email", "==", master.email));
    const q = query(usersRef, where("email", "==", user.email));
    const serviceSnapshot = await getDocs(qqq);
    const masterSnapshot = await getDocs(qq);
    const userSnapshot = await getDocs(q);
    const serviceRef = serviceSnapshot.docs[0].ref;
    const masterRef = masterSnapshot.docs[0].ref;
    const userRef = userSnapshot.docs[0].ref;
    try {
      await setDoc(doc(db, "orders", id), {
        adress,
        date: value,
        client: userRef,
        service: serviceRef,
        master: masterRef,
      });
    } catch {}
  };

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        style={{
          size: 10,
          borderRadius: 10,
          width: 150,
          height: 50,
        }}
        onClick={handleClickOpen}
        variant="contained">
        ORDER
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}>
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}>
          ORDER
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box
            onSubmit={handleSubmit}
            component="form"
            sx={{
              width: 500,
              maxWidth: "100%",
            }}>
            <TextField
              fullWidth
              label="Address"
              id="fullWidth"
              name="adress"
              margin="normal"
              style={{ marginBottom: 20 }}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Order Date & Time"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <DialogActions>
              <Button
                onClick={handleClose}
                style={{
                  cursor: "pointer",
                  align: "left",
                  justifyContent: "start",
                  position: "relative",
                }}
                margin="normal"
                edge="start"
                autoFocus>
                Cancel
              </Button>
              <Button
                variant="contained"
                style={{ cursor: "pointer" }}
                type="submit"
                autoFocus>
                Confirm
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}

function Masters() {
  let { itemTitle } = useParams();
  const storage = getStorage();
  const [url, setUrl] = useState("");
  const [userList, setUserList] = useState([]);
  const [ratings, setRatings] = useState([]);
  getDownloadURL(ref(storage, "Images/Home-Services-Pic1.jpg"))
    .then((url1) => {
      setUrl(url1);
    })
    .catch((error) => {
      // Handle any errors
    });

  const currentUserData = useSelector((state) => state.user.user);
  const getUsers = useCallback(async (db) => {
    const servicesRef = collection(db, "services");
    const q = query(servicesRef, where("name", "==", itemTitle));
    const serviceSnapshot = await getDocs(q);
    const ref = serviceSnapshot.docs[0].ref;
    const usersCol = collection(db, "users");
    const userSnapshot = await getDocs(usersCol);
    const userList = userSnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
    const filteredMasters = userList.filter(
      (user) => JSON.stringify(user.service) === JSON.stringify(ref)
    );
    const filteredMastersRatings = filteredMasters.map((item) => {
      const itemRating = item.rating;
      const idArr = itemRating.reduce(function (previousValue, currentValue) {
        previousValue.push(currentValue.id);
        return previousValue;
      }, []);
      const valueArr = itemRating.reduce(function (
        previousValue,
        currentValue
      ) {
        previousValue.push(currentValue.value);
        return previousValue;
      },
      []);
      return {
        id: idArr,
        value: valueArr,
      };
    });
    setRatings(filteredMastersRatings);
    setUserList(filteredMasters);
  }, []);

  useEffect(() => {
    getUsers(db);
  }, [getUsers]);
  const mastersDiscription =
    "Our masters will help you solve your all problems in the house and in the office. They will do their best to make your life more comfortable.";
  return (
    <div style={{ paddingTop: "100px" }}>
      <div
        className="search-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}></div>
      <h1
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        Masters of {itemTitle}
      </h1>
      <div>
        <img
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            display: "block",
            paddingTop: "20px",
          }}
          width={650}
          src={url}
        />
        <Typography
          style={{
            textAlign: "center",
            marginTop: 40,
            fontSize: 22,
            fontStyle: "italic",
          }}>
          {mastersDiscription}
        </Typography>
      </div>

      <Grid container>
        {userList.map((item, i) => {
          const average = (valueArr) =>
            valueArr.reduce((a, b) => a + b, 0) / valueArr.length;
          return (
            <Grid item xs={12} md={6} key={item.email}>
              <Paper
                sx={{
                  p: 2,
                  margin: "70px",
                  maxWidth: 500,
                  flexGrow: 1,
                  backgroundColor: "#b2bcc0",
                  height: 250,
                  display: "flex",
                  alignItems: "center",
                }}>
                <Grid container spacing={2}>
                  <Grid item style={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      alt="Remy Sharp"
                      sx={{ width: 64, height: 64 }}
                      src={item.img}
                    />
                  </Grid>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography
                          style={{
                            color: "white",
                            fontSize: 32,
                            fontWeight: "bolder",
                          }}
                          gutterBottom
                          variant="subtitle1"
                          component="div">
                          {item.firstName} {item.lastName}
                        </Typography>
                        <Box
                          sx={{
                            "& > legend": { mt: 2 },
                          }}>
                          <Typography component="legend"></Typography>
                          <Rating
                            name="simple-controlled"
                            value={average(ratings[i]?.value)}
                            size="large"
                            onChange={(event, newValue) => {
                              if (
                                !ratings[i].id.includes(currentUserData.id) &&
                                currentUserData.userType === "client"
                              ) {
                                const mockRatings = [...ratings];
                                mockRatings[i].id.push(currentUserData.id);
                                mockRatings[i].value.push(newValue);
                                setRatings(mockRatings);
                                updateDoc(doc(db, "users", item.id), {
                                  rating: [
                                    ...item.rating,
                                    { id: currentUserData.id, value: newValue },
                                  ],
                                });
                              }
                            }}
                          />
                        </Box>
                        <Typography
                          style={{
                            marginTop: 10,
                            fontSize: 16,
                            fontWeight: "bolder",
                          }}
                          variant="body2"
                          gutterBottom>
                          {itemTitle}
                        </Typography>
                        <Box
                          component="div"
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}>
                          <Box
                            component="div"
                            sx={{ width: "40%", display: "flex" }}>
                            <AlertDialogSlidePhone item={item} />
                            <AlertDialogSlideEmail item={item} />
                          </Box>
                          <Order master={item} serviceName={itemTitle} />
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default Masters;
