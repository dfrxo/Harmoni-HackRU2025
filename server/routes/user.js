// server/routes/user.js
const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../controllers/userController');
const { ensureAuth } = require('../utils/authMiddleware');

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

module.exports = router;
