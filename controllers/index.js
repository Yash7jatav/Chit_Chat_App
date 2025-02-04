const bcrypt = require("bcrypt");
const User = require("../models/user.model");

async function registerUser(username, password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new User({ username, password: hashedPassword });
  await user.save();
  return user;
}

async function checkUser(username) {
  const user = await User.findOne({ username });
  return user;
}

module.exports = { registerUser, checkUser };
