const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/dbConnect");
const User = require("./models/userModel");

dotenv.config();

connectDB();
const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({
      username,
      email,
      password,
    });
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

const PORT = process.env.PORT || 4000;

app.listen(4000);
