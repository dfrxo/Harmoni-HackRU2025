// server/app.js
require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const matchRoutes = require('./routes/match');
//const spotifyRoutes = require('./routes/spotify');

const cors = require('cors');

app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://harmoni-hackru2025.netlify.app', // Replace with your Netlify domain
  credentials: true
}));



// Initialize Express app

const schema = mongoose.model('User').schema;
console.log(schema);

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
//app.use('/spotify', spotifyRoutes);



// Basic test route
app.get('/', (req, res) => res.send('Welcome to Harmoni backend'));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});