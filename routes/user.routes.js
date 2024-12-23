const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Add a new user
router.post("/", async (req, res) => {
  try {
    const { name, referredBy } = req.body;

    // Validate referral
    if (referredBy) {
      const parent = await User.findById(referredBy);
      if (!parent || parent.directReferrals >= 8) {
        return res
          .status(400)
          .json({ error: "Invalid or maxed-out referral." });
      }
      parent.directReferrals++;
      await parent.save();
    }
    let id = await User.countDocuments();
    id = id + 1;

    const user = await User.create({ id, name, referredBy });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user details
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("referredBy");
    if (!user) return res.status(404).json({ error: "User not found." });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
