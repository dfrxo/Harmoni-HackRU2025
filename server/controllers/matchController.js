// server/controllers/matchController.js
const User = require('../models/User');

exports.getMatches = async (req, res) => {
  if (!req.user) return res.status(401).json({ error: 'Not authenticated' });

  try {
    // Retrieve all users except the current one
    const users = await User.find({ _id: { $ne: req.user._id } });

    // Current user's top artists
    const currentUserArtists = req.user.topArtists || [];

    // Create a list of matches with a similarity score
    const matches = users.map(user => {
      const otherUserArtists = user.topArtists || [];
      const commonArtists = currentUserArtists.filter(artist => otherUserArtists.includes(artist));
      const similarityScore = commonArtists.length;  // Simple count of common artists
      return {
        user,
        similarityScore
      };
    });

    // Sort by highest similarity score
    matches.sort((a, b) => b.similarityScore - a.similarityScore);

    // Optionally filter out users with zero similarity
    const filteredMatches = matches.filter(match => match.similarityScore > 0);

    res.json(filteredMatches);
  } catch (err) {
    console.error("Error fetching matches:", err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.recordSwipe = async (req, res) => {
  if (!req.user) return res.status(401).json({ error: 'Not authenticated' });

  const { targetUserId, action } = req.body; // action should be 'like' or 'dislike'

  try {
    // Record that the current user has swiped on the target user
    if (!req.user.swipedUsers.includes(targetUserId)) {
      req.user.swipedUsers.push(targetUserId);
    }

    // If the swipe is a "like", add to likedUsers
    if (action === 'like' && !req.user.likedUsers.includes(targetUserId)) {
      req.user.likedUsers.push(targetUserId);
    }

    await req.user.save();

    // Optionally, check if the target user also liked the current user for a mutual match
    const targetUser = await User.findById(targetUserId);
    let mutualMatch = false;
    if (action === 'like' && targetUser && targetUser.likedUsers.includes(req.user._id)) {
      mutualMatch = true;
    }

    res.json({ message: "Swipe recorded", mutualMatch });
  } catch (err) {
    console.error("Error recording swipe:", err);
    res.status(500).json({ error: 'Server error' });
  }
};