const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  timezone: { type: String, default: "UTC" },
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);


