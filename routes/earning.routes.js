const express = require("express");
const Earning = require("../models/Earning");
const router = express.Router();

// Get user earnings
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const earnings = await Earning.find({ userId });
    res.status(200).json(earnings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all earnings
router.get("/", async (req, res) => {
  try {
    const earnings = await Earning.find();
    res.status(200).json(earnings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
