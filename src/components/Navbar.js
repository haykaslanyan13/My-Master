import React from "react"
import { Button } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import "../styles/Navbar.css"
function Navbar() {
  const navigate = useNavigate()
  return (
    <div className="navbar">
      <div className="leftSide">
        <div className="logo">
          <div
            style={{
              cursor: "pointer",
            }}
            onClick={() => navigate("/home")}
          >
            <span style={{ color: "#007ce7", fontSize: "30px" }}>My </span>
            <span style={{ color: "#007f8b", fontSize: "30px" }}>Master</span>
          </div>
        </div>
        <Link to="/allservices">All Services</Link>
        {/* <div className="search-box">
          <button className="btn-search"><FontAwesomeIcon icon={faSearch} /> </button>
          <input type="text" className="input-search" placeholder="search..." />
        </div> */}
      </div>
      <div className="rightSide">
        <Link to="/signup">Sign up</Link>/<Link to="/login">Sign in</Link>
        <Button variant="outline-info">Become</Button>{" "}
      </div>
    </div>
  )
}

export default Navbar
