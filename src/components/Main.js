import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import AllServices from "../pages/AllServices";
import Home from "../pages/Home";
import LogIn from "./Login";
import SignUp from "./SignUp";
import Masters from "./Masters";
import Footer from "./Footer";
import Image from "./Image";

function Main() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="allservices" element={<AllServices />} />
        <Route path="home" element={<Home />} />
        <Route path="/masters/:itemTitle" element={<Masters />} />
        <Route path="*" element={<Navigate to="home" />} />
        <Route exact path="/login" element={<LogIn />} />
        <Route exact path="/signup" element={<SignUp />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default Main;
