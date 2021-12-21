import React from "react"

function AboutUs() {
  const arr = [1, 2, 3]
  return (
    <div
      style={{
        display: "flex",
      }}
    >
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
          }}
        >
          About Our
          <br />
          Construction
          <br />
          Company
        </div>
        <h4 style={{ marginLeft: 220, textAlign: "left", width: 700 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non arcu
          quam. Integer vel ante vestibulum, scelerisque tortor sit amet, mollis
          magna. Aenean ac ipsum at lectus vestibulum varius vel sit amet lectus.
        </h4>
      </div>
      <div style={{ marginTop: 80, marginLeft: 110, width: 200 }}>
        <h1>What We Do</h1>
        {arr.map((el) => {
          return (
            <div key={el} style={{ display: "flex", width: 200 }}>
              <img style={{ height: 100, width: 100 }} src="" />
              <div style={{ width: 30, height: 160, marginLeft: 13 }}>
                <h3 style={{ marginTop: 0 }}>fdvgfdgfdgfdg</h3>
                <h4 style={{ textAlign: "left", width: 300, fontWeight: "normal" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non
                  arcu quam. Integer vel ante vestibulum, scelerisque
                </h4>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default AboutUs
