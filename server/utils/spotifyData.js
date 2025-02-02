const axios = require("axios");

// Fetch Top Tracks
const getTopTracks = async (accessToken) => {
    try {
        const response = await axios.get("https://api.spotify.com/v1/me/top/tracks?limit=10", {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        return response.data.items.map(track => track.name);
    } catch (error) {
        console.error("Failed to fetch Top Tracks:", error);
        return [];
    }
};

// Fetch Top Artists
const getTopArtists = async (accessToken) => {
    try {
        const response = await axios.get("https://api.spotify.com/v1/me/top/artists?limit=10", {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        return response.data.items.map(artist => artist.name);
    } catch (error) {
        console.error("Failed to fetch Top Artists:", error);
        return [];
    }
};

// Fetch Top Albums
const getTopAlbums = async (accessToken) => {
    try {
        const response = await axios.get("https://api.spotify.com/v1/me/albums?limit=10", {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        return response.data.items.map(album => album.album.name);
    } catch (error) {
        console.error("Failed to fetch Top Albums:", error);
        return [];
    }
};

// Fetch Top Genres
const getTopGenres = async (accessToken) => {
    try {
        const response = await axios.get("https://api.spotify.com/v1/me/top/artists?limit=10", {
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        let genres = response.data.items.flatMap(artist => artist.genres);
        return [...new Set(genres)]; // Remove duplicates
    } catch (error) {
        console.error("Failed to fetch Top Genres:", error);
        return [];
    }
};

// Fetch All User Music Data
const getUserMusicData = async (accessToken) => {
    return {
        topTracks: await getTopTracks(accessToken),
        topArtists: await getTopArtists(accessToken),
        topAlbums: await getTopAlbums(accessToken),
        topGenres: await getTopGenres(accessToken)
    };
};

module.exports = { getUserMusicData };
