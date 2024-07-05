const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Do not include confirmPassword in the schema
});

const User = mongoose.model("User", userSchema);

module.exports = User;
