import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Header';
import { Link } from 'react-router-dom';

const CourseCatalog = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [isFreeFilter, setIsFreeFilter] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem('courses')) || [];
    setCourses(storedCourses);
    setFilteredCourses(storedCourses);
  }, []);

  useEffect(() => {
    let filtered = [...courses];

    if (categoryFilter) {
      filtered = filtered.filter(course => course.category === categoryFilter);
    }

    if (isFreeFilter) {
      const isFree = isFreeFilter === 'free';
      filtered = filtered.filter(course => course.isFree === isFree);
    }

    console.log(isFreeFilter)

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        course =>
          course.title.toLowerCase().includes(query) ||
          course.category.toLowerCase().includes(query)
      );
    }

    if (sortKey) {
      filtered.sort((a, b) => {
        if (sortKey === 'title') {
          return a.title.localeCompare(b.title);
        } else if (sortKey === 'duration') {
          return a.duration - b.duration;
        }
        return 0;
      });
    }

    setFilteredCourses(filtered);
  }, [categoryFilter, isFreeFilter, sortKey, searchQuery, courses]);

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h1 className="mb-4 text-center">Course Catalog</h1>

        <div className="row mb-4 g-3">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title or category"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <select
              className="form-select"
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Programming">Programming</option>
              <option value="Business">Business</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>
          <div className="col-md-2">
            <select
              className="form-select"
              value={isFreeFilter}
              onChange={e => setIsFreeFilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>
          </div>
          <div className="col-md-2">
            <select
              className="form-select"
              value={sortKey}
              onChange={e => setSortKey(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="title">Title</option>
              <option value="duration">Duration</option>
            </select>
          </div>
        </div>

        <div className="row">
          {filteredCourses.length > 0 ? (
            filteredCourses.map(course => (
              <div key={course.id} className="col-md-4 mb-4">
                <Link
                  to={`/course-details/${course.id}`}
                  className="text-decoration-none text-dark"
                >
                  <div
                    className="card h-100 shadow-sm transition"
                    style={{
                      transition: 'all 0.3s ease-in-out',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
                      e.currentTarget.style.backgroundColor = '#f8f9fa';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '';
                      e.currentTarget.style.backgroundColor = '';
                    }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">{course.title}</h5>
                      <p className="card-text">
                        <strong>Category:</strong> {course.category}<br />
                        <strong>Duration:</strong> {course.duration} hours<br />
                        <strong>Type:</strong> {course.isFree ? 'Free' : 'Paid'}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))  
          ) : (
            <div className="col-12">
              <p className="text-center">No courses found.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CourseCatalog;
  