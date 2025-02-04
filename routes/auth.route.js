const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/user.model");
const { validateRegistration, validateLogin } = require("../validations/index");
const { registerUser, checkUser } = require("../controllers/index");
const router = express.Router();
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

//POST route to register a user.
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    let message = await validateRegistration(username, password);
    if (message) {
      return res.status(400).json({ message });
    }

    const user = await registerUser(username, password);

    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: "4h" });

    return res.status(201).json({
      message: "User registered successfully",
      token,
      username: user.username,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//POST route to login a user.
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const message = await validateLogin(username, password);
    if (message) return res.status(400).json({ message });

    const user = await checkUser(username);
    return res.status(200).json({
      message: "User logged-in successfully",
      username: user.username,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
