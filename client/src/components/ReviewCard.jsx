
import React from 'react';
import { FaStar, FaUser, FaCalendar } from 'react-icons/fa';

const ReviewCard = ({ review, onEdit, onDelete, isOwner }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-warning" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStar key="half" className="text-warning" style={{ opacity: 0.5 }} />);
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(<FaStar key={i} className="text-muted" />);
    }
    return stars;
  };

  return (
    <div className="card mb-3 review-card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div>
            <h5 className="card-title mb-1">
              <FaUser className="me-2" />
              {review.userEmail || 'Anonymous'}
            </h5>
            <div className="mb-2">
              {renderStars(review.rating)}
              <span className="ms-2 text-muted">{review.rating}/5</span>
            </div>
          </div>
          {isOwner && (
            <div className="btn-group">
              {onEdit && (
                <button
                  onClick={() => onEdit(review)}
                  className="btn btn-sm btn-outline-primary"
                  title="Edit review"
                >
                  Edit
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => onDelete(review.id)}
                  className="btn btn-sm btn-outline-danger"
                  title="Delete review"
                >
                  Delete
                </button>
              )}
            </div>
          )}
        </div>
        <p className="card-text">{review.review}</p>
        <small className="text-muted">
          <FaCalendar className="me-1" />
          {formatDate(review.createdAt)}
          {review.updatedAt !== review.createdAt && ' (edited)'}
        </small>
      </div>
    </div>
  );
};

export default ReviewCard;
