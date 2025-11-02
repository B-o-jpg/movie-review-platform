
import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

const ReviewForm = ({ onSubmit, initialData, isLoading }) => {
  const [rating, setRating] = useState(initialData?.rating || 5);
  const [reviewText, setReviewText] = useState(initialData?.review || '');
  const [hoveredRating, setHoveredRating] = useState(0);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setRating(initialData.rating);
      setReviewText(initialData.review);
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors = {};

    if (!reviewText.trim()) {
      newErrors.review = 'Review text is required';
    } else if (reviewText.trim().length < 10) {
      newErrors.review = 'Review must be at least 10 characters long';
    } else if (reviewText.trim().length > 1000) {
      newErrors.review = 'Review must not exceed 1000 characters';
    }

    if (rating < 1 || rating > 5) {
      newErrors.rating = 'Rating must be between 1 and 5';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit({
      rating,
      review: reviewText.trim(),
    });
  };

  const renderStarRating = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={`star-rating ${i <= (hoveredRating || rating) ? 'text-warning' : 'text-muted'}`}
          style={{ cursor: 'pointer', fontSize: '2rem', marginRight: '0.25rem' }}
          onClick={() => setRating(i)}
          onMouseEnter={() => setHoveredRating(i)}
          onMouseLeave={() => setHoveredRating(0)}
        />
      );
    }
    return stars;
  };

  return (
    <div className="card review-form-card mb-4">
      <div className="card-body">
        <h4 className="card-title mb-4">
          {initialData ? 'Edit Your Review' : 'Write a Review'}
        </h4>
        <form onSubmit={handleSubmit}>
          {/* Star Rating */}
          <div className="mb-4">
            <label className="form-label fw-bold">
              Your Rating: {rating}/5
            </label>
            <div className="star-rating-container">
              {renderStarRating()}
            </div>
            {errors.rating && (
              <div className="text-danger small mt-1">{errors.rating}</div>
            )}
          </div>

          {/* Slider Rating (Alternative) */}
          <div className="mb-4">
            <label className="form-label fw-bold">
              Or use slider: {rating}/5
            </label>
            <input
              type="range"
              className="form-range"
              min="1"
              max="5"
              step="0.5"
              value={rating}
              onChange={(e) => setRating(parseFloat(e.target.value))}
            />
            <div className="d-flex justify-content-between small text-muted">
              <span>Poor</span>
              <span>Fair</span>
              <span>Good</span>
              <span>Very Good</span>
              <span>Excellent</span>
            </div>
          </div>

          {/* Review Text */}
          <div className="mb-4">
            <label className="form-label fw-bold">Your Review</label>
            <textarea
              className={`form-control ${errors.review ? 'is-invalid' : ''}`}
              rows="6"
              placeholder="Share your thoughts about this movie... (minimum 10 characters)"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              maxLength="1000"
            />
            <div className="d-flex justify-content-between mt-1">
              <div>
                {errors.review && (
                  <div className="text-danger small">{errors.review}</div>
                )}
              </div>
              <small className="text-muted">
                {reviewText.length}/1000 characters
              </small>
            </div>
          </div>

          {/* Submit Button */}
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Submitting...
                </>
              ) : (
                initialData ? 'Update Review' : 'Submit Review'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
