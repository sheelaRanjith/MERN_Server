const express = require("express");
const router = express.Router();
const User = require("../models/User");

// POST — add user (you already have)
router.post("/", async (req, res) => {
  const { username, email } = req.body;
  try {
    const user = new User({ username, email });
    await user.save();
    res.json({ message: "User Saved Successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving user" });
  }
});

// GET — fetch all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users); // return array of users
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching users" });
  }
});

module.exports = router;
