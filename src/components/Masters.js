import React, { useContext, useState } from "react";
import allMastersData from "../data/AllMastersData";
import "../styles/Search.css";
import Grid from "@mui/material/Grid";
import {
  ButtonBase,
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
import { setMasterFilter, setMasterRating } from "../Redux/UserSlice";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";

function Masters() {
  let { itemTitle } = useParams();
  const [value, setValue] = useState(3);
  const itemRating = useSelector((state) => state.user.masterRating);
  const average = (itemRating) =>
    itemRating.reduce((a, b) => a + b, 0) / itemRating.length;
  let filteredMasters = allMastersData.cardData.filter(
    (item) => item.profession.toLowerCase() === itemTitle.toLowerCase()
  );
  const dispatch = useDispatch();
  //ratingy set anel
  console.log("aaa");

  return (
    <div>
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
      <Grid container>
        {filteredMasters.map((item) => {
          return (
            <Grid item xs={12} md={6} key={item.id}>
              <Paper
                sx={{
                  p: 2,
                  margin: "70px",
                  maxWidth: 500,
                  flexGrow: 1,
                  backgroundColor: "#b2bcc0",
                }}>
                <Grid container spacing={2}>
                  <Grid item>
                    <Avatar
                      alt="Remy Sharp"
                      sx={{
                        width: 64,
                        height: 64,
                      }}
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
                          {item.name}
                        </Typography>
                        <Box
                          sx={{
                            "& > legend": {
                              mt: 2,
                            },
                          }}>
                          <Typography component="legend"></Typography>
                          <Rating
                            name="simple-controlled"
                            value={average(itemRating)}
                            size="large"
                            onChange={(event, newValue) => {
                              setValue(newValue);
                              dispatch(
                                setMasterRating((itemRating) => [
                                  ...itemRating,
                                  newValue,
                                ])
                              );
                            }}
                          />
                        </Box>
                        <Typography
                          style={{
                            fontSize: 16,
                            fontWeight: "bolder",
                          }}
                          variant="body2"
                          gutterBottom>
                          {item.profession}
                        </Typography>
                        <IconButton>
                          <PhoneIcon fontSize="large" />
                        </IconButton>
                        <IconButton>
                          <EmailIcon fontSize="large" />
                        </IconButton>
                        <Button variant="contained">ORDER</Button>
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

  const mastersData = allMastersData.cardData;
}

export default Masters;
