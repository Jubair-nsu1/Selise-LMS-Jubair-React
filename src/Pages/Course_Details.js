import React, { useEffect, useState, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import UserContext from '../Context/UserContext';
import Navbar from '../Components/Header';
import { getLocalData } from '../Utils/localStorageUtils'; // Import your storage utility

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

  console.log('All params:', params);
  console.log('Location:', location);
  console.log('CourseId extracted:', courseId);

  useEffect(() => {
    // Use your utility function to get data from myAppData
    const coursesFromStorage = getLocalData('courses') || [];
    const enrollmentsFromStorage = getLocalData('enrollments') || [];
    
    console.log('CourseId from params:', courseId);
    console.log('Courses from storage:', coursesFromStorage);
    
    if (!courseId) {
      setDebug('Course ID is undefined. Please check your route configuration.');
      return;
    }
    
    // Find the course with the matching ID
    const selectedCourse = coursesFromStorage.find(c => c.id === courseId);
    console.log('Selected course:', selectedCourse);
    
    if (!selectedCourse) {
      setDebug(`No course found with ID: ${courseId}. Available IDs: ${coursesFromStorage.map(c => c.id).join(', ')}`);
    }
    
    setCourse(selectedCourse);
    setCourses(coursesFromStorage);
    setEnrollments(enrollmentsFromStorage);
  }, [courseId]);
    
  console.log('course state:', course);

  const handleEnroll = () => {
    if (!course || !user) return;

    const userEnrollments = enrollments.filter(e => e.userId === user.userId);
    const isAlreadyEnrolled = userEnrollments.some(e => e.courseId === course.id);

    if (isAlreadyEnrolled) {
      setMessage('You are already enrolled in this course.');
      return;
    }

    // Handle case where prerequisites might be undefined
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
    // You'll need a setLocalData function to update the enrollment
    // import { setLocalData } from '../Utils/localStorageUtils';
    // setLocalData('enrollments', updatedEnrollments); 
    
    // For now, updating local state only
    setEnrollments(updatedEnrollments);
    setMessage('Enrollment successful!');
  };

  if (!course) {
    return (
      <>
        <Navbar />
        <div className="container mt-5">
          <div className="alert alert-warning">
            <h4>Loading or course not found...</h4>
            {debug && <div className="mt-3 p-3 bg-light"><pre>{debug}</pre></div>}
            <div className="mt-3">
              <button 
                className="btn btn-info"
                onClick={() => {
                  // Force a reload of data
                  const reloadCoursesFromStorage = getLocalData('courses') || [];
                  console.log('Manually reloaded courses:', reloadCoursesFromStorage);
                  setCourses(reloadCoursesFromStorage);
                  
                  // Show available course IDs
                  setDebug(`Available course IDs: ${reloadCoursesFromStorage.map(c => `${c.id} (${c.title})`).join(', ')}`);
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

  const getCourseTitleById = (id) => {
    const found = courses.find(c => c.id === id);
    return found ? found.title : id;
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="card shadow">
          <div className="card-body">
            <h2 className="card-title">{course.title}</h2>
            <p className="card-text">{course.description}</p>
            <ul className="list-group list-group-flush mb-3">
              <li className="list-group-item"><strong>Category:</strong> {course.category}</li>
              <li className="list-group-item"><strong>Duration:</strong> {course.duration} hours</li>
              <li className="list-group-item"><strong>Type:</strong> {course.isFree ? 'Free' : 'Paid'}</li>
              <li className="list-group-item">
                <strong>Prerequisites:</strong>{' '}
                {course.prerequisites && course.prerequisites.length > 0
                  ? course.prerequisites.map(id => getCourseTitleById(id)).join(', ')
                  : 'None'}
              </li>
            </ul>
            <button className="btn btn-primary" onClick={handleEnroll}>Enroll</button>
            {message && <div className="alert alert-info mt-3">{message}</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetails;