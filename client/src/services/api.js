import axios from 'axios';
import { auth } from './firebase';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL
});

// Add auth token to requests
api.interceptors.request.use(
  async (config) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting auth token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      console.error('Authentication error. Please log in again.');
    }
    return Promise.reject(error);
  }
);

export const reviewAPI = {
  getMovieReviews: (movieId) => api.get(`/reviews/movie/${movieId}`),
  getUserReviews: (userId) => api.get(`/reviews/user/${userId}`),
  create: (data) => api.post('/reviews', data),
  update: (id, data) => api.put(`/reviews/${id}`, data),
  delete: (id) => api.delete(`/reviews/${id}`)
};

export default api;
