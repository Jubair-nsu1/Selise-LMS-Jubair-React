import React from 'react'
import {Link, useNavigate} from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">LMS</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <Link class="nav-link" to="/">Home</Link>
            </li>            
            <li class="nav-item">
              <Link class="nav-link" to="/course-catalog">Course Catalog</Link>
            </li>
            <li class="nav-item active">
              <Link class="nav-link" to="/learning-history">Learning History</Link>
            </li>
            <li class="nav-item">
                <Link class="nav-link" to="/my-profile">My Profile</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Navbar