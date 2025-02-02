// server/routes/user.js
const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../controllers/userController');
const { ensureAuth } = require('../utils/authMiddleware');
const User = require('../models/User');


router.get("/profile", ensureAuth, getUserProfile);





// POST - Create a new user
router.post('/add', async (req, res) => {
    try {
        const { spotifyId, displayName, email } = req.body;

        // Check if user already exists
        let user = await User.findOne({ spotifyId });
        if (user) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Create new user
        user = new User({
            spotifyId,
            displayName,
            email
        });

        await user.save();
        res.status(201).json(user);
    } catch (err) {
        console.error('Error adding user:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

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
