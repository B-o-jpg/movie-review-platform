import React from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../services/tmdbApi';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const imageUrl = getImageUrl(movie.poster_path);
  const releaseDate = movie.release_date 
    ? new Date(movie.release_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'TBA';

  return (
    <div className="tmdb-movie-card">
      <div className="card-inner">
        {/* Poster Image */}
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

        {/* Rating Circle - TMDB Style */}
        <div className="consensus-wrapper">
          <div className="rating-circle">
            <div className="rating-content">
              <span className="rating-number">{Math.round(movie.vote_average * 10)}</span>
              <span className="rating-percent">%</span>
            </div>
          </div>
        </div>

        {/* Movie Info */}
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