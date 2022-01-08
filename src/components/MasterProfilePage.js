import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { Button, TextField, Typography } from "@mui/material";
import Masters from "./Masters";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import EmailIcon from "@mui/icons-material/Email";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  getDoc,
  query,
  where,
} from "firebase/firestore/lite";
import { db } from "../Firebase/FirebaseUser";
import { getAuth } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@material-ui/core";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { setUser } from "../Redux/UserSlice";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import PersonIcon from "@mui/icons-material/Person";
import MyMasterOrders from "./MyMasterOrders";

function MasterProfilePage() {
  const dispatch = useDispatch();
  const auth = getAuth();
  const currentUserData = useSelector((state) => state.user.user);
  console.log(currentUserData);
  let data;

  console.log(data);
  const [service, setService] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(currentUserData?.phoneNumber);
  const [email, setEmail] = useState(currentUserData?.email);
  const [img, setImg] = useState(currentUserData?.img);
  const [imgData, setImgData] = useState("");
  const [serviceList, setServiceList] = useState([]);
  const [userList, setUserList] = useState([]);
  const storage = getStorage();
  const [url, setUrl] = useState("");
  const metadata = {
    contentType: "image/jpeg",
  };
  console.log(currentUserData);
  if (currentUserData) {
    getDoc(currentUserData?.service).then((d) => {
      setService(d.data().name);
    });
  }

  async function getData(db) {
    const servicesCol = collection(db, "services");
    const serviceSnapshot = await getDocs(servicesCol);
    setServiceList(serviceSnapshot.docs.map((doc) => doc.data()));
  }
  useEffect(() => {
    getData(db);
  }, []);

  const handleChange = async (event) => {
    const servicesRef = collection(db, "services");
    const q = query(servicesRef, where("name", "==", event.target.value));
    const serviceSnapshot = await getDocs(q);
    const serviceRef = serviceSnapshot.docs[0].ref;
    await updateDoc(doc(db, "users", currentUserData.id), {
      service: serviceRef,
    });
    dispatch(setUser({ ...currentUserData, service: serviceRef }));
  };

  const phoneInput = async (e) => {
    setPhoneNumber(e.target.value);
    await updateDoc(doc(db, "users", currentUserData.id), {
      phoneNumber: e.target.value,
    });
  };

  const emailInput = async (e) => {
    setEmail(e.target.value);
    await updateDoc(doc(db, "users", currentUserData.id), {
      email: e.target.value,
    });
  };

  const uploadImage = async () => {
    const storageRef = ref(storage, `userImages/${imgData.name}`);
    try {
      const uploadTask = await uploadBytes(storageRef, imgData, metadata);
    } catch {}
    getDownloadURL(ref(storage, `userImages/${imgData.name}`))
      .then((url) => {
        setUrl(url);
        setImg(url);
        dispatch(setUser({ ...currentUserData, img: url }));
      })
      .catch((error) => {
        // Handle any errors
      });

    await updateDoc(doc(db, "users", currentUserData.id), {
      img: url,
    });
  };

  const Input = styled("input")({
    display: "none",
  });

  return (
    <div style={{ display: "flex", paddingTop: "100px" }}>
      <div style={{ display: "flex" }}>
        <div style={{ display: "block" }}>
          {img ? (
            <Avatar
              alt="Remy Sharp"
              src={currentUserData.img}
              sx={{ width: 250, height: 250 }}
              style={{
                margin: 70,
                marginBottom: 30,
              }}
            />
          ) : (
            <Avatar
              alt="icon avatar"
              sx={{ width: 250, height: 250 }}
              style={{
                margin: 70,
                marginBottom: 30,
              }}>
              <PersonIcon style={{ height: "100px", width: "100px" }} />
            </Avatar>
          )}

          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            style={{ marginLeft: "140px" }}>
            <label htmlFor="contained-button-file">
              <Button
                variant="contained"
                component="span"
                onClick={uploadImage}>
                Upload
              </Button>
            </label>
            <label htmlFor="icon-button-file">
              <Input
                accept="image/*"
                id="icon-button-file"
                type="file"
                onChange={async (e) => {
                  setImgData(e.target.files[0]);
                }}
              />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span">
                <PhotoCamera />
              </IconButton>
            </label>
          </Stack>
        </div>
        <Typography
          variant="h3"
          component="h2"
          style={{ margin: 70, marginTop: 100 }}>
          {currentUserData?.firstName} {currentUserData?.lastName}
          <Box sx={{ marginTop: 5, minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Service</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={service}
                label="Service"
                onChange={handleChange}>
                {serviceList.map((i) => (
                  <MenuItem key={i.name} value={i.name}>
                    {i.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <div style={{ display: "flex", marginTop: 50 }}>
            <PhoneIphoneIcon
              style={{ paddingTop: 15 }}
              fontSize="large"></PhoneIphoneIcon>
            <TextField
              id="phone-number"
              label="phone"
              variant="standard"
              className="phone-input"
              value={phoneNumber}
              onChange={phoneInput}
              style={{ marginLeft: 5, width: 300 }}
            />
          </div>
          <div style={{ display: "flex", marginTop: 30 }}>
            <EmailIcon style={{ paddingTop: 15 }} fontSize="large"></EmailIcon>
            <TextField
              id="email-adress"
              label="email"
              variant="standard"
              className="email-input"
              value={email}
              // onChange={emailInput}
              style={{ marginLeft: 5, width: 300 }}
            />
          </div>
          <Button
            style={{ width: 350, marginTop: 70 }}
            variant="contained"
            href="#contained-buttons">
            My Orders
          </Button>
        </Typography>
      </div>
      <MyMasterOrders />
    </div>
  );
}

export default MasterProfilePage;
