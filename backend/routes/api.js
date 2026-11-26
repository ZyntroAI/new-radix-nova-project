const express = require('express');
const rateLimit = require('express-rate-limit');

const router = express.Router();

// ✅ Create rate limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many requests',
    message: 'Please try again later.'
  }
});

// ✅ Apply to your route
router.get("/items", apiLimiter, async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

module.exports = router;
