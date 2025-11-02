import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { reviewAPI } from '../services/api';
import { Link } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const { currentUser } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalReviews: 0,
    avgRating: 0
  });

  useEffect(() => {
    if (currentUser) {
      fetchUserReviews();
    }
  }, [currentUser]);

  const fetchUserReviews = async () => {
    try {
      setError(null);
      const response = await reviewAPI.getUserReviews(currentUser.uid);
      setReviews(response.data);
      
      // Calculate stats
      const total = response.data.length;
      const avgRating = total > 0 
        ? (response.data.reduce((sum, r) => sum + r.rating, 0) / total).toFixed(1)
        : 0;
      
      setStats({ totalReviews: total, avgRating });
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setError('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <div className="profile-avatar">
            {currentUser.email?.[0].toUpperCase() || 'U'}
          </div>
          <div className="profile-info">
            <h1 className="profile-name">{currentUser.email}</h1>
            <p className="profile-joined">
              Member since {new Date(currentUser.metadata.creationTime).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{stats.totalReviews}</div>
            <div className="stat-label">Total Reviews</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">⭐ {stats.avgRating}</div>
            <div className="stat-label">Average Rating</div>
          </div>
        </div>

        <div className="profile-section">
          <div className="section-header">
            <h2>Recent Reviews</h2>
            <Link to="/my-reviews" className="btn btn-outline-primary">
              View All
            </Link>
          </div>
          
          {error && (
            <div className="alert alert-danger">{error}</div>
          )}
          
          {reviews.length === 0 ? (
            <div className="empty-state">
              <p>You haven't written any reviews yet.</p>
              <Link to="/movies" className="btn btn-primary">
                Start Reviewing
              </Link>
            </div>
          ) : (
            <div className="reviews-list">
              {reviews.slice(0, 5).map((review) => (
                <div key={review.id} className="review-item">
                  <h4>{review.movieTitle}</h4>
                  <div className="review-rating">
                    {'⭐'.repeat(review.rating)}
                  </div>
                  <p className="review-text">{review.reviewText}</p>
                  <small className="text-muted">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </small>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
