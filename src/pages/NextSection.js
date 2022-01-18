import React from "react";
import "../styles/NextSection.css";
import DoneIcon from "@mui/icons-material/Done";

function NextSection() {
  return (
    <div className="next-container">
      <div style={{textAlign: "left", top: "50%",}}>
        <div style={{matgin: "auto",  padding: 60}}>
        <h1
          style={{
            marginTop: "60px",
            marginLeft: 100,
            textTransform: "uppercase",
          }}
        >
          everyday life made easier
        </h1>
        <p style={{color: "#666a6c"}}>
        <DoneIcon style={{ color: "#007f8b", marginLeft: 100 }} /> Choose your
        Master by reviews, skills and price.
        </p>
        <p style={{color: "#666a6c"}}>
          <DoneIcon style={{ color: "#007f8b", marginLeft: 100 }} /> The world of
          work made simple.
        </p>
        <p style={{color: "#666a6c"}}>
          <DoneIcon style={{ color: "#007f8b", marginLeft: 100 }} /> Compare Master reviews, ratings, and prices.
        </p>
        <p style={{color: "#666a6c"}}>
          <DoneIcon style={{ color: "#007f8b", marginLeft: 100 }} /> Choose and connect with the best person for the job.
        </p>
        <p style={{color: "#666a6c"}}>
          <DoneIcon style={{ color: "#007f8b", marginLeft: 100 }} /> The easy, reliable way to take care of your home.
        </p>
        </div>
      </div>
      <div>
      <img
        alt=""
        style={{ width: "534px", height: "500px",position: "absolute", right: 80, top: 50 }}
        src="https://firebasestorage.googleapis.com/v0/b/test-53482.appspot.com/o/56952724ee5683ad74754d8da5a3e794.jpg?alt=media&token=073c5461-2661-4eb3-8657-b6ea93148156"
        width={500}
      />
      </div>
    </div>
  );
}

export default NextSection;
