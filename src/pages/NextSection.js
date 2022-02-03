import React from "react";
import "../styles/NextSection.css";
import DoneIcon from "@mui/icons-material/Done";

function NextSection() {
  return (
    <div className="next-container">
      <div style={{textAlign: "left", top: "50%",}}>
        <div style={{margin: "auto",  padding: 60}}>
        <h1
          style={{
            marginTop: "60px",
            marginLeft: 100,
            textTransform: "uppercase",
          }}>
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
        style={{ width: "420px", height: "450px",position: "absolute", right: 80, top: 50 }}
        src="https://firebasestorage.googleapis.com/v0/b/test-53482.appspot.com/o/01aa76c8746b0194feeb9e6dca0600cf.jpg?alt=media&token=2ec650da-695d-4a35-87ab-e18cd38748b3"
        width={500}
      />
      </div>
    </div>
  );
}

export default NextSection;
