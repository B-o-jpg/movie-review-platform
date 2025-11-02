import axios from 'axios';

const TMDB_API_KEY = '50e7366ffd9ab998d2f4ed2b28160001';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Helper function to get image URLs
export const getImageUrl = (path, size = 'w500') => {
  if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

// API methods
const tmdbAPI = {
  getPopular: async (page = 1) => {
    return axios.get(`${TMDB_BASE_URL}/movie/popular`, {
      params: { api_key: TMDB_API_KEY, page }
    });
  },
  
  search: async (query) => {
    return axios.get(`${TMDB_BASE_URL}/search/movie`, {
      params: { api_key: TMDB_API_KEY, query }
    });
  },
  
  getDetails: async (id) => {
    return axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
      params: { api_key: TMDB_API_KEY }
    });
  },
  
  getImageUrl: getImageUrl
};

export default tmdbAPI;
