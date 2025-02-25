// server/routes/match.js
const express = require('express');
const router = express.Router();
const { getMatches, recordSwipe} = require('../controllers/matchController');
const { ensureAuth } = require('../utils/authMiddleware');

// Protected route: Get potential matches for the logged-in user
router.get('/', ensureAuth, getMatches);

// Endpoint to record a swipe action (protected)
router.post('/swipe', ensureAuth, recordSwipe);

module.exports = router;
