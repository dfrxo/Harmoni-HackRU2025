const mongoose = require('mongoose');

const preferenceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  favoriteGenres: [{ type: String }],
  dislikedGenres: [{ type: String }],
  matchCriteria: { type: String, enum: ['same-artists', 'same-genres', 'popular-songs'] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Preference', preferenceSchema);
