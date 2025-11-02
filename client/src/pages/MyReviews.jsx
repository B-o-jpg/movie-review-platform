import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { reviewAPI } from '../services/api';
import { Link } from 'react-router-dom';
import './MyReviews.css';

const MyReviews = () => {
  const { currentUser } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

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
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setError('Failed to load reviews. Make sure you are logged in.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await reviewAPI.delete(reviewId);
        setReviews(reviews.filter(r => r.id !== reviewId));
      } catch (error) {
        console.error('Error deleting review:', error);
        alert('Failed to delete review');
      }
    }
  };

  const filteredReviews = reviews.filter(review => {
    if (filter === 'all') return true;
    if (filter === 'high') return review.rating >= 4;
    if (filter === 'low') return review.rating <= 2;
    return true;
  });

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
    <div className="my-reviews-page">
      <div className="container">
        <div className="page-header">
          <h1>My Reviews</h1>
          <div className="filter-buttons">
            <button 
              className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFilter('all')}
            >
              All ({reviews.length})
            </button>
            <button 
              className={`btn ${filter === 'high' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFilter('high')}
            >
              High Rated (4-5★)
            </button>
            <button 
              className={`btn ${filter === 'low' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFilter('low')}
            >
              Low Rated (1-2★)
            </button>
          </div>
        </div>

        {error && (
          <div className="alert alert-danger">{error}</div>
        )}

        {filteredReviews.length === 0 ? (
          <div className="empty-state">
            <h3>No reviews found</h3>
            <p>Start reviewing movies to see them here!</p>
            <Link to="/movies" className="btn btn-primary">
              Browse Movies
            </Link>
          </div>
        ) : (
          <div className="reviews-grid">
            {filteredReviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-card-header">
                  <h3>{review.movieTitle}</h3>
                  <div className="review-actions">
                    <button 
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(review.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="review-rating">
                  {'⭐'.repeat(review.rating)} ({review.rating}/5)
                </div>
                <p className="review-text">{review.reviewText}</p>
                <div className="review-footer">
                  <small className="text-muted">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </small>
                  <Link to={`/movie/${review.movieId}`} className="view-movie-link">
                    View Movie →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReviews;