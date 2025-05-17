import { Routes, Route } from "react-router-dom";
import React from 'react';

// Pages
import Course_Catalog from '../Pages/Course_Catalog';
import Course_Details from '../Pages/Course_Details';
import Learning_History from '../Pages/Learning_History';
import MyLearning from "../Pages/My_Learning";
import MyProfile from "../Pages/My_Profile";

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Course_Catalog />} />
        <Route path="/course-details/:courseId" element={<Course_Details />} />
        <Route path="/learning-history" element={<Learning_History />} />
        <Route path="/my-learning" element={<MyLearning />} />
        <Route path="/my-profile" element={<MyProfile />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
