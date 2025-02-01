const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://admin:admin123@hackru-spring25.l0yz9.mongodb.net/musicMatcherDB?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("✅ MongoDB connected successfully");
});

db.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
});

module.exports = db;
