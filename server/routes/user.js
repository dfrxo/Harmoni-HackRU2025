// server/routes/user.js
const express = require('express');
const router = express.Router();
const { getUserProfile, updateSpotifyData} = require('../controllers/userController');
const { ensureAuth } = require('../utils/authMiddleware');
const User = require('../models/User');


// GET all users
router.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Protected route: Get current user profile
router.get('/profile', ensureAuth, getUserProfile);

// NEW: Endpoint to update Spotify data (protected)
router.post('/spotify-data', ensureAuth, updateSpotifyData);

module.exports = router;
