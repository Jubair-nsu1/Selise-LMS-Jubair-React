// pages/MyLearning.js
import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../Context/UserContext';
import Navbar from '../Components/Header';

const MyLearning = () => {
  const { user } = useContext(UserContext);
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const allEnrollments = JSON.parse(localStorage.getItem('enrollments')) || [];
    const userEnrollments = allEnrollments.filter(e => e.userId === user.userId);
    setEnrollments(userEnrollments);

    const storedCourses = JSON.parse(localStorage.getItem('courses')) || [];
    setCourses(storedCourses);
  }, [user.userId]);

  const handleProgressChange = (courseId, newProgress) => {
    const updatedEnrollments = enrollments.map(enrollment => {
      if (enrollment.courseId === courseId) {
        const updatedEnrollment = {
          ...enrollment,
          progress: newProgress,
          status: newProgress === 100 ? 'completed' : 'enrolled',
          completedAt: newProgress === 100 ? new Date().toISOString() : enrollment.completedAt,
        };
        return updatedEnrollment;
      }
      return enrollment;
    });

    const allEnrollments = JSON.parse(localStorage.getItem('enrollments')) || [];
    const otherEnrollments = allEnrollments.filter(e => e.userId !== user.userId);
    const newAllEnrollments = [...otherEnrollments, ...updatedEnrollments];
    localStorage.setItem('enrollments', JSON.stringify(newAllEnrollments));
    setEnrollments(updatedEnrollments);
  };

  return (
    <>
      <Navbar/>
      <div>
        <h1>My Learning</h1>
        <ul>
          {enrollments.map(enrollment => {
            const course = courses.find(c => c.id === enrollment.courseId);
            return (
              <li key={enrollment.courseId}>
                <h2>{course?.title}</h2>
                <p>Status: {enrollment.status}</p>
                <p>Progress: {enrollment.progress}%</p>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={enrollment.progress}
                  onChange={e => handleProgressChange(enrollment.courseId, parseInt(e.target.value))}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </>
    
  );
};

export default MyLearning;
