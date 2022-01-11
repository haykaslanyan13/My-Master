import { TextField } from "@mui/material";
import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function OrderPage(){
  const [startDate, setStartDate] = useState(new Date());

    return(
        <div style={{ paddingTop: "100px"}}>
          <div>
            <h2>Order information</h2>
            <p> <TextField
            id="address"
            label="Your address"
            variant="standard"
            className="address-input"
            style={{marginLeft: 5, width: 300}}
             /></p>
             <p><DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /></p>
          </div>
        
        </div>
    )
}

