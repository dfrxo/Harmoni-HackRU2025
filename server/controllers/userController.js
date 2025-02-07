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

