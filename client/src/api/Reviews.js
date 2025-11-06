// src/api/reviews.js

import axios from "axios";

const API_BASE_URL = '/api';


export const fetchReviews = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/reviews`);
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
};
