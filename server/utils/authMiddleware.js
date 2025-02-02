const ensureAuth = (req, res, next) => {
  console.log("🔍 DEBUG: User in Request =", req.user); // Debugging

  if (req.isAuthenticated()) { // ✅ 确保 `req.isAuthenticated()` 正确检查用户
      return next();
  }
  res.status(401).json({ error: "Not authenticated" });
};

module.exports = { ensureAuth };
