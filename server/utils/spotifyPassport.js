// server/utils/spotifyPassport.js
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const User = require('../models/User');

// Serialize and deserialize user for session support
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(err => done(err, null));
});

// Configure the Spotify strategy
passport.use(new SpotifyStrategy({
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: process.env.SPOTIFY_CALLBACK_URL,
  },
  function(accessToken, refreshToken, expires_in, profile, done) {
    // Search for an existing user or create a new one
    User.findOne({ spotifyId: profile.id })
      .then(user => {
        if (user) {
          return done(null, user);
        } else {
          const newUser = new User({
            spotifyId: profile.id,
            displayName: profile.displayName,
            email: profile.emails ? profile.emails[0].value : '',
            // You can store additional details like profile image if needed
          });
          newUser.save()
            .then(user => done(null, user))
            .catch(err => done(err, null));
        }
      })
      .catch(err => done(err, null));
  }
));
