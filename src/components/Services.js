import {
  ButtonBase,
  Paper,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";

import "../styles/Search.css";

import { useDispatch, useSelector } from "react-redux";
import { uptadeServiceList } from "../Redux/UserSlice";

import { Link } from "react-router-dom";

import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../Firebase/FirebaseUser";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

function Services() {
  const [filter, setFilter] = useState("");
  const serviceList = useSelector((state) => state.user.serviceList);
  const dispatch = useDispatch();

  async function getServices(db) {
    const servicesCol = collection(db, "services");
    const serviceSnapshot = await getDocs(servicesCol);
    const serviceList = serviceSnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
    dispatch(uptadeServiceList(serviceList));
  }
  useEffect(() => {
    getServices(db);
  }, []);
  const searchText = (e) => {
    setFilter(e.target.value);
  };
  let dataSearch = serviceList.filter((item) =>
    item.name?.toLowerCase().includes(filter)
  );
  return (
    <div style={{ paddingTop: "120px" }}>
      <div
        className="search-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <h1>Search Services:</h1>
        <TextField
          id="standard-basic"
          label="Search"
          variant="standard"
          className="search-input"
          style={{ marginLeft: 5, paddingBottom: 10 }}
          value={filter}
          onChange={searchText}
        />
      </div>
      <Grid container>
        {dataSearch.map((item) => {
          return (
            <Grid item xs={12} md={6} key={item.name}>
              <Paper
                sx={{
                  p: 2,
                  margin: "70px",
                  maxWidth: 500,
                  flexGrow: 1,
                  backgroundColor: "#b2bcc0",
                  borderRadius: "30px",
                }}>
                <Grid container spacing={2}>
                  <Grid item style={{ display: "flex", alignItems: "center" }}>
                    <ButtonBase sx={{ width: 128, height: 128 }}>
                      <Img alt="complex" src={item.image} />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Link
                          style={{
                            color: "white",
                            fontSize: 32,
                            fontWeight: "bolder",
                            cursor: "pointer",
                            textDecoration: "none",
                          }}
                          to={`/masters/${item.name}`}>
                          {item.name}
                        </Link>
                        <Typography
                          style={{
                            fontSize: 16,
                            fontWeight: "bolder",
                            marginTop: 25,
                          }}
                          variant="h4"
                          component="h2">
                          {item.description}
                        </Typography>
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

export default Services;
