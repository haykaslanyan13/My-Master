import React from "react";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import "../styles/Footer.css";
import { Box, Container, Divider, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <Box>
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Typography style={{ color: "#3b3d3d" }}>Help</Typography>
              <Box pt={3}>
                <Link
                  to="contactus"
                  style={{ color: "white", textDecoration: "none" }}>
                  Contact us
                </Link>
              </Box>
              <Box pt={3}>
                <Link
                  to="/support"
                  style={{ color: "white", textDecoration: "none" }}>
                  Support
                </Link>
              </Box>
              <Box pt={3}>
                <Link
                  to="/privacy"
                  style={{ color: "white", textDecoration: "none" }}>
                  Privacy
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography style={{ color: "#3b3d3d" }}>Company</Typography>
              <Box pt={3}>
                <Link
                  to="/aboutUs"
                  style={{ color: "white", textDecoration: "none" }}>
                  About us
                </Link>
              </Box>
              <Box pt={3}>
                <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                  Blog
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box>
                <Typography>
                  Follow us! <InstagramIcon /> <TwitterIcon />{" "}
                </Typography>
              </Box>
              <Box>
                <img
                  alt="footerPic"
                  style={{ width: 100, height: 100, margin: "auto" }}
                  src="https://firebasestorage.googleapis.com/v0/b/test-53482.appspot.com/o/LOGO.png?alt=media&token=925457a7-1b0c-458e-8466-abe931a43802"
                />
              </Box>
            </Grid>
          </Grid>
          <Divider variant="fullWidth" />
          <Typography align="center">
            &copy; 2021 mymaster.com All Rights Reserved.
          </Typography>
        </Container>
      </Box>
    </footer>
  );
}

export default Footer;
