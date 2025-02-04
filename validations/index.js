const User = require("../models/user.model");

//Validations functions.
async function validateRegistration(username, password) {
  if (!username || typeof username !== "string") {
    return "Username is required and must be a string.";
  }
  if (!password || typeof password !== "string") {
    return "Password is required and must be a string.";
  }
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return "User already exists. Please login.";
  }
  return null;
}

async function validateLogin(username, password) {
  if (!username || typeof username !== "string") {
    return "Username is required and must be a string.";
  }
  if (!password || typeof password !== "string") {
    return "Password is required and must be a string.";
  }
  const existingUser = await User.findOne({ username });
  if (!existingUser) {
    return "User not found. Please register.";
  }

  const isPasswordMatch = await existingUser.comparePassword(password);
  if (!isPasswordMatch) {
    return "Invalid credentials. Please try again.";
  }

  return null;
}

module.exports = { validateRegistration, validateLogin };
