import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import tmdbApi from '../services/tmdbApi';
import { reviewAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import StarRating from '../components/StarRating';

const MovieDetails = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');

  useEffect(() => {
    fetchMovieData();
    fetchReviews();
  }, [id]);

  const fetchMovieData = async () => {
    try {
      const data = await tmdbApi.getMovieDetails(id);
      setMovie(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await reviewAPI.getMovieReviews(id);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert('Please login to submit a review');
      return;
    }

    try {
      const reviewData = {
        movieId: id,
        movieTitle: movie.title,
        rating,
        reviewText,
        userId: currentUser.uid,
        userEmail: currentUser.email
      };
      
      await reviewAPI.create(reviewData);
      setReviewText('');
      setRating(5);
      setShowReviewForm(false);
      fetchReviews();
      alert('Review submitted successfully!');
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review');
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await reviewAPI.delete(reviewId);
        fetchReviews();
        alert('Review deleted successfully!');
      } catch (error) {
        console.error('Error deleting review:', error);
        alert('Failed to delete review');
      }
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!movie) {
    return <div className="container mt-5">Movie not found</div>;
  }

  const imageUrl = tmdbApi.getImageUrl(movie.poster_path);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <img 
            src={imageUrl} 
            alt={movie.title}
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-8">
          <h1>{movie.title}</h1>
          <p className="lead">{movie.tagline}</p>
          <div className="mb-3">
            <strong>Rating:</strong> ⭐ {movie.vote_average}/10
          </div>
          <div className="mb-3">
            <strong>Release Date:</strong> {movie.release_date}
          </div>
          <div className="mb-3">
            <strong>Runtime:</strong> {movie.runtime} minutes
          </div>
          <div className="mb-3">
            <strong>Overview:</strong>
            <p>{movie.overview}</p>
          </div>
          <div className="mb-3">
            <strong>Genres:</strong>{' '}
            {movie.genres?.map(g => g.name).join(', ')}
          </div>
        </div>
      </div>

      <hr className="my-5" />

      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Reviews</h2>
            {currentUser && !showReviewForm && (
              <button 
                className="btn btn-primary"
                onClick={() => setShowReviewForm(true)}
              >
                Write a Review
              </button>
            )}
          </div>

          {showReviewForm && (
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Write Your Review</h5>
                <form onSubmit={handleSubmitReview}>
                  <div className="mb-3">
                    <label className="form-label">Rating</label>
                    <StarRating 
                      rating={rating} 
                      onRatingChange={setRating}
                      editable={true}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Review</label>
                    <textarea 
                      className="form-control"
                      rows="4"
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-success me-2">
                    Submit Review
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setShowReviewForm(false)}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          )}

          {reviews.length === 0 ? (
            <p className="text-muted">No reviews yet. Be the first to review!</p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="card mb-3">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6 className="text-muted">{review.userEmail}</h6>
                      <StarRating rating={review.rating} editable={false} />
                      <p className="mt-2">{review.reviewText}</p>
                      <small className="text-muted">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </small>
                    </div>
                    {currentUser && currentUser.uid === review.userId && (
                      <button 
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteReview(review.id)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;