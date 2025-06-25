const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  action: String,
  metadata: Object,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.models.ActivityLog || mongoose.model("ActivityLog", activityLogSchema);


