const User = require("../model/model");
const bcrypt = require("bcrypt");
const register = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  console.log("Received data:", req.body);

  // Validate the input
  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  // Check if email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already in use" });
  }
  const hashedpass = await bcrypt.hash(password, 10);
  // Create a new user
  try {
    const newUser = new User({ username, email, password: hashedpass });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getAll = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { register, getAll };
