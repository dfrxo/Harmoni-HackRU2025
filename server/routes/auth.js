// server/routes/auth.js
const express = require('express');
const passport = require('passport');
const router = express.Router();

// Initiate Spotify OAuth authentication
router.get('/spotify', passport.authenticate('spotify', {
  scope: ['user-read-email', 'user-read-private'],
  showDialog: true  // forces approval prompt
}));

// Handle the callback from Spotify
router.get('/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  (req, res) => {
    // On successful authentication, redirect as needed (e.g., to your dashboard)
    res.redirect('/');
  }
);

// Logout route to end session
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
