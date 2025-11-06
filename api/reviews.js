const express = require('express');
const router = express.Router();
const { db } = require('../functions/config/firebase'); // Make sure firebase is configured
const authenticateUser = require('../functions/middleware/auth');

// Get all reviews
router.get('/', async (req, res) => {
  try {
    const reviewsSnapshot = await db.collection('reviews').orderBy('createdAt', 'desc').get();
    const reviews = reviewsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(reviews);
  } catch (error) {
    console.error('Error getting reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Add other routes (movie/:movieId, user/:userId, POST, PUT, DELETE) here...

module.exports = router;
