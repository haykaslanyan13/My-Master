import * as React from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useNavigate } from "react-router-dom"
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth"
import { useDispatch } from "react-redux"
import { setUser } from "../Redux/UserSlice"
import { app } from "../Firebase/FirebaseUser"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import validation from "./validation"
import "../styles/SignUp.css";
import { makeStyles } from '@mui/styles';
import { ClassNames } from "@emotion/react"


const useStyles = makeStyles({
  root:{
    background: ""
  }
})

const theme = createTheme()

export default function SignUp() {
  const [user, setUser] = React.useState("");
  const [errors, setErrors] = React.useState({})
  const [values, setValues] = React.useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    password2: "",
  })

  const classes = useStyles()

  let error = false
  const navigate = useNavigate()
  const auth = getAuth(app)
  const signUp = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch {}
  }

  const handleChange = (event) => {
    setUser(event.target.value)
    setValues({
      ...values,
      [event.target.name]: [event.target.value],
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const [email, password] = [data.get("email"), data.get("password")]
    signUp(email, password)
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/home")
      } else {
        error = true
      }
    })

    setErrors(validation(values))

  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" className={classes.root}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                  value={values.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && <p style={{color: "red"}}>{errors.firstName}</p>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={values.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && <p style={{color: "red"}}>{errors.lastName}</p>}
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
                  value={values.phoneNumber}
                  onChange={handleChange}
                />
                {errors.phoneNumber && <p style={{color: "red"}}>{errors.phoneNumber}</p>}
              </Grid>
              <Grid item xs={12} sx={{ minWidth: "100%" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Select</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={user}
                    label="User"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>Master</MenuItem>
                    <MenuItem value={20}>User</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={handleChange}
                />
                {errors.email && <p style={{color: "red"}}>{errors.email}</p>}
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
                  value={values.password}
                  onChange={handleChange}
                />
                {errors.password && <p style={{color: "red"}}>{errors.password}</p>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password2"
                  label="Confirm Password"
                  type="password2"
                  id="password2"
                  autoComplete="new-password"
                  value={values.password2}
                  onChange={handleChange}
                />
                {errors.password2 && <p style={{color: "red"}}>{errors.password2}</p>}
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
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
  )
}
