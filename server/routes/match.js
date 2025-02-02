const express = require("express");
const router = express.Router();
const { getMatches } = require("../controllers/matchController");
const { ensureAuth } = require("../utils/authMiddleware");

// Protected route: Get potential matches for the logged-in user
router.get("/", ensureAuth, getMatches);

module.exports = router;

router.get("/", (req, res, next) => {
    console.log("🔍 DEBUG: req.isAuthenticated() =", req.isAuthenticated());
    console.log("🔍 DEBUG: req.user =", req.user);
    next();
}, ensureAuth, getMatches);
