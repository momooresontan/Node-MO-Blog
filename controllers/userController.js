const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const salt = bcrypt.genSaltSync(10);

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPasword = bcrypt.hashSync(password, salt);
    const user = await User.create({
      username,
      email,
      password: hashedPasword,
    });
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const comparePassword = bcrypt.compareSync(password, user.password);

  if (comparePassword) {
    const accessToken = jwt.sign({
      user: {
        username: user.username,
        email: user.email,
        id: user.id,
      },
    });
  } else {
    res.status(400).json("Wrong credentials");
  }
};
