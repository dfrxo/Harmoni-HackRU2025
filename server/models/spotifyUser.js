const mongoose = require("mongoose");

const SpotifyUserSchema = new mongoose.Schema({
    spotifyId: { type: String, required: true, unique: true },
    topTracks: [String],
    topArtists: [String],
    topAlbums: [String],
    topGenres: [String]
});

module.exports = mongoose.model("SpotifyUser", SpotifyUserSchema);
