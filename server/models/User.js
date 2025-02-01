const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  spotifyId: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  email: { type: String, unique: true },
  profilePicture: { type: String },
  playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' }],
  likedSongs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
  topArtists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artist' }],
  listeningHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
