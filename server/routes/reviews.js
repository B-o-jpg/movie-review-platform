const express = require('express');
const { db } = require('../config/firebase');
const verifyToken = require('../middleware/auth');
const router = express.Router();

// Get reviews for a movie
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
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Get user's reviews
router.get('/user/:userId', verifyToken, async (req, res) => {
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
    res.status(500).json({ error: 'Failed to fetch user reviews' });
  }
});

// Create a review
router.post('/', verifyToken, async (req, res) => {
  try {
    const { movieId, movieTitle, rating, reviewText } = req.body;
    const userId = req.user.uid;
    const userEmail = req.user.email;

    const reviewData = {
      movieId,
      movieTitle,
      userId,
      userEmail,
      rating,
      reviewText,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const docRef = await db.collection('reviews').add(reviewData);
    res.status(201).json({ id: docRef.id, ...reviewData });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create review' });
  }
});

// Update a review
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, reviewText } = req.body;
    const userId = req.user.uid;

    const reviewRef = db.collection('reviews').doc(id);
    const review = await reviewRef.get();

    if (!review.exists) {
      return res.status(404).json({ error: 'Review not found' });
    }

    if (review.data().userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await reviewRef.update({
      rating,
      reviewText,
      updatedAt: new Date().toISOString()
    });

    res.json({ message: 'Review updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update review' });
  }
});

// Delete a review
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.uid;

    const reviewRef = db.collection('reviews').doc(id);
    const review = await reviewRef.get();

    if (!review.exists) {
      return res.status(404).json({ error: 'Review not found' });
    }

    if (review.data().userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await reviewRef.delete();
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete review' });
  }
});

module.exports = router;