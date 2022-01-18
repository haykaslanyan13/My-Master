import React from "react";

function AboutUs() {
  return (
    <div
      style={{
        display: "flex",
        marginTop: 100,
        height: "calc(100vh - 80px)",
      }}>
      <div>
        <div
          style={{
            textAlign: "left",
            marginLeft: 220,
            marginTop: 100,
            letterSpacing: 2,
            borderLeft: "solid",
            borderLeftWidth: 13,
            paddingLeft: 30,
            height: 300,
            fontWeight: "bolder",
            color: "white",
            borderColor: "black",
            fontSize: 65,
            lineHeight: 1.5,
            width: 700,
          }}>
          About
          <br />
          Our
          <br />
          Activity
        </div>
        <h4 style={{ marginLeft: 220, textAlign: "left", width: 700 }}>
          <span style={{ color: "#007ce7", fontSize: "16px" }}>My </span>
          <span style={{ color: "#007f8b", fontSize: "16px" }}>Master </span>
          is an online service platform. For the services you will be offered
          masters, whom you can choose according to their rating. We work only
          with high-quality masters and companies. Solving any service problem
          with us is easy.
        </h4>
      </div>
      <div style={{ marginTop: 80, marginLeft: 110, width: 200 }}>
        <h1>What We Do</h1>
        <div style={{ display: "flex", width: 200 }}>
          <img
            alt=""
            style={{ height: 100, width: 100 }}
            src="https://firebasestorage.googleapis.com/v0/b/test-53482.appspot.com/o/aboutusimages%2F24-hours-pngrepo-com.png?alt=media&token=f7eba51e-079c-44b7-9856-a92034741932"
          />
          <div style={{ width: 40, height: 160, marginLeft: 13 }}>
            <h3
              style={{
                marginTop: 0,
                textAlign: "left",
                width: 200,
                marginBottom: 0,
              }}>
              We provide services
            </h3>

            <h4
              style={{
                marginTop: 10,
                textAlign: "left",
                width: 300,
                fontWeight: "normal",
              }}>
              We work with many companies and provide many services that you can
              order at any time of the day․
            </h4>
          </div>
        </div>
        <div style={{ display: "flex", width: 200 }}>
          <img
            alt=""
            style={{ height: 100, width: 100 }}
            src="https://firebasestorage.googleapis.com/v0/b/test-53482.appspot.com/o/aboutusimages%2Flooking-for-job.png?alt=media&token=2d287328-9029-47d0-9709-2693366f9097"
          />
          <div style={{ width: 30, height: 160, marginLeft: 13 }}>
            <h3
              style={{
                marginTop: 0,
                textAlign: "left",
                width: 200,
                marginBottom: 0,
              }}>
              We help to find job
            </h3>
            <h4
              style={{
                marginTop: 10,
                textAlign: "left",
                width: 300,
                fontWeight: "normal",
              }}>
              We help to find jobs not only for experienced masters, but also
              for beginners․
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AboutUs;
