import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar'
import AllServices from '../pages/AllServices'
import Home from '../pages/Home';



function Main() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="allservices" element={<AllServices />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </div>
    )
}

export default Main
