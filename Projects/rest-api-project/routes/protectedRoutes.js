const express = require("express");
const router = express.Router();
const Item = require("../models/item");
const authenticateToken = require("../middleware/authMiddleware");

// item routes route
router.get("/items/:id", authenticateToken, async (req, res) => {
  try {
    const item = await Item.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Protected test route
router.get("/protected", authenticateToken, (req, res) => {
  res.json({
    message: "You accessed a protected route!",
    user: req.user,
  });
});

module.exports = router;

