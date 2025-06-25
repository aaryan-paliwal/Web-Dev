const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  username: String,
  action: String,
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item", default: null },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.models.Activity || mongoose.model("Activity", activitySchema);

