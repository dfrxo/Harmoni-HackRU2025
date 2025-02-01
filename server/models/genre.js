const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Ensures no duplicates
  description: { type: String }, // Optional description
  relatedGenres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }] // For connections between genres
});

module.exports = mongoose.model('Genre', genreSchema);
