// api/reviews.js
const express = require('express');
const serverless = require('serverless-http'); // Install with npm i serverless-http
const { db } = require('../config/firebase'); // adjust path
const authenticateUser = require('../middleware/auth');

const app = express();
app.use(express.json());

// --- All your routes here ---
app.get('/', async (req, res) => {
  try {
    const reviewsSnapshot = await db.collection('reviews').orderBy('createdAt', 'desc').get();
    const reviews = [];
    reviewsSnapshot.forEach(doc => reviews.push({ id: doc.id, ...doc.data() }));
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ... (rest of your routes) ...

module.exports = app;
module.exports.handler = serverless(app); // this is needed for Vercel
