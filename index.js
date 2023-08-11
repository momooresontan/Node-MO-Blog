const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/dbConnect");

dotenv.config();

connectDB();
const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

app.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  res.json({ requestData: { username, email, password } });
});

const PORT = process.env.PORT || 4000;

app.listen(4000);
