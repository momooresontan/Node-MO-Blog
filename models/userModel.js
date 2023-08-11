const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username required"],
    unique: true,
    min: 4,
  },
  email: {
    type: String,
    required: [true, "User email required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "User password required"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
