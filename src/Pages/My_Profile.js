import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Header';

const defaultUser = {
  id: Date.now(),
  name: '',
  email: '',
  preferredCategories: [],
  notifications: true,
};

const categories = ['Programming', 'Business', 'Marketing'];

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  // Load from localStorage or initialize default user
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
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && name === 'preferredCategories') {
      setUser(prev => {
        const current = prev.preferredCategories || [];
        const updated = checked
          ? [...current, value]
          : current.filter(c => c !== value);
        return { ...prev, preferredCategories: updated };
      });
    } else if (type === 'checkbox') {
      setUser(prev => ({ ...prev, [name]: checked }));
    } else {
      setUser(prev => ({ ...prev, [name]: value }));
    }
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

          <div className="mb-3">
            <label className="form-label">Preferred Categories</label>
            <div>
              {categories.map(cat => (
                <div className="form-check form-check-inline" key={cat}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="preferredCategories"
                    value={cat}
                    checked={user.preferredCategories.includes(cat)}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">{cat}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              name="notifications"
              checked={user.notifications}
              onChange={handleChange}
              id="notifications"
            />
            <label className="form-check-label" htmlFor="notifications">
              Receive Notifications
            </label>
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
