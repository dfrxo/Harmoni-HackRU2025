// server/routes/user.js
const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../controllers/userController');
const { ensureAuth } = require('../utils/authMiddleware');

// Protected route: Get current user profile
router.get('/profile', ensureAuth, getUserProfile);

module.exports = router;
