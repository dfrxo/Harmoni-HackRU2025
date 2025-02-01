// server/app.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const matchRoutes = require('./routes/match');

// Initialize Express app
const app = express();

// Middleware: Body parsing & URL encoding
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session setup for Passport.js (adjust options as needed)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Import Spotify OAuth configuration (see section 4)
require('./utils/spotifyPassport');

// MongoDB connection using Mongoose
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/match', matchRoutes);

// Basic test route
app.get('/', (req, res) => res.send('Welcome to Harmoni backend'));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 8333;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
