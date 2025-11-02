// Alternative version with custom logo text instead of TMDB image
// src/components/Navbar.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
      setShowUserMenu(false);
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.user-menu-wrapper')) {
        setShowUserMenu(false);
      }
    };
    
    if (showUserMenu) {
      document.addEventListener('click', handleClickOutside);
    }
    
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showUserMenu]);

  return (
    <nav className="tmdb-navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            <div className="logo-text">
              <span className="logo-movie">MOVIE</span>
              <span className="logo-review">REVIEW</span>
            </div>
          </Link>
          
          {/* Main Navigation */}
          <ul className="navbar-menu">
            <li className="nav-item dropdown">
              <span className="nav-link">
                Movies <span className="dropdown-arrow">▾</span>
              </span>
              <div className="dropdown-content">
                <Link to="/movies?filter=popular">Popular</Link>
                <Link to="/movies?filter=now-playing">Now Playing</Link>
                <Link to="/movies?filter=upcoming">Upcoming</Link>
                <Link to="/movies?filter=top-rated">Top Rated</Link>
              </div>
            </li>
            <li className="nav-item">
              <Link to="/movies" className="nav-link">Browse All</Link>
            </li>
          </ul>
        </div>

        {/* Right Side */}
        <div className="navbar-right">
          {currentUser ? (
            <>
              <Link to="/my-reviews" className="nav-icon" title="My Reviews">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                </svg>
              </Link>
              
              <div className="user-menu-wrapper">
                <button 
                  className="user-avatar"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  title="User Menu"
                >
                  <div className="avatar-circle">
                    {currentUser.email?.[0].toUpperCase() || 'U'}
                  </div>
                </button>
                
                {showUserMenu && (
                  <div className="user-dropdown">
                    <div className="dropdown-header">
                      <div className="user-email">{currentUser.email}</div>
                    </div>
                    <Link to="/profile" onClick={() => setShowUserMenu(false)}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                      </svg>
                      View Profile
                    </Link>
                    <Link to="/my-reviews" onClick={() => setShowUserMenu(false)}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22V22H9Z" />
                      </svg>
                      My Reviews
                    </Link>
                    <hr className="dropdown-divider" />
                    <button onClick={handleLogout} className="logout-btn">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z" />
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="login-link">Login</Link>
              <Link to="/register" className="join-btn">Join Now</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;