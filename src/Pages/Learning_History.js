import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../Context/UserContext';
import Navbar from '../Components/Header';

const LearningHistory = () => {
  const { user } = useContext(UserContext);
  const [completedEnrollments, setCompletedEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const allEnrollments = JSON.parse(localStorage.getItem('enrollments')) || [];
    const userEnrollments = allEnrollments.filter(
      (e) => e.userId === user.userId && e.status === 'completed'
    );
    setCompletedEnrollments(userEnrollments);

    const storedCourses = JSON.parse(localStorage.getItem('courses')) || [];
    setCourses(storedCourses);
  }, [user.userId]);


  
  const totalHours = completedEnrollments.reduce((sum, enrollment) => {
    const course = courses.find((c) => c.id === enrollment.courseId);
    return course ? sum + course.duration : sum;
  }, 0);

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h1 className="mb-4 text-center">Learning History</h1>

        {completedEnrollments.length === 0 ? (
          <p className="text-center">You have not completed any courses yet.</p>
        ) : (
          <>
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Completed At</th>
                </tr>
              </thead>
              <tbody>
                {completedEnrollments.map((enrollment) => {
                  const course = courses.find((c) => c.id === enrollment.courseId);
                  if (!course) return null;
                  return (
                    <tr key={enrollment.courseId}>
                      <td>{course.title}</td>
                      <td>{course.category}</td>
                      <td>{new Date(enrollment.completedAt).toLocaleDateString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="mt-4 p-3 bg-light rounded shadow-sm">
              <h5>Summary</h5>
              <p>Total Courses Completed: {completedEnrollments.length}</p>
              <p>Total Learning Hours: {totalHours}</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default LearningHistory;
