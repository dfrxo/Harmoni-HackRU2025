// server/controllers/userController.js
const User = require('../models/User');

exports.getUserProfile = async (req, res) => {
  if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
  }

  try {
      const user = await User.findById(req.user.id).select("-accessToken"); // Exclude access token for security
      if (!user) {
          return res.status(404).json({ error: "User not found" });
      }

      res.json(user);
  } catch (err) {
      console.error("Error fetching user profile:", err);
      res.status(500).json({ error: "Server error" });
  }
};

// Controller to update user's Spotify data
exports.updateSpotifyData = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: "Not authenticated" });
    }

    const { topArtists, topTracks } = req.body;
    try {
        // Update the user's listening data fields if provided
        if (topArtists) req.user.topArtistsNames = topArtists;
        if (topTracks) req.user.topTracksNames = topTracks;

        await req.user.save();
        res.json({ message: "Spotify data updated successfully", user: req.user });
    } catch (error) {
        console.error("Error updating Spotify data:", error);
        res.status(500).json({ error: "Server error" });
    }
};
