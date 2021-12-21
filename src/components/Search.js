import { ButtonBase, Paper, styled, TextField, Typography } from "@mui/material"
import React, { useState } from "react"
import Grid from "@mui/material/Grid"
import allServicesData from "../data/AllServicesData"
import "../styles/Search.css"
// import { announcement } from "./images/announcement.png";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
})

function Search() {
  const [filter, setFilter] = useState("")

  const searchText = (e) => {
    setFilter(e.target.value)
  }
  let dataSearch = allServicesData.cardData.filter((item) =>
    item.title.toLowerCase().includes(filter)
  )

  return (
    <div>
      <div
        className="search-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>Search Services:</h1>
        <TextField
          id="standard-basic"
          label="Search"
          variant="standard"
          className="search-input"
          value={filter}
          onChange={searchText}
        />
        {/* <input
          type="text"
          className="search-input"
          value={filter}
          onChange={searchText}
        /> */}
      </div>
      <Grid container>
        {dataSearch.map((item) => {
          return (
            <Grid item xs={12} md={6} key={item.id}>
              <Paper
                sx={{
                  p: 2,
                  margin: "70px",
                  maxWidth: 500,
                  flexGrow: 1,
                  backgroundColor: "#b2bcc0",
                  borderRadius: "30px",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item>
                    <ButtonBase sx={{ width: 128, height: 128 }}>
                      <Img alt="complex" src={item.img} />
                    </ButtonBase>
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
                          component="div"
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          style={{ fontSize: 16, fontWeight: "bolder" }}
                          variant="body2"
                          gutterBottom
                        >
                          {item.desc}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}

export default Search
