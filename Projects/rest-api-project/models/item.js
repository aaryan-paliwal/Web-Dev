const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true, default: 0 },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdByRole: { type: String, enum: ["user", "admin"], required: true },
});

module.exports = mongoose.models.Item || mongoose.model("Item", itemSchema);


