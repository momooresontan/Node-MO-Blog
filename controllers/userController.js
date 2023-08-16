const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

dotenv.config();

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
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN },
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json({
          id: user._id,
          email: user.email,
          username: user.username,
        });
      }
    );
  } else {
    res.status(400).json("Wrong credentials");
  }
};

exports.getMe = async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
};

exports.logout = async (req, res) => {
  const { token } = req.cookies;
  res.cookie("token", token).json("ok");
};
