import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Header';

const defaultUser = {
  id: Date.now(),
  name: '',
  email: '',
};

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  // Load from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      localStorage.setItem('user', JSON.stringify(defaultUser));
      setUser(defaultUser);
    }
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const validateEmail = email =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSave = () => {
    if (!validateEmail(user.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    localStorage.setItem('user', JSON.stringify(user));
    setError('');
    alert('Profile updated successfully!');
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>My Profile</h2>
        <div className="mt-4">
          {error && <div className="alert alert-danger">{error}</div>}

          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={user.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={user.email}
              onChange={handleChange}
            />
          </div>

          <button className="btn btn-primary" onClick={handleSave}>
            Save Profile
          </button>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
