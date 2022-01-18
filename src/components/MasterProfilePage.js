import React, { useCallback, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { Button, TextField, Typography } from "@mui/material";
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
import { useDispatch, useSelector } from "react-redux";
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
  const storage = getStorage();
  const currentUserData = useSelector((state) => state.user.user);
  const [service, setService] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(currentUserData?.phoneNumber);
  const [img, setImg] = useState(currentUserData?.img);
  const [imgData, setImgData] = useState("");
  const [serviceList, setServiceList] = useState([]);

  const metadata = {
    contentType: "image/jpeg",
  };

  const Input = styled("input")({
    display: "none",
  });

  const getData = useCallback(async (db) => {
    const servicesCol = collection(db, "services");
    const serviceSnapshot = await getDocs(servicesCol);
    const serviceList = serviceSnapshot.docs.map((doc) => doc.data());
    setServiceList(serviceList);
  }, []);

  const getService = useCallback(async () => {
    const service = await getDoc(currentUserData.service);
    setService(service.data().name);
  }, [currentUserData]);

  useEffect(() => {
    if (currentUserData) {
      getService();
    }
  }, [currentUserData, getService]);

  useEffect(() => {
    getData(db);
  }, [getData]);

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

  const uploadImage = async (e) => {
    const imgData = e.target.files[0];
    if (imgData) {
      const storageRef = ref(storage, `userImages/${imgData.name}`);
      try {
        await uploadBytes(storageRef, imgData, metadata);
        const url = await getDownloadURL(
          ref(storage, `userImages/${imgData.name}`)
        );
        await updateDoc(doc(db, "users", currentUserData.id), {
          img: url,
        });
        dispatch(setUser({ ...currentUserData, img: url }));
        setImg(url);
      } catch {}
    }
  };

  return (
    <div style={{ display: "flex", paddingTop: "100px" }}>
      <div style={{ display: "block" }}>
        {img ? (
          <Avatar
            alt="Remy Sharp"
            src={img}
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
          <label htmlFor="contained-button-file"></label>
          <label htmlFor="icon-button-file">
            <Input
              accept="image/*"
              id="icon-button-file"
              type="file"
              onChange={async (e) => {
                uploadImage(e);
              }}
            />
            <Button variant="contained" component="span">
              Upload
            </Button>
          </label>
        </Stack>
      </div>
      <Typography
        variant="h3"
        component="h2"
        style={{ margin: 70, marginTop: 100, color: "black" }}>
        {currentUserData?.firstName} {currentUserData?.lastName}
        <Box sx={{ marginTop: 5, minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Service</InputLabel>
            <Select
              style={{ width: 345 }}
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
            type="number"
            value={phoneNumber}
            onChange={phoneInput}
            style={{
              marginLeft: 5,
              width: 300,
            }}
          />
        </div>
        <div style={{ display: "flex", marginTop: 30 }}>
          <EmailIcon style={{ paddingTop: 15 }} fontSize="large"></EmailIcon>
          <TextField
            id="email-adress"
            label="email"
            variant="standard"
            className="email-input"
            value={currentUserData?.email}
            style={{ marginLeft: 5, width: 300 }}
          />
        </div>
        <MyMasterOrders />
      </Typography>
    </div>
  );
}

export default MasterProfilePage;
