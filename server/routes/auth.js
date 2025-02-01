const express = require('express');
const passport = require('passport');
const router = express.Router();

// Route to initiate Spotify OAuth authentication
router.get('/spotify', passport.authenticate('spotify', {
    scope: ['user-read-email', 'user-read-private'],
    showDialog: true  // Forces login approval every time
}));

// Spotify OAuth callback route
router.get('/spotify/callback',
    passport.authenticate('spotify', { failureRedirect: '/login' }),
    (req, res) => {
        // Redirect user to dashboard or home after login
        res.redirect('/');
    }
);

// Logout route
router.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) return next(err);
        res.redirect('/');
    });
});

module.exports = router;
