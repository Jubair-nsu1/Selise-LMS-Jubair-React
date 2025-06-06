import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">LMS</Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">Course Catalog</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/learning-history">Learning History</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/my-learning">My Learning</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/my-profile">My Profile</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
