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
      <Navbar />
      <div className="container mt-5">
        <h1 className="mb-4 text-center">My Learning</h1>
        {enrollments.length === 0 ? (
          <p className="text-center">You have no enrolled courses yet.</p>
        ) : (
          <div className="row gy-4">
            {enrollments.map(enrollment => {
              const course = courses.find(c => c.id === enrollment.courseId);
              if (!course) return null;
              return (
                <div key={enrollment.courseId} className="col-md-6">
                  <div className="card shadow-sm h-100">
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{course.title}</h5>
                      <p className="card-text mb-1">
                        <strong>Status:</strong> {enrollment.status.charAt(0).toUpperCase() + enrollment.status.slice(1)}
                      </p>
                      <p className="card-text mb-3">
                        <strong>Progress:</strong> {enrollment.progress}%
                      </p>
                      <input
                        type="range"
                        className="form-range mb-3"
                        min="0"
                        max="100"
                        value={enrollment.progress}
                        onChange={e => handleProgressChange(enrollment.courseId, parseInt(e.target.value))}
                      />
                      <div className="progress">
                        <div
                          className={`progress-bar ${enrollment.status === 'completed' ? 'bg-success' : 'bg-info'}`}
                          role="progressbar"
                          style={{ width: `${enrollment.progress}%` }}
                          aria-valuenow={enrollment.progress}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          {enrollment.progress}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default MyLearning;
