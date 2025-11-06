const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');
const authenticateUser = require('../middleware/auth');

// Get all reviews
router.get('/', async (req, res) => {
  try {
    const reviewsSnapshot = await db.collection('reviews')
      .orderBy('createdAt', 'desc')
      .get();
    
    const reviews = [];
    reviewsSnapshot.forEach(doc => {
      reviews.push({ id: doc.id, ...doc.data() });
    });
    
    res.json(reviews);
  } catch (error) {
    console.error('Error getting reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Get reviews for a specific movie
router.get('/movie/:movieId', async (req, res) => {
  try {
    const { movieId } = req.params;
    const reviewsSnapshot = await db.collection('reviews')
      .where('movieId', '==', movieId)
      .orderBy('createdAt', 'desc')
      .get();
    
    const reviews = [];
    reviewsSnapshot.forEach(doc => {
      reviews.push({ id: doc.id, ...doc.data() });
    });
    
    res.json(reviews);
  } catch (error) {
    console.error('Error getting movie reviews:', error);
    res.status(500).json({ error: 'Failed to fetch movie reviews' });
  }
});

// Get reviews by user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const reviewsSnapshot = await db.collection('reviews')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();
    
    const reviews = [];
    reviewsSnapshot.forEach(doc => {
      reviews.push({ id: doc.id, ...doc.data() });
    });
    
    res.json(reviews);
  } catch (error) {
    console.error('Error getting user reviews:', error);
    res.status(500).json({ error: 'Failed to fetch user reviews' });
  }
});

// Create review (protected)
router.post('/', authenticateUser, async (req, res) => {
  try {
    const { movieId, movieTitle, moviePoster, rating, review } = req.body;
    const userId = req.user.uid;
    const userEmail = req.user.email;
    
    // Validation
    if (!movieId || !movieTitle || !rating || !review) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }
    
    const reviewData = {
      userId,
      userEmail,
      movieId,
      movieTitle,
      moviePoster: moviePoster || '',
      rating: parseFloat(rating),
      review,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const docRef = await db.collection('reviews').add(reviewData);
    
    res.status(201).json({ 
      id: docRef.id, 
      ...reviewData,
      message: 'Review created successfully' 
    });
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ error: 'Failed to create review' });
  }
});

// Update review (protected)
router.put('/:id', authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, review } = req.body;
    const userId = req.user.uid;
    
    // Get existing review
    const reviewDoc = await db.collection('reviews').doc(id).get();
    
    if (!reviewDoc.exists) {
      return res.status(404).json({ error: 'Review not found' });
    }
    
    const reviewData = reviewDoc.data();
    
    // Check ownership
    if (reviewData.userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized to update this review' });
    }
    
    // Validation
    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }
    
    const updateData = {
      ...(rating && { rating: parseFloat(rating) }),
      ...(review && { review }),
      updatedAt: new Date().toISOString(),
    };
    
    await db.collection('reviews').doc(id).update(updateData);
    
    res.json({ 
      id, 
      ...reviewData,
      ...updateData,
      message: 'Review updated successfully' 
    });
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ error: 'Failed to update review' });
  }
});

// Delete review (protected)
router.delete('/:id', authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.uid;
    
    // Get existing review
    const reviewDoc = await db.collection('reviews').doc(id).get();
    
    if (!reviewDoc.exists) {
      return res.status(404).json({ error: 'Review not found' });
    }
    
    const reviewData = reviewDoc.data();
    
    // Check ownership
    if (reviewData.userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized to delete this review' });
    }
    
    await db.collection('reviews').doc(id).delete();
    
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ error: 'Failed to delete review' });
  }
});

module.exports = router;