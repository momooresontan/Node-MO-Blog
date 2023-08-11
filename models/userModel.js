const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username required"],
    index: true,
    unique: [true, "Username already taken!"],
    min: 4,
  },
  email: {
    type: String,
    required: [true, "User email required"],
    index: true,
    unique: [true, "User email already used!"],
  },
  password: {
    type: String,
    required: [true, "User password required"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
