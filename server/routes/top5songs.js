const express = require('express');
const axios = require('axios');
const router = express.Router();
const { ensureAuth } = require('../utils/authMiddleware');

// Route to fetch a user's top tracks from Spotify
router.get('/top-tracks', ensureAuth, async (req, res) => {
    if (!req.user) return res.status(401).json({ error: 'Not authenticated' });

    try {
        const accessToken = req.user.accessToken;  // Ensure user access token is stored

        const response = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            params: {
                limit: 10, // Get the top 10 tracks
                time_range: 'medium_term' // Can be 'short_term', 'medium_term', or 'long_term'
            }
        });

        res.json(response.data.items); // Send the list of top tracks
    } catch (error) {
        console.error('Error fetching top tracks:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to fetch top tracks' });
    }
});

module.exports = router;
