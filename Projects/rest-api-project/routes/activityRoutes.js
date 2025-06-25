const express = require("express");
const router = express.Router();
const activityController = require("../controllers/activityController");
const authenticate = require("../middleware/authMiddleware");

router.get("/", authenticate, activityController.getActivityLogs);

module.exports = router;

