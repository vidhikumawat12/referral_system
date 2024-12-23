const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: { type: Number, default: null },
  name: { type: String, required: true },
  referredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  directReferrals: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
