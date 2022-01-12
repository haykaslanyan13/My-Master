import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import AllServices from "../pages/AllServices";
import Home from "../pages/Home";
import LogIn from "./Login";
import SignUp from "./SignUp";
import Masters from "./Masters";
import Footer from "./Footer";
import MasterProfilePage from "./MasterProfilePage";
import ContactUs from "../pages/ContactUs";
import Privacy from "../pages/Privacy";
import UserProfilePage from "./ClientProfilePage";
import AboutUs from "./AboutUs";

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
        <Route path="myprofile" element={<MasterProfilePage />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="master" element={<MasterProfilePage />} />
        <Route path="client" element={<UserProfilePage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default Main;
