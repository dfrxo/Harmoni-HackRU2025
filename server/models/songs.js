const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  spotifyId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist' },
  album: { type: String },
  genre: { type: String },
  duration: { type: Number }, // in seconds
  popularity: { type: Number }, // Spotify score
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Song', songSchema);
