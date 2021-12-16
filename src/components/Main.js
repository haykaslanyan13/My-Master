import React from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './Navbar'
import AllServices from '../pages/AllServices'
import Home from '../pages/Home';



function Main() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="allservices" element={<AllServices />} />
                <Route path="home" element={<Home />} />
                <Route path="*" element={ <Navigate to="home" />} />
            </Routes>
        </div>
    )
}

export default Main
