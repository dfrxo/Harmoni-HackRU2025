const express = require("express");
const { getLoginUrl, getAccessToken } = require("../utils/spotifyAuth");
const { getUserMusicData } = require("../utils/spotifyData");
const SpotifyUser = require("../models/spotifyUser");

const router = express.Router();

// Redirect user to Spotify Login
router.get("/login", (req, res) => {
    res.redirect(getLoginUrl());
});

// Handle Spotify Callback and store user data
router.get("/callback", async (req, res) => {
    const code = req.query.code;
    const accessToken = await getAccessToken(code);
    if (!accessToken) {
        return res.status(400).send("Error retrieving access token");
    }

    const userData = await getUserMusicData(accessToken);

    // Save user data to MongoDB
    const user = await SpotifyUser.findOneAndUpdate(
        { spotifyId: req.query.state }, // Use Spotify user ID
        userData,
        { upsert: true, new: true }
    );

    res.json(user);
});

// ✅ Add `/spotify/user` endpoint to retrieve stored user data
router.get("/user", async (req, res) => {
    try {
        const users = await SpotifyUser.find(); // Retrieve all users
        res.json(users);
    } catch (error) {
        console.error("❌ Error fetching user data:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
