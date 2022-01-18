import React, { useEffect } from "react";
import { Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Img = styled("img")({
  margin: "auto",
  display: "block",
  width: "50px",
  height: "50px",
});

function HeroSection() {
  const navigate = useNavigate();

  return (
    <div className="hero-container">
      <h1>Let the Master take the spot!</h1>
      <h3
        style={{
          position: "absolute",
          top: "30%",
          left: "30%",
          transform: "translate(-30%, -30%)",
          color: "#007f8b",
        }}
      >
        You don't have to do the housework you used to do!
        <div
          style={{
            marginTop: "1em",
            marginBottom: "1em",
            marginLeft: 0,
            marginRight: 0,
          }}
        >
          Our services will help you with any work you don't feel like
          <div
            style={{
              marginTop: "1em",
              marginBottom: "1em",
              marginLeft: 0,
              marginRight: 0,
            }}
          >
            doing at the moment.
          </div>
        </div>
      </h3>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 100,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid
          container
          justifyContent="space-evenly"
          alignItems="center"
          sx={{ maxWidth: 992 }}
        >
          <Paper
            onClick={() => navigate("/masters/Home Cleaning")}
            sx={{
              p: 2,
              maxWidth: 80,
              maxHeight: 60,
              flexGrow: 1,
              borderRadius: "10px",
              display: "flex",
              backgroundColor: "lightgray",
              border: "1px solid #007f8b",
              cursor: "pointer",
            }}
          >
            <Img src="https://firebasestorage.googleapis.com/v0/b/test-53482.appspot.com/o/services-images%2F588a6758d06f6719692a2d22.png?alt=media&token=5620484f-9d8d-44e0-988a-cf575f4b4968" />
          </Paper>
          <Paper
            onClick={() => navigate("/masters/Moving")}
            sx={{
              p: 2,
              maxWidth: 80,
              maxHeight: 60,
              flexGrow: 1,
              borderRadius: "10px",
              display: "flex",
              backgroundColor: "lightgray",
              border: "1px solid #007f8b",
              cursor: "pointer",
            }}
          >
            <Img src="https://firebasestorage.googleapis.com/v0/b/test-53482.appspot.com/o/services-images%2Fpngegg%20(9).png?alt=media&token=cedd4e0e-2c8d-4225-aa49-b79316de9cc9" />
          </Paper>
          <Paper
            onClick={() => navigate("/masters/Pet Care")}
            sx={{
              p: 2,
              maxWidth: 80,
              maxHeight: 60,
              flexGrow: 1,
              borderRadius: "10px",
              display: "flex",
              backgroundColor: "lightgray",
              border: "1px solid #007f8b",
              cursor: "pointer",
            }}
          >
            <Img src="https://firebasestorage.googleapis.com/v0/b/test-53482.appspot.com/o/services-images%2Fpngegg%20(8).png?alt=media&token=92859739-c3d5-467d-a83f-b6128bbce261" />
          </Paper>
          <Paper
            onClick={() => navigate("/masters/Interior painting")}
            sx={{
              p: 2,
              maxWidth: 80,
              maxHeight: 60,
              flexGrow: 1,
              borderRadius: "10px",
              display: "flex",
              backgroundColor: "lightgray",
              border: "1px solid #007f8b",
              cursor: "pointer",
            }}
          >
            <Img src="https://firebasestorage.googleapis.com/v0/b/test-53482.appspot.com/o/services-images%2Fpngegg%20(12).png?alt=media&token=748567a0-88c6-441b-9717-6958893e3d1a" />
          </Paper>

          <Paper
            onClick={() => navigate("/masters/Garbage Collection")}
            sx={{
              p: 2,
              maxWidth: 80,
              maxHeight: 60,
              flexGrow: 1,
              borderRadius: "10px",
              display: "flex",
              backgroundColor: "lightgray",
              border: "1px solid #007f8b",
              cursor: "pointer",
            }}
          >
            <Img src="https://firebasestorage.googleapis.com/v0/b/test-53482.appspot.com/o/services-images%2Fpngegg.png?alt=media&token=8985dbf0-b60a-42a7-95b0-494fe89bcc08" />
          </Paper>
        </Grid>
      </div>
    </div>
  );
}

export default HeroSection;

