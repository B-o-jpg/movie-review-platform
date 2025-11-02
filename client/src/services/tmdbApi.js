import axios from 'axios';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY || '50e7366ffd9ab998d2f4ed2b28160001';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

console.log('Using API Key:', API_KEY);

export const tmdbApi = {
  getPopularMovies: async (page = 1) => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/popular`, {
        params: {
          api_key: API_KEY,
          page,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      throw error;
    }
  },

  getMovieDetails: async (movieId) => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
        params: {
          api_key: API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  },

  searchMovies: async (query, page = 1) => {
    try {
      const response = await axios.get(`${BASE_URL}/search/movie`, {
        params: {
          api_key: API_KEY,
          query,
          page,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  },

  getTrendingMovies: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/trending/movie/week`, {
        params: {
          api_key: API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching trending movies:', error);
      throw error;
    }
  },

  getImageUrl: (path, size = 'w500') => {
    if (!path) return 'https://via.placeholder.com/500x750/032541/01b4e4?text=No+Image';
    return `${IMAGE_BASE_URL}/${size}${path}`;
  },
};

export default tmdbApi;