const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  res.json({ requestData: { username, email, password } });
});

app.listen(4000);
