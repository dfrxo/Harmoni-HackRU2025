require("dotenv").config();
const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;
const User = require("../models/User");

// Debugging: Check if environment variables are loaded
console.log("🔍 DEBUG: SPOTIFY_CLIENT_ID =", process.env.SPOTIFY_CLIENT_ID);
console.log("🔍 DEBUG: SPOTIFY_CLIENT_SECRET =", process.env.SPOTIFY_CLIENT_SECRET ? "Loaded" : "Missing");
console.log("🔍 DEBUG: SPOTIFY_REDIRECT_URI =", process.env.SPOTIFY_REDIRECT_URI);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

passport.use(new SpotifyStrategy({
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: process.env.SPOTIFY_REDIRECT_URI
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ spotifyId: profile.id });

        if (!user) {
            user = new User({
                spotifyId: profile.id,
                displayName: profile.displayName,
                email: profile.emails ? profile.emails[0].value : ''
            });
            await user.save();
        }

        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
}));

module.exports = passport;
