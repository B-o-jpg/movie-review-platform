const express = require('express');
const axios = require('axios');
const router = express.Router();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Get popular movies
router.get('/popular', async (req, res) => {
  try {
    const page = req.query.page || 1;
    const response = await axios.get(
      `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

// Search movies
router.get('/search', async (req, res) => {
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

// Get movie details
router.get('/:id', async (req, res) => {
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/movie/${req.params.id}?api_key=${TMDB_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movie details' });
  }
});

module.exports = router;