const REVIEWS_KEY = 'movieReviews';
const USERS_KEY = 'movieReviewUsers';

// Helper to generate unique IDs
const generateId = () => `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Reviews API
export const reviewAPI = {
  // Get all reviews for a specific movie
  getMovieReviews: (movieId) => {
    return new Promise((resolve) => {
      const reviews = JSON.parse(localStorage.getItem(REVIEWS_KEY) || '[]');
      const movieReviews = reviews.filter(r => r.movieId === movieId);
      resolve({ data: movieReviews });
    });
  },

  // Get all reviews by a specific user
  getUserReviews: (userId) => {
    return new Promise((resolve) => {
      const reviews = JSON.parse(localStorage.getItem(REVIEWS_KEY) || '[]');
      const userReviews = reviews.filter(r => r.userId === userId);
      resolve({ data: userReviews });
    });
  },

  // Create a new review
  create: (reviewData) => {
    return new Promise((resolve) => {
      const reviews = JSON.parse(localStorage.getItem(REVIEWS_KEY) || '[]');
      const newReview = {
        id: generateId(),
        ...reviewData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      reviews.push(newReview);
      localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
      resolve({ data: newReview });
    });
  },

  // Update an existing review
  update: (reviewId, updateData) => {
    return new Promise((resolve, reject) => {
      const reviews = JSON.parse(localStorage.getItem(REVIEWS_KEY) || '[]');
      const index = reviews.findIndex(r => r.id === reviewId);
      
      if (index === -1) {
        reject(new Error('Review not found'));
        return;
      }

      reviews[index] = {
        ...reviews[index],
        ...updateData,
        updatedAt: new Date().toISOString()
      };
      
      localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
      resolve({ data: reviews[index] });
    });
  },

  // Delete a review
  delete: (reviewId) => {
    return new Promise((resolve) => {
      const reviews = JSON.parse(localStorage.getItem(REVIEWS_KEY) || '[]');
      const filtered = reviews.filter(r => r.id !== reviewId);
      localStorage.setItem(REVIEWS_KEY, JSON.stringify(filtered));
      resolve({ data: { message: 'Review deleted' } });
    });
  }
};

// User Authentication API (localStorage-based)
export const authAPI = {
  // Register a new user
  register: (email, password) => {
    return new Promise((resolve, reject) => {
      const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
      
      // Check if user already exists
      if (users.find(u => u.email === email)) {
        reject(new Error('User already exists'));
        return;
      }

      const newUser = {
        uid: generateId(),
        email,
        password: btoa(password), // Simple encoding (NOT secure for production!)
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      resolve(newUser);
    });
  },

  // Login a user
  login: (email, password) => {
    return new Promise((resolve, reject) => {
      const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
      const user = users.find(u => u.email === email && u.password === btoa(password));

      if (!user) {
        reject(new Error('Invalid email or password'));
        return;
      }

      localStorage.setItem('currentUser', JSON.stringify(user));
      resolve(user);
    });
  },

  // Logout
  logout: () => {
    return new Promise((resolve) => {
      localStorage.removeItem('currentUser');
      resolve();
    });
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }
};