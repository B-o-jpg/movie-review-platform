import React from 'react';
import './StarRating.css';

const StarRating = ({ rating, onRatingChange, editable = false }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="star-rating">
      {stars.map((star) => (
        <span
          key={star}
          className={`star ${star <= rating ? 'filled' : ''} ${editable ? 'editable' : ''}`}
          onClick={() => editable && onRatingChange(star)}
          style={{ 
            cursor: editable ? 'pointer' : 'default',
            fontSize: '28px',
            color: star <= rating ? '#ffc107' : '#e4e5e9',
            marginRight: '4px'
          }}
        >
          ★
        </span>
      ))}
      <span className="rating-text ms-2">({rating}/5)</span>
    </div>
  );
};

export default StarRating;
