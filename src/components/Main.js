import React from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import Navbar from "./Navbar"
import AllServices from "../pages/AllServices"
import Home from "../pages/Home"
import LogIn from "./Login"
import SignUp from "./SignUp"
import AboutUs from "./AboutUs"

function Main() {
  const user = false
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="allservices" element={<AllServices />} />
        <Route path="home" element={<AboutUs />} />
        <Route path="*" element={<Navigate to="home" />} />
        {!user && <Route exact path="/login" element={<LogIn />} />}
        {!user && <Route exact path="/signup" element={<SignUp />} />}
      </Routes>
    </div>
  )
}

export default Main
