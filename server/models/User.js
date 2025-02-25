const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    spotifyId: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    email: { type: String, unique: true, sparse: true }, // Some users might not have an email
    profilePicture: { type: String },

    // Spotify OAuth Tokens
    accessToken: { type: String, required: true }, // Needed for Spotify API requests
    refreshToken: { type: String, required: true }, // Needed to refresh accessToken
    tokenExpiresAt: { type: Date }, // Helps track token expiration

    // Spotify API Data
    scopes: { type: [String] }, // Permissions granted by the user
    playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Playlist" }],
    likedSongs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
    topArtists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Artist" }],
    listeningHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],

    // TEMP FIELDS FOR TESTING ///////////////////////
    topArtistNames: { type: [String], default: [] },
    topTrackNames: { type: [String], default: [] },
    //////////////////////////////////////////////////

    // New fields for matching functionality
    likedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],  // Users this user has liked
    swipedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Users this user has swiped on

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Middleware to update `updatedAt` automatically before saving
userSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model("User", userSchema);
