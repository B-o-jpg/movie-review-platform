import React, { useState, useEffect, useCallback } from 'react';
import tmdbAPI from '../services/tmdbApi';
import MovieCard from '../components/MovieCard';
import './Movies.css';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  const fetchMovies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await tmdbAPI.getPopular(page);
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setError('Failed to load movies. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      fetchMovies();
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      const response = await tmdbAPI.search(searchQuery);
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error searching movies:', error);
      setError('Failed to search movies.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="movies-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Popular Movies</h1>
        </div>
        
        <form onSubmit={handleSearch} className="search-form mb-4">
          <div className="search-wrapper">
            <input
              type="text"
              className="search-input"
              placeholder="Search for a movie..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-button" type="submit">
              Search
            </button>
          </div>
        </form>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {loading ? (
          <div className="loading-container">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {/* TMDB Grid Layout */}
            <div className="tmdb-movie-grid">
              {movies.length > 0 ? (
                movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))
              ) : (
                <div className="no-results">
                  <p>No movies found.</p>
                </div>
              )}
            </div>
            
            {movies.length > 0 && (
              <div className="pagination-controls">
                <button 
                  className="btn btn-outline-primary me-2" 
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  ← Previous
                </button>
                <span className="page-info">Page {page}</span>
                <button 
                  className="btn btn-outline-primary ms-2" 
                  onClick={() => setPage(p => p + 1)}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Movies;