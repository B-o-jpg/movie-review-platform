const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Import reviews route
const reviewsRoute = require('./routes/reviews');
app.use('/reviews', reviewsRoute);

// Export API
exports.api = functions.https.onRequest(app);
