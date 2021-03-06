import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import { app, db } from "../Firebase/FirebaseUser";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import validation from "./validation";
import "../styles/SignUp.css";
import { makeStyles } from "@mui/styles";
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore/lite";
import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles({
  root: {
    background: "",
  },
});

const theme = createTheme();

export default function SignUp() {
  const [errors, setErrors] = useState({});
  const classes = useStyles();
  const [serviceList, setServiceList] = useState([]);
  const [currentUserType, setCurrentUserType] = useState("");
  async function getData(db) {
    const servicesCol = collection(db, "services");
    const serviceSnapshot = await getDocs(servicesCol);
    setServiceList(serviceSnapshot.docs.map((doc) => doc.data()));
  }
  useEffect(() => {
    getData(db);
  }, []);

  const navigate = useNavigate();
  const auth = getAuth(app);
  const id = uuidv4();
  const signUp = async (
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
    userType,
    service
  ) => {
    try {
      await setDoc(doc(db, "users", id), {
        firstName,
        lastName,
        email,
        phoneNumber,
        userType,
        service: service ? service : null,
        rating: [],
        img: "",
      });
      await createUserWithEmailAndPassword(auth, email, password);
    } catch {
      await deleteDoc(doc(db, "users", id));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const [
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      userType,
      password2,
      service,
    ] = [
      data.get("email"),
      data.get("password"),
      data.get("firstName"),
      data.get("lastName"),
      data.get("phoneNumber"),
      data.get("userType"),
      data.get("password2"),
      data.get("service"),
    ];
    let servicee;
    if (service) {
      const servicesRef = collection(db, "services");
      const q = query(servicesRef, where("name", "==", service));
      const serviceSnapshot = await getDocs(q);
      servicee = serviceSnapshot?.docs[0]?.ref;
      console.log(servicee);
    }
    signUp(
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      userType,
      servicee
    );

    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/home");
      } else {
      }
    });

    setErrors(
      validation({
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
        userType,
        password2,
      })
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        className={classes.root}
        style={{ paddingTop: "100px" }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Grid item xs={12} sx={{ minWidth: "100%" }}></Grid>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
                {errors.firstName && (
                  <p style={{ color: "red" }}>{errors.firstName}</p>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
                {errors.lastName && (
                  <p style={{ color: "red" }}>{errors.lastName}</p>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phoneNumber"
                  label="Phone Number"
                  id="phoneNumber"
                  autoComplete="new-phoneNumber"
                  type="number"
                />
                {errors.phoneNumber && (
                  <p style={{ color: "red" }}>{errors.phoneNumber}</p>
                )}
              </Grid>
              <Grid item xs={12} sx={{ minWidth: "100%" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    User Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="userType"
                    label="User Type"
                    onChange={(event) =>
                      setCurrentUserType(event.target.value)
                    }>
                    <MenuItem value={"master"}>Master</MenuItem>
                    <MenuItem value={"client"}>Client</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {currentUserType === "master" ? (
                <Grid item xs={12} sx={{ minWidth: "100%" }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Service
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="service"
                      label="Service">
                      {serviceList.map((i) => (
                        <MenuItem key={i.name} value={i.name}>
                          {i.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              ) : null}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
                {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
                {errors.password && (
                  <p style={{ color: "red" }}>{errors.password}</p>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password2"
                  label="Confirm Password"
                  type="password"
                  id="password2"
                  autoComplete="new-password"
                />
                {errors.password2 && (
                  <p style={{ color: "red" }}>{errors.password2}</p>
                )}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
