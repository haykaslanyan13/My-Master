import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
function Navbar() {
  return (
    <div className="navbar">
      <div className="leftSide">
        <div className="logo">
          <span style={{ color: "#007ce7", fontSize: "30px" }}>M.</span>
          <span style={{ color: "#007f8b", fontSize: "30px" }}>MASTER</span>
        </div>
        <Link to="/allservices">All Services</Link>
        <div className="search-box">
          <button className="btn-search"><FontAwesomeIcon icon={faSearch} /> </button>
          <input type="text" className="input-search" placeholder="search..." />
        </div>
      </div>
      <div className="rightSide">
        <Link to="/signup">Sign up</Link>/<Link to="/login">Sign in</Link>
        <Button variant="outline-info">Become</Button>{' '}
      </div>
    </div>
  );
}

export default Navbar;
