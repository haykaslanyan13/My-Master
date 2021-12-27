import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { app } from "../Firebase/FirebaseUser";
import { setUser } from "../Redux/UserSlice";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const auth = getAuth();
  const LogOut = async () => {
    try {
      await signOut(auth);
    } catch {}
    dispatch(setUser(null));
  };
  return (
    <div className="navbar">
      <div className="leftSide">
        <div className="logo">
          <div
            style={{
              cursor: "pointer",
            }}
            onClick={() => navigate("/home")}>
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
        {!user && (
          <>
            <Link to="/signup">Sign up</Link>
            <Link to="/login">Sign in</Link>
          </>
        )}
        {user && (
          <Button onClick={() => LogOut()} variant="outline-info">
            Log Out
          </Button>
        )}
        <Button onClick={() => console.log(user)} variant="outline-info">
          Become
        </Button>{" "}
      </div>
    </div>
  );
}

export default Navbar;
