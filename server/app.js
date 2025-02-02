require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");

// Import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const matchRoutes = require("./routes/match");
const spotifyRoutes = require("./routes/spotify");

const app = express();

// Middleware: Body parsing & URL encoding
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// ✅ Session setup for Passport.js
app.use(
  session({
    secret: process.env.SESSION_SECRET || "yourSecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Change to `true` if using HTTPS
  })
);

// ✅ Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Import Spotify OAuth configuration
require("./utils/spotifyPassport");

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Define routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/match", matchRoutes);
app.use("/spotify", spotifyRoutes);

// Basic test route
app.get("/", (req, res) => res.send("🎵 Welcome to Harmoni backend"));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start server
const PORT = process.env.PORT || 8333;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
