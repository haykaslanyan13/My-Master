import {
  Alert,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import "../styles/ContactUs.css";
import emailjs from "@emailjs/browser";
import { createTheme } from "@mui/material/styles";
import "../styles/ContactUs.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#bc1efc",
    },
  },
});

function ContactUs() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [error, setError] = useState(false);

  const { name, email, phone, message } = values;

  const [result, showResult] = useState(false);

  const form = useRef();

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: [event.target.value],
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !message) {
      setError(true);
    } else {
      emailjs
        .sendForm(
          "service_2pci6n3",
          "template_j47y7lu",
          form.current,
          "user_QRlNtWuYCz656LyxA2zwf"
        )
        .then(
          (result) => {
            // console.log(result.text);
          },
          (error) => {
            // console.log(error.text);
          }
        );
      e.target.reset();
      toast.success("Form Submitted Successfully");
      // showResult(true);
    }
  };
  return (
    <div className="Container" style={{ marginTop: 100 }}>
      <ToastContainer position="top-center" />
      <Typography
        gutterBottom
        variant="h5"
        align="center"
        style={{ color: "#3b3d3d" }}>
        Whether you have a question, our team is ready to answer all your
        questions
      </Typography>
      <Card
        style={{
          maxWidth: 450,
          margin: "0 auto",
          padding: "30px 5px",
          background: "rgba(255,255,255,0.8)",
        }}>
        <CardContent>
          <Typography gutterBottom variant="h5" color={"#007f8b"}>
            Contact Us
          </Typography>
          <form
            className="contact-form"
            ref={form}
            onSubmit={sendEmail}
            sx={{ width: "75%" }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <Grid container spacing={1}>
              <Grid item xs={12} spacing={6}>
                {error && (
                  <Alert severity="error">
                    Please provide value in each input field
                  </Alert>
                )}
                <TextField
                  id="name"
                  name="name"
                  label="Your Name"
                  variant="standard"
                  fullWidth
                  style={{ color: "#007f8b" }}
                  value={name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} spacing={6}>
                <TextField
                  id="phone"
                  name="phone"
                  label="Phone Number"
                  variant="standard"
                  type="number"
                  fullWidth
                  value={phone}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} spacing={6}>
                <TextField
                  id="email"
                  name="email"
                  label="Your Email"
                  variant="standard"
                  fullWidth
                  value={email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} spacing={6}>
                <TextField
                  id="message"
                  name="message"
                  label="Your Message"
                  multiline
                  rows={4}
                  fullWidth
                  value={message}
                  style={{ marginTop: 30 }}
                  onChange={handleChange}
                />
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{ backgroundColor: "#007f8b" }}>
                Send Message
              </Button>
              {/* <div>{result ? <Result /> : null}</div> */}
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default ContactUs;
