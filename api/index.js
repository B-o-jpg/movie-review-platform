const express = require('express');
const cors = require('cors');
const reviewsRouter = require('./reviews'); // your routes
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/reviews', reviewsRouter);

// For Vercel serverless functions, export the handler
module.exports = app;
