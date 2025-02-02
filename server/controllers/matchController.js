const SpotifyUser = require("../models/spotifyUser");

// Function to calculate Jaccard Similarity
const jaccardSimilarity = (setA, setB) => {
    if (!setA || !setB) return 0;
    const intersection = new Set([...setA].filter(x => setB.has(x))).size;
    const union = new Set([...setA, ...setB]).size;
    return union === 0 ? 0 : intersection / union;
};

// Function to get potential matches for the logged-in user
const getMatches = async (req, res) => {
    try {
        const users = await SpotifyUser.find();
        const results = [];

        for (let i = 0; i < users.length; i++) {
            for (let j = i + 1; j < users.length; j++) {
                const userA = users[i];
                const userB = users[j];

                const trackSimilarity = jaccardSimilarity(new Set(userA.topTracks), new Set(userB.topTracks));
                const artistSimilarity = jaccardSimilarity(new Set(userA.topArtists), new Set(userB.topArtists));
                const genreSimilarity = jaccardSimilarity(new Set(userA.topGenres), new Set(userB.topGenres));

                const matchScore = (trackSimilarity * 0.5) + (artistSimilarity * 0.3) + (genreSimilarity * 0.2);

                results.push({
                    user1: userA.displayName || userA.spotifyId,
                    user2: userB.displayName || userB.spotifyId,
                    matchScore: matchScore.toFixed(2)
                });
            }
        }

        results.sort((a, b) => b.matchScore - a.matchScore);
        res.json(results);
    } catch (error) {
        console.error("❌ Error calculating matches:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getMatches };
