import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  // Build image URL directly - no function call needed
  const imageUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750/032541/01b4e4?text=No+Image';
    
  const releaseDate = movie.release_date 
    ? new Date(movie.release_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'TBA';

  return (
    <div className="tmdb-movie-card">
      <div className="card-inner">
        <div className="image-wrapper">
          <Link to={`/movie/${movie.id}`}>
            <img 
              src={imageUrl}
              alt={movie.title}
              className="poster-image"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/500x750?text=No+Image';
              }}
            />
          </Link>
        </div>

        <div className="consensus-wrapper">
          <div className="rating-circle">
            <div className="rating-content">
              <span className="rating-number">{Math.round(movie.vote_average * 10)}</span>
              <span className="rating-percent">%</span>
            </div>
          </div>
        </div>

        <div className="card-content">
          <Link to={`/movie/${movie.id}`} className="title-link">
            <h2 className="movie-title">{movie.title}</h2>
          </Link>
          <p className="release-date">{releaseDate}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;