const ensureAuth = (req, res, next) => {
  console.log("🔍 DEBUG: req.isAuthenticated() =", req.isAuthenticated());
  console.log("🔍 DEBUG: req.user =", req.user);

  if (req.isAuthenticated() && req.user) { 
      return next();
  }
  res.status(401).json({ error: "Not authenticated" });
};

module.exports = { ensureAuth };
