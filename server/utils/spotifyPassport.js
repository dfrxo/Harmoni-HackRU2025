const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const User = require('../models/User');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => done(null, user))
        .catch(err => done(err, null));
});

passport.use(new SpotifyStrategy({
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: process.env.SPOTIFY_CALLBACK_URL
  },
  async (accessToken, refreshToken, expires_in, profile, done) => {
    try {
      let user = await User.findOne({ spotifyId: profile.id });
      if (!user) {
        user = new User({
          spotifyId: profile.id,
          displayName: profile.displayName,
          email: profile.emails ? profile.emails[0].value : '',
          profilePicture: profile.photos ? profile.photos[0] : null
          // Optionally store the access token if you need it later
          // accessToken: accessToken
        });
      } else {
        // Update data if needed
        user.accessToken = accessToken;
      }
      await user.save();
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));



passport.use(new SpotifyStrategy({
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: process.env.SPOTIFY_CALLBACK_URL
},
async (accessToken, refreshToken, expires_in, profile, done) => {
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
