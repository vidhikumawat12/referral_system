const express = require("express");
const User = require("../models/User");
const Transaction = require("../models/Transaction");
const Earning = require("../models/Earning");
const { notifyUserAboutEarnings } = require("../server");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { userId, amount } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found." });

    const transaction = await Transaction.create({ userId, amount });

    // Calculate direct and indirect earnings
    if (amount > 1000) {
      if (user.referredBy) {
        await Earning.create({
          userId: user.referredBy,
          referredUserId: userId,
          level: 1,
          amount: amount * 0.05,
          transactionId: transaction._id,
        });

        // trigger real time notification.....
        notifyUserAboutEarnings(user.referredBy, amount * 0.05);
        const parent = await User.findById(user.referredBy);
        if (parent && parent.referredBy) {
          await Earning.create({
            userId: parent.referredBy,
            referredUserId: userId,
            level: 2,
            amount: amount * 0.01,
            transactionId: transaction._id,
          });

          //Trigger earnings notification for parent user...
          notifyUserAboutEarnings(parent.referredBy, amount * 0.01);
        }
      }
    }

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all transactions for a user
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const transactions = await Transaction.find({ userId });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all transactions
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
