import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import tmdbApi from '../services/tmdbApi';
import MovieCard from '../components/MovieCard';
import './Home.css';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  const fetchTrendingMovies = async () => {
    try {
      const data = await tmdbApi.getTrendingMovies();
      setTrendingMovies(data.results.slice(0, 8));
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section - TMDB Style */}
      <section className="hero-section">
        <div className="hero-overlay">
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">Welcome to MovieReview</h1>
              <p className="hero-subtitle">
                Discover, rate, and review your favorite movies
              </p>
              <div className="hero-search-wrapper">
                <Link to="/movies" className="hero-search-link">
                  <input 
                    type="text" 
                    className="hero-search-input" 
                    placeholder="Search for a movie, tv show, person..."
                    readOnly
                  />
                  <button className="hero-search-button">Search</button>
                </Link>
              </div>
              <div className="hero-buttons">
                <Link to="/movies" className="btn btn-hero-primary">
                  Browse Movies
                </Link>
                <Link to="/register" className="btn btn-hero-outline">
                  Join Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="trending-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Trending This Week</h2>
            <p className="section-subtitle">Most popular movies right now</p>
          </div>
          
          {loading ? (
            <div className="loading-container">
              <div className="spinner-border text-primary"></div>
              <p>Loading trending movies...</p>
            </div>
          ) : (
            <div className="movies-grid">
              {trendingMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title-center">Why MovieReview?</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">🎬</div>
                <h3>Discover Movies</h3>
                <p>Browse thousands of movies from the TMDB database</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">⭐</div>
                <h3>Rate & Review</h3>
                <p>Share your thoughts and ratings with the community</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">📝</div>
                <h3>Track History</h3>
                <p>Keep track of all your reviews in one place</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container text-center">
          <h2 className="cta-title">Ready to start reviewing?</h2>
          <p className="cta-subtitle">Join thousands of movie enthusiasts today</p>
          <Link to="/register" className="btn btn-cta">
            Create Account
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;