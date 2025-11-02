const express = require('express');
const router = express.Router();

// In-memory "database" for now
let reviews = [
  { id: 1, title: "Inception", rating: 5, review: "Great movie!" },
  { id: 2, title: "Matrix", rating: 4, review: "Classic sci-fi." }
];

// GET all reviews
router.get('/', (req, res) => {
  res.json(reviews);
});

// GET single review by id
router.get('/:id', (req, res) => {
  const review = reviews.find(r => r.id === parseInt(req.params.id));
  if (!review) return res.status(404).json({ error: "Review not found" });
  res.json(review);
});

// POST a new review
router.post('/', (req, res) => {
  const { title, rating, review } = req.body;
  if (!title || !rating || !review) {
    return res.status(400).json({ error: "Title, rating and review are required" });
  }
  const newReview = {
    id: reviews.length ? reviews[reviews.length - 1].id + 1 : 1,
    title,
    rating,
    review
  };
  reviews.push(newReview);
  res.status(201).json(newReview);
});

// PUT update a review
router.put('/:id', (req, res) => {
  const review = reviews.find(r => r.id === parseInt(req.params.id));
  if (!review) return res.status(404).json({ error: "Review not found" });

  const { title, rating, review: reviewText } = req.body;
  if (title) review.title = title;
  if (rating) review.rating = rating;
  if (reviewText) review.review = reviewText;

  res.json(review);
});

// DELETE a review
router.delete('/:id', (req, res) => {
  const index = reviews.findIndex(r => r.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Review not found" });

  const deleted = reviews.splice(index, 1);
  res.json(deleted[0]);
});

module.exports = router;
