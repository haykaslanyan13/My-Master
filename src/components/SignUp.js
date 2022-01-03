import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
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
<<<<<<< HEAD
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/UserSlice";
import { app } from "../Firebase/FirebaseUser";
=======
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../Redux/UserSlice";
import { app, db } from "../Firebase/FirebaseUser";
>>>>>>> faeff5b7ae9504a0705ab182a3ab120353c92d9a
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import validation from "./validation";
import "../styles/SignUp.css";
import { makeStyles } from "@mui/styles";
import { ClassNames } from "@emotion/react";
<<<<<<< HEAD
=======
import { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  getDocs,
  updateDoc,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore/lite";
import { v4 as uuidv4 } from "uuid";
>>>>>>> faeff5b7ae9504a0705ab182a3ab120353c92d9a

const useStyles = makeStyles({
  root: {
    background: "",
  },
});

const theme = createTheme();

export default function SignUp() {
<<<<<<< HEAD
  const [user, setUser] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const [values, setValues] = React.useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    password2: "",
  });

  const classes = useStyles();

  let error = false;
  const navigate = useNavigate();
  const auth = getAuth(app);
  const signUp = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch {}
  };

  const handleChange = (event) => {
    setUser(event.target.value);
    setValues({
      ...values,
      [event.target.name]: [event.target.value],
    });
=======
  // const [userData, setUser] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.user);
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

  let error = false;
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
        service,
        rating: [],
        img: "",
      });
      await createUserWithEmailAndPassword(auth, email, password);
    } catch {
      await deleteDoc(doc(db, "users", id));
    }
>>>>>>> faeff5b7ae9504a0705ab182a3ab120353c92d9a
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
<<<<<<< HEAD
    const [email, password] = [data.get("email"), data.get("password")];
    signUp(email, password);
=======
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

    // dispatch(setUser({
    //   email, password, firstName, lastName, phoneNumber, userType
    // }))
    signUp(
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      userType,
      service
    );

>>>>>>> faeff5b7ae9504a0705ab182a3ab120353c92d9a
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/home");
      } else {
        error = true;
      }
    });

<<<<<<< HEAD
    setErrors(validation(values));
    console.log(user);
=======
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
>>>>>>> faeff5b7ae9504a0705ab182a3ab120353c92d9a
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
<<<<<<< HEAD
=======
          <Grid item xs={12} sx={{ minWidth: "100%" }}></Grid>
>>>>>>> faeff5b7ae9504a0705ab182a3ab120353c92d9a
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
                  type="phoneNumber"
                  id="phoneNumber"
                  autoComplete="new-phoneNumber"
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
<<<<<<< HEAD
                    value={user}
                    label="User"
                    onChange={handleChange}>
                    <MenuItem value={10}>Master</MenuItem>
                    <MenuItem value={20}>User</MenuItem>
=======
                    name="userType"
                    label="User Type"
                    onChange={(event) =>
                      setCurrentUserType(event.target.value)
                    }>
                    <MenuItem value={"master"}>Master</MenuItem>
                    <MenuItem value={"client"}>Client</MenuItem>
>>>>>>> faeff5b7ae9504a0705ab182a3ab120353c92d9a
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
                      // value={service}
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
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
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
                <Link href="http://localhost:3000/login" variant="body2">
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
