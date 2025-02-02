const axios = require("axios");
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, SCOPES } = require("../config/spotifyConfig");

// Generate Spotify login URL
const getLoginUrl = () => {
    return `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES.join(" "))}`;
};

// Exchange authorization code for access token
const getAccessToken = async (code) => {
    const tokenUrl = "https://accounts.spotify.com/api/token";
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", REDIRECT_URI);
    params.append("client_id", CLIENT_ID);
    params.append("client_secret", CLIENT_SECRET);

    try {
        const response = await axios.post(tokenUrl, params, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        });
        return response.data.access_token;
    } catch (error) {
        console.error("Failed to retrieve Access Token:", error.response.data);
        return null;
    }
};

module.exports = { getLoginUrl, getAccessToken };
