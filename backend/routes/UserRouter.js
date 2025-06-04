const express = require("express");
const User = require("../db/userModel");
const mongoose = require("mongoose");
const router = express.Router();

// router.post("/", async (request, response) => {});

router.get("/list", async (req, res) => {
  try {
    const users = await User.find({}, "_id first_name last_name");
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  const userId = req.params.id;

  // Kiểm tra nếu id không hợp lệ
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid user ID format." });
  }

  try {
    const user = await User.findById(userId).select(
      "_id first_name last_name location description occupation"
    );

    if (!user) {
      return res.status(400).json({ error: "User not found." });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
