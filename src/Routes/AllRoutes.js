import {Routes, Route, Navigate } from "react-router-dom";
import React from 'react'

//Pages
import Course_Catalog from '../Pages/Course_Catalog';
import Course_Details from '../Pages/Course_Details';
import Learning_History from '../Pages/Learning_History';
import My_Profile from '../Pages/My_Profile';
import Home from "../Pages/Home";
const AllRoutes = () => {
    return (
    <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/course-catalog" element={<Course_Catalog />} />
                <Route path="/course-details" element={<Course_Details />} />
                <Route path="/learning-history" element={<Learning_History />} />
                <Route path="/my-profile" element={<My_Profile />} />          
            </Routes>
    
    </>
    )
}

export default AllRoutes