import { Routes, Route } from "react-router-dom";
import React from 'react';

// Pages
import CourseCatalog from "../Pages/Course_Catalog";
import CourseDetails from "../Pages/Course_Details";
import LearningHistory from "../Pages/Learning_History";
import MyLearning from "../Pages/My_Learning";
import MyProfile from "../Pages/My_Profile";

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<CourseCatalog />} />
        <Route path="/course-details/:courseId" element={<CourseDetails />} />
        <Route path="/learning-history" element={<LearningHistory />} />
        <Route path="/my-learning" element={<MyLearning />} />
        <Route path="/my-profile" element={<MyProfile />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
