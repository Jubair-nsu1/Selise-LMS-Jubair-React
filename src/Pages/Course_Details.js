import React, { useEffect, useState, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import UserContext from '../Context/UserContext';
import Navbar from '../Components/Header';
import { getLocalData, setLocalData } from '../Utils/localStorageUtils'; // Import your storage utils

const CourseDetails = () => {
  const params = useParams();
  const location = useLocation();
  const courseId = params.courseId || (location.state && location.state.courseId);
  const { user } = useContext(UserContext);
  const [course, setCourse] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState('');
  const [debug, setDebug] = useState('');

  useEffect(() => {
    const coursesFromStorage = getLocalData('courses') || [];
    const enrollmentsFromStorage = getLocalData('enrollments') || [];

    if (!courseId) {
      setDebug('Course ID is undefined. Please check your route configuration.');
      return;
    }

    const selectedCourse = coursesFromStorage.find(c => c.id === courseId);
    if (!selectedCourse) {
      setDebug(`No course found with ID: ${courseId}. Available IDs: ${coursesFromStorage.map(c => c.id).join(', ')}`);
    }

    setCourse(selectedCourse);
    setCourses(coursesFromStorage);
    setEnrollments(enrollmentsFromStorage);
    setMessage('');
  }, [courseId]);

  const getCourseTitleById = (id) => {
    const found = courses.find(c => c.id === id);
    return found ? found.title : id;
  };

  const handleEnroll = () => {
    if (!course || !user) return;

    const userEnrollments = enrollments.filter(e => e.userId === user.userId);
    const isAlreadyEnrolled = userEnrollments.some(e => e.courseId === course.id);
    const completedCourse = userEnrollments.find(e => e.courseId === course.id && e.status === 'completed');

    if (isAlreadyEnrolled) {
      if (completedCourse) {
        setMessage('You have already completed this course.');
      } else {
        setMessage('You are already enrolled in this course.');
      }
      return;
    }

    const prerequisites = course.prerequisites || [];
    const unmetPrerequisites = prerequisites.filter(
      prereqId => !userEnrollments.some(e => e.courseId === prereqId && e.status === 'completed')
    );

    if (unmetPrerequisites.length > 0) {
      setMessage('You must complete all prerequisite courses before enrolling.');
      return;
    }

    const newEnrollment = {
      userId: user.userId,
      courseId: course.id,
      status: 'enrolled',
      progress: 0,
      enrolledAt: new Date().toISOString(),
    };

    const updatedEnrollments = [...enrollments, newEnrollment];
    setEnrollments(updatedEnrollments);
    setLocalData('enrollments', updatedEnrollments); // Save updated enrollments to local storage
    setMessage('Enrollment successful!');
  };

  // Show enrollment status for current user & course
  const renderEnrollmentStatus = () => {
    if (!user || !course) return null;
    const userEnrollments = enrollments.filter(e => e.userId === user.userId);
    const enrollment = userEnrollments.find(e => e.courseId === course.id);
    if (!enrollment) {
      return <p className="text-muted">You are not enrolled in this course yet.</p>;
    }
    if (enrollment.status === 'completed') {
      return <p className="text-success">You have completed this course.</p>;
    }
    if (enrollment.status === 'enrolled') {
      return <p className="text-info">You are currently enrolled in this course. Progress: {enrollment.progress}%</p>;
    }
    return null;
  };

  if (!course) {
    return (
      <>
        <Navbar />
        <div className="container mt-5">
          <div className="alert alert-warning">
            <h4>Loading or course not found...</h4>
            {debug && (
              <div className="mt-3 p-3 bg-light">
                <pre>{debug}</pre>
              </div>
            )}
            <div className="mt-3">
              <button
                className="btn btn-info"
                onClick={() => {
                  const reloadCoursesFromStorage = getLocalData('courses') || [];
                  setCourses(reloadCoursesFromStorage);
                  setDebug(
                    `Available course IDs:\n${reloadCoursesFromStorage
                      .map((c) => `${c.id} (${c.title})`)
                      .join('\n')}`
                  );
                }}
              >
                Debug: Show Available Courses
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="card shadow">
          <div className="card-body">
            <h2 className="card-title">{course.title}</h2>
            <p className="card-text">{course.description}</p>
            <ul className="list-group list-group-flush mb-3">
              <li className="list-group-item">
                <strong>Category:</strong> {course.category}
              </li>
              <li className="list-group-item">
                <strong>Duration:</strong> {course.duration} hours
              </li>
              <li className="list-group-item">
                <strong>Type:</strong> {course.isFree ? 'Free' : 'Paid'}
              </li>
              <li className="list-group-item">
                <strong>Prerequisites:</strong>{' '}
                {course.prerequisites && course.prerequisites.length > 0
                  ? course.prerequisites.map((id) => getCourseTitleById(id)).join(', ')
                  : 'None'}
              </li>
            </ul>

            {renderEnrollmentStatus()}

            <button className="btn btn-primary" onClick={handleEnroll}>
              Enroll
            </button>

            {message && <div className="alert alert-info mt-3">{message}</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetails;
