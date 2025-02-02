require('dotenv').config();

module.exports = {
    CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
    REDIRECT_URI: process.env.SPOTIFY_REDIRECT_URI || "http://localhost:8333/spotify/callback",
    SCOPES: ["user-top-read", "user-library-read"]
};
