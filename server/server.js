const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Movie Review API is running' });
});

// Movies routes (proxy to TMDB)
const axios = require('axios');
const TMDB_API_KEY = process.env.TMDB_API_KEY || '50e7366ffd9ab998d2f4ed2b28160001';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

app.get('/api/movies/popular', async (req, res) => {
  try {
    const page = req.query.page || 1;
    const response = await axios.get(
      `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}`
    );
    res.json(response.data);
  } catch (error) {
    console.error('TMDB Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

app.get('/api/movies/search', async (req, res) => {
  try {
    const query = req.query.q;
    const response = await axios.get(
      `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${query}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search movies' });
  }
});

app.get('/api/movies/:id', async (req, res) => {
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/movie/${req.params.id}?api_key=${TMDB_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movie details' });
  }
});

// MOCK REVIEWS - In-memory storage (no authentication required for now)
let mockReviews = [];

// Get reviews for a movie (PUBLIC - no auth required)
app.get('/api/reviews/movie/:movieId', (req, res) => {
  try {
    const movieReviews = mockReviews.filter(r => r.movieId === req.params.movieId);
    res.json(movieReviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Get user's reviews (PROTECTED - but simplified for now)
app.get('/api/reviews/user/:userId', (req, res) => {
  try {
    // For now, return all reviews for testing
    // In production, you'd verify the token and userId
    const userReviews = mockReviews.filter(r => r.userId === req.params.userId);
    res.json(userReviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user reviews' });
  }
});

// Create a review (SIMPLIFIED - no strict auth for testing)
app.post('/api/reviews', (req, res) => {
  try {
    const { movieId, movieTitle, rating, reviewText, userId, userEmail } = req.body;
    
    const review = {
      id: Date.now().toString(),
      movieId: movieId || 'unknown',
      movieTitle: movieTitle || 'Unknown Movie',
      userId: userId || 'guest',
      userEmail: userEmail || 'guest@example.com',
      rating: rating || 5,
      reviewText: reviewText || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    mockReviews.push(review);
    console.log('Review created:', review);
    res.status(201).json(review);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ error: 'Failed to create review' });
  }
});

// Update a review
app.put('/api/reviews/:id', (req, res) => {
  try {
    const { rating, reviewText } = req.body;
    const index = mockReviews.findIndex(r => r.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Review not found' });
    }
    
    mockReviews[index] = {
      ...mockReviews[index],
      rating: rating || mockReviews[index].rating,
      reviewText: reviewText || mockReviews[index].reviewText,
      updatedAt: new Date().toISOString()
    };
    
    res.json(mockReviews[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update review' });
  }
});

// Delete a review
app.delete('/api/reviews/:id', (req, res) => {
  try {
    const initialLength = mockReviews.length;
    mockReviews = mockReviews.filter(r => r.id !== req.params.id);
    
    if (mockReviews.length === initialLength) {
      return res.status(404).json({ error: 'Review not found' });
    }
    
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete review' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📊 API endpoints ready!`);
  console.log(`🎬 TMDB API Key: ${TMDB_API_KEY ? 'Loaded' : 'Missing'}`);
});

module.exports = app;