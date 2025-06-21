const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

// Sample protected route
router.get("/protected", verifyToken, (req, res) => {
  res.json({
    message: "You accessed a protected route!",
    user: req.user, // Contains userId, iat, exp
  });
});

module.exports = router;
